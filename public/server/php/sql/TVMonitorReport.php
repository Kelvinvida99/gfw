<?php


require "../auth/user.php";
require "../auth/checkAuth.php";
//$_POST["entity"] = "nurses";
$REQUESTED_ACTION = "readOnly"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite, THIS FILE WILL DOES SELECTS TO DATABASE, SO IT'S A  "readOnly" 
//require "../auth/checkAuthorization.php";
require "../sqlFunctions/filtersFunctions.php";
require "../sqlFunctions/returnObject.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP





//SEND ME THE VARIABLE BELOW

$fromDate = "2021-01-01";
$toDate = "2022-12-31";


//WILL SEND YOU THE OBJECT BELOW BACK

/*{

    "Services"         :  {"completed": "3", "scheduled":"300", "needAttention": "33", "missed":"30"},
    "patients"         :  {"active":"4", "inactive":"4"},
    "aids"             :  {"active":"4", "Inactive":"4","expiredCompliances": "3", "expiredCompliances30":"300"},
    "departments"      :  [{"name":"CDPAD","activePatietns":"4", "activeAids":"4"}],
    "payrolls"         :  [{"name":"01/01/2021 - 01/07/2021","scheduled":"400", "completed":"354","missed": "3", "servicesExpenses":"0.00", "servicesIncome":"0.00"}],
    "accounting"       :  {"income":"0.00", "servicesExpenses":"0.00", "otherExpenses":"0.00"},


}



////ADMIN PRIVILEGES OR ACCOUNTANT PRIVILEGDES

{

    "Services"         :  {"Completed": "3", "Scheduled":"300", "NeedAttention": "33", "missed":"30"},
    "patients"         :  {"active":"4", "Inactive":"4","private": "3", "insurance":"300"},
    "aids"             :  {"active":"4", "Inactive":"4","expiredCompliances": "3", "expiredCompliances30":"300"},
    "departments"      :  [{"name":"CDPAD","activePatietns":"4", "activeAids":"4","lastPayrollsClock": "3"}],
    "payrolls"         :  [{"name":"01/01/2021 - 01/07/2021","scheduled":"400", "completed":"354","missed": "3", "servicesExpenses":"$35,000.00", "servicesIncome":"$52,000.00"}],
    "accounting"       :  {"income":"$75,000.00", "servicesExpenses":"$52,000.00", "otherExpenses":"$5,250.00"},


}

*/
$services['completed'] = "SELECT COALESCE(COUNT(*), '0')  AS completed FROM services, services_vs_status WHERE services.deleted = '0' 
                    AND services_vs_status.deleted = '0' AND services_vs_status.servicesId = services.id AND services_vs_status.N_status = 'approved'
                    AND (services.N_end_date >= CAST('$fromDate' AS DATE) AND services.N_end_date <= CAST('$toDate' AS DATE))            
                    ";

$services['scheduled'] = "SELECT COALESCE(COUNT(*), '0')  AS scheduled FROM services WHERE services.deleted = '0'
                    AND (services.N_end_date >= CAST('$fromDate' AS DATE) AND services.N_end_date <= CAST('$toDate' AS DATE))
                    AND services.N_status = 'scheduled' ";
$services['needAttention'] = "SELECT COALESCE(COUNT(*), '0')  AS needAttention FROM services WHERE services.deleted = '0' 
                    AND (services.N_end_date >= CAST('$fromDate' AS DATE) AND services.N_end_date <= CAST('$toDate' AS DATE))   
         AND (
            
            (services.N_status = 'InProgress' AND CAST(CONCAT(services.N_end_date, ' ', services.N_end_time) AS DATETIME) < NOW())
            OR 
            (services.N_status = 'Scheduled' AND CAST(CONCAT(services.N_start_date, ' ', services.N_start_time) AS DATETIME) < NOW())
            OR
            (services.N_status = 'submitted' AND (CAST(services.N_end_date AS DATE)  + INTERVAL 1 WEEK) >  curdate()  )
            OR
            services.N_status = 'rejected' OR 
            services.N_status = 'noStaff' OR 
            services.N_status = 'timeSheet' OR 
            services.N_status = 'sicknessAbsence' OR 
            services.N_status = 'personalAbsence' OR 
            services.N_status = 'emergencyAbsence' OR 
            services.N_status = 'otherAbsence' OR 
            services.N_status = 'patientDeclined' OR 
            services.N_status = 'patientHospitalized' OR 
            services.N_status = 'patientVacation'
            
            )
";

$services['missed'] = "SELECT COALESCE(COUNT(*), '0')  AS missed FROM services WHERE services.deleted = '0' 
                    AND (services.N_end_date >= CAST('$fromDate' AS DATE) AND services.N_end_date <= CAST('$toDate' AS DATE))            
                    AND services.N_status = 'missed'";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$patients['active'] = "SELECT COALESCE(COUNT(*), '0')  AS active FROM patients, patients_vs_agreements WHERE patients.deleted = '0' 
AND patients.id = patients_vs_agreements.patientsId AND patients_vs_agreements.status = 'Active' AND (patients_vs_agreements.termination_date > CURDATE() OR patients_vs_agreements.termination_date = '0000-00-00')";

$patients['inactive'] = "SELECT COALESCE(COUNT(*), '0')  AS inactive FROM patients 
LEFT JOIN patients_vs_agreements ON patients_vs_agreements.patientsId = patients.id
WHERE patients.deleted = '0' 
 AND patients_vs_agreements.status != 'Active' ";


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$nurses['active'] = "SELECT COALESCE(COUNT(*), '0')  AS active FROM nurses  WHERE nurses.deleted = '0' AND
                    JSON_EXTRACT(agreementStatus, '$.active') > 0 ";

$nurses['inactive'] = "SELECT COALESCE(COUNT(*), '0')  AS inactive FROM nurses  WHERE nurses.deleted = '0' AND
JSON_EXTRACT(agreementStatus, '$.active') = 0 ";


$nurses['expiredCompliances'] = "SELECT COALESCE(COUNT(*), '0')  AS expiredCompliances FROM nurses_vs_compliances 
 WHERE nurses_vs_compliances.deleted = '0' AND status != 'Renewed' AND status != 'Terminated' AND 
(expiration_date <= CURDATE() OR status = 'Expired') ";

$nurses['expiredCompliances30'] = "SELECT COALESCE(COUNT(*), '0')  AS expiredCompliances30 FROM nurses_vs_compliances 
 WHERE nurses_vs_compliances.deleted = '0' AND status != 'Renewed' AND status != 'Terminated' AND 
((expiration_date <= curdate() + INTERVAL 1 MONTH) ) ";


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$departments['all'] = getDepartments();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$payrolls['all'] = getPayrolls($fromDate, $toDate);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




$acoounting['income'] = "SELECT  COALESCE(CONCAT('$',TRUNCATE(SUM(services.patient_agrmt_hourly_payrate *  (time_to_sec(timediff(N_clock_in_time, N_clock_out_time )) / 3600)),2)), '$0.00')   AS income 
                        FROM services WHERE services.deleted = '0' AND services.patientPayment = 'paid'
                    AND (services.N_end_date >= CAST('$fromDate' AS DATE) AND services.N_end_date <= CAST('$toDate' AS DATE))   ";


$acoounting['expenses'] = "SELECT  COALESCE(CONCAT('$',TRUNCATE(SUM(services.nurse_agrmt_hourly_payrate *  (time_to_sec(timediff(N_clock_in_time, N_clock_out_time )) / 3600)), 2)), '$0.00')  AS expenses 
                            FROM services WHERE services.deleted = '0' AND services.aidPayment = 'paid'
                            AND (services.N_end_date >= CAST('$fromDate' AS DATE) AND services.N_end_date <= CAST('$toDate' AS DATE))   ";

$acoounting['otherExpenses'] = "'$775.00'";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


$finalTVReportQuery = "SELECT

JSON_OBJECT(
               
                'services'         ,  JSON_OBJECT('completed', (".$services['completed']."), 'scheduled',(".$services['scheduled']."), 'NeedAttention', (".$services['needAttention']."), 'missed',(".$services['missed'].")),

                'patients'         ,  JSON_OBJECT('active', (".$patients['active']."), 'inactive',(".$patients['inactive'].")),
                'aids'             ,  JSON_OBJECT('active', (".$nurses['active']."), 'inactive',(".$nurses['inactive']."), 'expiredCompliances', (".$nurses['expiredCompliances']."), 'expiredCompliances30',(".$nurses['expiredCompliances30'].")),
                'departments'      ,  '[".$departments['all']."]',
                'payrolls'         ,  '[".$payrolls['all']."]',
                'accounting'       ,  JSON_OBJECT('income', (".$acoounting['income']."), 'expenses',(".$acoounting['expenses']."), 'otherExpenses',(".$acoounting['otherExpenses']."))

            )  AS report        

";



//echo $finalTVReportQuery."<br><br>";

//exit;
//EXECUTING SQL QUERY TO GET ROWS
//mysqli_query($con, "SET @@sql_mode = 'NO_BACKSLASH_ESCAPES';");
if (!$result = mysqli_query($con, $finalTVReportQuery)){
    echoReturnObject("MySqlError");
    exit;
  }
  $data = "";
  while($row = $result->fetch_assoc()) {
      $data = $row["report"];
     // print_r($row);
  }


  $returnObj = '{    
    "authentication":{"val":"'.$_SESSION["user"]->sessionStatus.'"},
    "authorization":{"val":"'.$_SESSION["user"]->requestPermission.'"},
    "restriction":{"val":"ok","restrictedFields":[]},
    "error":{"val":"ok"},
    "data":'.($data).',
    "availableRowsWithFilters":"0",
    "multiTables":[],
    "file":[]
}';

echo $returnObj;



//echoReturnObject("ok", $rows, 0);
mysqli_free_result($result);
mysqli_close($con);













function getDepartments(){


    $con = $_SESSION['user']->initCompanyDBConn();
    
    
    $sql = "SELECT

    JSON_OBJECT('name',   departments.name, 
                            'activePatients', 
    
                            (SELECT COALESCE(COUNT(DISTINCT patients_vs_agreements.patientsId ),'0') FROM patients_vs_agreements WHERE patients_vs_agreements.deleted = '0' AND patients_vs_agreements.department = departments.id 
                            AND patients_vs_agreements.status = 'Active' AND (patients_vs_agreements.termination_date > CURDATE() OR patients_vs_agreements.termination_date = '0000-00-00')),
    
    
                            'activeAids', 
    
                            (SELECT COALESCE(COUNT(DISTINCT nurses_vs_agreements.nursesId), '0') FROM nurses_vs_agreements WHERE nurses_vs_agreements.deleted = '0' AND nurses_vs_agreements.department = departments.id 
                            AND nurses_vs_agreements.status = 'Active' AND (nurses_vs_agreements.termination_date > CURDATE() OR nurses_vs_agreements.termination_date = '0000-00-00'))
    
                            
                            ) AS departments
                            
                            FROM departments WHERE departments.deleted = '99'";; 
    
    
    
    
    
        $result = mysqli_query($con,$sql);
        $departments = [];
        while($rs = $result->fetch_array(MYSQLI_ASSOC)) { 
            //$powers = implode(',', explode(',', $rs["powers"]));
           $departments[] = $rs["departments"];
        }
        mysqli_close($con);
        if($departments == "" ) $departments = " ";

        return str_replace('"','\"',implode(",", $departments));
    
    
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

function getPayrolls($fromDate, $toDate){


    $con = $_SESSION['user']->initCompanyDBConn();
    
    
    $sql = "SELECT

    JSON_OBJECT(            'name',   CONCAT(DATE_FORMAT(payrolls.N_from,'%m/%d/%y'), ' - ',DATE_FORMAT(payrolls.N_to,'%m/%d/%y')), 

                            'scheduled', 
    
                            (SELECT COALESCE(COUNT(*), '0') FROM services WHERE services.deleted = '0' AND services.N_payroll = payrolls.id 
                            AND services.N_status = 'scheduled'),
    
    
                            'completed', 
    
                            (SELECT COALESCE(COUNT(DISTINCT services_vs_status.servicesId), '0')  FROM services, services_vs_status WHERE services.deleted = '0' 
                                 AND services_vs_status.deleted = '0' AND services_vs_status.servicesId = services.id AND services_vs_status.N_status = 'approved'
                                 AND (services.N_end_date >= CAST('$fromDate' AS DATE) AND services.N_end_date <= CAST('$toDate' AS DATE))),
    
                            'missed', 
    
                            (SELECT COALESCE(COUNT(DISTINCT services.id), '0')  FROM services, services_vs_status WHERE services.deleted = '0' 
                                 AND services_vs_status.deleted = '0' AND services_vs_status.servicesId = services.id AND services_vs_status.N_status = 'missed'
                                 AND (services.N_end_date >= CAST('$fromDate' AS DATE) AND services.N_end_date <= CAST('$toDate' AS DATE))),
    
                            'servicesExpenses', 
    
                            (SELECT COALESCE(SUM(services.nurse_agrmt_hourly_payrate *  (time_to_sec(timediff(N_clock_in_time, N_clock_out_time )) / 3600)), '0') 
                                FROM services WHERE services.deleted = '0' AND services.N_payroll = payrolls.id ),
    
    
                                'servicesIncome', 
    
                            (SELECT COALESCE(SUM(services.patient_agrmt_hourly_payrate *  (time_to_sec(timediff(N_clock_in_time, N_clock_out_time )) / 3600)), '0')  
                                FROM services WHERE services.deleted = '0' AND services.N_payroll = payrolls.id )
    
                            
                            ) AS payrolls
                            
                            FROM payrolls WHERE payrolls.deleted = '0' AND 
                            
                            payrolls.N_to >= CAST('$fromDate' AS DATE) AND payrolls.N_to <= CAST('$toDate' AS DATE)
                            
                            ";
    
    
    
    
    
        $result = mysqli_query($con,$sql);
        $departments = [];
        while($rs = $result->fetch_array(MYSQLI_ASSOC)) { 
            //$powers = implode(',', explode(',', $rs["powers"]));
           $departments[] = $rs["payrolls"];
        }
        mysqli_close($con);
        if($departments == "" ) $departments = " ";

        return str_replace('"','\"',implode(",", $departments));
    
    
    }




?>


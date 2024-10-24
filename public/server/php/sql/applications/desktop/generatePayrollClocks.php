<?php

/*
require("../auth/try.php");
if(!isAuthenticated()) header('Location: ../../login.php');
date_default_timezone_set("America/New_York");
$db = $_SESSION["user"]->dbCredentials;
$mySql = new initSecMySql();
$con = $mySql->conn;
include("../db_functions.php");
echo generatePayrollClocks(92,$con);*/
//writeToTestTxt("0000000000");
function generatePayrollClocks($payroll_id,$con){  //writeToTestTxt("111");
    //$payroll_id            = 60;
    //$db = $_SESSION["user"]->dbCredentials;
    //$mySql = new initSecMySql();
    //$con = $mySql->conn;
    if(isset($_SESSION["user"]->username)) $user =            mysqli_real_escape_string($con, $_SESSION["user"]->username);
    else $user = "no_user";

    $payrollDates = get_entity_vals($payroll_id, "payrolls","N_from,N_to",$con);  //writeToTestTxt("22222222");
    //$payrollDates = get_entity_vals($payroll_id, "payrolls","N_from,N_to",$con); 
    //GETTING DATES WEEK DAYS
    $dateCounter = $payrollDates["N_from"];
    $limitDate = date('Y-m-d', strtotime($payrollDates["N_to"]. ' + 1 days'));
    $previousPayrollLastDay = date( 'Y-m-d', strtotime( $payrollDates["N_from"] . ' -1 day' ));
    //$previousPayrollLastDay_weekday = date('l', strtotime($previousPayrollLastDay));
    $datesWeekDays = [];
    while($dateCounter != $limitDate){    
        $datesWeekDays[date('l', strtotime($dateCounter))] = $dateCounter; 
        $dateCounter = date('Y-m-d', strtotime($dateCounter. ' + 1 days'));
    }

    //I am using N_evvStatus AS a flag to auto insert the first status
    //writeToTestTxt("44444we");
    $sql[0] = "INSERT INTO services (
        
        N_payroll,
        N_patient,
        patient_agreement_id,
        N_start_date,
        N_start_time,
        N_end_date,
        N_end_time, 
        N_status,
        nurse_agreement_id,
        N_address, N_city, N_state, N_zip, 
        servicereportId,         
        is24hr,

        patient_agrmt_hourly_payrate,
        nurse_agrmt_hourly_payrate,
        N_procedureCode,
        N_providerRateCode,
        N_procedureModCode,
        N_memberId,
        N_sendEvv, 
        N_evvStatus,
        N_notes) 
    
    
    
    SELECT 
    '$payroll_id' AS payroll_id,  
    patients_vs_schedule.patientsId AS  patient_id,
    patients_vs_agreements.id AS agreementId, 
        
  CASE 
      WHEN patients_vs_schedule.week_day = 'Monday'       THEN '".$datesWeekDays['Monday']."'
      WHEN patients_vs_schedule.week_day = 'Tuesday'      THEN '".$datesWeekDays['Tuesday']."'
      WHEN patients_vs_schedule.week_day = 'Wednesday'    THEN '".$datesWeekDays['Wednesday']."'
      WHEN patients_vs_schedule.week_day = 'Thursday'     THEN '".$datesWeekDays['Thursday']."'
      WHEN patients_vs_schedule.week_day = 'Friday'       THEN '".$datesWeekDays['Friday']."'
      WHEN patients_vs_schedule.week_day = 'Saturday'     THEN '".$datesWeekDays['Saturday']."'
      WHEN patients_vs_schedule.week_day = 'Sunday' AND patients_vs_schedule.week_day2 = 'Sunday'  THEN '".$datesWeekDays['Sunday']."'
      WHEN patients_vs_schedule.week_day = 'Sunday' AND patients_vs_schedule.week_day2 = 'Monday'  THEN '".$previousPayrollLastDay."'

      ELSE '".$datesWeekDays['Monday']."'
  END as start_date,

  patients_vs_schedule.start_time AS startTime,

  CASE patients_vs_schedule.week_day2 
      WHEN 'Monday'      THEN '".$datesWeekDays['Monday']."'
      WHEN 'Tuesday'     THEN '".$datesWeekDays['Tuesday']."'
      WHEN 'Wednesday'   THEN '".$datesWeekDays['Wednesday']."'
      WHEN 'Thursday'    THEN '".$datesWeekDays['Thursday']."'
      WHEN 'Friday'      THEN '".$datesWeekDays['Friday']."'
      WHEN 'Saturday'    THEN '".$datesWeekDays['Saturday']."'
      WHEN 'Sunday'      THEN '".$datesWeekDays['Sunday']."'
      ELSE '".$datesWeekDays['Monday']."'
  END as end_date,

  patients_vs_schedule.end_time AS endTime,
  'scheduled' AS newStatus, 
  patients_vs_schedule.nurses_vs_agreements AS nurse_agreement_id, 
  patients.address AS address, patients.city AS ciudad,patients.state AS estado,patients.zip AS zip,  
  patients_vs_schedule.servicereport AS servicereport,
  patients_vs_agreements.is24hr,

  patients_vs_agreements.patient_agrmt_hourly_payrate,
  nurses_vs_agreements.rate,

  patients_vs_agreements.N_procedureCode,
  patients_vs_agreements.N_providerRateCode,
  patients_vs_agreements.N_procedureModCode, 
  patients_vs_agreements.memberId,
  patients_vs_agreements.sendEvv,
   if(patients_vs_agreements.sendEvv = 'true', 'No Sent','NA'),
   'insertFirstStatus'
 

FROM patients_vs_schedule

LEFT JOIN patients ON patients.id = patients_vs_schedule.patientsId

LEFT JOIN nurses_vs_agreements ON nurses_vs_agreements.id = patients_vs_schedule.nurses_vs_agreements
LEFT JOIN patients_vs_agreements ON patients_vs_agreements.id = patients_vs_schedule.patients_vs_agreements
          
          
WHERE  patients_vs_agreements.deleted = '0' AND patients_vs_schedule.patients_vs_agreements != '0' 
AND   patients_vs_agreements.status = 'Active'  AND patients_vs_schedule.deleted = '0' AND patients.auto_schedule = 'true'";



$insertStatus[0] = "INSERT INTO nostatusservices (serviceId) 

SELECT id  FROM services WHERE services.N_notes = 'insertFirstStatus'";

$insertStatus2[0] = "INSERT INTO services_vs_status (servicesId, N_date, N_time, N_status,status_by) 

SELECT serviceId, CURDATE(), CURTIME(),'scheduled', 'system'  FROM nostatusservices ";

$deleteRows[0] = "DELETE FROM nostatusservices";


//return $sql;
//writeToTestTxt($sql[0]); exit;
// Attempt select query execution

if (!mysqli_query($con,$sql[0])){
    return "ERROR: Could not able to execute $sql. " . mysqli_error($con); 
    exit;
}
if (!mysqli_query($con,$insertStatus[0])){
    return "ERROR: Could not able to execute $insertStatus. " . mysqli_error($con);
}
if (!mysqli_query($con,$insertStatus2[0])){
    return "ERROR: Could not able to execute $sql. " . mysqli_error($con); 
    exit;
}
if (!mysqli_query($con,$deleteRows[0])){
    return "ERROR: Could not able to execute $insertStatus. " . mysqli_error($con);
}
else return "1";
/*
$allQueiresArray = array_merge($sql, $insertStatus, $insertStatus2, $deleteRows);
writeToTestTxt(implode("*****", $allQueiresArray));

if($allQueiresArray != []){
    require "../sqlFunctions/sqlTransaction.php";
    if(!runQueries($allQueiresArray, $con)){
        echoReturnObject("MySqlError", mysqli_error($con));
        exit;
    }
}
*/





/*if($result = mysqli_query($con, $sqlSelect)){
    if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_array($result)){            
           $insertValues = "('".$row['payroll_id']."','".$row['patient_id']."','".$row['p_dep_id']."','".$row['start_date']."','".$row['startTime']."',
            '".$row['end_date']."','".$row['endTime']."','".$row['newStatus']."','".$row['nurse_id']."','".$row['nurseDepartment']."','".$row['address']."','".$row['ciudad']."',
            '".$row['estado']."','".$row['zip']."','".$row['taskGroup']."','".$row['usuario']."')";

            //DOING INSERT INDIVIDUALKY BCUZ TRIGGER CONFLICT
          //  $sql = "INSERT INTO services (N_payroll,N_patient,N_patient_department,N_start_date,N_start_time, N_end_date,N_end_time, N_status, N_nurses, N_nurse_department,
           // N_address, N_city, N_state, N_zip, N_original_task_group, N_created_by) VALUES $insertValues ";

           if (!mysqli_query($con,$sql)){
               return $sql; exit;
         }
           else {//INSERTING DEFAULT INITIAL STATUS, WHICH IS 'scheduled'
                $newClockId = mysqli_insert_id($con);
                $sql = "INSERT INTO services_vs_status (services,N_status,N_nurse,N_nurse_department,N_date,N_time,N_created_by) 
                VALUES  ('$newClockId','scheduled', '".$row['nurse_id']."','".$row['nurseDepartment']."',CURDATE(),CURTIME(),'autoGenerated');";    
                if (!mysqli_query($con,$sql)){
                    return $sql; //exit;
                }   
            }
        }
        // Free result set
        //mysqli_free_result($result);
        return 1;
    } else{
       echo "No records matching your query were found.";
    }
} else{
    echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
}
*/




$TASKSsTATUS = "

IF(NEW.N_deleted = '0') THEN 

INSERT INTO services_vs_tasks (
    servicesId,
    N_name,
    N_reportSheet,
    taskGroupName,
    N_data_type,
    N_input_helper,
    N_scheduled_time,
    N_mandatory,
    N_created_by
    )


SELECT

NEW.id, 
servicesreport_vs_tasks.N_name, 
servicesreport.servicesName, 
 servicesreport_vs_tasks.taskGroupName
  servicesreport_vs_tasks.N_data_type,
  servicesreport_vs_tasks.N_input_helper, 
  servicesreport_vs_tasks.N_time, 
  servicesreport_vs_tasks.N_mandatory,
   'db_trigger' 


FROM  servicesreport
LEFT JOIN servicesreport_vs_tasks ON servicesreport_vs_tasks.servicesreportId = servicesreport.id


WHERE servicesreport.id = NEW.servicereportId AND servicesreport_vs_tasks.deleted = '0'; 

INSERT INTO services_vs_status (servicesId,N_status,N_nurse,N_nurse_department,N_date,N_time,N_created_by) 
                VALUES  (NEW.id,'scheduled', NEW.N_nurses,NEW.N_nurse_department,CURDATE(),CURTIME(),'autoGenerated');



END IF";








}









/*UPDATE FROM `patients_schedule`, patients_schedule_vs_hours SET 
patients_schedule_vs_hours.start_date = DATE_SUB(patients_schedule_vs_hours.start_date, INTERVAL 7 DAY),
patients_schedule_vs_hours.end_date = DATE_SUB(patients_schedule_vs_hours.end_date, INTERVAL 7 DAY)
WHERE patients_schedule.N_payroll = 47 AND patients_schedule_vs_hours.patients_schedule = patients_schedule.id AND patients_schedule_vs_hours.end_date > '2020-08-30';*/





?>



<?php

//ADDING NEW CHART -> EXPRINING AGRMTS
     //ADDING NEW CHART -> EXPRINING AGRMTS
     //ADDING NEW CHART -> EXPRINING AGRMTS

    function getPatientBars($con){
        

            //$allCharts->patientBars = []; 
            $sql = getNextDaysExpriringAgrmt();    
            //writeToTestTxt($sql); exit;
            $patientsAgrmts = [];
            $result = mysqli_query($con,$sql);
            //$yValues = [];
            //writeToTestTxt(json_encode($result)); exit;

            while ($rs = mysqli_fetch_object ($result)){


                    $patientsAgrmts[0] = new stdClass();
                    $patientsAgrmts[0]->label = 'Expired';
                    $patientsAgrmts[0]->value = new stdClass();
                    $patientsAgrmts[0]->value->x = '0';
                    $patientsAgrmts[0]->value->y = $rs->expired;                          
            
                    $patientsAgrmts[1] = new stdClass();
                    $patientsAgrmts[1]->label = 'Expiring in 7 days';
                    $patientsAgrmts[1]->value = new stdClass();
                    $patientsAgrmts[1]->value->x = 'As of now';
                    $patientsAgrmts[1]->value->y = $rs->exp7;   

                    $patientsAgrmts[2] = new stdClass();
                    $patientsAgrmts[2]->label = 'Expiring in 15 days ';
                    $patientsAgrmts[2]->value = new stdClass();
                    $patientsAgrmts[2]->value->x = '15';
                    $patientsAgrmts[2]->value->y = $rs->exp15;   


                    $patientsAgrmts[3] = new stdClass();
                    $patientsAgrmts[3]->label = 'Expiring in 30 days';
                    $patientsAgrmts[3]->value = new stdClass();
                    $patientsAgrmts[3]->value->x = '30';
                    $patientsAgrmts[3]->value->y = $rs->exp30;   


                    $patientsAgrmts[4] = new stdClass();
                    $patientsAgrmts[4]->label = 'Expiring in 60 days';
                    $patientsAgrmts[4]->value = new stdClass();
                    $patientsAgrmts[4]->value->x = '60';
                    $patientsAgrmts[4]->value->y = $rs->exp60;   


                    //writeToTestTxt( json_encode( $patientsAgrmts)); exit;
            
        
            }

            return $patientsAgrmts;
}













function getPatientLines($con){


     //ADDING NEW CHART -> ACTIVE/INACTIVE PATIENTS CHART
     //ADDING NEW CHART -> ACTIVE/INACTIVE PATIENTS CHART
     //ADDING NEW CHART -> ACTIVE/INACTIVE PATIENTS CHART


     //$statuses = '[]';
     $pateintLines = []; return $pateintLines;
     $sql = getPreviousMonthsPatientsQuery(6);    
 
     $result = mysqli_query($con,$sql->active);
     $vals = [];
     
 
     while($rs = $result->fetch_array(MYSQLI_ASSOC)) {             
        
        foreach ($rs as $key => $value){
 
             $vals[] = new stdClass();
             $pos = sizeof($vals) -  1;
             $vals[$pos]->x = $key;
             $vals[$pos]->y = $value;                                  
                               
       }
     }
     
 
     $pateintLines[0] = new stdClass();
     $pateintLines[0]->label = "Active";   
     $pateintLines[0]->value = $vals;
 /////////////////////////////////////////////
 /////////////////////////////////////////////
     $result = mysqli_query($con,$sql->inactive);
     $vals2 = [];
 
     while($rs = $result->fetch_array(MYSQLI_ASSOC)) {             
        
        foreach ($rs as $key => $value){
 
             $vals2[] = new stdClass();
             $pos = sizeof($vals2) -  1;
             $vals2[$pos]->x = $key;
             $vals2[$pos]->y = $value - $vals[$pos]->y;                                  
                               
       }
 
     }
 
     $pateintLines[1] = new stdClass();
     $pateintLines[1]->label = "Inactive";   
     $pateintLines[1]->value = $vals2;



     return $pateintLines;

}









/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
//CHART FUNCTIONS//
//CHART FUNCTIONS//
//CHART FUNCTIONS//
//CHART FUNCTIONS//
function getPreviousMonthsPatientsQuery($monthsCounter){

   
    $currentDate    = strtotime(date('Y-m-20'));
    $c = 0;
    $selectString = "SELECT ";
    $selectString2 = "SELECT ";

    while($c < $monthsCounter){

        $loopDate = strtotime("-$c month", $currentDate);
        $fromDate = date('Y-m-01', $loopDate);
        $toDate  = date('Y-m-t', $loopDate); 
        $month = date('F', $loopDate);

        $selectString .= " COALESCE( (SELECT  COUNT(DISTINCT  patients_vs_agreements.patientsId) FROM patients_vs_agreements WHERE patients_vs_agreements.deleted = '0' AND 
        (admission_date <= '".$toDate."' AND  termination_date >= '".$fromDate."')), 0) AS $month, ";

        $selectString2 .= " COALESCE( (SELECT  COUNT(DISTINCT  patients.id) FROM patients WHERE patients.deleted = '0' AND 
        (created_date <= '".$toDate."' )), 0) AS $month, ";//TOTAL PATIETNS


        $c++;

    }


    $returnObj = new stdClass();
    $returnObj->active = substr($selectString, 0, -2)."; ";
    $returnObj->inactive = substr($selectString2, 0, -2)."; ";
   return $returnObj;
}




function getNextDaysExpriringAgrmt(){


    $return = " SELECT ";

    $return .= " COALESCE((SELECT  COUNT(*)   FROM patients_vs_agreements
    LEFT JOIN patients ON patients_vs_agreements.patientsId = patients.id AND patients_vs_agreements.status = 'Active' 
    AND patients_vs_agreements.deleted = '0'  
    WHERE patients.deleted = '0' AND  (patients_vs_agreements.status != 'Terminated' AND (patients_vs_agreements.termination_date <= curdate() )  )), '') AS expired, ";


    $return .= " COALESCE((SELECT  COUNT(*)   FROM patients_vs_agreements
    LEFT JOIN patients ON patients_vs_agreements.patientsId = patients.id AND patients_vs_agreements.status = 'Active' 
    AND patients_vs_agreements.deleted = '0'  
    WHERE patients.deleted = '0' AND  (patients_vs_agreements.status != 'Terminated' AND patients_vs_agreements.termination_date <= curdate() + INTERVAL 7 DAY)), '') AS exp7, ";

    $return .= " COALESCE((SELECT  COUNT(*)   FROM patients_vs_agreements
    LEFT JOIN patients ON patients_vs_agreements.patientsId = patients.id AND patients_vs_agreements.status = 'Active' 
    AND patients_vs_agreements.deleted = '0'  
    WHERE patients.deleted = '0' AND  (patients_vs_agreements.status != 'Terminated' AND patients_vs_agreements.termination_date <= curdate() + INTERVAL 15 DAY)), '') AS exp15, ";

    $return .= " COALESCE((SELECT  COUNT(*)   FROM patients_vs_agreements
    LEFT JOIN patients ON patients_vs_agreements.patientsId = patients.id AND patients_vs_agreements.status = 'Active' 
    AND patients_vs_agreements.deleted = '0'  
    WHERE patients.deleted = '0' AND  (patients_vs_agreements.status != 'Terminated' AND patients_vs_agreements.termination_date <= curdate() + INTERVAL 30 DAY)), '') AS exp30, ";

    $return .= " COALESCE((SELECT  COUNT(*)   FROM patients_vs_agreements
    LEFT JOIN patients ON patients_vs_agreements.patientsId = patients.id AND patients_vs_agreements.status = 'Active' 
    AND patients_vs_agreements.deleted = '0'  
    WHERE patients.deleted = '0' AND  (patients_vs_agreements.status != 'Terminated' AND patients_vs_agreements.termination_date <= curdate() + INTERVAL 60 DAY)), '') AS exp60 ";

    
   return $return;
}









    ?>
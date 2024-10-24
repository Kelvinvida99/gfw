<?php

//ADDING NEW CHART -> EXPRINING AGRMTS
     //ADDING NEW CHART -> EXPRINING AGRMTS
     //ADDING NEW CHART -> EXPRINING AGRMTS

    function getServiceBars($con){
        

            //$allCharts->patientBars = []; 
            $sql = getServicesStatus();    
            //writeToTestTxt($sql); exit;
            $patientsAgrmts = [];
            $result = mysqli_query($con,$sql);
            //$yValues = [];
            //writeToTestTxt(json_encode($result)); exit;

            while ($rs = mysqli_fetch_object ($result)){


                    $patientsAgrmts[0] = new stdClass();
                    $patientsAgrmts[0]->label = 'scheduled';
                    $patientsAgrmts[0]->value = new stdClass();
                    $patientsAgrmts[0]->value->x = '0';
                    $patientsAgrmts[0]->value->y = $rs->scheduled;                          
            
                    $patientsAgrmts[1] = new stdClass();
                    $patientsAgrmts[1]->label = 'inProgress';
                    $patientsAgrmts[1]->value = new stdClass();
                    $patientsAgrmts[1]->value->x = '15';
                    $patientsAgrmts[1]->value->y = $rs->inProgress;   

                    $patientsAgrmts[2] = new stdClass();
                    $patientsAgrmts[2]->label = 'submitted';
                    $patientsAgrmts[2]->value = new stdClass();
                    $patientsAgrmts[2]->value->x = '30';
                    $patientsAgrmts[2]->value->y = $rs->submitted;   


                    $patientsAgrmts[3] = new stdClass();
                    $patientsAgrmts[3]->label = 'missed';
                    $patientsAgrmts[3]->value = new stdClass();
                    $patientsAgrmts[3]->value->x = '45';
                    $patientsAgrmts[3]->value->y = $rs->missed;   


                    $patientsAgrmts[4] = new stdClass();
                    $patientsAgrmts[4]->label = 'sicknessAbsence';
                    $patientsAgrmts[4]->value = new stdClass();
                    $patientsAgrmts[4]->value->x = '60';
                    $patientsAgrmts[4]->value->y = $rs->sicknessAbsence;   


                    //writeToTestTxt( json_encode( $patientsAgrmts)); exit;
            
        
            }

            return $patientsAgrmts;
}













function getServiceLines($con){


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




//function getNextDaysExpriringAgrmt(){
function getServicesStatus(){


    $return = " SELECT ";

    $return .= " COALESCE((SELECT  COUNT(*) FROM services WHERE deleted = '0' AND N_status = 'scheduled'  ), '') AS scheduled, ";


    $return .= " COALESCE((SELECT  COUNT(*) FROM services WHERE deleted = '0' AND N_status = 'inProgress'  ), '') AS inProgress, ";

    $return .= " COALESCE((SELECT  COUNT(*) FROM services WHERE deleted = '0' AND N_status = 'submitted'  ), '') AS submitted,";

    $return .= " COALESCE((SELECT  COUNT(*) FROM services WHERE deleted = '0' AND N_status = 'missed'  ), '') AS missed,";

    $return .= " COALESCE((SELECT  COUNT(*) FROM services WHERE deleted = '0' AND N_status = 'sicknessAbsence'  ), '') AS sicknessAbsence ";

    
   return $return;
}









    ?>
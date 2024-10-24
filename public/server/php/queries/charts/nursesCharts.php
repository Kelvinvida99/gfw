<?php

//ADDING NEW CHART -> EXPRINING AGRMTS
     //ADDING NEW CHART -> EXPRINING AGRMTS
     //ADDING NEW CHART -> EXPRINING AGRMTS

    function getnurseBars($con){
        

            //$allCharts->nurseBars = []; 
            $sql = getNextDaysExpriringCompliances();    
            //writeToTestTxt($sql); exit;
            $nursesAgrmts = [];
            $result = mysqli_query($con,$sql);
            //$yValues = [];
            //writeToTestTxt(json_encode($result)); exit;

            while ($rs = mysqli_fetch_object ($result)){


                    $nursesAgrmts[0] = new stdClass();
                    $nursesAgrmts[0]->label = 'Expired';
                    $nursesAgrmts[0]->value = new stdClass();
                    $nursesAgrmts[0]->value->x = '0';
                    $nursesAgrmts[0]->value->y = $rs->expired;                          
            
                    $nursesAgrmts[1] = new stdClass();
                    $nursesAgrmts[1]->label = 'Expiring in 7 days';
                    $nursesAgrmts[1]->value = new stdClass();
                    $nursesAgrmts[1]->value->x = 'As of now';
                    $nursesAgrmts[1]->value->y = $rs->exp7;   

                    $nursesAgrmts[2] = new stdClass();
                    $nursesAgrmts[2]->label = 'Expiring in 15 days ';
                    $nursesAgrmts[2]->value = new stdClass();
                    $nursesAgrmts[2]->value->x = '15';
                    $nursesAgrmts[2]->value->y = $rs->exp15;   


                    $nursesAgrmts[3] = new stdClass();
                    $nursesAgrmts[3]->label = 'Expiring in 30 days';
                    $nursesAgrmts[3]->value = new stdClass();
                    $nursesAgrmts[3]->value->x = '30';
                    $nursesAgrmts[3]->value->y = $rs->exp30;   


                    $nursesAgrmts[4] = new stdClass();
                    $nursesAgrmts[4]->label = 'Expiring in 60 days';
                    $nursesAgrmts[4]->value = new stdClass();
                    $nursesAgrmts[4]->value->x = '60';
                    $nursesAgrmts[4]->value->y = $rs->exp60;   


                    //writeToTestTxt( json_encode( $nursesAgrmts)); exit;
            
        
            }

            return $nursesAgrmts;
}













function getnurseLines($con){


     //ADDING NEW CHART -> ACTIVE/INACTIVE nurseS CHART
     //ADDING NEW CHART -> ACTIVE/INACTIVE nurseS CHART
     //ADDING NEW CHART -> ACTIVE/INACTIVE nurseS CHART


     //$statuses = '[]';
     $nurseLines = []; 
     $sql = getPreviousMonthsnursesQuery(6);    

   
 
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
     
 
     $nurseLines[0] = new stdClass();
     $nurseLines[0]->label = "Active";   
     $nurseLines[0]->value = $vals;   
 /////////////////////////////////////////////
 /////////////////////////////////////////////
 //writeToTestTxt($sql->inactive); exit;
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
 
     $nurseLines[1] = new stdClass();
     $nurseLines[1]->label = "Inactive";   
     $nurseLines[1]->value = $vals2;

 

     return $nurseLines;

}









/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
//CHART FUNCTIONS//
//CHART FUNCTIONS//
//CHART FUNCTIONS//
//CHART FUNCTIONS//
function getPreviousMonthsnursesQuery($monthsCounter){

   
    $currentDate    = strtotime(date('Y-m-20'));
    $c = 0;
    $selectString = "SELECT ";
    $selectString2 = "SELECT ";

    while($c < $monthsCounter){

        $loopDate = strtotime("-$c month", $currentDate);
        $fromDate = date('Y-m-01', $loopDate);
        $toDate  = date('Y-m-t', $loopDate); 
        $month = date('F', $loopDate);

        $selectString .= " COALESCE( (SELECT  COUNT(DISTINCT  nurses_vs_agreements.nursesId) FROM nurses_vs_agreements WHERE nurses_vs_agreements.deleted = '0' AND 
        (admission_date <= '".$toDate."' AND  termination_date >= '".$fromDate."')), 0) AS $month, ";

        if($month == "July"){
            //writeToTestTxt($selectString); exit;
        }
        

        $selectString2 .= " COALESCE( (SELECT  COUNT(DISTINCT  nurses.id) FROM nurses WHERE nurses.deleted = '0' AND 
        (created_date <= '".$toDate."' )), 0) AS $month, ";//TOTAL NURSES


        $c++;

    }


    $returnObj = new stdClass();
    $returnObj->active = substr($selectString, 0, -2)."; ";
    $returnObj->inactive = substr($selectString2, 0, -2)."; ";
   return $returnObj;
}




function getNextDaysExpriringCompliances(){


    $return = " SELECT ";

    $return .= " COALESCE((SELECT  COUNT(*)   FROM nurses_vs_compliances   WHERE nurses_vs_compliances.deleted = '0' AND     
                nurses_vs_compliances.status != 'Terminated' AND nurses_vs_compliances.status != 'Renewed' AND
                 (nurses_vs_compliances.expiration_date <= curdate()   )), '') AS expired, ";


    $return .= " COALESCE((SELECT  COUNT(*)   FROM nurses_vs_compliances   WHERE nurses_vs_compliances.deleted = '0' AND     
                nurses_vs_compliances.status != 'Terminated' AND nurses_vs_compliances.status != 'Renewed' AND 
                (nurses_vs_compliances.expiration_date <= curdate() + INTERVAL 7 DAY)), '') AS exp7, ";

    $return .= " COALESCE((SELECT  COUNT(*)   FROM nurses_vs_compliances   WHERE nurses_vs_compliances.deleted = '0' AND     
                nurses_vs_compliances.status != 'Terminated' AND nurses_vs_compliances.status != 'Renewed' AND 
                ( nurses_vs_compliances.expiration_date <= curdate() + INTERVAL 15 DAY)), '') AS exp15, ";

    $return .= " COALESCE((SELECT  COUNT(*)   FROM nurses_vs_compliances   WHERE nurses_vs_compliances.deleted = '0' AND     
                nurses_vs_compliances.status != 'Terminated' AND nurses_vs_compliances.status != 'Renewed' AND 
                ( nurses_vs_compliances.expiration_date <= curdate() + INTERVAL 30 DAY)), '') AS exp30, ";

    $return .= " COALESCE((SELECT  COUNT(*)   FROM nurses_vs_compliances   WHERE nurses_vs_compliances.deleted = '0' AND     
                nurses_vs_compliances.status != 'Terminated' AND nurses_vs_compliances.status != 'Renewed' AND 
                ( nurses_vs_compliances.expiration_date <= curdate() + INTERVAL 60 DAY)), '') AS exp60 ";

    
   return $return;
}









    ?>
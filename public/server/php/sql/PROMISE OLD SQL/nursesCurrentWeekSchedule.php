


<?php
ini_set("date.timezone", "America/New_York");


require "../auth/user.php";
require "../auth/checkAuth.php";
//$_POST["entity"] = "services";
$REQUESTED_ACTION = "readOnly"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite, THIS FILE WILL DOES SELECTS TO DATABASE, SO IT'S A  "readOnly" 
//require "../auth/checkAuthorization.php";
require "../sqlFunctions/filtersFunctions.php";
require "../sqlFunctions/returnObject.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP


//GETTTING LAST PAYROLL ID
//GETTTING LAST PAYROLL ID
//GETTTING LAST PAYROLL ID




//$lastPayroll = getLastPayroll($CON);
$thisMonday =  date( date("Y-m-d"), strtotime( 'monday this week' ) );
$thisSunday = date( date("Y-m-d"), strtotime( 'sunday this week' ) );
//$NURSE_ID = $_SESSION["user"]->userId;
$NURSE_ID = $_SESSION["user"]->userId;
//echo date("Y/m/d");
//echo $_SESSION["user"]->userId."------------";

$sql = "SELECT  services.id AS clock_id, 
CONCAT(AES_DECRYPT(UNHEX(patients.__name ), 'uValKP2n94W8200cq'), ' ', AES_DECRYPT(UNHEX(patients.__last_name ), 'uValKP2n94W8200cq')) AS patient, 
patients.code AS patientId, services.is24hr AS is24hr, services.N_status AS status, 
CONCAT(DATE_FORMAT(services.N_start_date, '%Y/%m/%d'), ' ',TIME_FORMAT(services.N_start_time, '%H:%i:%s')) AS  start,
CONCAT(DATE_FORMAT(services.N_end_date, '%Y/%m/%d'), ' ',TIME_FORMAT(services.N_end_time, '%H:%i:%s')) AS  end,


GROUP_CONCAT(DISTINCT CONCAT(DATE_FORMAT(services_vs_status.N_date, '%Y/%m/%d'),' ',TIME_FORMAT(services_vs_status.N_time,'%H:%i:%s')),
    'T^2)(|YDS))', services_vs_status.N_status, 'T^2)(|YDS))', services_vs_status.N_notes, 'T^2)(|YDS))', services_vs_status.id
  ORDER BY services_vs_status.id ASC  SEPARATOR '!-@2ZZgT10')
 AS  statusHistory,

 


    services.N_address AS address,
    CONCAT(services.N_city, ' ',services.N_state, ', ', services.N_zip) AS address2,

GROUP_CONCAT(DISTINCT services_vs_tasks.id, 'T^2)(|YDS))', services_vs_tasks.N_name, 'T^2)(|YDS))', services_vs_tasks.N_input_helper, 
    'T^2)(|YDS))', services_vs_tasks.N_data_type, 'T^2)(|YDS))', services_vs_tasks.N_value, 'T^2)(|YDS))', services_vs_tasks.N_time, 'T^2)(|YDS))', services_vs_tasks.N_descr, 
    'T^2)(|YDS))', services_vs_tasks.N_mandatory, 'T^2)(|YDS))', services_vs_tasks.N_reportSheet, 'T^2)(|YDS))', services_vs_tasks.taskGroupName
  ORDER BY services_vs_tasks.N_time ASC  SEPARATOR '!-@2ZZgT10') AS  clockVsTasks,

   

  JSON_OBJECT('time', COALESCE(CONCAT(DATE_FORMAT(N_clock_in_time, '%Y/%m/%d'), ' ', TIME_FORMAT(N_clock_in_time, '%H:%i')),''), 'location', N_clock_in_location, 'coor', N_clock_in_coor,  'homeCommunity',  N_evv_clock_in_location ) AS punchIn,
  JSON_OBJECT('time', COALESCE(CONCAT(DATE_FORMAT(N_clock_out_time, '%Y/%m/%d'), ' ', TIME_FORMAT(N_clock_out_time, '%H:%i')),''),   'location',       N_clock_out_location, 
          'coor',           N_clock_out_coor,
          'earlyLate',      N_earlyLate, 
          'timeIncomplete', N_timeIncomplete, 
          'taskIncomplete', N_taskIncomplete, 
          'noGeo',          N_noGeo, 

          'checkLocation',  N_checkLocation, 
          'check24hIagree', N_check24hIagree,          
          'homeCommunity',  N_evv_clock_out_location,


          'patientSignature', N_patientSignature,
          'nurseSignature',   N_nurseSignature,
          'submitAgreement',  N_submitAgreement,
          'des',  N_clock_out_des
  
  
  ) AS punchOut,

  JSON_OBJECT('claces','undefined', 
        'icon',         'undefined',
        'label',         'undefined', 
        'action',        'undefined', 

        'punchBtnClass', 'undefined', 
        'punchBtnText',  'undefined', 

        'notify',        'undefined', 
        'notifyType',    'undefined') AS cardStatus,
        'false' AS pendingUpdate,
        COUNT(services_vs_tasks.id) AS tasks,
        COUNT(CASE  WHEN   services_vs_tasks.N_value != '' AND services_vs_tasks.N_value != 'false' THEN 1 ELSE null END) AS tasksCompleted 






FROM services
LEFT JOIN patients ON services.N_patient = patients.id
LEFT JOIN services_vs_status ON services.id = services_vs_status.servicesId  AND services_vs_status.deleted = '0'
LEFT JOIN services_vs_tasks ON  services.id = services_vs_tasks.servicesId  AND services_vs_tasks.deleted = '0'
LEFT JOIN  nurses_vs_agreements ON services.nurse_agreement_id =  nurses_vs_agreements.id AND  nurses_vs_agreements.deleted = '0'
WHERE services.deleted = '0'  AND  nurses_vs_agreements.nursesId = '$NURSE_ID' AND services.N_end_date >= '$thisMonday'  AND services.N_end_date <= '$thisSunday'  GROUP BY services.id   ";

//echo date( 'Y-m-d'); exit;


/*while($rs = $result->fetch_array(MYSQLI_ASSOC)){
    //if($rs["clock_id"] > 0){
      echo   $rs["clockVsTasks"];
   // }
}

//UPDATING SPECIFIC CLOCK FOR TESTING PURPOSES

UPDATE services SET N_start_date = '2022-07-09', N_start_time = '11:00:00',  N_end_date = '2022-07-09', N_end_time = '14:00:00' WHERE id = 204; 





CONCAT(GROUP_CONCAT(CONCAT(DATE_FORMAT(services_vs_status.N_date, '%m/%d/%y'),' ',TIME_FORMAT(services_vs_status.N_time,'%H:%i:%s')), 'T^2)(|YDS))',
    'status', services_vs_status.N_status, 'notes', services_vs_status.N_notes)
  ORDER BY services_vs_status.N_date, services_vs_status.N_time ASC  SEPARATOR '!-@2ZZg$10'))


 CONCAT('[',GROUP_CONCAT(JSON_OBJECT('id', services_vs_tasks.id, 'N_name', services_vs_tasks.N_name, 'N_input_helper', services_vs_tasks.N_input_helper, 
    'N_data_type', services_vs_tasks.N_data_type, 'N_value', services_vs_tasks.N_value, 'N_time', services_vs_tasks.N_time, 'N_descr', services_vs_tasks.N_descr, 
    'N_mandatory', services_vs_tasks.N_mandatory)
  ORDER BY services_vs_tasks.N_time ASC  SEPARATOR ','),']@*') AS  clockVsTasks








*/

//echo "<br>nurseID: ".$NURSE_ID.", PAYROLL: ".$payroll_id;
//echo  $selectAllRows;  exit;
writeToTestTxt($sql);
$result = mysqli_query($con,$sql); 
$fields = mysqli_fetch_fields($result);
//echo $sql; exit;
foreach($fields as $val){
  $colNames[] = $val->name; 
}

$l = sizeof($colNames);
$outp = "[";
$test = 0;
while($rs = $result->fetch_array(MYSQLI_ASSOC)) { //echo "<br> ".$rs["clock_id"]."&&&&&&&&<br>"; 
  if ($outp != "[") {$outp .= ",";} 
  
  $c = 0; 
  while($c < $l ){
    if($c == 0 ){
      $outp .= '{"'.$colNames[$c].'":"'       .$rs[$colNames[$c]].'"'; 
    }
    else{
      if($colNames[$c] == "statusHistory"){
        $array = explode('!-@2ZZgT10',$rs[$colNames[$c]]);
        $tr = "[";
       // if(sizeof($array) > 1){ 
          foreach ($array as $a) {
            $b = explode('T^2)(|YDS))',$a);
            //print_r( $a); echo "***<br>";
            if($tr == "[" && sizeof($b) > 1){
             // print_r( $b); echo "***<br>";
              $tr .= '{"id":'.json_encode($b[3]).',"time":'.json_encode($b[0]).', "status":'.json_encode($b[1]).',"N_notes":'.json_encode($b[2]).'}';  
              //print_r( $b); echo "***<br>";
            }
            elseif(sizeof($b) > 1)
              $tr .= ',{"id":'.json_encode($b[3]).',"time":'.json_encode($b[0]).', "status":'.json_encode($b[1]).',"N_notes":'.json_encode($b[2]).'}'; 
            //print_r($b); echo "--->SIZE:".sizeof($b)." |";
          }
          $outp .= ',"'.$colNames[$c].'":'          .$tr.']'; 
        //}
      }

      elseif($colNames[$c] == "clockVsTasks"){
        $array = explode('!-@2ZZgT10',$rs[$colNames[$c]]);
        $tr = "[";
        foreach ($array as $a) {
          $b = explode('T^2)(|YDS))',$a);
         // if(sizeof($b)>1){//TO AVOID UNDIFINED OFFSET FOR TASKS 
          if($tr == "[" && sizeof($b) > 1)            
             $tr .= '{"id":'.json_encode($b[0]).', "N_name":'.json_encode($b[1]).',"N_input_helper":'.json_encode($b[2]).',"N_data_type":'.json_encode($b[3]).',"N_value":'.json_encode($b[4]).',"N_time":'.json_encode($b[5]).',"N_descr":'.json_encode($b[6]).',"N_mandatory":'.json_encode($b[7]).',"N_category":'.json_encode($b[9]).',"N_subCategory":'.json_encode($b[9]).'}';  
          elseif(sizeof($b) > 1)
          $tr .= ',{"id":'.json_encode($b[0]).', "N_name":'.json_encode($b[1]).',"N_input_helper":'.json_encode($b[2]).',"N_data_type":'.json_encode($b[3]).',"N_value":'.json_encode($b[4]).',"N_time":'.json_encode($b[5]).',"N_descr":'.json_encode($b[6]).',"N_mandatory":'.json_encode($b[7]).',"N_category":'.json_encode($b[9]).',"N_subCategory":'.json_encode($b[9]).'}';
     // }
        }
        $outp .= ',"'.$colNames[$c].'":'          .$tr.']'; 
      }
      
      elseif($colNames[$c] == "tasks" || $colNames[$c] == "tasksCompleted"){
        $outp .= ',"'.$colNames[$c].'":'          .$rs[$colNames[$c]];     
      }
      elseif($colNames[$c] == "punchIn" || $colNames[$c] == "punchOut"  || $colNames[$c] == "cardStatus" ){
        $outp .= ',"'.$colNames[$c].'":'          .$rs[$colNames[$c]];     
      } 

    else      
      $outp .= ',"'.$colNames[$c].'":'          .json_encode($rs[$colNames[$c]]);   
        
    }
    $c++;
  }

 // echo $outp."@@@@@@@@@@@@@@@@@@ COUNTER:".$test." --- CLOCKID:".$rs["clock_id"]."<br><br>"; 
  $test++;
  $outp .= '}';
}
$outp .=']';
//echo $outp;





$mt = "[]";


echoReturnObject("ok", $outp, 0, $mt);
mysqli_free_result($result);
mysqli_close($con);
















function getLastPayroll($c){
  $sql="SELECT id FROM payrolls WHERE N_deleted = '0' ORDER BY id DESC LIMIT 1;";
  $result = mysqli_query($c,$sql);
  return $result->fetch_array(MYSQLI_ASSOC)['id'];	 
}

?>
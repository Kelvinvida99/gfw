<?php
require "../../../auth/user.php";
require "../../../auth/checkAuth.php";
$_POST['entity'] = "services";
$REQUESTED_ACTION = "readWrite"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite
require "../../../auth/checkAuthorization.php";
require "../../../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP
require "../../../sqlFunctions/returnObject.php";
//PENDING PENDIENTE CONFIRMAR K EL ID DE LA NURSE ES EL MISMO DE LA K ESTA LOGGUEADA
/**/


/*
$_POST["multiTables"] = '[
    {"tableName":"services_vs_status",
        "dataToUpdate":[{"id":"10","N_date":"2022/10/10","N_time":"10:10:53","N_status":"In Progress2"},
                        {"id":"11","N_date":"2022/11/11","N_time":"11:11:53","N_status":"TimeSheet2"}],
        "dataToInsert":[{"N_date":"2022/01/10","N_time":"16:16:53","N_status":"asx"}]
    },        
    {"tableName":"services_vs_tasks",
        "dataToUpdate":[{"id":"10","N_value":"asd222","N_time":"10:10:10"}],
        "dataToInsert":[]
    }
    
]';



$_POST["clock_id"] = 1;
$_POST["N_clock_in_coor"] = "1,2,3";
$_POST["N_clock_in_time"] = "2022/05/25 07:00:00";
$_POST["N_clock_in_location"] = "41 Roosevelt Dr, Wood-Ridge, NJ 07075, USA";
$_POST["N_evv_clock_in_location"] = "Home";
$_POST["N_clock_out_des"] = "una desc del clock";
$_POST["N_clock_out_coor"] = "3,2,1";
$_POST["N_clock_out_time"] = "2022/05/25 011:00:00";
$_POST["N_noGeo"] = "true";
$_POST["N_check24h"] = "false";
$_POST["N_clock_out_location"] = "41 Roosevelt Dr, Wood-Ridge, NJ 07075, USA 2";
$_POST["N_earlyLate"] = "late";
$_POST["N_checkLocation"] = "true";
$_POST["N_evv_clock_out_location"] = "Community";
$_POST["N_check24hIagree"] = "true";
$_POST["N_nurseSignature"] = "NURSEiqwdnfwefhnwefnvjcwoefcNURSE";
$_POST["N_taskIncomplete"] = "FALSE";
$_POST["N_timeIncomplete"] = "TRUE";
$_POST["N_patientSignature"] = "PATIENTUSDBHUFHBVPISDHFVWEFPATIENT";


*/















$entity            = "services"; 
$id                = mysqli_real_escape_string($con, $_POST["clock_id"]); 


$fields            = ["N_clock_in_coor","N_clock_in_time","N_clock_in_location","N_evv_clock_in_location",
"N_clock_out_des","N_clock_out_coor","N_clock_out_time","N_noGeo","N_check24h","N_clock_out_location",
"N_earlyLate","N_checkLocation","N_evv_clock_out_location","N_check24hIagree","N_nurseSignature","N_taskIncomplete",
"N_timeIncomplete","N_patientSignature"];

$values            = [ mysqli_real_escape_string($con, $_POST["N_clock_in_coor"]), mysqli_real_escape_string($con, $_POST["N_clock_in_time"]), 
mysqli_real_escape_string($con, $_POST["N_clock_in_location"]),mysqli_real_escape_string($con,  $_POST["N_evv_clock_in_location"]),
mysqli_real_escape_string($con, $_POST["N_clock_out_des"]), mysqli_real_escape_string($con, $_POST["N_clock_out_coor"]), 
mysqli_real_escape_string($con, $_POST["N_clock_out_time"]), mysqli_real_escape_string($con, $_POST["N_noGeo"]), 
mysqli_real_escape_string($con, $_POST["N_check24h"]), mysqli_real_escape_string($con, $_POST["N_clock_out_location"]),
mysqli_real_escape_string($con, $_POST["N_earlyLate"]), mysqli_real_escape_string($con, $_POST["N_checkLocation"]), 
mysqli_real_escape_string($con, $_POST["N_evv_clock_out_location"]), mysqli_real_escape_string($con, $_POST["N_check24hIagree"]),
mysqli_real_escape_string($con, $_POST["N_nurseSignature"]), mysqli_real_escape_string($con, $_POST["N_taskIncomplete"]),
mysqli_real_escape_string($con, $_POST["N_timeIncomplete"]), mysqli_real_escape_string($con, $_POST["N_patientSignature"])];


























$multiTables       = json_decode($_POST["multiTables"]);

//echo print_r($multiTables); exit;
//echo "lllll";



//'[{"tableName":"goku_vs_powers","dataToUpdate":[{"id":29,"powerId":1,"powerValue":"120xxxxxxxxxx"},{"id":30,"powerId":2,"powerValue":"95"},{"id":7,"powerId":3,"powerValue":"190"},{"id":8,"powerId":2,"powerValue":"110"}],"dataToInsert":[]}]'
/*
$entity            = "goku"; 
$id                = 1; 
$fields            = json_decode("[\"name\",\"last_name\",\"gender\",\"getAlert\",\"car\",\"department\",\"signature\",\"geo\"]");
$values            = json_decode("[\"Yeison\",\"Pena261\",\"female\",\"true\",\"Saab\",\"\\\"3\\\"\",\"\",\"\"]");
$multiTables       = json_decode('[{"tableName":"goku_vs_powers","dataToUpdate":[{"id":"114","au__goku_vs_powers_vs_power":"1,2,42","powerValue":"asx"},
    {"id":"115","au__goku_vs_powers_vs_power":"5,4,3","powerValue":"11500"},
    {"id":"116","au__goku_vs_powers_vs_power":"1,6,5","powerValue":"11600"}],
    "dataToInsert":[]},{"tableName":"goku_vs_countries","dataToUpdate":[{"id":"153","name":"asd","dateVisited":"2022-03-03","tropical":"","continent":"","race":"prieto"}],"dataToInsert":[]}]');






[{"tableName":"goku_vs_powers","dataToUpdate":[{"id":"114","au__goku_vs_powers_vs_power":"1,2,42","powerValue":"asx"},{"id":"115","au__goku_vs_powers_vs_power":"5,4,3","powerValue":"11500"},{"id":"116","au__goku_vs_powers_vs_power":"1,6,5","powerValue":"11600"}],"dataToInsert":[]},{"tableName":"goku_vs_countries","dataToUpdate":[{"id":"153","name":"asd","dateVisited":"2022-03-03","tropical":"","continent":"","race":"prieto"}],"dataToInsert":[]}]












$multiTables       = json_decode('[
    {
        "tableName": "goku_vs_countries", 
        "dataToInsert":[
            {"name":"Brasil","dateVisited":"2021-01-28"},
            {"name":"Peru","dateVisited":"2021-02-27"}      ],
 
        "dataToUpdate":[
            {"id":"7","name":"DR","dateVisited":"2021-06-28","deleted":"0"},
            {"id":"8","name":"PR","dateVisited":"2021-06-27","deleted":"0"}
        ]

    },
    {
        "tableName": "goku_vs_powers", 
        "dataToInsert":[ 
            {"au__goku_vs_powers_vs_power":"1,2,3","powerValue":"pv1-2 NEWXXX12"},
            {"au__goku_vs_powers_vs_power":"1,3,4","powerValue":"pv3-4 NEWXXXXX34"}
    ],
        "dataToUpdate":[

            {"id":"114","au__goku_vs_powers_vs_power":"1,2,3,38,39","powerValue":"pv1-2*XXXX","deleted":"0"},
            {"id":"115","au__goku_vs_powers_vs_power":"4,5","powerValue":"pv3-4*XXX","deleted":"0"}
        ]
    }


]');*/


/*


[{"tableName":"goku_vs_powers",
"dataToUpdate":[
{"id":"114","au__goku_vs_powers_vs_power":"\"1\",\"38\",\"3\",\"2\",\"39\"","powerValue":"pv1-2*XXXX"},
{"id":"115","au__goku_vs_powers_vs_power":"\"5\",\"4\"","powerValue":"pv3-4*XXX"},
{"id":"116","au__goku_vs_powers_vs_power":"\"2\",\"1\"","powerValue":"pv1-2 NEW12"},
{"id":"117","au__goku_vs_powers_vs_power":"\"4\",\"3\"","powerValue":"pv3-4 NEW34"},
{"id":"118","au__goku_vs_powers_vs_power":"\"1\",\"3\",\"2\"","powerValue":"pv1-2 NEWXXX12"},
{"id":"119","au__goku_vs_powers_vs_power":"\"1\",\"4\",\"3\"","powerValue":"pv3-4 NEWXXXXX34"},
{"id":"74","au__goku_vs_powers_vs_power":"0","powerValue":"WW2"},
{"id":"82","au__goku_vs_powers_vs_power":"0","powerValue":"9000"}],

"dataToInsert":[]}]




























{"au__goku_vs_powers_vs_power":"1,2","powerValue":"pv1-2"},
            {"au__goku_vs_powers_vs_power":"3,4","powerValue":"pv3-4"}


{"id":"7","au__goku_vs_powers_vs_power":"water88","powerValue":"190","deleted":"0"},
            {"id":"8","au__goku_vs_powers_vs_power":"fire44","powerValue":"110","deleted":"0"}
$entity            = "goku"; 
$id                = 1; 
$fields            = json_decode("[\"name\",\"last_name\",\"department\",\"signature\",\"geo\"]");
$values            = json_decode("[\"Yeison2667frr78\",\"Pena261\",\"3\",\"\",\"\"]");
$multiTables       = json_decode("[]");

[{

"tableName":"goku_vs_powers",
"dataToUpdate":[
{"id":29,"powerId":1,"powerValue":"120"},
{"id":7,"powerId":3,"powerValue":"190"},
{"id":8,"powerId":2,"powerValue":"110"}],
"dataToInsert":[]

}]



dataToInsert\":[{\"department\":\"7\",\"rate\":\"\",\"action_date\":\"\",\"rate_type\":\"\",\"tax_type\":\"\",\"action\":\"\"}]}]"



$entity            = "nurses"; 
$id                = 13; 
$fields            = json_decode("[\"__name\",\"__last_name\"]");
$values            = json_decode("[\"Yeison2667frr78\",\"Pena261\"]");
$multiTables       = json_decode('[{

"tableName":"nurses_vs_departments",
"dataToInsert":[

{"department":"7","rate":"3"}],
"dataToUpdate":[]

}]
');



[

 {entity:'services', id: '2', fields: ['name']. values:['kkk'], multiTables:[ {}]  },
 {entity:'services', id: '2', fields: ['name']. values:['kkk'], multiTables:[ clockVsTasks ]  }]



*/


//SQL QUERY TO UPDATE MAIN ENTITY ROW
$s =  "";
$autoCompleteUpdateQuery = [];
if($fields != []){
    foreach (array_combine($fields, $values) as $field => $value) {
        if(strpos($field,"__") !== false){//NOTE: IF FIELD STARTS WITH '__', MEANS ITS ENCRYPTED
            $s .=  mysqli_real_escape_string( $con,$field)." = HEX(AES_ENCRYPT('".mysqli_real_escape_string( $con,$value)."','".SQLSALT."')), ";
        }else{            
            $s .=  mysqli_real_escape_string( $con,$field)." = '".mysqli_real_escape_string( $con,$value)."', ";
        }        
    }
    $s = substr($s, 0, -2);
}
$mainUpdateSql[] = "UPDATE $entity SET $s WHERE id = '$id'";
//echo $mainUpdateSql[0]."<br>"; 
//SQL TO UPDATE & INSERT MULTI-TABLES ROWS RELATED TO CURRENT ENTITY
$update =  [];
$insert =  [];
$resetRows = [];
if($multiTables != []){
    foreach ($multiTables as $table) {
        //MARKING ALL RELATED ROWS AS "deleted"
        $resetRows[] = "UPDATE ".$table->tableName." SET deleted = '1' WHERE ".$entity."Id = '$id'; ";

        //FIXING THE TABLE FIELDS FOR INSERTS
        if($table->dataToInsert != []){
            $currentFieldsArray = array_keys(get_object_vars($table->dataToInsert[0]));
            $fieldsString = "";
            foreach ($currentFieldsArray as $f) {
                if(strpos($f,"au__") === FALSE){//IF ITS NOT AUTOCOMPLETE (AUTOCOMPLETE FIELDS DOESNT EXIST ON MAIN TABLES)

                    $fieldsString .= mysqli_real_escape_string($con,$f).", "; 
                    //echo "*******".$f."******";
                }
            }
            $fieldsString .= $entity."Id";//ADDING FOREIGN KEY FIELD
            //////////////////////////////////////

            //FIXING MULTIPLE ROWS VALUES TO BE INSERTED/////////
            $valuesString = "";
            foreach ($table->dataToInsert as $row) {
                $valuesString = "(";
                $autoCompleteInserQuery = [];
                $autoCompleteInserQuery[] = "main insert goes here";
                $autoCompleteInserQuery[] = "SET @gvpId = LAST_INSERT_ID();";
                foreach ($currentFieldsArray as $f) { 
                    
                    //IF ITS AN AUTO COMPLETE FIELD                   
                    if(strpos($f,"au__") !== false && $row->{$f} != ''){
                        //GETTING AUTOMCOMPLET IDS
                        //$autoIds = explode(',', $row->{$f});
                        $autoIds =  json_decode('['.$row->{$f}.']');
                       
                        foreach ($autoIds as $autoId){

                            $autoId = mysqli_real_escape_string($con,$autoId);
                            $fieldName = str_replace("au__".$table->tableName."_vs_","",$f);
                            
                            $autoCompleteInserQuery[] = "INSERT INTO ".mysqli_real_escape_string($con,$f)." (".mysqli_real_escape_string($con,$table->tableName)."Id,  $fieldName) VALUES (@gvpId,  $autoId);"; 
                           
                        }

                    }
                    
                    elseif(strpos($f,"__") !== false){
                        $valuesString .= " HEX(AES_ENCRYPT('".mysqli_real_escape_string( $con,$row->{$f})."','".SQLSALT."')), "; 
                    }
                    else{
                        $valuesString .= "'".mysqli_real_escape_string($con,$row->{$f})."', ";
                    }
                }

                $valuesString .= "'".$id."') ";//ADDING FOREIGN KEY VALUE, WHICH IS THE ID  
                $autoCompleteInserQuery[0] = "INSERT INTO ".mysqli_real_escape_string($con,$table->tableName)." ($fieldsString) VALUES $valuesString ;";
                $insert = array_merge($insert, $autoCompleteInserQuery);

                      
            }
            if($valuesString != ""){
                $valuesString = substr($valuesString, 0, -2); 
                //$insert[] = "INSERT INTO ".mysqli_real_escape_string($con,$table->tableName)." ($fieldsString) VALUES $valuesString ; ";
            }
        }
        //////////////////////////////////////
        //FIXING MULTPLE ROWS TO BE UPDATED
        //$autoCompleteUpdateQuery = [];
        foreach ($table->dataToUpdate as $row) {
            $s = "";
            $currentFields = array_keys(get_object_vars($row));
           
            //$autoCompleteUpdateQuery[] = "main insert goes here";
            //$autoCompleteUpdateQuery[] = "SET @gvpId = LAST_INSERT_ID()";


            if($row->id != "0"){             
                $s = " UPDATE ".mysqli_real_escape_string($con,$table->tableName)." SET ";

               
                foreach ($currentFields as $f){ 


                 

                    //IF ITS AN AUTO COMPLETE FIELD                   
                    if(strpos($f,"au__") !== false && $row->{$f} != ''){

                        $autoCompleteUpdateQuery[] = "DELETE FROM ".mysqli_real_escape_string($con,$f)." WHERE ".mysqli_real_escape_string($con,$table->tableName)."Id = '".mysqli_real_escape_string($con,$row->id)."';"; 
                        //GETTING AUTOMCOMPLET IDS
                        //$autoIds = explode(',', $row->{$f});
                        $autoIds =  json_decode('['.$row->{$f}.']');
                        foreach ($autoIds as $autoId){

                            $autoId = mysqli_real_escape_string($con,$autoId);
                            $fieldName = str_replace("au__".$table->tableName."_vs_","",$f);
                            
                            
                             
                             $autoCompleteUpdateQuery[] = "INSERT INTO ".mysqli_real_escape_string($con,$f)." (".mysqli_real_escape_string($con,$table->tableName)."Id,  $fieldName)
                             VALUES ('".mysqli_real_escape_string($con,$row->id)."',  $autoId);"; 
                           
                        }

                    }









                    elseif(strpos($f,"__") !== false){
                        $s .= mysqli_real_escape_string($con,$f)." = HEX(AES_ENCRYPT('".mysqli_real_escape_string( $con,$row->{$f})."','".SQLSALT."')), "; 
                    }
                    else{
                        $s .= mysqli_real_escape_string($con,$f)." = '".mysqli_real_escape_string($con,$row->{$f})."', ";
                    }
                } 
                $update[] =  $s." deleted = '0' WHERE id = '".mysqli_real_escape_string($con,$row->id)."'; ";           
            }    
        }
        //////////////////////////////////////
    }    
}

//echo implode("<br><br>",$autoCompleteUpdateQuery); exit;
//echo implode("<br><br>",$resetRows); 
//echo implode("<br><br>",$insert); 
//echo implode("<br><br>",$update); 
//echo implode("<br><br>",$mainUpdateSql); exit;

//exit;
//EXECUTING SQL QUERY TO INSERT AND/OR UPDATE
$allQueiresArray = array_merge($resetRows,$insert, $update, $autoCompleteUpdateQuery, $mainUpdateSql);
if($allQueiresArray != []){
    require "../../../sqlFunctions/sqlTransaction.php";
    if(!runQueries($allQueiresArray, $con)){
        echoReturnObject("MySqlError", mysqli_error($con));
        exit;
    }
}

//TRACKING USER ACTION
if(!$_SESSION["user"]->tracking("UPDATE",$entity,$id)){
    echoReturnObject("UserTrac", mysqli_error($con));
    exit;
}


//BUILDING AFTER UPDATE SQL STRING
//require "../../queries/nursesCurrentWeekSchedule.php";

//$lastPayroll = getLastPayroll($CON);
$thisMonday =  date( 'Y-m-d', strtotime( 'monday this week' ) );
$thisSunday = date( 'Y-m-d', strtotime( 'sunday this week' ) );
//$NURSE_ID = 8;//PENDING KITAR EL ID K ESTA FIJO
//echo date("Y/m/d");

$selectRow = "SELECT  services.id AS clock_id, 
CONCAT(AES_DECRYPT(UNHEX(patients.__name ), 'uValKP2n94W8200cq'), ' ', AES_DECRYPT(UNHEX(patients.__last_name ), 'uValKP2n94W8200cq')) AS patient, 
patients.code AS patientId, patients.is24hr AS is24hr, services.N_status AS status, 
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

  JSON_OBJECT('time', COALESCE(CONCAT(DATE_FORMAT(N_clock_in_time, '%Y/%m/%d'), ' ', TIME_FORMAT(N_clock_in_time, '%H:%i')),''), 'location', N_clock_in_location, 'coor', N_clock_in_coor, 'pendingUpdate',  'false', 'homeCommunity',  N_evv_clock_in_location ) AS punchIn,
  JSON_OBJECT('time', COALESCE(CONCAT(DATE_FORMAT(N_clock_out_time, '%Y/%m/%d'), ' ', TIME_FORMAT(N_clock_out_time, '%H:%i')),''),   'location',       N_clock_out_location, 
          'coor',           N_clock_out_coor,
          'earlyLate',      N_earlyLate, 
          'timeIncomplete', N_timeIncomplete, 
          'taskIncomplete', N_taskIncomplete, 
          'noGeo',          N_noGeo, 

          'checkLocation',  N_checkLocation, 
          'check24h',       N_check24h, 
          'check24hIagree', N_check24hIagree,
          'pendingUpdate',  'false',
          
          'homeCommunity',  N_evv_clock_out_location,


          'patientSignature', N_patientSignature,
          'nurseSignature',   N_nurseSignature,
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
        '' AS task, 
        '' AS tasksCompleted 






FROM services
LEFT JOIN patients ON services.N_patient = patients.id
LEFT JOIN services_vs_status ON services.id = services_vs_status.servicesId  AND services_vs_status.deleted = '0'
LEFT JOIN services_vs_tasks ON  services.id = services_vs_tasks.servicesId  AND services_vs_tasks.deleted = '0'
LEFT JOIN nurses_vs_departments ON services.nurses_vs_departments = nurses_vs_departments.id AND nurses_vs_departments.deleted = '0'
WHERE services.deleted = '0'  AND nurses_vs_departments.nursesId = '$NURSE_ID' AND services.N_end_date >= '$thisMonday'  AND services.N_end_date <= '$thisSunday'  GROUP BY services.id   ";






//EXECUTING SQL QUERY TO GET THE UPDATED ROW
if (!$result = mysqli_query($con, $selectRow)){
    echoReturnObject("MySqlError", mysqli_error($con));
    exit;
  }
  $rows = [];
  while($row = $result->fetch_assoc()) {
      $rows[] = $row;
  }



$mt = "[]";
if(isset($rows[0]["multiTables"])){
  $mt = $rows[0]["multiTables"];  
  unset($rows[0]["multiTables"]);
}  
echoReturnObject("ok", $rows, 0,$mt); 
mysqli_free_result($result);
mysqli_close($con);


//INSERT INTO goku_vs_powers (powerValue) VALUES (2121); SET @gvpId = LAST_INSERT_ID(); INSERT INTO au__goku_vs_powers_vs_power (goku_vs_powersId, powerId) VALUES (@gvpId, 1); INSERT INTO au__goku_vs_powers_vs_power (goku_vs_powersId, powerId) VALUES (@gvpId, 2);
?>
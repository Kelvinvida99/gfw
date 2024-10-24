<?php
require "../auth/user.php";
require "../auth/checkAuth.php";
//$_POST['entity'] = "goku";
$REQUESTED_ACTION = "readWrite"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite
require "../auth/checkAuthorization.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP
require "../sqlFunctions/returnObject.php";
/**/

$entity            = mysqli_real_escape_string($con, $_POST["entity"]); 
$id                = mysqli_real_escape_string($con, $_POST["id"]); 
$fields            = json_decode($_POST["fields"]);
$values            = json_decode($_POST["values"]); 
$multiTables       = json_decode($_POST["multiTables"]);



//'[{"tableName":"goku_vs_powers","dataToUpdate":[{"id":29,"powerId":1,"powerValue":"120xxxxxxxxxx"},{"id":30,"powerId":2,"powerValue":"95"},{"id":7,"powerId":3,"powerValue":"190"},{"id":8,"powerId":2,"powerValue":"110"}],"dataToInsert":[]}]'
/*
$entity            = "goku"; 
$id                = 1; 
$fields            = json_decode("[\"name\",\"last_name\",\"department\",\"signature\",\"geo\"]");
$values            = json_decode("[\"Yeison2667frr7\",\"Pena261\",\"3\",\"\",\"\"]");
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


]');




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
');*/


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
                        $autoIds = explode(',', $row->{$f});
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
        $autoCompleteUpdateQuery = [];
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
                        $autoIds = explode(',', $row->{$f});
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
/*echo implode("<br><br>",$resetRows); 
echo implode("<br><br>",$insert); 
echo implode("<br><br>",$update); 
echo implode("<br><br>",$mainUpdateSql.";"); */

//exit;
//EXECUTING SQL QUERY TO INSERT AND/OR UPDATE
$allQueiresArray = array_merge($resetRows,$insert, $update, $autoCompleteUpdateQuery, $mainUpdateSql);
if($allQueiresArray != []){
    require "../sqlFunctions/sqlTransaction.php";
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
require "../queries/".$entity.".php";


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
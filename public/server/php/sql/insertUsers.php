<?php
require "../auth/user.php";
require "../auth/checkAuth.php";
$_POST["entity"] = "users";
$REQUESTED_ACTION = "readWrite"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite
require "../auth/checkAuthorization.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP
require "../sqlFunctions/returnObject.php";
/**/

$entity = "users";
$fields            = json_decode($_POST["fields"]);
$values            = json_decode($_POST["values"]); 
$multiTables       = json_decode($_POST["multiTables"]);
/*echo '{"r":"'.$values[0].'"}'; exit;
echoReturnObject("fields:".$_POST["fields"], array()); 
exit;*/


//ONLY FOR TESTING, REMOVE OR COMMENT THE CODE BELOW 
//ONLY FOR TESTING, REMOVE OR COMMENT THE CODE BELOW 
/*
$entity = "users";
$fields            = json_decode("[\"name\",\"username\",\"password\"]");
$values            = json_decode("[\"weqrtwertwert\",\"twertwert\",\"wertwertwert\"]");
$multiTables       = json_decode("[]");
$multiTables       = json_decode('[
    {
        "tableName": "users_vs_permissions", 
        "dataToInsert":[
            {"entity":"users","privilegeDB":"2021-01-28"},
            {"entity":"users","privilegeDB":"2021-02-27"}
    ],
        "dataToUpdate":[]
    }
]');

*/







//$multiTables       = json_decode('[{"tableName":"goku_vs_powers","dataToUpdate":[],"dataToInsert":[]}]');









//ONLY FOR TESTING, REMOVE OR COMMENT THE CODE ABOVE 
//ONLY FOR TESTING, REMOVE OR COMMENT THE CODE ABOVE 



//BUILDING SQL STRING FOR INSERT
$sql = "INSERT INTO $entity ( deleted )  VALUES ( '0' );";
//EXECUTING SQL QUERY TO GET ROWS
 if (!mysqli_query($con, $sql)){    
    echoReturnObject("MySQL Error", mysqli_error($con)); 
    exit;  
  }
  else{
    $id = mysqli_insert_id($con); 
  }
  
//SQL QUERY TO UPDATE MAIN ENTITY ROW
$s =  "";
if($fields != []){
    foreach (array_combine($fields, $values) as $field => $value) {
        if($field == "__password"){

            if($value != "" && $value != "UserHasPassword1!"){

                //CHECK PASSWORD REQUIREMENT
                if(!$_SESSION["user"]->passwordRequirement($value)){
                    echoReturnObject("MyPassReq",array(), 0,"[]");  
                    exit;
                }else{//UPDATE PASS ON CONTROL DATABASE

                        $username = $values[array_search("username", $fields)];                   
                        $active = $values[array_search("active", $fields)];                   
                        $name = $values[array_search("name", $fields)];
                                           
                   /* if(!$_SESSION["user"]->addGosiveControlUser($username, $value, $id, $_SESSION["user"]->companyID,$active)){
                        echoReturnObject("GosCtrlError",array(), 0,"[]");  
                        exit;
                    }*/
                }

                $s .=  mysqli_real_escape_string( $con,$field)." = HEX(AES_ENCRYPT('".mysqli_real_escape_string( $con,$value)."','".SQLSALT."')), ";
            }
            //else DO NOTHING, IF PASSWORD == "" OR PASSWORD == "UserHasPassword1!"  MEANS NOT NEED TO EDIT

        }
        elseif(strpos($field,"__") !== false){//NOTE: IF FIELD STARTS WITH '__', MEANS ITS ENCRYPTED
            $s .=  mysqli_real_escape_string( $con,$field)." = HEX(AES_ENCRYPT('".mysqli_real_escape_string( $con,$value)."','".SQLSALT."')), ";
        }        
        else{            
            $s .=  mysqli_real_escape_string( $con,$field)." = '".mysqli_real_escape_string( $con,$value)."', ";
        }        
    }
    $s = substr($s, 0, -2);
}
$mainUpdateSql[] = "UPDATE $entity SET $s WHERE id = '$id'";
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
                $fieldsString .= mysqli_real_escape_string($con,$f).", ";
            }
            $fieldsString .= $entity."Id";//ADDING FOREIGN KEY FIELD
            //////////////////////////////////////

            //FIXING MULTIPLE ROWS VALUES TO BE INSERTED/////////
            $valuesString = "";
            foreach ($table->dataToInsert as $row) {
                $valuesString .= "(";
                foreach ($currentFieldsArray as $f) {                   
                    if(strpos($f,"__") !== false){
                        $valuesString .= " HEX(AES_ENCRYPT('".mysqli_real_escape_string( $con,$row->{$f})."','".SQLSALT."')), "; 
                    }
                    else{
                        $valuesString .= "'".mysqli_real_escape_string($con,$row->{$f})."', ";
                    }
                }
                $valuesString .= "'".$id."'), ";//ADDING FOREIGN KEY VALUE, WHICH IS THE ID        
            }
            if($valuesString != ""){
                $valuesString = substr($valuesString, 0, -2); 
                $insert[] = "INSERT INTO ".mysqli_real_escape_string($con,$table->tableName)." ($fieldsString) VALUES $valuesString ; ";
            }
        }
        //////////////////////////////////////
        //FIXING MULTPLE ROWS TO BE UPDATED
        foreach ($table->dataToUpdate as $row) {
            $s = "";
            $currentFields = array_keys(get_object_vars($row));
            if($row->id != "0"){             
                $s = " UPDATE ".mysqli_real_escape_string($con,$table->tableName)." SET ";
                foreach ($currentFields as $f){ 
                    if(strpos($f,"__") !== false){
                        $s .= mysqli_real_escape_string($con,$f)." = HEX(AES_ENCRYPT('".mysqli_real_escape_string( $con,$row->{$f})."','".SQLSALT."')), "; 
                    }
                    else{
                        $s .= mysqli_real_escape_string($con,$f)." = '".mysqli_real_escape_string($con,$row->{$f})."', ";
                    }
                } 
                $update[] = substr($s, 0, -2)." WHERE id = '".mysqli_real_escape_string($con,$row->id)."'; ";           
            }    
        }
        //////////////////////////////////////
    }    
}
//echo implode("--",$update); exit;
//EXECUTING SQL QUERY TO INSERT AND/OR UPDATE
$allQueiresArray = array_merge($resetRows,$insert, $update, $mainUpdateSql);
writeToTestTxt(implode(" ",$allQueiresArray));
//exit;
if($allQueiresArray != []){
    require "../sqlFunctions/sqlTransaction.php";
    if(!runQueries($allQueiresArray, $con)){
        echoReturnObject("MySqlError");
        exit;
    }
}

//TRACKING USER ACTION
if(!$_SESSION["user"]->tracking("INSERT",$entity,$id)){
    echoReturnObject("UserTrac");
    exit;
}


//BUILDING AFTER UPDATE SQL STRING
require "../queries/".$entity.".php";


//EXECUTING SQL QUERY TO GET THE UPDATED ROW
if (!$result = mysqli_query($con, $selectRow)){
    echoReturnObject("MySqlError");
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

?>
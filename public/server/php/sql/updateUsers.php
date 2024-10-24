<?php
require "../auth/user.php";
require "../auth/checkAuth.php";
$REQUESTED_ACTION = "readWrite"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite
$_POST["entity"] = "users";//ONLY FOR TESTING
require "../auth/checkAuthorization.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP
require "../sqlFunctions/returnObject.php";


$entity            = "users"; 




$id                = mysqli_real_escape_string($con, $_POST["id"]); 
$fields            = json_decode($_POST["fields"]);
$values            = json_decode($_POST["values"]); 
$multiTables       = json_decode($_POST["multiTables"]);


/*
$id                = 36; 
$fields            = json_decode("[\"name\",\"active\",\"username\",\"__password\"]");
$values            = json_decode("[\"gosive4\",\"true\",\"gosive\",\"Hola1232\"]");
// $multiTables       = json_decode('[{"tableName":"users_vs_permissions","dataToUpdate":[{"id":"10","entity":"goku","privilegeDB":"readOnly","privilegeFile":"none","notes":""}],"dataToInsert":[]}]');
$multiTables       = json_decode('[{"tableName":"users_vs_permissions","dataToUpdate":[],
"dataToInsert":[
{"id":"","entity":"homestaff","privilegeDB":"none","privilegeFile":"none","notes":""},
{"id":"","entity":"goku","privilegeDB":"none","privilegeFile":"none","notes":""},
{"id":"","entity":"powers","privilegeDB":"none","privilegeFile":"none","notes":""},
{"id":"","entity":"monitor","privilegeDB":"none","privilegeFile":"none","notes":""},
{"id":"","entity":"users","privilegeDB":"none","privilegeFile":"none","notes":""} ]

}]');
*/


/*
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

*/






//SQL QUERY TO UPDATE MAIN ENTITY ROW
$s =  "";
if($fields != []){
    foreach (array_combine($fields, $values) as $field => $value) {
        if($field == "__password"){

            if($value != "" && $value != "UserHasPassword1!"){//Poner condicion para password policy like, if()

                //CHECK PASSWORD REQUIREMENT
                if(!$_SESSION["user"]->passwordRequirement($value)){
                    echoReturnObject("MyPassReq",array(), 0,"[]");  
                    exit;
                }else{//UPDATE PASS ON CONTROL DATABASE
                    /*if(!$_SESSION["user"]->changeGosiveControlPasswordOtherUser($value, $id, $_SESSION["user"]->companyID)){
                        echoReturnObject("GosCtrlError",array(), 0,"[]");  
                        exit;
                    }*/
                }

                $s .=  mysqli_real_escape_string( $con,$field)." = HEX(AES_ENCRYPT('".mysqli_real_escape_string( $con,$value)."','".SQLSALT."')), ";
            }
            //else DO NOTHING, IF PASSWORD == "" OR PASSWORD == "UserHasPassword1!"  MEANS NOT NEED TO EDIT

        }elseif($field == "username"){

            //username cannot be edited, so do nothing
            
        }elseif($field == "active"){//USERS GOSIVE CONTROL STATUS

          /*  if(!$_SESSION["user"]->changeGosiveControlStatus($value, $id, $_SESSION["user"]->companyID)){
                echoReturnObject("GosCtrlError2",array(), 0,"[]");  
                exit;
            }*/

            $s .=  mysqli_real_escape_string( $con,$field)." = '".mysqli_real_escape_string( $con,$value)."', ";
            
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

//writeToTestTxt($s); exit;
$mainUpdateSql[] = "UPDATE $entity SET $s WHERE id = '$id'";
//echo $mainUpdateSql[0]; exit;
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
                $update[] =  $s." deleted = '0' WHERE id = '".mysqli_real_escape_string($con,$row->id)."'; ";           
            }    
        }
        //////////////////////////////////////
    }    
}
//echo implode("--",$update); exit;
//EXECUTING SQL QUERY TO INSERT AND/OR UPDATE
$allQueiresArray = array_merge($resetRows,$insert, $update, $mainUpdateSql);
//writeToTestTxt(implode(" ",$allQueiresArray)); exit;


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

?>
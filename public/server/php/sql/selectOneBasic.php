<?php
require "../auth/user.php";
require "../auth/checkAuth.php";
//$_POST["entity"] = "servicesreport"; //uncomment this line for testing
$REQUESTED_ACTION = "readOnly"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readWrite, THIS FILE WILL DOES SELECTS TO DATABASE, SO IT'S A  "readOnly" 
require "../auth/checkAuthorization.php";
require "../sqlFunctions/returnObject.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP
/*
*/


$id            = mysqli_real_escape_string($con, $_POST["id"]); 
$entity        = mysqli_real_escape_string($con, $_POST["entity"]); 




/*




$entity = "servicesreport";  
$id     = "80"; 


*/








//BUILDING ALL ROWS SQL STRING
require "../queries/".$entity.".php";

//writeToTestTxt($selectRow);
//echo $selectRow; exit;
//EXECUTING SQL QUERY TO GET ROWS
//mysqli_query($con, "SET @@sql_mode = 'NO_BACKSLASH_ESCAPES';");
 if (!$result = mysqli_query($con, $selectRow)){
    echoReturnObject("MySqlError");
    exit;
  }
  $rows = [];
  while($row = $result->fetch_assoc()) {
      $rows[] = $row;
     // print_r($row);
  }
  $mt = "[]";
if(isset($rows[0]["multiTables"])){
  $mt = $rows[0]["multiTables"];  
  unset($rows[0]["multiTables"]);
}

//GETTING ELEMENT FILES
require "../files/getFilesFunc.php";
$file = getFiles($entity, $id, "");


//writeToTestTxt(json_encode($rows));


echoReturnObject("ok", $rows, 0, $mt, $file);
mysqli_free_result($result);
mysqli_close($con);






?>
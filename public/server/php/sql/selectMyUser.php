<?php
require "../auth/user.php";
require "../auth/checkAuth.php";
$_POST["entity"] = "users";
require "../sqlFunctions/returnObject.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP 



/**/

$id            = $_SESSION["user"]->userId;
$entity        = "users"; 
if($_SESSION["user"]->typeApp == "nurse"){
  $entity        = "nurses"; 
}




/*
$entity = "users";  
$id     = "36"; 
*/

//BUILDING ALL ROWS SQL STRING
require "../queries/".$entity.".php";
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
//require "../files/getFilesFunc.php";
//$file = getFiles($entity, $id, "");



echoReturnObject("ok", $rows, 0, $mt);
mysqli_free_result($result);
mysqli_close($con);

?>
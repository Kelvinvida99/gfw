<?php
header('Content-Type: application/json');
require "../auth/user.php";
require "../auth/checkAuth.php";
//$_POST["entity"] = "goku";//delete this line, it's just for testing
//each php file must have this variable, posible values are filesreadonly and fileswrite
$REQUESTED_ACTION = "filesReadOnly";
require "../auth/checkAuthorizationFiles.php";
require "../sqlFunctions/startDB.php";
require "../sqlFunctions/filtersFunctions.php";
require "../sqlFunctions/returnObject.php";

$entity   = mysqli_real_escape_string($con, $_POST["entity"]);
$entityId = mysqli_real_escape_string($con, $_POST["entityId"]);

//building all rows sql string, each entity must have its own query
$selectAllRows = "SELECT id, 
                  currentPath, 
                  fileName AS name,  
                  uniqueFolder, DATE_FORMAT( deleted_date, '%m/%d/%y %h:%i %p') 
                  AS deletedDate 
                  FROM deleted_files 
                  WHERE deleted_files.deleted = '0' 
                  AND deleted_files.entity = '$entity' 
                  AND deleted_files.entityId = '$entityId'
                  ORDER BY deleted_files.id DESC;";

//executing sql query to get rows
if (!$result = mysqli_query($con, $selectAllRows)){
  echoReturnObject("MySqlError");
  exit;
}

$rows = [];
$path = '../../storage/'.$_SESSION["user"]->dbName.'/deleted_files/';
while($row = $result->fetch_assoc()) {

  $row["folder"]    = json_encode(is_dir($path.$row["uniqueFolder"].'/'.$row["name"]));
  $rows[]           = $row;
}

echoReturnObject("ok", array(),0, "[]", $rows);
mysqli_free_result($result);
mysqli_close($con);
<?php
require "../auth/user.php";
require "../auth/checkAuth.php";
//COMMENT LINE BELOW, JUST FOR TESTING
//COMMENT LINE BELOW, JUST FOR TESTING
$_POST["entity"] = "customer";
$_POST["report"] = "ar-one";
////////////////////////////////////
////////////////////////////////////
$REQUESTED_ACTION = "readOnly"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite, THIS FILE WILL DOES SELECTS TO DATABASE, SO IT'S A  "readOnly" 
require "../auth/checkAuthorization.php";
require "../sqlFunctions/filtersFunctions.php";
require "../sqlFunctions/returnObject.php";
require "../sqlFunctions/executeSelect.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP



//INCLUDING THE REPORT QUERY
$entity        =  preg_replace('/[^a-zA-Z-]/', '', $_POST["entity"]);
$report        =  preg_replace('/[^a-zA-Z-]/', '', $_POST["report"]);


require "../queries/report/".$entity."/".$report.".php";



  
###############################################################
###############################################################
##############################################################

//EXECUTING SQL QUERY TO GET ROWS
$result = executeSelectQuery($con, $queryReport);

$rows = [];
while($row = $result->fetch_assoc()) {
  $rows[] = $row;
}

$availableRowsWithFilters = 0;
$entityCharts = '{}';

 

 

echoReturnObject("ok", $rows, $availableRowsWithFilters, "[]", array(), $entityCharts);
mysqli_free_result($result);
mysqli_close($con);

  







?>
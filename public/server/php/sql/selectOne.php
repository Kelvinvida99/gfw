<?php
require "../auth/user.php";
require "../auth/checkAuth.php";
//$_POST["entity"] = "purchase"; //uncomment this line for testing
$REQUESTED_ACTION = "readOnly"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readWrite, THIS FILE WILL DOES SELECTS TO DATABASE, SO IT'S A  "readOnly" 
require "../auth/checkAuthorization.php";
require "../sqlFunctions/returnObject.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP
require "../sqlFunctions/executeUpdate.php";
require "../sqlFunctions/executeSelect.php";
/*
*/


$id            = mysqli_real_escape_string($con, $_POST["id"]); 
$entity        = mysqli_real_escape_string($con, $_POST["entity"]); 
$ENTITY_RESTRICTION = new stdClass();
$ENTITY_RESTRICTION->val = "ok";
$ENTITY_RESTRICTION->restrictedFields = "[]";
$ENTITY_RESTRICTION->info = "[]";



/*




$entity = "servicesreport";  
$id     = "80"; 


*/








//BUILDING ALL ROWS SQL STRING
require "../queries/".$entity.".php";

writeToTestTxt($selectRow);
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

$entitychanges = "[]";
if(isset($rows[0]["entitychanges"])){
  $entitychanges = $rows[0]["entitychanges"];  
  unset($rows[0]["entitychanges"]);
}

//GETTING ELEMENT FILES
require "../files/getFilesFunc.php";
$file = getFiles($entity, $id, "");


//writeToTestTxt(json_encode($rows));


  ///CHECKING IF THERE IS AN BEFORE_UPDATE QUERY OR FUNCTION TO ALLOW THE UPDATE
  /* */if(file_exists("../queries/selectOneRestriction/".$entity.".php")){
  //writeToTestTxt($id);
      require "../queries/selectOneRestriction/".$entity.".php";

  }else{
      //JUST CONTINUE
  }

/*
echoReturnObject("ok", $rows, 0, $mt, $file);
mysqli_free_result($result);
mysqli_close($con);*/


















$paramObj = new stdClass();
$paramObj->errorVal = "ok";
$paramObj->data = $rows;
$paramObj->availableRowsWithFilters = 0;
$paramObj->multiTables = $mt;
$paramObj->entitychanges = $entitychanges;
$paramObj->file = $file;
$paramObj->charts = "[]";
$paramObj->restriction = $ENTITY_RESTRICTION;

echoReturnObjectImproved($paramObj);
mysqli_free_result($result);
mysqli_close($con);



?>
<?php
require "../auth/user.php";
require "../auth/checkAuth.php";
//$_POST["entity"] = "sale";//DELETE THIS LINE, IT'S JUST FOR TESTING
$REQUESTED_ACTION = "readWrite"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite
require "../auth/checkAuthorization.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP
require "../sqlFunctions/returnObject.php";
require "../sqlFunctions/executeDelete.php";
require "../sqlFunctions/executeSelect.php";



$entity            = mysqli_real_escape_string($con, $_POST["entity"]); 
$ids                = json_decode($_POST["ids"]); 
/*
$entity            = "sale"; 
$ids                = json_decode('["22","21"]');  */
$ENTITY_RESTRICTION = new stdClass();
$ENTITY_RESTRICTION->val = "ok";
$ENTITY_RESTRICTION->restrictedFields = "[]";
$ENTITY_RESTRICTION->info = "[]";


// $entity            = "goku"; 
// $ids                = json_decode('["155"]');  









    ///CHECKING IF THERE IS AN BEFORE_UPDATE QUERY OR FUNCTION TO ALLOW THE UPDATE
   /* */if(file_exists("../queries/beforeDelete/".$entity.".php")){
   
        require "../queries/beforeDelete/".$entity.".php";

    }else{
       //JUST CONTINUE
    }








//SCAPING ID's TO BE DELETED
$idsToDelete = "";
foreach($ids as $id){
    $idsToDelete .= mysqli_real_escape_string($con, $id).", ";
    deleteElementFiles($entity, $id);
}
$idsToDelete = substr($idsToDelete, 0, -2);


$sql = " UPDATE ".mysqli_real_escape_string($con, $entity)." SET deleted = '1' WHERE id IN ($idsToDelete)";

//EXECUTING SQL QUERY TO MARK ROWS AS DELETED AND RETURNING OBJ
$result = executeDeleteQuery($con, $sql);

if ($result != false) {
  //TRACKING USER ACTION
  if(!$_SESSION["user"]->tracking("DELETE",$entity,$idsToDelete)){
    echoReturnObject("UserTrac");
    exit;
  }

    $rows = [];
    $rows[0] = new stdClass();
    $rows[0]->qty = sizeof($ids);
    //echoReturnObject("ok",  $rows);



    $paramObj = new stdClass();
    $paramObj->errorVal = "ok";
    $paramObj->data = $rows;
    $paramObj->availableRowsWithFilters = 0;
    $paramObj->multiTables = "[]";
    $paramObj->file = [];
    $paramObj->charts = "[]";
    $paramObj->restriction = $ENTITY_RESTRICTION;

    echoReturnObjectImproved($paramObj);
    //mysqli_free_result($result);
   //mysqli_close($con);







}

// if (!mysqli_query($con, $sql)){
//     echoReturnObject("MySqlError");   
//   }
//   else{
//   //TRACKING USER ACTION
//   if(!$_SESSION["user"]->tracking("DELETE",$entity,$idsToDelete)){
//     echoReturnObject("UserTrac");
//     exit;
//   }

//     $rows = [];
//     $rows[0] = new stdClass();
//     $rows[0]->qty = sizeof($ids);
//     echoReturnObject("ok",  $rows);
//   }



// mysqli_close($con);

function deleteElementFiles($entity, $id){
  $currentYear = date("Y");
  $path = '../storage/'.$_SESSION["user"]->dbName.'/entities/'.$entity.'/'.$id;
  $deletePath = '../storageBackup/'.$_SESSION["user"]->dbName.'/deleted_files/'.$currentYear.'/wholeElementFiles';
  if (!is_dir($deletePath)){
      mkdir($deletePath, 0777, true);
  }

  if(file_exists($path)){
    if(rename ($path, $deletePath."/".$id)){  
      return 1;
    }
    return "error";
  }
  else{
    return "no files found";
  }
}

?>
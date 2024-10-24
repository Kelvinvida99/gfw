<?php
require "user.php";
require "checkAuth.php";
require "checkAdminAuthorization.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP
require "../sqlFunctions/returnObject.php";



$usersIds          = json_decode($_POST["usersIds"]); 
$reason            = mysqli_real_escape_string($con, $_POST["reason"]); 




/*
    $usersIds  = json_decode('["36","63"]');  
    $reason    = "App update";
*/




$queryVals = "";
foreach($usersIds  as $id){
  $queryVals .= "('".mysqli_real_escape_string( $con,$id)."'";
  $queryVals .= ",'".$_SESSION["user"]->userId."'";
  $queryVals .= ",'".$reason."'),";
}
$queryVals = substr($queryVals, 0, -1);


//BUILDING SQL STRING
$sql = "INSERT INTO users_forced_log_out ( usersId, external_usersId, reason)  VALUES $queryVals ;";
//EXECUTING SQL QUERY TO GET ROWS
 if (!mysqli_query($con, $sql)){    
    echoReturnObject("MySqlError");   
  }
  else{
    //TRACKING USER ACTION
    if(!$_SESSION["user"]->tracking("ForceOthersLogOut","users_forced_log_out",implode(",",$usersIds ))){
      echoReturnObject("UserTrac");
      exit;
    }    
  }
  mysqli_close($con);
  //echoReturnObject("ok", "Logout request has been sent for ".sizeof($usersIds)." users.");
  echoReturnObject("ok");
 


?>
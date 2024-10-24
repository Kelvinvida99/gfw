<?php
require "user.php";
require "checkAuth.php";
require "checkAdminAuthorization.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP
require "../sqlFunctions/returnObject.php";


/**/
$usersIds            = json_decode($_POST["usersIds"]); 
$status            = mysqli_real_escape_string($con, $_POST["status"]); //POSSIBLE VALUES ARE: true, false. true='unlocked', false='locked' 
$reason            = mysqli_real_escape_string($con, $_POST["reason"]); 





// $usersIds                = json_decode('["60"]');  
// $status = "false";//FALSE MEANS LOCKES
// $reason = "App update";



//SCAPING ID's TO BE DELETED
$idsToUpdate = "";
foreach($usersIds as $id){
    $idsToUpdate .= mysqli_real_escape_string($con, $id).", ";
}
$idsToUpdate = substr($idsToUpdate, 0, -2);



//BUILDING SQL STRING
$sql = "UPDATE users SET active = '$status' WHERE users.id IN ($idsToUpdate);";
//EXECUTING SQL QUERY TO GET ROWS


 if (!mysqli_query($con, $sql)){  
  

    echoReturnObject("MySqlError"); 
    exit;  
  }
  else{

   /// writeToTestTxt("44444");


    if(!gosiveControlLockUnlock($idsToUpdate,$status)){


      echoReturnObject("MySqlError"); 
      exit;  
    }




    //TRACKING USER ACTION
    if(!$_SESSION["user"]->tracking("LockingUnlockingUsers","users",implode(",",$usersIds ))){


      echoReturnObject("UserTrac");
      exit;
    }  
    
    


  }
  mysqli_close($con);
$mesg = "locked";
if($status == "true") $mesg = "unlocked";
//echoReturnObject("ok", "The ".sizeof($usersIds)." selected users have been $mesg successfully.");
echoReturnObject("ok");
 


function gosiveControlLockUnlock($ids,$status){
 

 

    $con = $_SESSION["user"]->initGosiveControlDBConn();
    if (!$con) {
        die('Could not connect: ' . mysqli_error($con));
        return "0";
    }


  


    $time = time();
    $sql = "UPDATE companies_users SET active = '".$status."' WHERE data_base = '".$_SESSION["user"]->companyID."' AND companies_users.usersId IN ($ids);";
 

    if (!mysqli_query($con,$sql)) { 
        $r = false; 
     }       
    else{
        $r = true;
    }
    mysqli_close($con);
    return $r;

}



?>
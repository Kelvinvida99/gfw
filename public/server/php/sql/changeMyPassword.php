<?php
require "../auth/user.php";
require "../auth/checkAuth.php";
$_POST["entity"] = "users";
require "../sqlFunctions/returnObject.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP

$entity            = "users"; 
$id                = $_SESSION["user"]->userId; 

//$newPassword            = mysqli_real_escape_string($con,$_POST["newPassword"]); 
//$oldPassword           = mysqli_real_escape_string($con, $_POST["oldPassword"]); 

$oldPassword           = mysqli_real_escape_string($con, "Hola123@"); 
$newPassword            = mysqli_real_escape_string($con,"Hola123"); 


require "changeMyPasswordFunc.php";
if(changeMyPassword($con, $newPassword, $oldPassword)){
   echoReturnObject("ok"); 
}


mysqli_close($con);

?>
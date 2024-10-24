<?php
require "../auth/user.php";
require "../auth/checkAuth.php";
$REQUESTED_ACTION = "readWrite"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite
$_POST["entity"] = "users";
require "../auth/checkAuthorization.php";
require "../sqlFunctions/returnObject.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP

$entity            = "users"; 
$id                = mysqli_real_escape_string($con, $_POST["id"]); 
$newPassword       = mysqli_real_escape_string($con, $_POST["newPassword"]); 

//$id                = mysqli_real_escape_string($con, 61); 
//$newPassword       = mysqli_real_escape_string($con, "Hola123@"); 


    
if(!$_SESSION["user"]->passwordRequirement($newPassword)){
    echoReturnObject("MyPassReq",array(), 0,"[]");  
    exit;
}
else{//UPDATE PASS ON CONTROL DATABASE
    if(!$_SESSION["user"]->changeGosiveControlPasswordOtherUser($newPassword, $id, $_SESSION["user"]->companyID)){
        echoReturnObject("GosCtrlError",array(), 0,"[]");  
        exit;
    }

    if(!$_SESSION["user"]->changeOtherUserPassword($id, $newPassword )){
        echoReturnObject("OtherUserPass",array(), 0,"[]");  
        exit;
    }
}


echoReturnObject("ok"); 
mysqli_close($con);

?>
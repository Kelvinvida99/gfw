<?php
require "../auth/user.php";
require "../auth/checkAuth.php";
$_POST["entity"] = "users";
$REQUESTED_ACTION = "readOnly"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite, THIS FILE WILL DOES SELECTS TO DATABASE, SO IT'S A  "readOnly" 
require "../auth/checkAuthorization.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP
require "../sqlFunctions/returnObject.php";

$username            = mysqli_real_escape_string($con, $_POST["username"]); 
//$username            = mysqli_real_escape_string($con, 'hellow');

$available = json_decode('{"available":"false", "desc":""}');
    //CHECK USERNAME REQUIREMENT
    if(!$_SESSION["user"]->usernameRequirement($username)){
        $available->desc = "MyUsernameReq";
        echoReturnObject("ok",array($available), 0,"[]");  
        exit;
    }

    //CHECK USERNAME AVAIALABILITY
    if($_SESSION["user"]->getUsernameAvailability($username) > 0){
        $available->desc = "UsernameUnavai";
        echoReturnObject("ok",array($available), 0,"[]");  
        exit;
    }

$available->available = "true";  
echoReturnObject("ok", array($available), 0,"[]");
mysqli_close($con);

?>
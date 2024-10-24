<?php


function changeMyPassword($con,$pass,$__oldPassword){
    $pass = mysqli_real_escape_string($con, $pass);
    $__oldPassword = mysqli_real_escape_string($con, $__oldPassword);
    
    
    if($_SESSION["user"]->arePasswordsSame($pass, $__oldPassword)){
        echoReturnObject("NotNewPass",array(), 0,"[]");  
        exit;
    }
    
    if(!$_SESSION["user"]->confirmCurrentPass($__oldPassword)){
        echoReturnObject("WrongCurrentPass",array(), 0,"[]");  
        exit;
    }
    
    if(!$_SESSION["user"]->passwordRequirement($pass)){
        echoReturnObject("MyPassReq",array(), 0,"[]");  
        exit;
    }
    
    if($_SESSION["user"]->changeMyPassword($pass)){
        return true;  
     }
     else{
        echoReturnObject("MyPassError",array(), 0,"[]");  
     }
}





?>
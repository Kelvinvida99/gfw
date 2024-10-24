<?php


require "../auth/user.php";
require "../auth/checkAuth.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP
require "../sqlFunctions/filtersFunctions.php";
require "../sqlFunctions/returnObject.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP 

$_SESSION["user"]->requestPermission = "ok";//AS ALL USERS SHOULD HAVE ACCESS TO THEIR OWN INFO


//OBJECT REQUESTED BY MIGUEL


$returnUser = [];
$returnUser[0] = new stdClass();
$returnUser[0]->id = $_SESSION["user"]->userId;
$returnUser[0]->name = $_SESSION["user"]->name;
$returnUser[0]->right = $_SESSION["user"]->privilege;
$returnUser[0]->avatar = $_SESSION["user"]->avatar;
$returnUser[0]->bg = $_SESSION["user"]->bg;
$returnUser[0]->language = $_SESSION["user"]->language;
$returnUser[0]->wsPort = $_SESSION["user"]->wsPort;
$returnUser[0]->company = $_SESSION["user"]->company;
$returnUser[0]->companyID = $_SESSION["user"]->companyID;
$returnUser[0]->timeZone = $_SESSION["user"]->timeZone;


$returnUser[0]->leftnav = $_SESSION["user"]->allowedEntities;


echoReturnObject("ok",$returnUser);
?>
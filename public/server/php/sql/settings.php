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
$returnUser[0]->appCancelByAppBefore = $_SESSION["user"]->appCancelByAppBefore;
//$returnUser[0]->aids_support_phone = $_SESSION["user"]->aids_support_phone;
$returnUser[0]->typeApp = $_SESSION["user"]->typeApp;

$returnUser[0]->leftnav = $_SESSION["user"]->allowedEntities;

$returnUser[0]->purchase_statement = $_SESSION["user"]->purchase_statement;
$returnUser[0]->purchase_footer = $_SESSION["user"]->purchase_footer;
$returnUser[0]->sale_statement = $_SESSION["user"]->sale_statement;
$returnUser[0]->sale_footer = $_SESSION["user"]->sale_footer;
$returnUser[0]->default_shelf_life = $_SESSION["user"]->default_shelf_life;
$returnUser[0]->alert_shelf_life = $_SESSION["user"]->alert_shelf_life;
$returnUser[0]->allow_to_sell_from_shipped = $_SESSION["user"]->allow_to_sell_from_shipped;
$returnUser[0]->allow_to_sell_from_ordered = $_SESSION["user"]->allow_to_sell_from_ordered;
$returnUser[0]->grace_period = $_SESSION["user"]->grace_period;



echoReturnObject("ok",$returnUser);
?>
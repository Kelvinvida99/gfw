<?php

require "user.php";
require "checkAuth.php";
$_POST["entity"] = "goku";//DELETE THIS LINE, IT'S JUST FOR TESTING
require "../sqlFunctions/returnObject.php";


$_SESSION["user"]->resetAllForcedLogOutRequest();
$_SESSION["user"]->logOff();
if($_SESSION["user"]->sessionStatus == "logged-out"){
    echoReturnObject2("ok");  
}
else{
    echoReturnObject("error");   
}

session_destroy();
session_unset();


function echoReturnObject2($errorVal = "", $data = [], $availableRowsWithFilters = 0){
    echo '{    
        "authentication":{"val":"ok"},
        "authorization":{"val":"ok"},
        "restriction":{"val":"ok","restrictedFields":[]},
        "error":{"val":"'.$errorVal.'"},
        "data":'.json_encode($data).',
        "availableRowsWithFilters":"'.$availableRowsWithFilters.'"
    }';
}


?>
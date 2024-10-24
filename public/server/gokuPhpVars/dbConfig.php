<?php

define("SQLSALT", "uValKP2n94W8200cq");
define("PHPSALT", '$5$rounds=6000$y30H73');
define("DBU", 'gokuUser');
define("DBP", 'G0ku@P0w3r');//JRdqtx8IrCzoK24

 function initGosiveControlDBConn(){ //THIS USER CAN ONLY READ THE TABLES (gosivecontrol.company_users, gosivecontrol.users_logs), CAN ONLY INSERT ON (users_logs)
    $host = "localhost";      
    $username = "loginUser";      
    $password = 'l0g1nTry$40';    
    $db =  "gosivecontrol";
    $conn = mysqli_connect($host,$username,$password,$db);
    if (!$conn) {
    die("mysqli_init failed");
    return false;
    } 
    else{
        return $conn;
    }   
}

// THE "dbUser"




?>
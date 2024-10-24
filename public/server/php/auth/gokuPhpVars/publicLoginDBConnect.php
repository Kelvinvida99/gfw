<?php




 function initLoginDBConn(){ 
    $host = "localhost";      
    $username = "loginUser";      
    $password = '7jM.P@bk.$uj72H';    
    $db =  "gokudb";
    $conn = mysqli_connect($host,$username,$password,$db);
    if (!$conn) {
    die("mysqli_init failed");
    return false;
    } 
    else{
        return $conn;
    }   
}
function initDataDBConn(){ 
    $host = "localhost";      
    $username = "SystemUser";      
    $password = 'M@Tod9#X-Zj7.2r4';    
    $db =  "goku";
    $conn = mysqli_connect($host,$username,$password,$db);
    if (!$conn) {
        die("mysqli_init failed");
        return false;
    } 
    else{
        return $conn;
    }   
}



?>
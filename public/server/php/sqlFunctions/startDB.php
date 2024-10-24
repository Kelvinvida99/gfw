<?php
$con = $_SESSION["user"]->initCompanyDBConn();
if (!$con) {//IF FAILED, RETURN OBJ AND DO NOTHING ELSE
    die('Could not connect: ' . mysqli_error($con));
    echo  '{    
        "authentication":{"val":"'.$_SESSION["user"]->sessionStatus.'"},
        "error":{"val":"mysqlError"},
        "data":[],
        "availableRowsWithFilters":""
    }';
    exit;
}

?>
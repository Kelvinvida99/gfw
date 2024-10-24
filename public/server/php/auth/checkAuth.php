<?php
//THIS A PIECE OF CODE TO ALLOW OR BLOCK ACCESS TO A PHP CODE BELOW THIS CODE
//require "user.php";
$returnObj = '';
if(isset($_SESSION["user"])){
    if($_SESSION["user"]->isAuthtenticated() != "ok"){
        $returnObj = '{    
            "authentication":{"val":"'.$_SESSION["user"]->sessionStatus.'"},
            "authorization":{"val":"NA"},
            "error":{"val":""},
            "data":[],
            "availableRowsWithFilters":""
        }';
    } 
}else{
    $returnObj = '{    
        "authentication":{"val":"login"},
        "authorization":{"val":""},
        "error":{"val":""},
        "data":[],
        "availableRowsWithFilters":""
    }';
}

if($returnObj != ''){//IF NOT EMPTY, RETURN OBJ AND DO NOTHING ELSE BCUZ AUTHENTICATION FAILED 
    echo $returnObj;
    exit;
}



?>
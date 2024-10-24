<?php
//THIS A PIECE OF CODE TO ALLOW OR BLOCK ACCESS TO A PHP CODE BELOW THIS CODE
$returnObj = '';
if(isset($_SESSION["user"])){
    if(!$_SESSION["user"]->isAdminAuthorized()){
        $returnObj = '{    
            "authentication":{"val":"'.$_SESSION["user"]->sessionStatus.'"},
            "authorization":{"val":"'.$_SESSION["user"]->requestPermission.'"},
            "restriction":{"val":"ok","restrictedFields":[]},
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
        "restriction":{"val":"ok","restrictedFields":[]},
        "data":[],
        "availableRowsWithFilters":""
    }';
}

if($returnObj != ''){//IF NOT EMPTY, RETURN OBJ AND DO NOTHING ELSE BCUZ AUTHENTICATION FAILED 
    echo $returnObj;
    exit;
}


?>
<?php



$returnObj = '';
if(isset($_SESSION["user"])){  
    if(isset($_POST["entity"])){
        if(!$_SESSION["user"]->isAuthorizedFiles($_POST["entity"], $REQUESTED_ACTION)){//IF USER IS NOT AUTHORIZED
            $returnObj = '{    
                "authentication":{"val":"'.$_SESSION["user"]->sessionStatus.'"},
                "authorization":{"val":"'.$_SESSION["user"]->requestPermissionFiles.'"},
                "error":{"val":""},
                "data":[],
                "availableRowsWithFilters":""
            }'; 
        }
    }else{//IF ENTITY VARIABLE WAS NOT POSTED
        $returnObj = '{    
            "authentication":{"val":"'.$_SESSION["user"]->sessionStatus.'"},
            "authorization":{"val":"NA"},
            "error":{"val":""},
            "data":[],
            "availableRowsWithFilters":""
        }';   
    }
}else{//IF USER SESSION DOES NOT EXIST
    $returnObj = '{    
        "authentication":{"val":"login"},
        "authorization":{"val":""},
        "error":{"val":""},
        "data":[],
        "availableRowsWithFilters":""
    }';
}

if($returnObj != ''){//IF NOT EMPTY, RETURN OBJ AND DO NOTHING ELSE BCUZ AUTHORIZATION HAVE FAILED 
    echo $returnObj;
    exit;
}

?>
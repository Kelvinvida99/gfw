<?php



$returnObj = '';
if(isset($_SESSION["user"])){  
    if(isset($_POST["entity"])){
        if(!$_SESSION["user"]->isAuthorized($_POST["entity"], $REQUESTED_ACTION)){//IF USER IS NOT AUTHORIZED
            $returnObj = '{    
                "authentication":{"val":"'.$_SESSION["user"]->sessionStatus.'"},
                "authorization":{"val":"'.$_SESSION["user"]->requestPermission.'"},
                "restriction":{"val":"ok","restrictedFields":[]},
                "error":{"val":"ok","msg":""},
                "data":[],
                "availableRowsWithFilters":""
            }'; 
        }
    }else{//IF ENTITY VARIABLE WAS NOT POSTED
        $returnObj = '{    
            "authentication":{"val":"'.$_SESSION["user"]->sessionStatus.'"},
            "authorization":{"val":"NA"},
            "restriction":{"val":"ok","restrictedFields":[]},
            "error":{"val":"ok","msg":""},
            "data":[],
            "availableRowsWithFilters":""
        }';   
    }
}else{//IF USER SESSION DOES NOT EXIST
    $returnObj = '{    
        "authentication":{"val":"login"},
        "authorization":{"val":""},
        "error":{"val":"ok","msg":""},
        "restriction":{"val":"ok","restrictedFields":[]},
        "data":[],
        "availableRowsWithFilters":""
    }';
}

if($returnObj != ''){//IF NOT EMPTY, RETURN OBJ AND DO NOTHING ELSE BCUZ AUTHORIZATION HAVE FAILED 
    echo $returnObj;
    exit;
}

?>
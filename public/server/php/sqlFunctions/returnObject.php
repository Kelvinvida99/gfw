<?php
//error_reporting(0);
//ini_set('display_errors', 0);
function echoReturnObject($errorVal = "", $data = [], $availableRowsWithFilters = 0,  $multiTables = "[]", $file = [], $charts = "[]", $entityRestriction='ok',  
                          $restrictedFields = "[]", $entitychanges = "[]"){
     $result = '{    
        "authentication":{"val":"'.$_SESSION["user"]->sessionStatus.'"},
        "authorization":{"val":"'.$_SESSION["user"]->requestPermission.'"},
        "error":{"val":"'.$errorVal.'"},
        "restriction":{"val":"'.$entityRestriction.'","restrictedFields":'.json_encode($restrictedFields).'},
        "data":'.json_encode($data).',
        "availableRowsWithFilters":"'.$availableRowsWithFilters.'",
        "charts":'.$charts.',
        "multiTables":'.$multiTables.',
        "entitychanges":'.$entitychanges.',
        "file":'.json_encode($file).'
    }';
    //writeToTestTxt($result);

    echo $result;
}


function echoReturnObjectRestriction($errorVal = "", $data = [], $availableRowsWithFilters = 0,  $multiTables = "[]", $file = [], $charts = "[]", 
                                    $entityRestriction='ok', $restrictedFields = "[]",$entitychanges = "[]"){
    $result = '{    
       "authentication":{"val":"'.$_SESSION["user"]->sessionStatus.'"},
       "authorization":{"val":"'.$_SESSION["user"]->requestPermission.'"},
       "error":{"val":"'.$errorVal.'"},
       "restriction":{"val":"'.$entityRestriction.'","restrictedFields":'.json_encode($restrictedFields).'},
       "data":'.json_encode($data).',
       "availableRowsWithFilters":"'.$availableRowsWithFilters.'",
       "charts":'.$charts.',
       "multiTables":'.$multiTables.',
       "entitychanges":'.$entitychanges.',
       "file":'.json_encode($file).'
   }';
   //writeToTestTxt($result);

   echo $result;
}





function echoReturnObjectImproved($paramObj){
    
   /* $paramObj->errorVal;
    $paramObj->data;
    $paramObj->availableRowsWithFilters;
    $paramObj->multiTables;
    $paramObj->file;
    $paramObj->charts;
    $paramObj->retriction;*/
    
    
    
    
    $result = '{    
       "authentication":{"val":"'.$_SESSION["user"]->sessionStatus.'"},
       "authorization":{"val":"'.$_SESSION["user"]->requestPermission.'"},
       "error":{"val":"'.$paramObj->errorVal.'"},
       "restriction":{"val":"'.$paramObj->restriction->val.'","restrictedFields":'.json_encode($paramObj->restriction->restrictedFields).',"info":'.json_encode($paramObj->restriction->info).'},
       "data":'.json_encode($paramObj->data).',
       "availableRowsWithFilters":"'.$paramObj->availableRowsWithFilters.'",
       "charts":'.$paramObj->charts.',
       "multiTables":'.$paramObj->multiTables.',
       "entitychanges":'.$paramObj->entitychanges.',
       "file":'.json_encode($paramObj->file).'
   }';
   //writeToTestTxt($paramObj->result);

   echo $result;
}


function removeRestrictedFields($obj){


    foreach ($obj->fieldsToRemove as $f) {   

          $key = array_search($f, $obj->fields );
          if ($key !== false) {

              unset($obj->fields[$key]);
              unset($obj->values[$key]);
                
            }
        }


        foreach ($obj->multiTablesToRemove as $mt) {   

            $key = findIndexByPropertyValue($obj->multiTables, "tableName", $mt); 
            if ($key !== false) {
              
                unset($obj->multiTables[$key]);
                  
              }
          }


    $obj->fields = array_values($obj->fields);
    $obj->values = array_values($obj->values);
    $obj->multiTables = array_values($obj->multiTables);

    return $obj;

}


function findIndexByPropertyValue($array, $property, $value) {
    foreach ($array as $index => $item) {
        if ($item->{$property} == $value) {
            return $index;
        }
    }
    return false; // Return -1 if the value is not found
}

?> 
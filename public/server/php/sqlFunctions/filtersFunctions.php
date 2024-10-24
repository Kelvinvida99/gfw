<?php

//FILTER FOR TOP INPUT ON EACH ENTITY
//FILTER FOR TOP INPUT ON EACH ENTITY
//FILTER FOR TOP INPUT ON EACH ENTITY
function likeFilter($filterFields,$filterValues,$con){
    $s = " AND (";
    if($filterFields != []){
        foreach (array_combine($filterFields, $filterValues) as $field => $value) {
            if(strpos($field,"__") !== false){//NOTE FOR FILTERS: IF FIELD STARTS WITH '__', MEANS ITS ENCRYPTED
                //$s .= " CONVERT(AES_DECRYPT(".$field.",'".SQLSALT."') USING 'utf8') LIKE LOWER('%".mysqli_real_escape_string($con, $value)."%') OR ";
                $s .= " LOWER(CONVERT(AES_DECRYPT(UNHEX(".mysqli_real_escape_string( $con,$field)."),'".SQLSALT."') USING 'utf8' )) LIKE LOWER('%".mysqli_real_escape_string($con, $value)."%') OR ";

            }else{            
                $s .= mysqli_real_escape_string($con, $field)." LIKE LOWER('%".mysqli_real_escape_string($con, $value)."%') OR ";
            }        
          }
          if($s == " AND ("){
            $s = "";
          }
          else{
            $s = substr($s, 0, -3).")";
          }
    }
    if($s == " AND ("){
        return "";
    }
    return $s;
}

//AND FILTERS
//AND FILTERS
//AND FILTERS
function andFilter($filterFields,$filterValues,$con){
    $s = "";
    if($filterFields != []){
        foreach (array_combine($filterFields, $filterValues) as $field => $value) {
            if(strpos($field,"__") !== false){//NOTE FOR FILTERS: IF FIELD STARTS WITH '__', MEANS ITS ENCRYPTED
                //$s .= " AND CONVERT(AES_DECRYPT(".$field.",'".SQLSALT."') USING 'utf8') = '".mysqli_real_escape_string($con, $value)."' ";
                $s .= " AND LOWER(CONVERT(AES_DECRYPT(UNHEX(".mysqli_real_escape_string( $con,$field)."),'".SQLSALT."') USING 'utf8' )) = LOWER('".mysqli_real_escape_string($con, $value)."') ";
            }else{            
                $s .= " AND LOWER(".mysqli_real_escape_string($con, $field).") = LOWER('".mysqli_real_escape_string($con, $value)."') ";
            }        
        }
    }
    return $s;
}


?>


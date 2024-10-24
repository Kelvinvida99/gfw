<?php

$originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');

if($originFile == "select"){
    $selectAllRows = "SELECT id, zip, city, state FROM zipcode WHERE zipcode.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString."  ORDER BY $sortBy $sortDirection LIMIT $limit1, $limit2 ;";
    
    $allRowsCountSql = "SELECT  COUNT(*) AS rowsQty FROM zipcode WHERE zipcode.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString." ;";  
}

elseif($originFile == "autocomplete"){
    $autocompleteQuery = "SELECT id, CONCAT(city, ' ', state, ' ', zip) AS displayText FROM zipcode WHERE zipcode.deleted = '0' ".$mainFilter->readySqlString." 
     ORDER BY zip LIMIT 10 ;";
}

elseif($originFile == "update" || $originFile == "insert" || $originFile == "selectOne"){
    $selectRow = "SELECT id, zip, city, state  FROM zipcode WHERE zipcode.deleted = '0' AND zipcode.id = '$id' ;"; 
}



     



?>
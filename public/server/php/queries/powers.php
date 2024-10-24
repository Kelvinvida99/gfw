<?php

$originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');

if($originFile == "select"){
    $selectAllRows = "SELECT id, name, notes FROM powers WHERE powers.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString."  ORDER BY $sortBy $sortDirection LIMIT $limit1, $limit2 ;";
    
    $allRowsCountSql = "SELECT  COUNT(*) AS rowsQty FROM powers WHERE powers.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString." ;";  
}

elseif($originFile == "autocomplete"){
    $autocompleteQuery = "SELECT id, name AS displayText FROM powers, , '{}' AS otherField  WHERE powers.deleted = '0' ".$mainFilter->readySqlString." 
     ORDER BY name LIMIT 10 ;";
}

elseif($originFile == "update" || $originFile == "insert" || $originFile == "selectOne"){
    $selectRow = "SELECT id, name, notes  FROM powers WHERE powers.deleted = '0' AND powers.id = '$id' ;"; 
}



     



?>
<?php

    $originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');

    if($originFile == "select"){
        $selectAllRows = "SELECT  * FROM shipper WHERE shipper.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString."  ORDER BY $sortBy $sortDirection LIMIT $limit1, $limit2 ;";
        
        $allRowsCountSql = "SELECT  COUNT(*) AS rowsQty FROM shipper WHERE shipper.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString." ;";  
    }

    elseif($originFile == "autocomplete"){
        $autocompleteQuery = "SELECT id, id AS displayText FROM shipper WHERE shipper.deleted = '0' ".$mainFilter->readySqlString." 
        ORDER BY id LIMIT 10 ;";
    }

    elseif($originFile == "update" || $originFile == "insert" || $originFile == "selectOne"){
        $selectRow = "SELECT * FROM shipper WHERE shipper.deleted = '0' AND shipper.id = '$id' ;"; 
    }

?>
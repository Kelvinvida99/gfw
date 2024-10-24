<?php

    $originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');

    if($originFile == "select"){
        $selectAllRows = "SELECT  * FROM provider WHERE provider.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString."  ORDER BY $sortBy $sortDirection LIMIT $limit1, $limit2 ;";
        
        $allRowsCountSql = "SELECT  COUNT(*) AS rowsQty FROM provider WHERE provider.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString." ;";  
    }

    elseif($originFile == "autocomplete"){
        $autocompleteQuery = "SELECT id, avatar, CONCAT(code, ' - ', name) AS displayText, 
        JSON_OBJECT('bill_to_address', bill_to_address, 'bill_to_city', bill_to_city, 'bill_to_state', bill_to_state,
        'bill_to_zip', bill_to_zip, 'ship_to_address', ship_to_address, 'ship_to_city', ship_to_city, 'ship_to_state', ship_to_state,
        'ship_to_zip', ship_to_zip,'email', email) AS otherField FROM provider WHERE provider.deleted = '0' ".$mainFilter->readySqlString." 
        ORDER BY id LIMIT 10 ;";
    }

    elseif($originFile == "update" || $originFile == "insert" || $originFile == "selectOne"){
        $selectRow = "SELECT * FROM provider WHERE provider.deleted = '0' AND provider.id = '$id' ;"; 
    }

?>
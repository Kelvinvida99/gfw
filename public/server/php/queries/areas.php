<?php

    $originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');

    if($originFile == "select"){
        $selectAllRows = "SELECT  areas.* FROM areas WHERE areas.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString."  ORDER BY $sortBy $sortDirection LIMIT $limit1, $limit2 ;";
        
        $allRowsCountSql = "SELECT  COUNT(*) AS rowsQty FROM areas WHERE areas.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString." ;";  
    }

    elseif($originFile == "autocomplete"){
        $autocompleteQuery = "SELECT id, CONCAT(name)  AS displayText, '{}' AS otherField  FROM areas WHERE areas.deleted = '0' ".$mainFilter->readySqlString." 
        ORDER BY id LIMIT 10 ;";
    }

    elseif($originFile == "update" || $originFile == "insert" || $originFile == "selectOne"){
        $selectRow = "
        SELECT 
            id,
            name,
            bay,
            level,
            space,
            notes
        FROM areas 
        WHERE areas.deleted = '0' 
        AND areas.id = '$id' ;"; 
    }

?>
<?php

    $originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');

    if($originFile == "select"){
        $selectAllRows = "SELECT  
        id,
        code,
        name,
        brand, 
        origin_country, 
        notes,
        avatar,
        CONCAT(shelf_life) as shelf_life,
        CASE
        WHEN shelf_life > 0   THEN 'YES'
        ELSE 'NO'
        END AS shelf_life_check,
        temperature,
        CASE
        WHEN temperature = ''   THEN 'NO'
        ELSE 'YES'
        END AS temperature_check
        FROM item WHERE item.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString."  ORDER BY $sortBy $sortDirection LIMIT $limit1, $limit2 ;";
        
        $allRowsCountSql = "SELECT  COUNT(*) AS rowsQty FROM item WHERE item.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString." ;";  
    }

    elseif($originFile == "autocomplete"){
        $autocompleteQuery = "SELECT id, avatar, CONCAT( name, ' | ', brand) AS displayText FROM item WHERE item.deleted = '0' ".$mainFilter->readySqlString." 
        ORDER BY id LIMIT 10 ;";
    }

    elseif($originFile == "update" || $originFile == "insert" || $originFile == "selectOne"){
        $selectRow = "SELECT 
        id,
        code,
        name,
        brand, 
        origin_country, 
        notes,
        avatar,
        CONCAT(shelf_life) as shelf_life,
        CASE
        WHEN shelf_life > 0   THEN 'YES'
        ELSE 'NO'
        END AS shelf_life_check,
        temperature,
        CASE
        WHEN temperature = ''   THEN 'NO'
        ELSE 'YES'
        END AS temperature_check      
        FROM item WHERE item.deleted = '0' AND item.id = '$id' ;"; 
    }

?>
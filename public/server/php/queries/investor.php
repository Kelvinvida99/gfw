<?php

    $originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');

    if($originFile == "select"){
        $selectAllRows = "SELECT  
        id,code, 
        name, 
        contact, 
        address,
        city,
        state,
        zip,
        avatar,
        AES_DECRYPT(UNHEX(__tax_id), '".SQLSALT."') AS __tax_id, username,
        IFNULL(AES_DECRYPT(UNHEX(__password), '".SQLSALT."'), '') AS __password
        FROM investor 
        WHERE investor.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString."  
        ORDER BY $sortBy $sortDirection LIMIT $limit1, $limit2 ;";
        
        $allRowsCountSql = "SELECT  COUNT(*) AS rowsQty FROM investor WHERE investor.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString." ;";  
    }

    elseif($originFile == "autocomplete"){
        $autocompleteQuery = "SELECT id, avatar, name AS displayText, '{}' otherField FROM investor WHERE investor.deleted = '0' ".$mainFilter->readySqlString." 
        ORDER BY id LIMIT 10 ;";
    }

    elseif($originFile == "update" || $originFile == "insert" || $originFile == "selectOne"){
        $selectRow = "SELECT 
                      id,code, 
                      name, 
                      contact, 
                      address,  
                      city,
                      state,
                      zip,
                      avatar,
                      AES_DECRYPT(UNHEX(__tax_id), '".SQLSALT."') AS __tax_id, username,
                      IFNULL(AES_DECRYPT(UNHEX(__password), '".SQLSALT."'), '') AS __password, 
                      allow_phone_app
                      FROM investor WHERE investor.deleted = '0' AND investor.id = '$id' ;"; 
    }

?>
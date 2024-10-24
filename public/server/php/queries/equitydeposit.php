<?php

    $originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');

    if($originFile == "select"){
        $selectAllRows = "
        SELECT
        equitydeposit.id,
        equitydeposit.code,
        equitydeposit.user_id,
        CONCAT('$', equitydeposit.amount) AS equitydepositAmount,
        equitydeposit.date,
        equitydeposit.account_id,
        equitydeposit.reference_number,
        equitydeposit.notes,
        DATE_FORMAT(equitydeposit.date, '%m/%d/%Y') AS equitydepositDate, 
        accounts.name AS accountName,
        CONCAT( AES_DECRYPT(UNHEX(__name), '".SQLSALT."'), ' ', last_name) AS userName, 
        accounts.avatar AS accountAvatar,
        users.avatar AS userAvatar
        FROM equitydeposit
        LEFT JOIN accounts ON accounts.id =  equitydeposit.account_id
        LEFT JOIN users ON users.id =  equitydeposit.user_id
        WHERE equitydeposit.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString."  
        ORDER BY $sortBy $sortDirection 
        LIMIT $limit1, $limit2 ;";
        
        $allRowsCountSql = "
        SELECT  COUNT(*) AS rowsQty 
        FROM equitydeposit 
        LEFT JOIN accounts ON accounts.id = equitydeposit.account_id
        LEFT JOIN users ON users.id =  equitydeposit.user_id
        WHERE equitydeposit.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString." ;";  
    }

    elseif($originFile == "autocomplete"){
        $autocompleteQuery = "SELECT id, id AS displayText FROM equitydeposit WHERE equitydeposit.deleted = '0' ".$mainFilter->readySqlString." 
        ORDER BY id LIMIT 10 ;";
    }

    elseif($originFile == "update" || $originFile == "insert" || $originFile == "selectOne"){
        $selectRow = "
        SELECT
        equitydeposit.id,
        equitydeposit.code,
        CONCAT('[', JSON_OBJECT('id', CONCAT(equitydeposit.user_id), 'displayText', CONCAT( AES_DECRYPT(UNHEX(__name), '".SQLSALT."'), ' ', last_name)), ']') AS user_id, 
        equitydeposit.amount,
        CONCAT('$', equitydeposit.amount) AS equitydepositAmount,
        equitydeposit.date,
        CONCAT('[', JSON_OBJECT('id', CONCAT(equitydeposit.account_id), 'displayText', CONCAT(accounts.name)), ']') AS account_id, 
        equitydeposit.reference_number,
        equitydeposit.notes,
        DATE_FORMAT(equitydeposit.date, '%m/%d/%Y') AS equitydepositDate, 
        accounts.name AS accountName,
        CONCAT( AES_DECRYPT(UNHEX(__name), '".SQLSALT."'), ' ', last_name) AS userName, 
        accounts.avatar AS accountAvatar,
        users.avatar AS userAvatar
        FROM equitydeposit 
        LEFT JOIN accounts ON accounts.id = equitydeposit.account_id
        LEFT JOIN users ON users.id =  equitydeposit.user_id
        WHERE equitydeposit.deleted = '0' AND equitydeposit.id = '$id' GROUP BY equitydeposit.id;"; 
    }

?>
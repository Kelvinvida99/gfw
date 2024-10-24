<?php

    $originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');

    if($originFile == "select"){
        $selectAllRows = "
        SELECT
        employesspayment.id,
        employesspayment.code,
        employesspayment.employee,
        employesspayment.account_id,
        CONCAT('$', employesspayment.amount) AS employesspaymentAmount,
        employesspayment.date,
        employesspayment.reference_number,
        employesspayment.notes,
        DATE_FORMAT(employesspayment.date, '%m/%d/%Y') AS employesspaymentDate, 
        accounts.name AS accountName,
        CONCAT( AES_DECRYPT(UNHEX(__name), '".SQLSALT."'), ' ', last_name) AS userName, 
        accounts.avatar AS accountAvatar,
        users.avatar AS userAvatar
        FROM employesspayment
        LEFT JOIN accounts ON accounts.id =  employesspayment.account_id
        LEFT JOIN users ON users.id =  employesspayment.employee
        WHERE employesspayment.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString."  
        ORDER BY $sortBy $sortDirection 
        LIMIT $limit1, $limit2 ;";
        
        $allRowsCountSql = "
        SELECT  COUNT(*) AS rowsQty 
        FROM employesspayment 
        LEFT JOIN accounts ON accounts.id = employesspayment.account_id
        LEFT JOIN users ON users.id =  employesspayment.employee
        WHERE employesspayment.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString." ;";  
    }

    elseif($originFile == "autocomplete"){
        $autocompleteQuery = "SELECT id, id AS displayText FROM employesspayment WHERE employesspayment.deleted = '0' ".$mainFilter->readySqlString." 
        ORDER BY id LIMIT 10 ;";
    }

    elseif($originFile == "update" || $originFile == "insert" || $originFile == "selectOne"){
        $selectRow = "
        SELECT
        employesspayment.id,
        employesspayment.code,
        CONCAT('[', JSON_OBJECT('id', CONCAT(employesspayment.employee), 'displayText', CONCAT( AES_DECRYPT(UNHEX(__name), '".SQLSALT."'), ' ', last_name)), ']') AS employee, 
        CONCAT('[', JSON_OBJECT('id', CONCAT(employesspayment.account_id), 'displayText', CONCAT(accounts.name)), ']') AS account_id, 
        employesspayment.amount,
        CONCAT('$', employesspayment.amount) AS employesspaymentAmount,
        employesspayment.date,
        employesspayment.reference_number,
        employesspayment.notes,
        DATE_FORMAT(employesspayment.date, '%m/%d/%Y') AS employesspaymentDate, 
        accounts.name AS accountName,
        CONCAT( AES_DECRYPT(UNHEX(__name), '".SQLSALT."'), ' ', last_name) AS userName, 
        accounts.avatar AS accountAvatar,
        users.avatar AS userAvatar
        FROM employesspayment 
        LEFT JOIN accounts ON accounts.id = employesspayment.account_id
        LEFT JOIN users ON users.id =  employesspayment.employee
        WHERE employesspayment.deleted = '0' AND employesspayment.id = '$id' ;"; 
    }

?>
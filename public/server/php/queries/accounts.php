<?php

    $originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');

    if($originFile == "select"){
          
          $selectAllRows = "SELECT  accounts.*, CONCAT('$',FORMAT(accounts.balance,2)) as balance FROM accounts WHERE accounts.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString."  ORDER BY $sortBy $sortDirection LIMIT $limit1, $limit2 ;";
        
        $allRowsCountSql = "SELECT  COUNT(*) AS rowsQty FROM accounts WHERE accounts.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString." ;";  
    }

    elseif($originFile == "autocomplete"){
        $autocompleteQuery = "SELECT id, avatar, CONCAT(name, ' - ',  CONCAT('$',FORMAT(accounts.balance,2)) ) AS displayText, '{}' AS otherField  FROM accounts WHERE accounts.deleted = '0' ".$mainFilter->readySqlString." 
        ORDER BY id LIMIT 10 ;";
    }

    elseif($originFile == "update" || $originFile == "insert" || $originFile == "selectOne"){
        $selectRow = "
        SELECT 
            accounts.id,
            accounts.code,
            accounts.name,
            accounts.type,
            accounts.registered_date,
            accounts.description,
            accounts.avatar,
            CONCAT('$',FORMAT(accounts.balance,2)) as balance
        FROM accounts 
        WHERE accounts.deleted = '0' 
        AND accounts.id = '$id' ;"; 
    }

?>
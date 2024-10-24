<?php

    $originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');

    if($originFile == "select"){
        $selectAllRows = "SELECT  
        investordeposit.id,
        investordeposit.code, 
        investordeposit.investor_id,
        DATE_FORMAT(investordeposit.date, '%m/%d/%Y') as date_td,
        investordeposit.status,
        investordeposit.type,
        investordeposit.status,
        investordeposit.accounts_id,
        CONCAT('$',FORMAT(investordeposit.amount,2)) as amount_dt,
        investor.name as investor_name,
        accounts.name as accounts_name
        FROM investordeposit 
        INNER JOIN investor on investor.id = investordeposit.investor_id 
        INNER JOIN accounts on accounts.id  = investordeposit.accounts_id 
        WHERE investordeposit.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString."  
        ORDER BY $sortBy $sortDirection LIMIT $limit1, $limit2 ;";
        
        $allRowsCountSql = "SELECT  COUNT(*) AS rowsQty 
        FROM investordeposit 
        INNER JOIN investor on investor.id = investordeposit.investor_id 
        INNER JOIN accounts on accounts.id  = investordeposit.accounts_id 
        WHERE investordeposit.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString." ;";  
    }

    elseif($originFile == "autocomplete"){
        $autocompleteQuery = "SELECT id, id AS displayText FROM investordeposit WHERE investordeposit.deleted = '0' ".$mainFilter->readySqlString." 
        ORDER BY id LIMIT 10 ;";
    }

    elseif($originFile == "update" || $originFile == "insert" || $originFile == "selectOne"){
        $selectRow = "SELECT  
        investordeposit.id,
        investordeposit.code,
        CONCAT('[', JSON_OBJECT('id', CONCAT(investordeposit.investor_id), 'displayText',  CONCAT(investor.name)), ']') AS investor_id,
        investordeposit.date,
        DATE_FORMAT(investordeposit.date, '%m/%d/%Y') as date_td,
        investordeposit.status,
        investordeposit.type,
        investordeposit.status,
        CONCAT('[', JSON_OBJECT('id', CONCAT(investordeposit.accounts_id), 'displayText',  CONCAT(accounts.name)), ']') AS accounts_id,
        CONCAT(investordeposit.amount) as amount,
        CONCAT('$',FORMAT(investordeposit.amount,2)) as amount_dt,
        investor.name as investor_name,
        accounts.name as accounts_name
        FROM investordeposit 
        INNER JOIN investor on investor.id = investordeposit.investor_id 
        INNER JOIN accounts on accounts.id  = investordeposit.accounts_id 
        WHERE investordeposit.deleted = '0' AND investordeposit.id = '$id' ;"; 
    }


?>
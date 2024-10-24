<?php

    $originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');

    if($originFile == "select"){
        $selectAllRows = "SELECT
          otherexpense.id,
          otherexpense.code,
          otherexpense.provider_id,
          DATE_FORMAT(otherexpense.date, '%m/%d/%Y') as date_td,
          otherexpense.accounts_bank_id,
          otherexpense.accounts_expense_id,
          otherexpense.reference_number,
          CONCAT('$',FORMAT(otherexpense.amount,2)) as amount_dt,
          provider.name as provider_name,
          provider.avatar as provider_avatar,
          bank_account.name as accounts_bank_name,  -- Alias for clarity
          bank_account.avatar as accounts_bank_avatar,  -- Alias for clarity
          expense_account.name as accounts_expense_name,  -- Alias for clarity
          expense_account.avatar as accounts_expense_avatar  -- Alias for clarity
        FROM otherexpense
        INNER JOIN provider on provider.id = otherexpense.provider_id
        INNER JOIN accounts AS bank_account on bank_account.id = otherexpense.accounts_bank_id  -- Use bank_account alias
        INNER JOIN accounts AS expense_account on expense_account.id = otherexpense.accounts_expense_id  -- Use expense_account alias
        WHERE otherexpense.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString."
        ORDER BY $sortBy $sortDirection LIMIT $limit1, $limit2";

        $allRowsCountSql = "SELECT  COUNT(*) AS rowsQty 
        FROM otherexpense 
        INNER JOIN provider on provider.id = otherexpense.provider_id 
        INNER JOIN accounts AS bank_account on bank_account.id = otherexpense.accounts_bank_id  -- Use bank_account alias
        INNER JOIN accounts AS expense_account on expense_account.id = otherexpense.accounts_expense_id  -- Use expense_account alias
        WHERE otherexpense.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString." ;";  
    }

    elseif($originFile == "autocomplete"){
        $autocompleteQuery = "SELECT id, id AS displayText FROM otherexpense WHERE otherexpense.deleted = '0' ".$mainFilter->readySqlString." 
        ORDER BY id LIMIT 10 ;";
    }

    elseif($originFile == "update" || $originFile == "insert" || $originFile == "selectOne"){
        $selectRow = "SELECT  
        otherexpense.id,
        otherexpense.code,
        CONCAT('[', JSON_OBJECT('id', CONCAT(otherexpense.provider_id), 'displayText',  CONCAT(provider.name)), ']') AS provider_id,
        otherexpense.date,
        DATE_FORMAT(otherexpense.date, '%m/%d/%Y') as date_td,
        CONCAT('[', JSON_OBJECT('id', CONCAT(otherexpense.accounts_bank_id), 'displayText',  CONCAT(bank_account.name)), ']') AS accounts_bank_id,
        CONCAT('[', JSON_OBJECT('id', CONCAT(otherexpense.accounts_expense_id), 'displayText',  CONCAT(expense_account.name)), ']') AS accounts_expense_id,
        CONCAT(otherexpense.amount) as amount,
        CONCAT('$',FORMAT(otherexpense.amount,2)) as amount_dt,
        provider.name as provider_name,
        bank_account.name as accounts_bank_name,  -- Alias for clarity
        expense_account.name as accounts_expense_name,  -- Alias for clarity
        otherexpense.reference_number,
        otherexpense.notes
        FROM otherexpense 
        INNER JOIN provider on provider.id = otherexpense.provider_id 
        INNER JOIN accounts AS bank_account on bank_account.id = otherexpense.accounts_bank_id  -- Use bank_account alias
        INNER JOIN accounts AS expense_account on expense_account.id = otherexpense.accounts_expense_id  -- Use expense_account alias
        WHERE otherexpense.deleted = '0' AND otherexpense.id = '$id' ;"; 
    }


?>
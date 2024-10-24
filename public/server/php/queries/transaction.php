<?php

    $originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');

    if($originFile == "select"){
        $selectAllRows = "
        SELECT 
            transaction.*,
            CONCAT('$',FORMAT(transaction.amount,2)) as transactionAmount, 
            users.privilege as typeUser, 
            accounts.name as accountName, 
            accounts.avatar as accountAvatar,
            CASE 
                WHEN transaction.customer_id = 0 THEN '' 
                ELSE customer.avatar 
            END as customerAvatar,
            CASE 
                WHEN transaction.provider_id = 0 THEN '' 
                ELSE provider.avatar 
            END as providerAvatar
            FROM 
                transaction 
            INNER JOIN 
                users ON users.id = transaction.user_id
            INNER JOIN 
                accounts ON accounts.id = transaction.account
            LEFT JOIN 
                customer ON customer.id = transaction.customer_id
            LEFT JOIN 
                provider ON provider.id = transaction.provider_id
            WHERE 
                transaction.deleted = '0' 
                ".$mainFilter->readySqlString.$andFilter->readySqlString."  
            ORDER BY 
                $sortBy $sortDirection 
            LIMIT 
                $limit1, $limit2 ;
        ";
        
        $allRowsCountSql = "
            SELECT  COUNT(*) AS rowsQty 
            FROM transaction 
            INNER JOIN users ON users.id = transaction.user_id
            INNER JOIN accounts ON accounts.id = transaction.account
            LEFT JOIN customer ON customer.id = transaction.customer_id
            LEFT JOIN provider ON provider.id = transaction.provider_id
            WHERE transaction.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString." ;";  
    }

    elseif($originFile == "autocomplete"){
        // $autocompleteQuery = "SELECT id, avatar, CONCAT( name, ' | ', brand) AS displayText FROM transaction WHERE transaction.deleted = '0' ".$mainFilter->readySqlString." 
        // ORDER BY id LIMIT 10 ;";
    }

    elseif($originFile == "update" || $originFile == "insert" || $originFile == "selectOne"){
        // $selectRow = "SELECT 
        // id,
        // code,
        // name,
        // brand, 
        // origin_country, 
        // notes,
        // avatar,
        // CONCAT(shelf_life) as shelf_life,
        // CASE
        // WHEN shelf_life > 0   THEN 'YES'
        // ELSE 'NO'
        // END AS shelf_life_check,
        // temperature,
        // CASE
        // WHEN temperature = ''   THEN 'NO'
        // ELSE 'YES'
        // END AS temperature_check      
        // FROM transaction WHERE transaction.deleted = '0' AND transaction.id = '$id' ;"; 
    }

?>
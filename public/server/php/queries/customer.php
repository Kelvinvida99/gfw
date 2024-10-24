<?php

    $originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');

    if($originFile == "select"){
        $selectAllRows = "SELECT customer.* FROM customer WHERE customer.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString."  ORDER BY $sortBy $sortDirection LIMIT $limit1, $limit2 ;";
        
        $allRowsCountSql = "SELECT  COUNT(*) AS rowsQty FROM customer WHERE customer.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString." ;";  
    }

    elseif($originFile == "autocomplete"){
        $autocompleteQuery = "SELECT id, avatar, name AS displayText, 
        JSON_OBJECT('bill_to_address', bill_to_address, 'bill_to_apt', bill_to_apt, 'bill_to_city', bill_to_city, 'bill_to_state', bill_to_state,
        'bill_to_zip', bill_to_zip, 'ship_to_address', ship_to_address, 'ship_to_apt', ship_to_apt, 'ship_to_city', ship_to_city, 'ship_to_state', ship_to_state,
        'ship_to_zip', ship_to_zip, 'email', email) AS otherField 
        FROM customer 
        WHERE customer.deleted = '0' and customer.credit_hold !='true'  ".$mainFilter->readySqlString." 
        ORDER BY customer.date_edited DESC LIMIT 10 ;";
    }

    elseif($originFile == "update" || $originFile == "insert" || $originFile == "selectOne"){
        // $selectRow = "SELECT * FROM customer WHERE customer.deleted = '0' AND customer.id = '$id' ;"; 
        $selectRow = "
        SELECT 
            customer.id, 
            customer.code, 
            customer.name, 
            customer.contact, 
            customer.phone, 
            customer.other_phone, 
            customer.fax, 
            customer.email, 
            customer.bill_to_address, 
            customer.bill_to_apt, 
            customer.bill_to_city, 
            customer.bill_to_state, 
            customer.bill_to_zip, 
            customer.ship_to_address, 
            customer.ship_to_apt, 
            customer.ship_to_city, 
            customer.ship_to_state, 
            customer.ship_to_zip, 
            customer.credit_hold, 
            '' AS check_shipping_address, 

            customer.description, 
            customer.avatar 
        FROM customer 
        WHERE customer.deleted = '0' 
        AND customer.id = '$id' ;"; 


   
    }

?>
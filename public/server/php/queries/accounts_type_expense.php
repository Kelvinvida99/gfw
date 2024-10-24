<?php

    $originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');

    if($originFile == "autocomplete"){
        $autocompleteQuery = "SELECT id, avatar,CONCAT(name, ' - ',  CONCAT('$',FORMAT(accounts.balance,2)) )  AS displayText, '{}' AS otherField  FROM accounts WHERE accounts.deleted = '0'
                                and  accounts.type = 'expense'  ".$mainFilter->readySqlString." 
        ORDER BY id LIMIT 10 ;";
    }

?>
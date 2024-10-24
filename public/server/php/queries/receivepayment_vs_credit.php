<?php

// require "../auth/user.php";
// require "../auth/checkAuth.php";
// $_POST["entity"] = "sale";//COMMENT
// $REQUESTED_ACTION = "readOnly"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite, THIS FILE WILL DOES SELECTS TO DATABASE, SO IT'S A  "readOnly"
// require "../auth/checkAuthorization.php";
// require "../sqlFunctions/returnObject.php";
// require "../sqlFunctions/executeSelect.php";
// require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP

$originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');


if ($originFile == "autocomplete") {


    $andFilter = "";
    $index = array_search("sale.customer_id", $mainFilter->fields);
    if ($index !== false) {
        $andFilter = " and " . $mainFilter->fields[$index] . " = " . $mainFilter->values[$index];
    }

    // $index = array_search("total_qty", $mainFilter->fields);
    // $total_qty = 0;
    // if ($index !== false) {
    //     $total_qty = $mainFilter->values[$index];
    // }


    $autocompleteQuery = "SELECT  
        sale.id,
        '' AS avatar,  
         CONCAT(sale.code, ' - $', FORMAT(sale.credit_amount, 2) COLLATE utf8mb4_unicode_ci) AS displayText,
        JSON_OBJECT(
            'credit', sale.credit_amount, 
            'paid_amount', sale.paid_amount,  
            'spent_credit', sale.spent_credit
            
        ) AS otherField
        FROM sale 
        
        WHERE sale.deleted = '0' AND sale.payment_status = 'credited' 
         $andFilter " . $mainFilter->readySqlString . "
        ORDER BY sale.id
        LIMIT 25;";




}
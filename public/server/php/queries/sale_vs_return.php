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
    $index = array_search("sale.id", $mainFilter->fields);
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
        sale_vs_item.id,
        IFNULL(item.avatar,'') AS avatar,  
        CONCAT(item.name, ' - ', sale_vs_item.selling_type) AS displayText,
        JSON_OBJECT(
            'type', sale_vs_item.selling_type, 
            'po', sale.code,  
            'item_name', item.name, 
            'sale_vs_itemId', sale_vs_item.id, 
            'item_unit_cost', sale_vs_item.price, 
            'total', sale_vs_item.total,
            'qty', sale_vs_item.qty
        ) AS otherField
        FROM sale 
        INNER JOIN sale_vs_item ON sale_vs_item.saleId = sale.id
        LEFT JOIN purchase_vs_item ON sale_vs_item.purchase_vs_itemId = purchase_vs_item.id
        LEFT JOIN item ON purchase_vs_item.item_id = item.id 
        LEFT JOIN item_unit ON item_unit.id = sale_vs_item.selling_type
        WHERE sale.deleted = '0' 
        AND sale_vs_item.deleted = '0' $andFilter " . $mainFilter->readySqlString . "
        ORDER BY sale.id
        LIMIT 25;";




}
<?php

$originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');

if ($originFile == "autocomplete") {


    $andFilter = "";
    $index = array_search("purchase.id", $mainFilter->fields);
    if ($index !== false) {
        $andFilter = " and " . $mainFilter->fields[$index] . " = " . $mainFilter->values[$index];
    }

    // $index = array_search("total_qty", $mainFilter->fields);
    // $total_qty = 0;
    // if ($index !== false) {
    //     $total_qty = $mainFilter->values[$index]; 
    // }


    $autocompleteQuery = "SELECT  
        purchase_vs_item.id,
        IFNULL(item.avatar,'') AS avatar ,  
        CONCAT(item.name , ' - ', item_unit.name) AS displayText,
        JSON_OBJECT(
            'type', item_unit.name, 
            'po', purchase.code,  
            'item_name', item.name, 
            'purchase_vs_itemId', purchase_vs_item.id, 
            'unit_price', purchase_vs_item.unit_price, 
            'item_unit_cost', purchase_vs_item.unit_price + (IF(purchase_vs_item.qty != 0, (cogs_row_amount / purchase_vs_item.qty), '0.00')), 
            'selling_price', purchase_vs_item.selling_price , 
            'cogs_unit', IF(purchase_vs_item.qty != 0, (cogs_row_amount / purchase_vs_item.qty), '0.00')) 
        
        AS otherField 
        from purchase 
        INNER JOIN purchase_vs_item on purchase.id = purchase_vs_item.purchaseId
        LEFT JOIN item ON purchase_vs_item.item_id = item.id
        LEFT JOIN item_unit ON item_unit.id = purchase_vs_item.type_selling
        WHERE purchase.deleted = '0' and purchase_vs_item.deleted = '0'
        and (purchase_vs_item.qty- purchase_vs_item.sold_qty) >0  $andFilter " . $mainFilter->readySqlString . " 
        ORDER BY id LIMIT 25 ;";

}

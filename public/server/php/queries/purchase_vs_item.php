<?php

    $originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');


    if($originFile == "autocomplete"){

        $purchase_allow_to_sell = "'delivered'";

        if($_SESSION["user"]->allow_to_sell_from_ordered == "true"){
            $purchase_allow_to_sell  .= ",'ordered'";
        }
        if($_SESSION["user"]->allow_to_sell_from_shipped == "true"){
            $purchase_allow_to_sell .= ",'shipped'";
        }


        $autocompleteQuery = "SELECT  
        purchase_vs_item.id,
        IFNULL(item.avatar,'') AS avatar ,  
        CONCAT(purchase.code, ' - ', item.name , ' - ', item.brand ,' - ',item_unit.name, ' - ', ROUND((purchase_vs_item.qty- purchase_vs_item.sold_qty)), ' - ' , 
        COALESCE(DATE_FORMAT(delivered_date,'%M %e, %Y'), DATE_FORMAT(CURRENT_DATE(),'%M %e, %Y'))) AS displayText,
        
        JSON_OBJECT(
            'type', item_unit.name, 
            'po', purchase.code,  
            'item_name', item.name, 
            'item_unit_cost', purchase_vs_item.unit_price + (IF(purchase_vs_item.qty != 0, (cogs_row_amount / purchase_vs_item.qty), '0.00')), 
            'selling_price', purchase_vs_item.selling_price , 
            'cogs_unit', IF(purchase_vs_item.qty != 0, (cogs_row_amount / purchase_vs_item.qty), '0.00'), 
            'qty_available', ROUND((purchase_vs_item.qty- purchase_vs_item.sold_qty))) 
        
        AS otherField 
        from purchase 
        INNER JOIN purchase_vs_item on purchase.id = purchase_vs_item.purchaseId
        LEFT JOIN item ON purchase_vs_item.item_id = item.id
        LEFT JOIN item_unit ON item_unit.id = purchase_vs_item.type_selling
        WHERE purchase.deleted = '0' and purchase_vs_item.deleted = '0' AND  purchase.shipping IN ($purchase_allow_to_sell)
        and (purchase_vs_item.qty- purchase_vs_item.sold_qty) >0 ".$mainFilter->readySqlString." 
        ORDER BY id LIMIT 25 ;";
    }

  
?> 
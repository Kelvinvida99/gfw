<?php

    $originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');

    if($originFile == "select"){
        
        $orderby="";
        if (strpos($sortBy, 'date_edited') !== false) {
            $orderby = " date_edited DESC";
            $sortBy = "";
            $sortDirection = "";
        } else {
            $orderby  = "";
        }/**/
        
        $selectAllRows = "SELECT * FROM
        (SELECT 
        item.name as item_name,
        item.brand,
        item.code AS item_code,
        purchase_vs_item.id AS id,
        item.avatar,
        purchase.code AS code,
        provider.name as provider_name,
        provider.avatar as provider_avatar,
        CONCAT('$',FORMAT(purchase_vs_item.unit_price,2)) as unit_price,
        item_unit.name as item_unit_name,
        purchase.delivered_date as delivered_date,
        purchase.purchase_date,
        -- CONCAT(DATEDIFF(IFNULL(purchase.delivered_date,CURDATE()), CURDATE())) AS remaining_days,
        purchase.delivered_date AS remaining_days, 

        item.shelf_life,
        purchase.date_edited,
        purchase_vs_item.qty - purchase_vs_item.sold_qty as available,
        CONCAT('$',FORMAT(AVG(IFNULL(sale_vs_item.price,0)),2)) as avg_sold_price
        from item 
        INNER JOIN purchase_vs_item on purchase_vs_item.item_id=item.id AND purchase_vs_item.deleted = 0
        INNER JOIN purchase on purchase_vs_item.purchaseId= purchase.id AND purchase.deleted = 0
        INNER JOIN provider on purchase.provider_id = provider.id
        INNER JOIN item_unit on item_unit.id = purchase_vs_item.type_selling
        LEFT  JOIN sale_vs_item on purchase_vs_item.id = sale_vs_item.purchase_vs_itemId AND sale_vs_item.deleted=0
        Where item.deleted = 0 
        GROUP by 1,2,3,4,5,6,7,8,9,10,11,12,13,14) AS inventory
        WHERE inventory.available > 0  $mainFilter->readySqlString $andFilter->readySqlString
        ORDER BY $orderby $sortBy $sortDirection LIMIT $limit1, $limit2 
        ";


        $allRowsCountSql = "SELECT COUNT(*) AS rowsQty FROM
        (SELECT 
        item.name as item_name,
        item.brand,
        item.code AS item_code,
        item.avatar,
        purchase.code AS code,
        provider.name as provider_name,
        provider.avatar as provider_avatar,
        CONCAT('$',FORMAT(purchase_vs_item.unit_price,2)) as unit_price,
        item_unit.name as item_unit_name,
        IFNULL(purchase.delivered_date,CURDATE()) as delivered_date,
        purchase.purchase_date,
        CONCAT(DATEDIFF(IFNULL(purchase.delivered_date,CURDATE()), CURDATE())) AS remaining_days,
        item.shelf_life,
        purchase.date_edited,
        purchase_vs_item.qty - purchase_vs_item.sold_qty as available,
        CONCAT('$',FORMAT(AVG(IFNULL(sale_vs_item.price,0)),2)) as avg_sold_price
        from item 
        INNER JOIN purchase_vs_item on purchase_vs_item.item_id=item.id AND purchase_vs_item.deleted = 0
        INNER JOIN purchase on purchase_vs_item.purchaseId= purchase.id AND purchase.deleted = 0
        INNER JOIN provider on purchase.provider_id = provider.id
        INNER JOIN item_unit on item_unit.id = purchase_vs_item.type_selling
        LEFT  JOIN sale_vs_item on purchase_vs_item.id = sale_vs_item.purchase_vs_itemId AND sale_vs_item.deleted=0
        Where item.deleted = 0 
        GROUP by 1,2,3,4,5,6,7,8,9,10,11,12,13,14) AS inventory
        WHERE inventory.available > 0  $mainFilter->readySqlString $andFilter->readySqlString
        ";

        //$allRowsCountSql = "SELECT  COUNT(*) AS rowsQty FROM provider WHERE provider.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString." ;";  
    }

    elseif($originFile == "autocomplete"){
        // $autocompleteQuery = "SELECT id, avatar, CONCAT(code, ' - ', name) AS displayText, 
        // JSON_OBJECT('bill_to_address', bill_to_address, 'bill_to_city', bill_to_city, 'bill_to_state', bill_to_state,
        // 'bill_to_zip', bill_to_zip, 'ship_to_address', ship_to_address, 'ship_to_city', ship_to_city, 'ship_to_state', ship_to_state,
        // 'ship_to_zip', ship_to_zip,'email', email) AS otherField FROM provider WHERE provider.deleted = '0' ".$mainFilter->readySqlString." 
        // ORDER BY id LIMIT 10 ;";
    }

    elseif($originFile == "update" || $originFile == "insert" || $originFile == "selectOne"){
        // $selectRow = "SELECT * FROM provider WHERE provider.deleted = '0' AND provider.id = '$id' ;"; 
    }

?>
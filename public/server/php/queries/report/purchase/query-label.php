<?php
    $purchase_id = isset($_POST["purchase_id"]) ? $_POST["purchase_id"] : null;

    // Ahora puedes usar $purchase_id en tu consulta SQL para obtener los datos específicos del purchase.
    $reportQuery = "SELECT 
        a.*,
        company.company_name,
        company.bill_to_address as company_bill_to_address,
        company.bill_to_city as company_bill_to_city,
        company.bill_to_state as company_bill_to_state,
        company.phone as company_phone,
        company.email as company_email,
        company.fax as company_fax 
    From (
        SELECT 
            purchase.code, 
            purchase.provider_id, 
            purchase.purchase_date, 
            purchase.due_date, 
            purchase.provider_email,
            purchase.bill_to_address,
            purchase.bill_to_apt,
            purchase.bill_to_city,
            purchase.bill_to_state,
            purchase.bill_to_zip,
            purchase.ship_to_address,
            purchase.ship_to_apt,
            purchase.ship_to_city,
            purchase.ship_to_state,
            purchase.ship_to_zip,
            purchase.purchase_statement,
            purchase.purchase_footer,
            provider.name AS providerName,
            provider.phone AS providerPhone,
            provider.fax AS providerFax,   
            DATE_FORMAT(purchase.purchase_date, '%m/%d/%Y') AS purchaseDate, 
            CONCAT('$', FORMAT(purchase.general_total_price,2)) AS general_total_price,
            CONCAT(
        '[',
            
            '{',
                '\"tableName\":\"purchase_vs_item\"', 
                ',\"data\":[',
                                GROUP_CONCAT(
                                DISTINCT(
                                JSON_OBJECT(
                                    'id',CONCAT(purchase_vs_item.id),
                                    'item_id', CONCAT(item.id),
                                    'item_name', CONCAT(item.name),
                                    'origin_country', CONCAT(item.origin_country),
                                    'brand', CONCAT(item.brand),
                                    'item_code', CONCAT(item.code),
                                    'type_selling', CONCAT(item_unit.name),
                                    'qty', CONCAT(purchase_vs_item.qty),
                                    'unit_price', CONCAT(purchase_vs_item.unit_price),
                                    'selling_price', CONCAT(purchase_vs_item.selling_price),
                                    'total_price', CONCAT(purchase_vs_item.total_price),
                                    'cogs_row_amount', CONCAT(purchase_vs_item.cogs_row_amount),
                                    'shelf_life', CONCAT(item.shelf_life),
                                    'temperature', CONCAT(item.temperature)
                                )) SEPARATOR ','),
                          ']',
            '}', 
        
        ']'
        ) AS multiTables
        FROM purchase 
        INNER JOIN purchase_vs_item ON purchase_vs_item.purchaseId = purchase.id
        INNER JOIN item ON purchase_vs_item.item_id = item.id
        INNER JOIN provider ON CONCAT(provider.id) = CONCAT(purchase.provider_id) 
        INNER JOIN item_unit ON item_unit.id = purchase_vs_item.type_selling
        WHERE purchase.deleted = '0'
        AND purchase.id = $purchase_id) as a, company;";
?>

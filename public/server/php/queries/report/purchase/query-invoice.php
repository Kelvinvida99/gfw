<?php
    $purchase_id = isset($_POST["purchase_id"]) ? $_POST["purchase_id"] : null;
    //$purchase_id = 31;
    //$_POST["type"] = "print";

    // Ahora puedes usar $purchase_id en tu consulta SQL para obtener los datos específicos del purchase.
    $reportQuery = "
    SELECT 
    a.*,
    company.company_name,
    company.bill_to_address as company_bill_to_address,
    company.phone as company_phone,
    company.email as company_email,
    company.fax as company_fax,
    company.avatar as company_avatar

    
    FROM (
        SELECT 
            purchase.code AS code, 
            purchase.provider_id, 
            purchase.provider_email, 
            purchase.price, 
            purchase.check_mail, 
            purchase.purchase_date, 
            purchase.due_date, 
            purchase.bill_date, 
            purchase.creation_date, 
            purchase.delivered_date, 
            purchase.shipping, 
            purchase.investment, 
            purchase.revenue, 
            purchase.status, 
            purchase.earning, 
            purchase.min_amount, 
            purchase.general_total_selling_price, 
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
            purchase.fill_bill_date, 
            purchase.notes, 
            purchase.total_invested, 
            purchase.total_cogs_to_item_cost, 
            purchase.general_total_price as purchase_general_total_price, 
            purchase.general_total_expenses, 
            purchase.payment_status, 
            purchase.reference_number, 
            purchase.purchase_statement, 
            purchase.purchase_footer, 
            purchase.expense_amount,  
            provider.name AS providerName,
            company.company_name AS companyName,
            company.bill_to_address AS providerBillToAddress, 
            company.bill_to_city AS providerBillToCity, 
            company.bill_to_state AS providerBillToState, 
            company.bill_to_zip AS providerBillToZip, 
            company.ship_to_address AS providerShipToAddress,
            company.ship_to_city AS providerShipToCity,
            company.ship_to_state AS providerShipToState,
            company.ship_to_zip AS providerShipToZip,
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
                                    'id',CONCAT(purchaseVsitem.id),
                                    'item_id', CONCAT(purchaseVsitem.item_id),
                                    'type_selling', CONCAT(purchaseVsitem.type_selling),
                                    'qty', CONCAT(purchaseVsitem.qty),
                                    'notes', CONCAT(purchaseVsitem.notes),
                                    'unit_price', CONCAT(purchaseVsitem.unit_price),
                                    'selling_price', CONCAT(purchaseVsitem.selling_price),
                                    'total_price', CONCAT(purchaseVsitem.total_price),
                                    'cogs_row_amount', CONCAT(purchaseVsitem.cogs_row_amount)
                                )) SEPARATOR ','),
                          ']',
            '}', 
        
        ']'
        ) AS multiTables
        FROM purchase 
        LEFT JOIN provider ON CONCAT(provider.id) = CONCAT(purchase.provider_id) 
        LEFT JOIN company ON company.id = '1'
        LEFT JOIN (
            SELECT purchase_vs_item.id AS id, 
            CONCAT('[', JSON_OBJECT('id', CONCAT(item.name),'displayText',  CONCAT(item.name)), ']') AS item_id,
            CONCAT('[', JSON_OBJECT('id', CONCAT(purchase_vs_item.type_selling),'displayText',  CONCAT(item_unit.name)), ']') AS type_selling,
            purchase_vs_item.qty AS qty,
            item.notes AS notes,
            purchase_vs_item.unit_price AS unit_price, 
            purchase_vs_item.selling_price AS selling_price,
            purchase_vs_item.total_price AS total_price,
            purchase_vs_item.cogs_row_amount AS cogs_row_amount,
            purchase_vs_item.purchaseId AS purchaseId
            FROM purchase_vs_item 
            LEFT JOIN item ON item.id = purchase_vs_item.item_id 
            LEFT JOIN item_unit ON item_unit.id = purchase_vs_item.type_selling 
            WHERE purchase_vs_item.deleted = '0' 
            AND purchase_vs_item.purchaseId = '$purchase_id'
        ) AS purchaseVsitem ON purchaseVsitem.purchaseId = purchase.id
        WHERE purchase.deleted = '0'
        AND purchase.id = '$purchase_id')  as a, company;";

  
?>

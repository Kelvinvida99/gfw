<?php
$originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');

if ($originFile == "select") {
    $selectAllRows =" SELECT 
        purchase.*, 
        DATE_FORMAT(purchase.purchase_date, '%m/%d/%Y') AS purchaseDate, 
        DATE_FORMAT(purchase.due_date, '%m/%d/%Y') AS purchaseDueDate, 
        DATE_FORMAT(purchase.delivered_date, '%m/%d/%Y') AS purchaseDeliveredDate, 
        CONCAT('$', FORMAT(purchase.general_total_price,2)) AS general_total_price_dt,
        purchase.payment_status,
        provider.code AS providerCode,
        CONCAT(purchase.code,' / ',purchase.reference_number ) AS purchaseCodeREF_td,
        provider.avatar AS providerAvatar,
        provider.name AS providerName,
        provider.phone AS providerPhone,
        CONCAT('$', IFNULL(SUM(purchaseVsexpenses.amount), 0)) AS total_expenses
    FROM purchase 
    LEFT JOIN provider ON provider.id = purchase.provider_id 
    LEFT JOIN purchase_vs_expenses AS purchaseVsexpenses ON purchaseVsexpenses.purchaseId = purchase.id AND purchaseVsexpenses.deleted = '0'
    LEFT JOIN purchase_vs_item ON purchase_vs_item.purchaseId = purchase.id 
    LEFT JOIN item ON item.id = purchase_vs_item.item_id 
    WHERE purchase.deleted = '0' " . $mainFilter->readySqlString . $andFilter->readySqlString . "  
    GROUP BY purchase.id
    ORDER BY $sortBy $sortDirection 
    LIMIT $limit1, $limit2" ;

    $allRowsCountSql = "
        SELECT  COUNT(*) AS rowsQty 
        FROM purchase 
        INNER JOIN provider ON CONCAT(provider.id) = CONCAT(purchase.provider_id) 
        LEFT JOIN purchase_vs_item ON purchase_vs_item.purchaseId = purchase.id 
        LEFT JOIN item ON item.id = purchase_vs_item.item_id 
        WHERE purchase.deleted = '0' " . $mainFilter->readySqlString . $andFilter->readySqlString . " ;";
} elseif ($originFile == "autocomplete") {
    $autocompleteQuery = "SELECT id, code AS displayText, '{}' AS otherField FROM purchase WHERE purchase.deleted = '0' " . $mainFilter->readySqlString . " 
        ORDER BY id LIMIT 10 ;";
} elseif ($originFile == "update" || $originFile == "insert" || $originFile == 'selectOne') {

    // $selectRow = "SELECT * FROM purchase WHERE purchase.deleted = '0' AND purchase.id = '$id' ;"; 
    $selectRow = "SELECT 
            purchase.id, 
            purchase.code, 
            CONCAT('[', JSON_OBJECT('id', CONCAT(purchase.provider_id), 'displayText',  CONCAT(provider.code, ' - ', provider.name)), ']') AS provider_id,
            purchase.provider_email,
            provider.code AS providerCode,
            provider.name AS providerName,
            provider.avatar AS providerAvatar,
            provider.phone AS providerPhone,
            CONCAT('$', IFNULL(SUM(purchaseVsexpenses.amount), 0)) AS total_expenses,
            purchase.price,
            '' AS check_mail, 
            purchase.payment_status,
            DATE_FORMAT(purchase.purchase_date, '%m/%d/%Y') AS purchaseDate,
            DATE_FORMAT(purchase.due_date, '%m/%d/%Y') AS purchaseDueDate,
            DATE_FORMAT(purchase.delivered_date, '%m/%d/%Y') AS purchaseDeliveredDate, 
            purchase.purchase_date, 
            purchase.due_date,
            purchase.bill_date,
            purchase.creation_date,
            purchase.delivered_date, 
            purchase.fill_bill_date, 
            purchase.shipping, 
            purchase.investment, 
            purchase.revenue, 
            purchase.status, 
            purchase.earning, 
            purchase.min_amount,
            -- IFNULL(SUM(CAST(purchaseVsitem.total_price AS DECIMAL(10, 2))), 0) AS general_total_price,
            CONCAT(FORMAT(purchase.general_total_expenses,2)) AS general_total_expenses,
            CONCAT('$', FORMAT(purchase.general_total_price,2)) AS general_total_price_dt,
            CONCAT(FORMAT(purchase.general_total_price,2)) AS general_total_price,
            CONCAT(FORMAT(purchase.general_total_selling_price,2)) AS general_total_selling_price,
            purchase.notes,
            purchase.purchase_statement,
            purchase.purchase_footer,
            purchase.reference_number,
            CONCAT(purchase.code,' / ',purchase.reference_number ) AS purchaseCodeREF_td,
            CONCAT(
            '[',
                
                '{',
                    '\"tableName\":\"entitychanges\"', 
                    ',\"data\":[',
                                  GROUP_CONCAT(
                                        DISTINCT(
                                        JSON_OBJECT(
                                            'id',   CONCAT(entity_audit.id), 
                                            'user_name',CONCAT(AES_DECRYPT(UNHEX(__name), '".SQLSALT."'), ' ', users.last_name),
                                            'date_change',DATE_FORMAT(entity_audit.date_registered, '%m/%d/%Y %H:%i:%s'),                       
                                            'avatar',CONCAT(users.avatar),               
                                            'changes',CONCAT(entity_audit.changes)          
                                                )

                                        ) SEPARATOR ','),
                            ']',
                '}',  
            
            ']'
        ) AS entitychanges,

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
                                    'unit_price', CONCAT(purchaseVsitem.unit_price),
                                    'selling_price', CONCAT(purchaseVsitem.selling_price),
                                    'total_price', CONCAT(purchaseVsitem.total_price),
                                    'cogs_row_amount', CONCAT(purchaseVsitem.cogs_row_amount)

                                )) SEPARATOR ','),
                          ']',
            '}', 

            ',{',
                '\"tableName\":\"purchase_vs_investment\"', 
                ',\"data\":[',
                                GROUP_CONCAT(
                                DISTINCT(
                                JSON_OBJECT(
                                    'id',CONCAT(purchaseVsinvestment.id),
                                    'investorId', CONCAT(purchaseVsinvestment.investorId),
                                    'invested_amount', CONCAT(purchaseVsinvestment.invested_amount),
                                    'revenue', CONCAT(purchaseVsinvestment.revenue),
                                    'revenue_amount', CONCAT(purchaseVsinvestment.revenue_amount),
                                    'status', purchaseVsinvestment.status
                                )) SEPARATOR ','),
                          ']',
            '}',

            ',{',
                '\"tableName\":\"purchase_vs_expenses\"', 
                ',\"data\":[',
                                GROUP_CONCAT(
                                DISTINCT(
                                JSON_OBJECT(
                                    'id',CONCAT(purchaseVsexpenses.id),
                                    'provider_id', CONCAT(purchaseVsexpenses.provider_id),
                                    'expenses_account_id', CONCAT(purchaseVsexpenses.expenses_account_id),
                                    'date', purchaseVsexpenses.pveDate,
                                    'amount', CONCAT(purchaseVsexpenses.amount)
                                )) SEPARATOR ','),
                          ']',
            '}',  
            ',{',
                '\"tableName\":\"purchase_tracking_mail\"', 
                ',\"data\":[',
                                GROUP_CONCAT(
                                DISTINCT(
                                JSON_OBJECT(
                                    'id',CONCAT(mailTracking.id),
                                    'email', mailTracking.email,
                                    'mail_date', mailTracking.mail_date,
                                    'mail_time', mailTracking.mail_time,
                                    'providerId', CONCAT(mailTracking.providerId)
                                )) SEPARATOR ','),
                          ']',
            '}', 
        
        ']'
        ) AS multiTables
        FROM purchase 
        LEFT JOIN provider ON provider.id = purchase.provider_id 

        LEFT JOIN (
            SELECT purchase_tracking_mail.id AS id,
            purchase_tracking_mail.purchaseId AS purchaseId,
            purchase_tracking_mail.email AS email,
            purchase_tracking_mail.mail_date AS mail_date,
            purchase_tracking_mail.mail_time AS mail_time,
            CONCAT('[', JSON_OBJECT('id', CONCAT(purchase_tracking_mail.providerId), 'displayText',  CONCAT(provider.name)), ']') AS providerId
            FROM purchase_tracking_mail
            LEFT JOIN provider ON provider.id = purchase_tracking_mail.providerId
            WHERE purchase_tracking_mail.purchaseId = '$id'
        ) AS mailTracking ON mailTracking.purchaseId = purchase.id

        LEFT JOIN (
            SELECT 
                purchase_vs_item.id AS id, 
                CONCAT('[', JSON_OBJECT('id', CONCAT(purchase_vs_item.item_id),'displayText',  CONCAT(item.name, ' | ', item.brand),
                    'otherField', JSON_OBJECT('id', purchase_vs_item.id, 'sold_qty', purchase_vs_item.sold_qty, 
                                              'name', item.name) ), ']') AS item_id,
                CONCAT('[', JSON_OBJECT('id', CONCAT(purchase_vs_item.type_selling),'displayText',  CONCAT(item_unit.name)), ']') AS type_selling,
                purchase_vs_item.qty AS qty,
                CASE WHEN purchase_vs_item.unit_price <> 0.00 THEN purchase_vs_item.unit_price ELSE '' END AS unit_price, 
                CASE WHEN purchase_vs_item.selling_price <> 0.00 THEN purchase_vs_item.selling_price ELSE '' END AS selling_price,
                CASE WHEN purchase_vs_item.total_price <> 0.00 THEN purchase_vs_item.total_price ELSE '' END AS total_price,
                purchase_vs_item.purchaseId AS purchaseId,
                purchase_vs_item.cogs_row_amount AS cogs_row_amount,
                purchase_vs_item.sold_qty

            FROM 
                purchase_vs_item 
                LEFT JOIN item ON item.id = purchase_vs_item.item_id 
                LEFT JOIN item_unit ON item_unit.id = purchase_vs_item.type_selling 
            WHERE 
                purchase_vs_item.deleted = '0' 
                AND purchase_vs_item.purchaseId = '$id'
        ) AS purchaseVsitem ON purchaseVsitem.purchaseId = purchase.id

        LEFT JOIN (
            SELECT purchase_vs_investment.id AS id, 
            CONCAT('[', JSON_OBJECT('id', CONCAT(purchase_vs_investment.investorId),'displayText',  CONCAT(investor.name)), ']') AS investorId, 
            purchase_vs_investment.invested_amount AS invested_amount, 
            COALESCE(
            NULLIF(purchase_vs_investment.revenue, 0),
            p.revenue
        ) AS revenue,
            purchase_vs_investment.invested_amount * COALESCE(NULLIF(purchase_vs_investment.revenue, 0), p.revenue) AS revenue_amount,
            purchase_vs_investment.status AS status, 
            purchase_vs_investment.purchaseId AS purchaseId 
            FROM purchase_vs_investment 
            LEFT JOIN investor ON investor.id = purchase_vs_investment.investorId 
            LEFT JOIN (
                SELECT revenue, id FROM purchase WHERE id = '$id' AND deleted = '0'
            ) AS p ON p.id = purchase_vs_investment.purchaseId
            WHERE purchase_vs_investment.deleted = '0' 
            AND purchase_vs_investment.purchaseId = '$id'
        ) AS purchaseVsinvestment ON purchaseVsinvestment.purchaseId = purchase.id

        LEFT JOIN (
            SELECT purchase_vs_expenses.id AS id, 
            CONCAT('[', JSON_OBJECT('id', CONCAT(purchase_vs_expenses.provider_id),'displayText',  CONCAT(provider.code, ' - ', provider.name)), ']') AS provider_id,
            CONCAT('[', JSON_OBJECT('id', CONCAT(purchase_vs_expenses.expenses_account_id),'displayText',  CONCAT(accounts.name)), ']') AS expenses_account_id,
            purchase_vs_expenses.date AS pveDate,
            CASE WHEN purchase_vs_expenses.amount <> 0.00 THEN purchase_vs_expenses.amount ELSE '' END AS amount,
            CONCAT(purchase_vs_expenses.purchaseId) AS purchaseId
            FROM purchase_vs_expenses 
            INNER JOIN provider ON provider.id = purchase_vs_expenses.provider_id 
            INNER JOIN accounts ON accounts.id = purchase_vs_expenses.expenses_account_id
            WHERE purchase_vs_expenses.deleted = '0' 
            AND purchase_vs_expenses.purchaseId = '$id'
        ) AS purchaseVsexpenses ON purchaseVsexpenses.purchaseId = purchase.id
        LEFT JOIN entity_audit ON entity_audit.entity_id = purchase.id AND entity_audit.entity = 'purchase'
        LEFT JOIN users ON users.id = entity_audit.user_id

        WHERE purchase.id = '$id'  AND purchase.deleted = '0' GROUP BY purchase.id;";
}

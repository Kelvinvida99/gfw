<?php

$originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');

if ($originFile == "select") {
    $selectAllRows = "SELECT  
        sentpayment.id,
        sentpayment.code, 
        sentpayment.provider_id,
        sentpayment.accounts_id,
        sentpayment.reference_number,
        CONCAT('$',FORMAT(sentpayment.amount,2)) as amount_dt,
        DATE_FORMAT(sentpayment.date, '%m/%d/%Y') as date_dt,
        -- COUNT(DISTINCT(payment_vs_po_or_services.id)) AS count,
        COUNT(
            IF(payment_vs_po_or_services.expense_type = 'purchase', purchase.id, provider.id)
        ) AS paid_bills_count,
        GROUP_CONCAT(
            IF(payment_vs_po_or_services.expense_type = 'purchase', purchase.code, provider.code)
        ) AS paid_bills,
        provider.name as provider_name,
        provider.avatar as provider_avatar,
        accounts.name as accounts_name,
        accounts.avatar as accounts_avatar
        -- GROUP_CONCAT(purchase.code) as purchaseCodes
        FROM sentpayment 
        LEFT JOIN provider on provider.id = sentpayment.provider_id 
        LEFT JOIN accounts on accounts.id  = sentpayment.accounts_id 
        LEFT JOIN payment_vs_po_or_services ON sentpayment.id = payment_vs_po_or_services.sentpaymentId
        LEFT JOIN purchase ON purchase.id = payment_vs_po_or_services.expense_id

        WHERE sentpayment.deleted = '0' " . $mainFilter->readySqlString . $andFilter->readySqlString . "  
       GROUP BY sentpayment.id ORDER BY $sortBy $sortDirection LIMIT $limit1, $limit2 ;";

    $allRowsCountSql = "SELECT  COUNT(*) AS rowsQty  
        FROM sentpayment 
        LEFT JOIN provider on provider.id = sentpayment.provider_id 
        LEFT JOIN accounts on accounts.id  = sentpayment.accounts_id 
        LEFT JOIN payment_vs_po_or_services ON sentpayment.id = payment_vs_po_or_services.sentpaymentId
        LEFT JOIN purchase ON purchase.id = payment_vs_po_or_services.expense_id
        WHERE sentpayment.deleted = '0' " . $mainFilter->readySqlString . $andFilter->readySqlString . " GROUP BY sentpayment.id  ;";
} elseif ($originFile == "autocomplete") {
    $autocompleteQuery = "SELECT id, CONCAT(name) AS displayText, '{}' AS otherField FROM sentpayment WHERE sentpayment.deleted = '0' " . $mainFilter->readySqlString . " 
        ORDER BY id LIMIT 10 ;";
} elseif ($originFile == "update" || $originFile == "insert" || $originFile == "selectOne") {
    $selectRow = "SELECT 
        sentpayment.id, 
        sentpayment.code, 
        sentpayment.date,
        sentpayment.amount,
        sentpayment.reference_number,
        sentpayment.notes,        
        CONCAT('[', JSON_OBJECT('id', CONCAT(sentpayment.provider_id), 'displayText',  CONCAT(provider.code,' - ',provider.name)), ']') AS provider_id, 
        CONCAT('[', JSON_OBJECT('id', CONCAT(sentpayment.accounts_id), 'displayText',  CONCAT(accounts.name)), ']') AS accounts_id,
        DATE_FORMAT(sentpayment.date, '%m/%d/%Y') AS date_dt,
        CONCAT('$',FORMAT(sentpayment.amount,2)) AS amount_dt,
        provider.name as provider_name,
        provider.avatar as provider_avatar,
        accounts.name as accounts_name,
        accounts.avatar as accounts_avatar,
        COUNT(
            IF(payment_vs_po_or_services.expense_type = 'purchase', purchase.id, provider.id)
        ) AS paid_bills_count,
        GROUP_CONCAT(
            IF(payment_vs_po_or_services.expense_type = 'purchase', purchase.code, provider.code)
        ) AS paid_bills,
        CONCAT(
            '[',
                '{',
                    '\"tableName\":\"payment_vs_po_or_services\"', 
                    ',\"data\":[', 
                        GROUP_CONCAT(
                            DISTINCT(
                                JSON_OBJECT(
                                    'id', CONCAT(payment_vs_po_or_services.id),
                                    'expense_id', 
                                    IF(payment_vs_po_or_services.expense_type = 'Purchase',
                                        CONCAT('[', JSON_OBJECT('id', CONCAT(purchase.id), 'displayText', purchase.code), ']'),
                                        CONCAT('[', JSON_OBJECT('id', CONCAT(provider.id), 'displayText', provider.code), ']')
                                    ),
                                    'expense_type', payment_vs_po_or_services.expense_type,
                                    'total_amount', CONCAT(payment_vs_po_or_services.total_amount),
                                    'due_amount', CONCAT(payment_vs_po_or_services.due_amount),
                                    'sent_amount', CONCAT(payment_vs_po_or_services.sent_amount)
                                )
                            ) SEPARATOR ','
                        ),
                    ']',
                '}',
            ']'
        ) AS multiTables
        FROM sentpayment 
        LEFT JOIN provider ON provider.id = sentpayment.provider_id 
        LEFT JOIN accounts ON accounts.id = sentpayment.accounts_id
        LEFT JOIN payment_vs_po_or_services ON payment_vs_po_or_services.sentpaymentId = sentpayment.id
        LEFT JOIN purchase ON purchase.id = payment_vs_po_or_services.expense_id
        LEFT JOIN purchase_vs_expenses ON purchase_vs_expenses.id = payment_vs_po_or_services.expense_id
        WHERE sentpayment.deleted = '0' AND sentpayment.id = '$id' ;";

}

<?php

    $sentpayment_id = isset($_POST["sentpayment_id"]) ? $_POST["sentpayment_id"] : null;
    // $sentpayment_id = 22;

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
        provider.name AS provider_name,
        provider.code AS provider_code,
        provider.email AS provider_email,
        provider.phone AS provider_phone,
        provider.fax AS provider_fax,
        accounts.name AS accounts_name,
        purchase.code AS purchase_code,
        CONCAT(
            '[',
                
                '{',
                    '\"tableName\":\"payment_vs_po_or_services\"', 
                    ',\"data\":[',
                                  GROUP_CONCAT(
                                        DISTINCT(
                                        JSON_OBJECT(
                                            'id',CONCAT(payment_vs_po_or_services.id),
                                            'expense_id', 
                                            IF(payment_vs_po_or_services.expense_type = 'Purchase',
                                                CONCAT('[', JSON_OBJECT('id', CONCAT(purchase.id), 'displayText', CONCAT(purchase.code,'-',item.brand)),']'),
                                                CONCAT('[', JSON_OBJECT('id', CONCAT(provider.id), 'displayText', CONCAT(provider.code,'-',a.name)), ']')
                                            ), 
                                            'expense_type', payment_vs_po_or_services.expense_type,                
                                            'total_amount', CONCAT(payment_vs_po_or_services.total_amount),    
                                            'due_amount', CONCAT(payment_vs_po_or_services.due_amount),                           
                                            'sent_amount', CONCAT(payment_vs_po_or_services.sent_amount)                           
                                        )) SEPARATOR ','),
                            ']',
                '}', 
            
            ']'
        ) AS multiTables
        FROM sentpayment 
        LEFT JOIN provider ON provider.id = sentpayment.provider_id 
        LEFT JOIN company ON company.id = '1'
        LEFT JOIN accounts ON accounts.id  = sentpayment.accounts_id
        LEFT JOIN payment_vs_po_or_services ON payment_vs_po_or_services.sentpaymentId = sentpayment.id
        LEFT JOIN purchase ON purchase.id = payment_vs_po_or_services.expense_id
        LEFT JOIN purchase_vs_expenses ON purchase_vs_expenses.id = payment_vs_po_or_services.expense_id
        LEFT JOIN purchase_vs_item ON purchase_vs_item.purchaseId = purchase.id
        LEFT JOIN item ON item.id = purchase_vs_item.item_id
        LEFT JOIN accounts a ON a.id  = purchase_vs_expenses.expenses_account_id
        WHERE sentpayment.deleted = '0' AND sentpayment.id = '$sentpayment_id'

    )  as a, company;";

?>

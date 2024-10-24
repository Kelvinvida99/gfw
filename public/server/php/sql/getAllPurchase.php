<?php

require "../auth/user.php";
require "../auth/checkAuth.php";
$_POST["entity"] = "sentpayment";
$REQUESTED_ACTION = "readOnly";
require "../auth/checkAuthorization.php";
require "../sqlFunctions/startDB.php";
require "../sqlFunctions/returnObject.php";

// $provider_id = 8;
$provider_id = mysqli_real_escape_string($con, $_POST["purchase_id"]);

$sql = "SELECT 
            CONCAT(
                '[',
                '{',
                '\"tableName\":\"payment_vs_po_or_services\"', 
                ',\"data\":[',
                GROUP_CONCAT(
                    DISTINCT(
                        JSON_OBJECT(
                            'id', '',
                            'expense_id', CONCAT('[', JSON_OBJECT('id', CONCAT(invoice.id), 'displayText', invoice.code), ']'),  
                            'expense_type', invoice.type,              
                            'total_amount', CONCAT(invoice.po_total_amount),
                            'due_amount', CONCAT(invoice.due_amount),
                            'sent_amount', '0'
                        )
                    ) SEPARATOR ','
                ),
                ']',
                '}',  
                ']'
            ) AS multiTables
        FROM (
            SELECT 
                purchase.id,
                purchase.code,
                'Purchase' as type,
                purchase.general_total_price as po_total_amount,
                purchase.general_total_price - SUM(IFNULL(payment_vs_po_or_services.sent_amount, 0)) AS due_amount,
                purchase.deleted
            FROM purchase 
            LEFT JOIN sentpayment ON sentpayment.provider_id = purchase.provider_id AND sentpayment.deleted = '0'
            LEFT JOIN payment_vs_po_or_services ON payment_vs_po_or_services.sentpaymentId = sentpayment.id AND payment_vs_po_or_services.deleted = '0'
            and payment_vs_po_or_services.expense_id = purchase.id and expense_type = 'Purchase'
            WHERE purchase.deleted = '0' AND purchase.provider_id = $provider_id 
            GROUP BY purchase.id
        
        UNION ALL

            SELECT 
                purchase_vs_expenses.id,
                provider.code,
                'COGS' as type,
                purchase_vs_expenses.amount as po_total_amount,
                purchase_vs_expenses.amount - SUM(IFNULL(payment_vs_po_or_services.sent_amount, 0)) AS due_amount,
                purchase_vs_expenses.deleted
            FROM purchase_vs_expenses 
            LEFT JOIN sentpayment ON sentpayment.provider_id = purchase_vs_expenses.provider_id AND sentpayment.deleted = '0'
            LEFT JOIN payment_vs_po_or_services ON payment_vs_po_or_services.sentpaymentId = sentpayment.id AND payment_vs_po_or_services.deleted = '0'
            LEFT JOIN provider ON provider.id = purchase_vs_expenses.provider_id
            WHERE purchase_vs_expenses.deleted = '0' AND purchase_vs_expenses.provider_id = $provider_id 
            GROUP BY purchase_vs_expenses.id
        ) AS invoice
        WHERE invoice.due_amount > 0 AND invoice.deleted = '0'
        
        



";

if (!$result = mysqli_query($con, $sql)) {
    echoReturnObject("MySqlError");
    exit;
}

$rows = [];
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

$mt = "[]";
if (isset($rows[0]["multiTables"])) {
    $mt = $rows[0]["multiTables"];
    unset($rows[0]["multiTables"]);
}

echoReturnObject("ok", $rows, 0, $mt);
mysqli_free_result($result);
mysqli_close($con);

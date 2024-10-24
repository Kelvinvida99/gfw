<?php
    $receivepayment_id = isset($_POST["receivepayment_id"]) ? $_POST["receivepayment_id"] : null;
    // $receive_id = 46;
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
        receivepayment.id,
        receivepayment.code,
        receivepayment.date,
        DATE_FORMAT(receivepayment.date, '%m/%d/%Y') as date_td, 
        receivepayment.reference_number,
        CONCAT('[', JSON_OBJECT('id', CONCAT(receivepayment.customer_id), 'displayText',  CONCAT(customer.name)), ']') AS customer_id,
        CONCAT('[', JSON_OBJECT('id', CONCAT(receivepayment.accounts_id), 'displayText',  CONCAT(accounts.name)), ']') AS accounts_id,
        CONCAT(receivepayment.amount) as amount,
        CONCAT('$',FORMAT(receivepayment.amount,2)) as amount_dt,
        customer.name as customer_name,
        customer.email as customer_email,
        customer.phone as customer_phone,
        customer.fax as customer_fax,
        customer.avatar,
        accounts.name as accounts_name,
        sale.code as sale_code,
        CONCAT(COUNT(payment_vs_sale.sale_id)) as paid_invoices,
        GROUP_CONCAT(sale.code SEPARATOR ', ') as sales_code,
    
        CONCAT(
                '[',
                    
                    '{',
                        '\"tableName\":\"payment_vs_sale\"', 
                        ',\"data\":[',
                                    GROUP_CONCAT(
                                            DISTINCT(
                                            JSON_OBJECT(
                                                'id',CONCAT(payment_vs_sale.id),  
                                                'sale_id', CONCAT('[', JSON_OBJECT('id',   CONCAT(sale.id), 'displayText', sale.code ),']'),              
                                                'po_total_amount', CONCAT(payment_vs_sale.po_total_amount),
                                                'due_amount', CONCAT(payment_vs_sale.due_amount),  
                                                'sent_amount',  CONCAT(payment_vs_sale.sent_amount)                  
                                                )

                                            ) SEPARATOR ','),
                                ']',
                    '}',  
                
                ']'
            ) AS multiTables

        FROM receivepayment 
        LEFT JOIN customer on customer.id = receivepayment.customer_id 
        LEFT JOIN company ON company.id = '1'
        LEFT JOIN accounts on accounts.id  = receivepayment.accounts_id
        LEFT JOIN payment_vs_sale on payment_vs_sale.receivepaymentId = receivepayment.id
        LEFT JOIN sale on sale.id = payment_vs_sale.sale_id
        LEFT JOIN sale_vs_item on sale_vs_item.saleId = sale.id

        WHERE receivepayment.deleted = '0' AND receivepayment.id = '$receivepayment_id'

    )  as a, company;";

    // $result = executeSelectQuery($con, $reportQuery);
    // $rows   = [];

    // while($row = $result->fetch_assoc()) {
    //     $rows[] = $row;
    // };

    // $mt = "[]";
    // if(isset($rows[0]["multiTables"])){
    //     $mt = $rows[0]["multiTables"];
    //     unset($rows[0]["multiTables"]);
    // };

    // $data = json_decode($mt, true);

    // print_r($data);
    // print_r($rows);

?>

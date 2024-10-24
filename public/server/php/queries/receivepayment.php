<?php

    $originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');

    if($originFile == "select"){

        
        if (strpos($sortBy, 'date_edited') !== false) {
            $sortBy = "date_edited";
            $sortDirection = "DESC";
        } 

        $selectAllRows = " SELECT * from (
    
        SELECT  
        receivepayment.id,
        receivepayment.code, 
        receivepayment.customer_id,
        receivepayment.accounts_id,
        receivepayment.date,
        DATE_FORMAT(receivepayment.date, '%m/%d/%Y') as date_td, 
        receivepayment.reference_number,
        CONCAT('$',FORMAT(receivepayment.amount,2)) as amount_dt,
        customer.name as customer_name,
        customer.avatar,
        accounts.name as accounts_name,
        accounts.avatar as accounts_avatar,
        receivepayment.date_edited,
        CONCAT(COUNT(payment_vs_sale.sale_id)) as paid_invoices,
        GROUP_CONCAT(sale.code SEPARATOR ', ') as sales_code
        FROM receivepayment
        INNER JOIN payment_vs_sale ON  payment_vs_sale.receivepaymentId = receivepayment.id
     	INNER JOIN sale on sale.id = payment_vs_sale.sale_id
        INNER JOIN customer on customer.id = receivepayment.customer_id 
        INNER JOIN accounts on accounts.id  = receivepayment.accounts_id 
        WHERE receivepayment.deleted = '0' 
        GROUP BY 1,2,3,4,5,6,7,8,9,10,11,12  ) as a where 1=1 ".$mainFilter->readySqlString.$andFilter->readySqlString."  
        ORDER BY $sortBy $sortDirection LIMIT $limit1, $limit2 ;";
        
        $allRowsCountSql = "SELECT  COUNT(*) AS rowsQty from (
        SELECT  
        receivepayment.id,
        receivepayment.code, 
        receivepayment.customer_id,
        receivepayment.accounts_id,
        receivepayment.date,
        DATE_FORMAT(receivepayment.date, '%m/%d/%Y') as date_td, 
        receivepayment.reference_number,
        CONCAT('$',FORMAT(receivepayment.amount,2)) as amount_dt,
        customer.name as customer_name,
        customer.avatar,
        accounts.name as accounts_name,
        receivepayment.date_edited,
        CONCAT(COUNT(payment_vs_sale.sale_id)) as paid_invoices,
        GROUP_CONCAT(sale.code SEPARATOR ', ') as sales_code
        FROM receivepayment
        INNER JOIN payment_vs_sale ON  payment_vs_sale.receivepaymentId = receivepayment.id
        INNER JOIN sale on sale.id = payment_vs_sale.sale_id
        INNER JOIN customer on customer.id = receivepayment.customer_id 
        INNER JOIN accounts on accounts.id  = receivepayment.accounts_id 
        WHERE receivepayment.deleted = '0' 
        GROUP BY 1,2,3,4,5,6,7,8,9,10,11,12  ) as a where 1=1   ".$mainFilter->readySqlString.$andFilter->readySqlString." ;";  
    }

    elseif($originFile == "autocomplete"){
        $autocompleteQuery = "SELECT id, id AS displayText FROM receivepayment WHERE receivepayment.deleted = '0' ".$mainFilter->readySqlString." 
        ORDER BY id LIMIT 10 ;";
    }

    elseif($originFile == "update" || $originFile == "insert" || $originFile == "selectOne"){
        $selectRow = "SELECT  
        receivepayment.id,
        receivepayment.code,
        receivepayment.date,
        DATE_FORMAT(receivepayment.date, '%m/%d/%Y') as date_td, 
        receivepayment.reference_number,        
        receivepayment.notes,
        CONCAT('[', JSON_OBJECT('id', CONCAT(receivepayment.customer_id), 'displayText',  CONCAT(customer.name)), ']') AS customer_id,
        CONCAT('[', JSON_OBJECT('id', CONCAT(receivepayment.accounts_id), 'displayText',  CONCAT(accounts.name)), ']') AS accounts_id,
        CONCAT(receivepayment.amount) as amount,
        CONCAT('$',FORMAT(receivepayment.amount,2)) as amount_dt,
        customer.name as customer_name,
        customer.avatar,
        accounts.name as accounts_name,
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
                                                'sale_id', CONCAT('[', JSON_OBJECT('id',   CONCAT(sale.id), 'displayText', CONCAT(sale.code, ' - ',DATE_FORMAT(sale.sale_date, '%m/%d/%Y') ) ),']'),              
                                                'po_total_amount', CONCAT(payment_vs_sale.po_total_amount),
                                                'due_amount', CONCAT(payment_vs_sale.due_amount),  
                                                'sent_amount',  CONCAT(payment_vs_sale.sent_amount)                  
                                                )

                                            ) SEPARATOR ','),
                                ']',
                    '},',

                '{',
                '\"tableName\":\"receivepayment_vs_credit\"', 
                ',\"data\":[',
                                GROUP_CONCAT(
                                DISTINCT(
                                JSON_OBJECT(
                                    'id',CONCAT(receivepayment_vs_credit.id),
                                    'saleId', CONCAT(receivepayment_vs_credit.saleId),
                                    'amount', CONCAT(receivepayment_vs_credit.amount),
                                    'date', receivepayment_vs_credit.date,
                                    'notes', CONCAT(receivepayment_vs_credit.notes)
                                )) SEPARATOR ','),
                          ']',
            '}',







                
                ']'
            ) AS multiTables


        FROM receivepayment 
        INNER JOIN customer on customer.id = receivepayment.customer_id 
        INNER JOIN accounts on accounts.id  = receivepayment.accounts_id
        INNER  JOIN payment_vs_sale on payment_vs_sale.receivepaymentId = receivepayment.id        
        INNER  JOIN sale on sale.id = payment_vs_sale.sale_id
        LEFT  JOIN receivepayment_vs_credit on receivepayment_vs_credit.receivepaymentId = receivepayment.id
        WHERE receivepayment.deleted = '0' AND receivepayment.id = '$id' ;"; 
    }


?>
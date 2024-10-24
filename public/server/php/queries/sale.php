<?php

    $originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');

    if($originFile == "select"){
        $selectAllRows = "SELECT 
        sale.id, 
        sale.code, 
        sale.customer_id,
        sale.sale_date,
        DATE_FORMAT(sale.sale_date, '%m/%d/%Y') as sale_date_td, 
        DATE_FORMAT(sale.due_date, '%m/%d/%Y') as due_date_td, 
        sale.due_date,
        sale.email,
        FORMAT(SUM(sale_vs_item.qty),0) AS qty,
   
        sale.shipping_date, 
        sale.shipping_time, 
        sale.shipping_status, 
        sale.delivered_date, 
        sale.payment_status,
  
        COALESCE(sale.packing_slip_last_printed,'') as packing_slip_last_printed,
        CONCAT(DATEDIFF(sale.due_date, CURDATE())) AS remaining_days,
        customer.code as code_customer,
        customer.name,
        customer.avatar,
        CONCAT(FORMAT((sale.grand_total - sale.credit_amount),2)) as grand_total,
        CONCAT('$', FORMAT((sale.grand_total - sale.credit_amount),2)) as grand_total_dt
        FROM 
            sale 
        LEFT JOIN 
            customer ON customer.id = sale.customer_id 
        LEFT JOIN 
            sale_vs_item ON sale_vs_item.saleId = sale.id  and sale_vs_item.deleted = '0'
        LEFT JOIN 
            purchase_vs_item ON purchase_vs_item.id = sale_vs_item.purchase_vs_itemId 
        LEFT JOIN 
            item ON item.id = purchase_vs_item.item_id      
        LEFT JOIN 
            purchase ON purchase.id = purchase_vs_item.purchaseId  
        WHERE sale.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString."    GROUP BY  sale.id 
        ORDER BY $sortBy $sortDirection  LIMIT $limit1, $limit2 ;";
        
        $allRowsCountSql = "SELECT COUNT(*) AS rowsQty from ( SELECT  sale.id FROM 
            sale 
        LEFT JOIN 
            customer ON customer.id = sale.customer_id 
        LEFT JOIN 
            sale_vs_item ON sale_vs_item.saleId = sale.id  and sale_vs_item.deleted = '0'
        LEFT JOIN 
            purchase_vs_item ON purchase_vs_item.id = sale_vs_item.purchase_vs_itemId 
        LEFT JOIN 
            item ON item.id = purchase_vs_item.item_id 
        LEFT JOIN 
            purchase ON purchase.id = purchase_vs_item.purchaseId  
        WHERE sale.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString."  GROUP BY  sale.id ) as a ;";  

    }


    elseif($originFile == "autocomplete"){
        $autocompleteQuery = "SELECT id, code AS displayText, '{}' as otherField  FROM sale WHERE sale.deleted = '0' ".$mainFilter->readySqlString." 
        ORDER BY id LIMIT 10 ;";
    }
// 'item_unit_cost', sale_vs_item.item_unit_cost,
    elseif($originFile == "update" || $originFile == "insert" || $originFile == "selectOne"){
        $selectRow = "SELECT 
        sale.id, 
        sale.code, 
        CONCAT('[', JSON_OBJECT('id', CONCAT(sale.customer_id), 'displayText', CONCAT(customer.name)), ']') AS customer_id, 
        DATE_FORMAT(sale.sale_date, '%m/%d/%Y') as sale_date_td, 
        DATE_FORMAT(sale.due_date, '%m/%d/%Y') as due_date_td, 
        sale.sale_date, 
        sale.due_date, 
        sale.email,
        FORMAT(SUM(sale_vs_item.qty),0) AS qty,
        '' AS send_email,
        sale.bill_to_address, 
        sale.bill_to_apt, 
        sale.bill_to_city, 
        sale.bill_to_state, 
        sale.bill_to_zip, 
        sale.ship_to_address, 
        sale.ship_to_apt, 
        sale.ship_to_city, 
        sale.ship_to_state, 
        sale.ship_to_zip, 
        sale.ship_via, 
        sale.shipping_date, 
        sale.shipping_time, 
        sale.shipping_status, 
        sale.delivered_date, 
        sale.tracking_number, 
        sale.email_message, 
        sale.notes,
        sale.sale_statement,
        sale.sale_footer,
        sale.payment_status,
        sale.terms,
        COALESCE(sale.packing_slip_last_printed,'') as packing_slip_last_printed,
        CONCAT(DATEDIFF(sale.due_date, CURDATE())) AS remaining_days,
        customer.code as code_customer,
        customer.name,
        customer.avatar,
        customer.phone,
        CONCAT(sale.grand_total) as grand_total,
        CONCAT(sale.total_profit_pct) as total_profit_pct,
        CONCAT('$', FORMAT((sale.grand_total - sale.credit_amount),2)) as grand_total_dt,
        CONCAT(
            '[',
                
                '{',
                    '\"data\":[',
                                  GROUP_CONCAT(
                                        DISTINCT(
                                        JSON_OBJECT(
                                            'id',CONCAT(sale_vs_item.id),
                                            'qty_available', CONCAT(sale_vs_item.qty)
                                                )

                                        ) SEPARATOR ','),
                            ']',
                '}',  
            
            ']'
            ) AS inventory_stock,
        CONCAT(
            '[',
                
                '{',
                    '\"tableName\":\"sale_tracking_mail\"', 
                    ',\"data\":[',
                                  GROUP_CONCAT(
                                        DISTINCT(
                                        JSON_OBJECT(
                                            'id',   CONCAT(sale_tracking_mail.id), 
                                            'user_name',CONCAT(AES_DECRYPT(UNHEX(b.__name), '".SQLSALT."'), ' ', b.last_name),
                                            'avatar',CONCAT(b.avatar),   
                                            'email',CONCAT(sale_tracking_mail.email),   
                                            'mail_date',DATE_FORMAT(sale_tracking_mail.mail_date, '%m/%d/%Y'),                       
                                            'mail_time',DATE_FORMAT(sale_tracking_mail.mail_time, '%H:%i:%s'),                    
                                            'sent',CONCAT(sale_tracking_mail.sent)        
                                                )

                                        ) SEPARATOR ','),
                            ']',
                '}',  
            
            ']'
        ) AS email_traking,
        CONCAT(
            '[',
                
                '{',
                    '\"tableName\":\"entitychanges\"', 
                    ',\"data\":[',
                                  GROUP_CONCAT(
                                        DISTINCT(
                                        JSON_OBJECT(
                                            'id',   CONCAT(entity_audit.id), 
                                            'user_name',CONCAT(AES_DECRYPT(UNHEX(a.__name), '".SQLSALT."'), ' ', a.last_name),
                                            'date_change',DATE_FORMAT(entity_audit.date_registered, '%m/%d/%Y %H:%i:%s'),                       
                                            'avatar',CONCAT(a.avatar),               
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
                    '\"tableName\":\"sale_vs_item\"', 
                    ',\"data\":[',
                                  GROUP_CONCAT(
                                        DISTINCT(
                                        JSON_OBJECT(
                                            'id',CONCAT(sale_vs_item.id),
                                            
                                            'purchase_vs_itemId',
                                            
                                                CONCAT('[', 
                                                            JSON_OBJECT(
                                                                        'id',   CONCAT(sale_vs_item.purchase_vs_itemId), 
                                                                        'displayText', CONCAT(purchase.code ,' - ',item.name,' - ',  ROUND((sale_vs_item.qty +  (purchase_vs_item.qty- purchase_vs_item.sold_qty))),
                                                                            ' - ',COALESCE(DATE_FORMAT(purchase.delivered_date,'%M %e, %Y'), DATE_FORMAT(CURRENT_DATE(),'%M %e, %Y')) ),
                                                                        'otherField', JSON_OBJECT('selling_price', purchase_vs_item.selling_price,
                                                                                                    'item_name', item.name,
                                                                                                    'po', purchase.code,                                                                                
                                                                                                    'item_unit_cost', CONCAT( purchase_vs_item.unit_price + (IF(purchase_vs_item.qty != 0, (purchase_vs_item.cogs_row_amount / purchase_vs_item.qty), 0))) ,                                                                                
                                                                                                    'qty_available', (sale_vs_item.qty + purchase_vs_item.qty- purchase_vs_item.sold_qty))
                                                                            
                                                                        ),
                                                        ']'),  
                                                
                                                

                                           
                                            'selling_type', sale_vs_item.selling_type,
                                            'qty', CONCAT(ROUND(sale_vs_item.qty)), 
                                            'item_unit_cost', sale_vs_item.item_unit_cost,
                                            'price', CONCAT(sale_vs_item.price),                           
                                            'total', CONCAT(sale_vs_item.total)                           
                                                )

                                        ) SEPARATOR ','),
                            ']',
                '},',  
                '{',
                '\"tableName\":\"sale_vs_return\"', 
                ',\"data\":[',
                                GROUP_CONCAT(
                                DISTINCT(
                                JSON_OBJECT(
                                    'id',CONCAT(saleVslost.id),
                                    'sale_vs_itemId', CONCAT(saleVslost.sale_vs_itemId),
                                    'lost_qty', CONCAT(saleVslost.lost_qty),
                                    'lost_price', CONCAT(saleVslost.lost_price),
                                    'date', saleVslost.date,
                                    'notes', CONCAT(saleVslost.notes)
                                )) SEPARATOR ','),
                          ']',
            '}',
            
            ']'

            
        ) AS multiTables



        FROM sale
        LEFT JOIN sale_vs_item ON sale_vs_item.saleId = sale.id AND sale_vs_item.deleted = '0'
        LEFT JOIN purchase_vs_item ON sale_vs_item.purchase_vs_itemId = purchase_vs_item.id 
        LEFT JOIN item ON purchase_vs_item.item_id = item.id 
        LEFT JOIN purchase ON purchase.id = purchase_vs_item.purchaseId AND purchase.deleted = '0'
        LEFT JOIN customer ON customer.id = sale.customer_id
        LEFT JOIN entity_audit ON entity_audit.entity_id = sale.id AND entity_audit.entity = 'sale'
        LEFT JOIN users a ON a.id = entity_audit.user_id
        LEFT JOIN sale_tracking_mail ON sale_tracking_mail.saleId = sale.id

        LEFT JOIN (
            SELECT 
                sale_vs_return.id AS id, 
                sale_vs_return.saleId AS saleId, 
                CONCAT('[', 
                    JSON_OBJECT(
                                'id',   CONCAT(sale_vs_return.sale_vs_itemId), 
                                'displayText', CONCAT(item.name,' - ',  sale_vs_item.selling_type, ' - ', ROUND(sale_vs_item.qty - sale_vs_return.lost_qty)),
                                'otherField', JSON_OBJECT('selling_price', sale_vs_item.price,
                                                            'item_name', item.name,
                                                            'po', sale.code,  
                                                            'sale_vs_itemId',   CONCAT(sale_vs_item.id),                                                                               
                                                            'item_unit_cost', CONCAT(sale_vs_item.price),                                                                                
                                                            'qty_available', CONCAT(sale_vs_item.qty))
                                    
                                ),
                ']') as sale_vs_itemId, 
                sale_vs_return.date AS date,
                sale_vs_return.lost_qty,
                sale_vs_return.notes,
                sale_vs_return.lost_price

            FROM 
                sale_vs_return 
                INNER JOIN sale on sale.id = sale_vs_return.saleId and sale.deleted = '0'
                INNER JOIN sale_vs_item on sale_vs_item.id = sale_vs_return.sale_vs_itemId and sale_vs_item.deleted = '0'
                LEFT JOIN purchase_vs_item ON sale_vs_item.purchase_vs_itemId = purchase_vs_item.id
                LEFT JOIN item ON purchase_vs_item.item_id = item.id 
                LEFT JOIN item_unit ON item_unit.id = sale_vs_item.selling_type 
            WHERE 
                sale_vs_return.deleted = '0' 
                AND sale_vs_return.saleId = '$id'
        ) AS saleVslost ON saleVslost.saleId = sale.id

        LEFT JOIN users b ON b.id = sale_tracking_mail.userId


        WHERE sale.deleted = '0' AND sale.id = '$id';"; 
    }


    // CONCAT(
    //     '[',
            
    //         '{',
    //             '\"tableName\":\"sale_vs_item\"', 
    //             ',\"data\":[',
    //                           GROUP_CONCAT(
    //                                 DISTINCT(
    //                                 JSON_OBJECT(
    //                                     'id',CONCAT(sale_vs_item.id),
    //                                     'customerId',CONCAT('[', JSON_OBJECT('id',   CONCAT(sale_vs_item.customerId), 'displayText', customer2.name),']'),    
    //                                     'itemId',CONCAT('[', JSON_OBJECT('id',   CONCAT(sale_vs_item.itemId), 'displayText', item.name),']'),    
    //                                     'supplierId', CONCAT(sale_vs_item.supplierId),
    //                                     'purchaseId',CONCAT('[', JSON_OBJECT('id',   CONCAT(sale_vs_item.purchaseId), 'displayText', purchase.id),']'),    
    //                                     'selling_unit', CONCAT(sale_vs_item.selling_unit),
    //                                     'qty', CONCAT(sale_vs_item.qty), 
    //                                     'price', CONCAT(sale_vs_item.price), 
    //                                     'description', sale_vs_item.description,                              
    //                                     'exp_type', sale_vs_item.exp_type,                              
    //                                     'type', sale_vs_item.type,                              
    //                                     'tax_rate', CONCAT(sale_vs_item.tax_rate)                             
    //                                         )

    //                                 ) SEPARATOR ','),
    //                     ']',
    //         '}',  
        
    //     ']'
    // ) AS multiTables

?>



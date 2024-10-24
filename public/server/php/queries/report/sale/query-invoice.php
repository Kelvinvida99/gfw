<?php



$reportQuery = " SELECT 
    a.*,
    company.company_name,
    company.bill_to_address as company_bill_to_address,
    company.phone as company_phone,
    company.email as company_email,
    company.fax as company_fax,
    company.avatar as company_avatar

    
    from (
        SELECT 
            sale.code, 
            sale.customer_id, 
            sale.sale_date, 
            sale.due_date, 
            sale.email,
            sale.send_email,
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
            sale.sale_statement,
            sale.sale_footer,
            sale.shipped_time,
            customer.name AS customerName,
            customer.phone AS customerPhone,
            customer.fax AS customerFax,   
            customer.email AS customerEmail,   
            DATE_FORMAT(sale.sale_date, '%m/%d/%Y') AS saleDate, 
            DATE_FORMAT(sale.due_date, '%m/%d/%Y') AS dueDate, 
            CONCAT('$', FORMAT(sale.grand_total,2)) AS grand_total,

            CONCAT(
        '[',
            
            '{',
                '\"tableName\":\"sale_vs_item\"', 
                ',\"data\":[',
                                GROUP_CONCAT(
                                DISTINCT(
                                JSON_OBJECT(
                                    'id',CONCAT(IFNULL(sale_vs_item.id,'')),
                                    'purchase_vs_itemId', CONCAT(IFNULL(sale_vs_item.purchase_vs_itemId,'')),
                                    'item_name', CONCAT(IFNULL(item.name,'')),
                                    'purchase_code', CONCAT(IFNULL(purchase.code,'')),
                                    'item_brand', CONCAT(IFNULL(item.brand,'')),
                                    'selling_type', CONCAT(IFNULL(sale_vs_item.selling_type,'')),
                                    'qty', CONCAT(IFNULL(ROUND(sale_vs_item.qty),'')),
                                    'returnedQty', CONCAT(IFNULL(ROUND(returned_items.returnedQty),'')),
                                    'price', CONCAT(IFNULL(sale_vs_item.price,'')),
                                    'total', CONCAT(IFNULL(sale_vs_item.total,''))
                                )) SEPARATOR ','),
                            ']',
            '}', 

      
        
        ']'
        ) AS multiTables


        FROM sale 
        INNER JOIN customer ON customer.id = sale.customer_id
        left JOIN sale_vs_item ON sale_vs_item.saleId = sale.id AND sale_vs_item.deleted = '0'
        left JOIN 
        
        (
            SELECT SUM(sale_vs_return.lost_qty) returnedQty,  sale_vs_return.sale_vs_itemId AS itemId FROM sale_vs_return
            WHERE sale_vs_return.saleId = '$sale_id' AND sale_vs_return.deleted = '0' GROUP BY sale_vs_return.sale_vs_itemId 
        ) returned_items 
        
        ON returned_items.itemId = sale_vs_item.id 
        left JOIN purchase_vs_item ON sale_vs_item.purchase_vs_itemId = purchase_vs_item.id  
        left JOIN purchase ON purchase_vs_item.purchaseId = purchase.id  
        left JOIN item ON purchase_vs_item.item_id = item.id
        WHERE sale.deleted = '0'
        AND sale.id = '$sale_id' ) as a, company;";





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

// echoReturnObject("ok", $rows, 0, $mt, array());
// mysqli_free_result($result);
// mysqli_close($con);

?>

 
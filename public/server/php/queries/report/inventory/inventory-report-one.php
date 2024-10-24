<?php


 //PURCHASE DETAILED REPORT
 // $_POST["id"] = 4;//COMMENT THIS
 $id = mysqli_real_escape_string($con, $_POST["id"]); 




        $queryReport = "

        SELECT 


            purchase.id AS id,       
            purchase.code AS code, 
            provider.name AS vendor,   
            purchase.reference_number,       

            
            CONCAT('$', FORMAT(SUM(purchase_vs_item.qty * purchase_vs_item.unit_price),2) ) AS totalPurchasedAmount,
            SUM(FLOOR(purchase_vs_item.qty)) AS totalPurchaseQty,       

            FLOOR(purchaseVSsoldItem.totalSoldQty) AS totalSoldQty,
            CONCAT('$', FORMAT(purchaseVSsoldItem.totalSoldAmount,2) ) AS totalSoldAmount,

            CONCAT('$', FORMAT(IFNULL(totalCogs.totalCogs, '0.00'),2) ) AS totalCogs,
            CONCAT('$', FORMAT(purchaseVSsoldItem.profit,2) ) AS profit,


            item.name as item_name,
            item_unit.name as unit_name,
            purchase_vs_item.qty,
            purchase_vs_item.sold_qty,
            FLOOR(CONCAT(purchase_vs_item.qty - purchase_vs_item.sold_qty))  as available,
            CONCAT('$', CAST(FORMAT(purchase_vs_item.unit_price + (purchase_vs_item.cogs_row_amount / purchase_vs_item.qty), 2) AS CHAR CHARACTER SET utf8mb4)) as unitTotalCost,
            CONCAT('$', CAST(FORMAT(purchase_vs_item.total_price, 2) AS CHAR CHARACTER SET utf8mb4)) as rowTotal,
            CONCAT('$', IF(purchase_vs_item.sold_qty != '0', CAST(FORMAT(purchase_vs_item.sold_amount/purchase_vs_item.sold_qty, 2) AS CHAR CHARACTER SET utf8mb4), '0.00')) as avg_sold_price,

            purchaseVSsoldItem.soldItem AS soldItem



        FROM  purchase_vs_item 

        LEFT JOIN purchase ON purchase_vs_item.purchaseId = purchase.id 

        LEFT JOIN provider ON purchase.provider_id = provider.id 

        LEFT JOIN  item ON purchase_vs_item.item_id = item.id 

        LEFT JOIN  item_unit ON purchase_vs_item.type_selling = item_unit.id 

     
        LEFT JOIN 
                    (
                        SELECT purchase_vs_expenses.purchaseId AS purchase_id,  
                        SUM(purchase_vs_expenses.amount) AS totalCogs 
                        FROM purchase_vs_expenses 
                        WHERE purchaseId = '$id' AND purchase_vs_expenses.deleted = '0'  
                    ) AS totalCogs ON totalCogs.purchase_id = '$id'

        
        LEFT JOIN
        

        (
            SELECT

                    purchase_vs_item.purchaseId AS purchase_id,
                    purchase_vs_item.id AS id,
                    SUM((sale_vs_item.qty * sale_vs_item.price)) AS totalSoldAmount,
                    SUM((sale_vs_item.qty)) AS totalSoldQty,
                    SUM(((sale_vs_item.price - (purchase_vs_item.unit_price + (purchase_vs_item.cogs_row_amount / purchase_vs_item.qty))) * sale_vs_item.qty)) AS profit,

                    CONCAT( '[',
                    GROUP_CONCAT(
                                DISTINCT(
                                JSON_OBJECT(
                                    'sale_id',CONCAT(sale.id),
                                    'saleCode',CONCAT(sale.code),
                                    'saleDate', CONCAT(DATE_FORMAT(sale.sale_date, '%m/%d/%Y')),
                                    'customer', CONCAT(customer.name),
                                    'name', CONCAT(item.name),
                                    'qty', CONCAT(FLOOR(sale_vs_item.qty)),
                                    'soldPrice', CONCAT('$', CAST(FORMAT(sale_vs_item.price, 2) AS CHAR CHARACTER SET utf8mb4)), 
                                    'rowTotal', CONCAT('$',CAST(FORMAT((sale_vs_item.qty * sale_vs_item.price), 2) AS CHAR CHARACTER SET utf8mb4) ),
                                    'rowTotalEarnings', CONCAT('$', CAST(FORMAT(((sale_vs_item.price - (purchase_vs_item.unit_price + (purchase_vs_item.cogs_row_amount / purchase_vs_item.qty))) * sale_vs_item.qty), 2) AS CHAR CHARACTER SET utf8mb4))
                                )) SEPARATOR ',
                                '),
                            ']'
                                            
                    ) AS soldItem

                FROM sale_vs_item

                    LEFT JOIN 
                        purchase_vs_item ON sale_vs_item.purchase_vs_itemId = purchase_vs_item.id 

                    LEFT JOIN 
                        item ON purchase_vs_item.item_id = item.id

                    LEFT JOIN 
                        sale ON sale_vs_item.saleId = sale.id

                    LEFT JOIN 
                        customer ON sale.customer_id = customer.id

                WHERE sale_vs_item.deleted = '0' AND sale_vs_item.purchase_vs_itemId = purchase_vs_item.id AND purchase_vs_item.id = '$id' 
                GROUP BY purchase_vs_item.purchaseId


        ) AS purchaseVSsoldItem ON purchaseVSsoldItem.id = '$id'

        
        WHERE purchase_vs_item.id = '$id'  AND purchase_vs_item.deleted = '0'";
        


?>
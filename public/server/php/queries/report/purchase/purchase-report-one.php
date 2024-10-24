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
            
             CONCAT('$', 
                        COALESCE(
                                    FORMAT(
                                    (purchaseVSsoldItem.totalSoldAmount - 
                                    SUM(purchase_vs_item.cogs_row_amount) - SUM(purchase_vs_item.qty * purchase_vs_item.unit_price)),2
                                    ), '0.00'
                                )
             
             ) AS totalProfit,

                  

            COALESCE(FLOOR(purchaseVSsoldItem.totalSoldQty), '0') AS totalSoldQty,
            CONCAT('$', COALESCE(FORMAT(purchaseVSsoldItem.totalSoldAmount,2),'0.00') ) AS totalSoldAmount,

            CONCAT('$', FORMAT(IFNULL(totalCogs.totalCogs, '0.00'),2) ) AS totalCogs,
            CONCAT('$', COALESCE(FORMAT(purchaseVSsoldItem.profit,2),'0.00') ) AS profit,

            CONCAT( '[',
            GROUP_CONCAT(
                        DISTINCT(
                        JSON_OBJECT(
                            'id',CONCAT(purchase_vs_item.id),
                            'name', CONCAT(item.name),
                            'type_selling', CONCAT(item_unit.name),
                            'purchase_qty', CONCAT(FLOOR(purchase_vs_item.qty)),
                            'sold_qty', FLOOR(CONCAT(purchase_vs_item.sold_qty)),
                            'sold_amount', sold_amount,
                            'avaialable', FLOOR(CONCAT(purchase_vs_item.qty - purchase_vs_item.sold_qty)),
                            'unitTotalCost', CONCAT('$', CAST(FORMAT(purchase_vs_item.unit_price + (purchase_vs_item.cogs_row_amount / purchase_vs_item.qty), 2) AS CHAR CHARACTER SET utf8mb4)), 
                            'rowTotal', CONCAT('$', CAST(FORMAT(purchase_vs_item.total_price, 2) AS CHAR CHARACTER SET utf8mb4)), 
                            'avg_sold_price', CONCAT('$', IF(purchase_vs_item.sold_qty != '0', CAST(FORMAT(sold_amount/sold_qty, 2) AS CHAR CHARACTER SET utf8mb4), '0.00')),
                            'item_total_sold', CONCAT('$', IF(purchase_vs_item.sold_qty != '0', CAST(FORMAT(sold_amount, 2) AS CHAR CHARACTER SET utf8mb4), '0.00'))
                        )) SEPARATOR ',
                        '),
                    ']'
                                    
            ) AS pruchaseItem,



            COALESCE(purchaseVSsoldItem.soldItem, '[]') AS soldItem









        FROM  purchase

        LEFT JOIN purchase_vs_item ON purchase_vs_item.purchaseId = purchase.id AND purchase.id = '$id'

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
                    SUM(((sale_vs_item.qty - sale_vs_item.returned_qty) * sale_vs_item.price)) AS totalSoldAmount,
                    SUM((sale_vs_item.qty - sale_vs_item.returned_qty)) AS totalSoldQty,
                    SUM(((sale_vs_item.price - (purchase_vs_item.unit_price + (purchase_vs_item.cogs_row_amount / purchase_vs_item.qty))) * (sale_vs_item.qty - sale_vs_item.returned_qty))) AS profit,

                    CONCAT( '[',
                    GROUP_CONCAT(
                                DISTINCT(
                                JSON_OBJECT(
                                    'sale_id',CONCAT(sale.id),
                                    'saleCode',CONCAT(sale.code),
                                    'saleDate', CONCAT(DATE_FORMAT(sale.sale_date, '%m/%d/%Y')),
                                    'customer', CONCAT(customer.name),
                                    'name', CONCAT(item.name,' ',sale_vs_item.selling_type),
                                    'qty', CONCAT(FLOOR((sale_vs_item.qty - sale_vs_item.returned_qty))),
                                    'soldPrice', CONCAT('$', CAST(FORMAT(sale_vs_item.price, 2) AS CHAR CHARACTER SET utf8mb4)), 
                                    'rowTotalEarnings', CONCAT('$', CAST(FORMAT(((sale_vs_item.price - (purchase_vs_item.unit_price + (purchase_vs_item.cogs_row_amount / purchase_vs_item.qty))) * (sale_vs_item.qty - sale_vs_item.returned_qty)), 2) AS CHAR CHARACTER SET utf8mb4)),
                                    'rowTotal', CONCAT('$',CAST(FORMAT(((sale_vs_item.qty - sale_vs_item.returned_qty) * sale_vs_item.price), 2) AS CHAR CHARACTER SET utf8mb4) )
                                    
                                )) ORDER BY item.name ASC SEPARATOR ',
                                '),
                            ']'
                                            
                    ) AS soldItem




                    







                FROM sale_vs_item

                    LEFT JOIN 
                        purchase_vs_item ON sale_vs_item.purchase_vs_itemId = purchase_vs_item.id AND purchase_vs_item.purchaseId = '$id'

                    LEFT JOIN 
                        item ON purchase_vs_item.item_id = item.id

                    LEFT JOIN 
                        sale ON sale_vs_item.saleId = sale.id

                    LEFT JOIN 
                        customer ON sale.customer_id = customer.id

                WHERE sale_vs_item.deleted = '0' AND sale_vs_item.purchase_vs_itemId = purchase_vs_item.id AND purchase_vs_item.purchaseId = '$id' 
                
                GROUP BY purchase_vs_item.purchaseId  ORDER BY item.name ASC 


        ) AS purchaseVSsoldItem ON purchaseVSsoldItem.purchase_id = '$id'


        
        WHERE purchase.id = '$id'  AND purchase_vs_item.deleted = '0' ORDER BY item.name";
        
        

        //echo  $queryReport."<br><br>";











?>
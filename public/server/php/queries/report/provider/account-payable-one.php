<?php


 //ACCOUNT RECEIVABLE REPORT FOR 1 provider
 //$_POST["id"] = 6;//COMMENT THIS LINE WHEN FINISH TESTING 
 $id = mysqli_real_escape_string($con, $_POST["id"]); 




/*
        $queryReport = "

        SELECT 

            provider.id AS provider_id,
            provider.name, 
            company.company_name AS company_name, 
            DATE_FORMAT(NOW(), '%m/%d/%Y %h:%i %p') AS current_dateTime,
            CONCAT('$', FORMAT(SUM(purchase.general_total_price - purchase.paid_amount),2) ) AS total_due,


            CASE
                    WHEN DATEDIFF(CURDATE(), due_date) <= 0 THEN 'No Overdue'
                    WHEN DATEDIFF(CURDATE(), due_date) <= 30 AND DATEDIFF(CURDATE(), due_date) > 0 THEN '1 - 30 Days Past Due'
                    WHEN DATEDIFF(CURDATE(), due_date) <= 60 THEN '31 - 60 Days Past Due'
                    WHEN DATEDIFF(CURDATE(), due_date) <= 90 THEN '61 - 90 Days Past Due'
                    ELSE 'Over 90 Days Past Due'
             END AS overdue_age,

             CONCAT('$',FORMAT(SUM(general_total_price - paid_amount),2)) AS ageDueAmount,


            CONCAT( '[',
            GROUP_CONCAT(
                        DISTINCT(
                        JSON_OBJECT(
                            'id',CONCAT(purchase.id),
                            'code',CONCAT(purchase.code),
                            'date', CONCAT(DATE_FORMAT(purchase.purchase_date, '%m/%d/%Y')),
                            'due_date', CONCAT(DATE_FORMAT(purchase.due_date, '%m/%d/%Y')),
                            'due_amount',  CONCAT('$', CAST(FORMAT((general_total_price - paid_amount), 2) AS CHAR CHARACTER SET utf8mb4)),      
                            'original_amount',  CONCAT('$', CAST(FORMAT((general_total_price), 2) AS CHAR CHARACTER SET utf8mb4)),      
                            'paid_amount',  CONCAT('$', CAST(FORMAT(paid_amount, 2) AS CHAR CHARACTER SET utf8mb4))
                        )) SEPARATOR ',
                        '),
                    ']'
                                    
            ) AS unpaidBill








        FROM  provider

        LEFT JOIN purchase ON purchase.provider_id = provider.id   AND  payment_status != 'paid' AND purchase.deleted = '0'
        LEFT JOIN company ON company.id = '1'

        
        WHERE provider.id = '$id'  
        GROUP BY 
        overdue_age ORDER BY due_date;
        
        
        
        ";*/


        $queryReport = "
        
        
    

        
        
        
        
        




        SELECT 
    provider.id AS provider_id,
    provider.name, 
    company.company_name AS company_name, 
    DATE_FORMAT(NOW(), '%m/%d/%Y %h:%i %p') AS current_dateTime,
    CONCAT('$', FORMAT(SUM(combined.general_total_price - combined.paid_amount), 2)) AS total_due,

    CASE
        WHEN DATEDIFF(CURDATE(), combined.due_date) <= 0 THEN 'No Overdue'
        WHEN DATEDIFF(CURDATE(), combined.due_date) <= 30 AND DATEDIFF(CURDATE(), combined.due_date) > 0 THEN '1 - 30 Days Past Due'
        WHEN DATEDIFF(CURDATE(), combined.due_date) <= 60 THEN '31 - 60 Days Past Due'
        WHEN DATEDIFF(CURDATE(), combined.due_date) <= 90 THEN '61 - 90 Days Past Due'
        ELSE 'Over 90 Days Past Due'
    END AS overdue_age,

    CONCAT('$', FORMAT(SUM(combined.general_total_price - combined.paid_amount), 2)) AS ageDueAmount,

    CONCAT(
        '[',
        GROUP_CONCAT(
            DISTINCT(
                JSON_OBJECT(
                    'id', CONCAT(combined.id),
                    'code', CONCAT(combined.code),
                    'category', CONCAT(combined.category),
                    'date', CONCAT(DATE_FORMAT(combined.purchase_date, '%m/%d/%Y')),
                    'due_date', CONCAT(DATE_FORMAT(combined.due_date, '%m/%d/%Y')),
                    'due_amount', CONCAT('$', CAST(FORMAT((combined.general_total_price - combined.paid_amount), 2) AS CHAR CHARACTER SET utf8mb4)),
                    'original_amount', CONCAT('$', CAST(FORMAT(combined.general_total_price, 2) AS CHAR CHARACTER SET utf8mb4)),
                    'paid_amount', CONCAT('$', CAST(FORMAT(combined.paid_amount, 2) AS CHAR CHARACTER SET utf8mb4))
                )
            ) ORDER BY combined.purchase_date ASC SEPARATOR ','
        ),
        ']'
    ) AS unpaidBill

FROM provider

LEFT JOIN (
    SELECT
        p.id,
        p.provider_id,
        p.code,
        p.purchase_date,
        p.due_date,
        p.general_total_price,
        p.paid_amount,
        p.payment_status,
        'P.O.' AS category,
        p.deleted
    FROM
        purchase AS p
    WHERE
        p.payment_status != 'paid' AND p.deleted = '0'

    UNION ALL

    SELECT
    o.purchaseId AS id,
    o.provider_id,
    purchase.code AS code,
    o.date AS purchase_date,
    o.date AS due_date,
    o.amount AS general_total_price,
    o.paid_amount,
    o.payment_status,
    'COGS' AS category,
    o.deleted
    FROM
    purchase_vs_expenses AS o
    LEFT JOIN purchase ON purchase.id = o.purchaseId AND o.deleted = '0'
    WHERE
        o.payment_status != 'paid' AND o.deleted = '0'
) AS combined ON combined.provider_id = provider.id

LEFT JOIN company ON company.id = '1'

WHERE provider.id = '$id'

GROUP BY 
    overdue_age
ORDER BY 
    combined.due_date;";



/*

    UPDATE purchase_vs_item
    JOIN sale_vs_item ON sale_vs_item.purchase_vs_itemId = purchase_vs_item.id
    JOIN sale_vs_return ON sale_vs_return.sale_vs_itemId = sale_vs_item.id
    SET purchase_vs_item.sold_qty = (
        
        SUM(sale_vs_item.qty - COALESCE(sale_vs_return.lost_qty,0))
    )
    WHERE sale_vs_return.id = NEW.id;




    UPDATE purchase_vs_item SET 
    
            sold_qty = (SELECT SUM(sale_vs_item.qty - COALESCE(sale_vs_return.lost_qty,0)) FROM sale_vs_item
            LEFT JOIN  sale_vs_return ON sale_vs_return.sale_vs_itemId = sale_vs_item.id AND sale_vs_return.deleted = '0'                                   
            WHERE  NEW.sale_vs_itemId = sale_vs_item.id 
            AND sale_vs_item.deleted = '0' GROUP BY sale_vs_item.purchase_vs_itemId),



            sold_amount = (SELECT SUM(price * (qty - COALESCE(sale_vs_return.lost_qty,0))) FROM sale_vs_item 
            LEFT JOIN  sale_vs_return ON sale_vs_return.sale_vs_itemId = sale_vs_item.id AND sale_vs_return.deleted = '0'                                   
            WHERE  NEW.sale_vs_itemId = sale_vs_item.id 
            AND sale_vs_item.deleted = '0' GROUP BY sale_vs_item.purchase_vs_itemId)


WHERE purchase_vs_item.id = sale_vs_item.purchase_vs_itemId AND purchase_vs_item.deleted = '0'    
     */
    








        //echo  $queryReport."<br><br>";











?>
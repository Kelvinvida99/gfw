<?php


 //ACCOUNT RECEIVABLE REPORT FOR ALL provider






        $queryReport = "

        SELECT
                c.id AS id,
                c.name AS provider,
                c.id AS provider_id,
                company.company_name AS company_name, 
                DATE_FORMAT(NOW(), '%m/%d/%Y %h:%i %p') AS current_dateTime,
                CONCAT('$', FORMAT(SUM(CASE WHEN DATEDIFF(CURDATE(), i.due_date) <= 0 THEN ((i.general_total_price - i.paid_amount)) ELSE 0 END),2)) AS current,
                CONCAT('$', FORMAT(SUM(CASE WHEN DATEDIFF(CURDATE(), i.due_date) > 0  AND DATEDIFF(CURDATE(), i.due_date) <= 30 THEN (i.general_total_price - i.paid_amount) ELSE 0 END), 2)) AS total_due_30_days,
                CONCAT('$', FORMAT(SUM(CASE WHEN DATEDIFF(CURDATE(), i.due_date) > 30 AND DATEDIFF(CURDATE(), i.due_date) <= 60 THEN (i.general_total_price - i.paid_amount) ELSE 0 END), 2)) AS total_due_31_to_60_days,
                CONCAT('$', FORMAT(SUM(CASE WHEN DATEDIFF(CURDATE(), i.due_date) > 60 AND DATEDIFF(CURDATE(), i.due_date) <= 90 THEN (i.general_total_price - i.paid_amount) ELSE 0 END), 2)) AS total_due_61_to_90_days,
                CONCAT('$', FORMAT(SUM(CASE WHEN DATEDIFF(CURDATE(), i.due_date) > 90 THEN (i.general_total_price - i.paid_amount) ELSE 0 END), 2)) AS total_due_over_90_days
            FROM
                purchase AS i
                JOIN provider AS c ON i.provider_id = c.id
                LEFT JOIN company ON company.id = '1'
            WHERE
                i.payment_status != 'paid' AND i.deleted = '0'
            GROUP BY
                c.id;
        
        
        
        ";



        $queryReport = "

        SELECT
        c.id AS id,
        c.name AS provider,
        c.id AS provider_id,
        company.company_name AS company_name, 
        DATE_FORMAT(NOW(), '%m/%d/%Y %h:%i %p') AS current_dateTime,
        CONCAT('$', FORMAT(SUM(CASE WHEN DATEDIFF(CURDATE(), combined.due_date) <= 0 THEN ((combined.general_total_price - combined.paid_amount)) ELSE 0 END), 2)) AS current,
        CONCAT('$', FORMAT(SUM(CASE WHEN DATEDIFF(CURDATE(), combined.due_date) > 0  AND DATEDIFF(CURDATE(), combined.due_date) <= 30 THEN (combined.general_total_price - combined.paid_amount) ELSE 0 END), 2)) AS total_due_30_days,
        CONCAT('$', FORMAT(SUM(CASE WHEN DATEDIFF(CURDATE(), combined.due_date) > 30 AND DATEDIFF(CURDATE(), combined.due_date) <= 60 THEN (combined.general_total_price - combined.paid_amount) ELSE 0 END), 2)) AS total_due_31_to_60_days,
        CONCAT('$', FORMAT(SUM(CASE WHEN DATEDIFF(CURDATE(), combined.due_date) > 60 AND DATEDIFF(CURDATE(), combined.due_date) <= 90 THEN (combined.general_total_price - combined.paid_amount) ELSE 0 END), 2)) AS total_due_61_to_90_days,
        CONCAT('$', FORMAT(SUM(CASE WHEN DATEDIFF(CURDATE(), combined.due_date) > 90 THEN (combined.general_total_price - combined.paid_amount) ELSE 0 END), 2)) AS total_due_over_90_days
    FROM (
        SELECT
            i.provider_id,
            i.due_date,
            i.general_total_price,
            i.paid_amount,
            i.payment_status,
            'Inventory' AS category,
            i.deleted
        FROM
            purchase AS i
        WHERE
            i.payment_status != 'paid' AND i.deleted = '0'
        UNION ALL
        SELECT
            o.provider_id,
            o.date AS due_date,
            o.amount AS general_total_price,
            o.paid_amount,
            o.payment_status,
            'COGS' AS category,
            o.deleted
        FROM
            purchase_vs_expenses AS o
        WHERE
            o.payment_status != 'paid' AND o.deleted = '0'
    ) AS combined
    JOIN provider AS c ON combined.provider_id = c.id
    LEFT JOIN company ON company.id = '1'
    GROUP BY
        c.id;


";









        
        //\'rowTotal', CONCAT('$', CAST(FORMAT(purchase_vs_item.total_price, 2) AS CHAR CHARACTER SET utf8mb4)), 
        //CONCAT('$', IF(purchase_vs_item.sold_qty != '0', CAST(FORMAT((i.general_total_price - i.paid_amount), 2) AS CHAR CHARACTER SET utf8mb4), '0.00'))
        //CAST(FORMAT((i.general_total_price - i.paid_amount), 2) AS CHAR CHARACTER SET utf8mb4)
        //echo  $queryReport."<br><br>";











?>
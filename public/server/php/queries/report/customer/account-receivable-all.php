<?php


 //ACCOUNT RECEIVABLE REPORT FOR ALL CUSTOMER






        $queryReport = "

        SELECT
                c.id AS id,
                c.name AS customer,
                c.id AS customer_id,
                company.company_name AS company_name, 
                DATE_FORMAT(NOW(), '%m/%d/%Y %h:%i %p') AS current_dateTime,
                CONCAT('$', FORMAT(SUM(CASE WHEN DATEDIFF(CURDATE(), i.due_date) < 0 THEN (i.grand_total - i.paid_amount) ELSE 0 END),2)) AS current,
                CONCAT('$', FORMAT(SUM(CASE WHEN DATEDIFF(CURDATE(), i.due_date) > 0 AND DATEDIFF(CURDATE(), i.due_date) <= 30 THEN (i.grand_total - i.paid_amount) ELSE 0 END),2)) AS total_due_30_days,
                CONCAT('$', FORMAT(SUM(CASE WHEN DATEDIFF(CURDATE(), i.due_date) > 30 AND DATEDIFF(CURDATE(), i.due_date) <= 60 THEN (i.grand_total - i.paid_amount) ELSE 0 END),2)) AS total_due_31_to_60_days,
                CONCAT('$', FORMAT(SUM(CASE WHEN DATEDIFF(CURDATE(), i.due_date) > 60 AND DATEDIFF(CURDATE(), i.due_date) <= 90 THEN (i.grand_total - i.paid_amount) ELSE 0 END),2)) AS total_due_61_to_90_days,
                CONCAT('$', FORMAT(SUM(CASE WHEN DATEDIFF(CURDATE(), i.due_date) > 90 THEN (i.grand_total - i.paid_amount) ELSE 0 END),2)) AS total_due_over_90_days
            FROM
                sale AS i
                JOIN customer AS c ON i.customer_id = c.id
                LEFT JOIN company ON company.id = '1'
            WHERE
                i.payment_status != 'paid' AND i.deleted = '0'
            GROUP BY
                c.id;
        
        
        
        ";
        
        

        //echo  $queryReport."<br><br>"; 











?>
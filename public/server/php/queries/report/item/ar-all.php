<?php


 //ACCOUNT RECEIVABLE REPORT FOR ALL CUSTOMER






        $queryReport = "

        SELECT
                c.id AS id,
                c.name AS customer,
                SUM(CASE WHEN DATEDIFF(CURDATE(), i.due_date) < 0 THEN (i.grand_total - i.paid_amount) ELSE 0 END) AS current,
                SUM(CASE WHEN DATEDIFF(CURDATE(), i.due_date) > 0 AND DATEDIFF(CURDATE(), i.due_date) <= 30 THEN (i.grand_total - i.paid_amount) ELSE 0 END) AS total_due_30_days,
                SUM(CASE WHEN DATEDIFF(CURDATE(), i.due_date) > 30 AND DATEDIFF(CURDATE(), i.due_date) <= 60 THEN (i.grand_total - i.paid_amount) ELSE 0 END) AS total_due_31_to_60_days,
                SUM(CASE WHEN DATEDIFF(CURDATE(), i.due_date) > 60 AND DATEDIFF(CURDATE(), i.due_date) <= 90 THEN (i.grand_total - i.paid_amount) ELSE 0 END) AS total_due_61_to_90_days,
                SUM(CASE WHEN DATEDIFF(CURDATE(), i.due_date) > 90 THEN (i.grand_total - i.paid_amount) ELSE 0 END) AS total_due_over_90_days
            FROM
                sale AS i
                JOIN customer AS c ON i.customer_id = c.id
            WHERE
                i.payment_status != 'paid' AND i.deleted = '0'
            GROUP BY
                c.id;
        
        
        
        ";
        
        

        //echo  $queryReport."<br><br>";











?>
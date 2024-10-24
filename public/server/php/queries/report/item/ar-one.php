<?php


 //ACCOUNT RECEIVABLE REPORT FOR 1 CUSTOMER
 $_POST["id"] = 6;//COMMENT THIS LINE WHEN FINISH TESTING
 $id = mysqli_real_escape_string($con, $_POST["id"]); 





        $queryReport = "

        SELECT 

            customer.id AS customer_id,
            customer.name, 
            CONCAT('$', FORMAT(SUM(sale.grand_total - sale.paid_amount),2) ) AS total,


            CASE
                    WHEN DATEDIFF(CURDATE(), due_date) < 0 THEN '0 days'
                    WHEN DATEDIFF(CURDATE(), due_date) <= 30 AND DATEDIFF(CURDATE(), due_date) > 0 THEN '30 days'
                    WHEN DATEDIFF(CURDATE(), due_date) <= 60 THEN '60 days'
                    WHEN DATEDIFF(CURDATE(), due_date) <= 90 THEN '90 days'
                    ELSE 'More than 90 days'
             END AS overdue_age,


            CONCAT( '[',
            GROUP_CONCAT(
                        DISTINCT(
                        JSON_OBJECT(
                            'id',CONCAT(sale.id),
                            'code',CONCAT(sale.code),
                            'date', CONCAT(DATE_FORMAT(sale.sale_date, '%m/%d/%Y')),
                            'due_date', CONCAT(DATE_FORMAT(sale.due_date, '%m/%d/%Y')),
                            'total_due',  CONCAT('$', CAST(FORMAT((grand_total - paid_amount), 2) AS CHAR CHARACTER SET utf8mb4)),      
                            'paid_amount',  CONCAT('$', CAST(FORMAT(paid_amount, 2) AS CHAR CHARACTER SET utf8mb4))
                        )) SEPARATOR ',
                        '),
                    ']'
                                    
            ) AS unpaidInvoice








        FROM  sale

        LEFT JOIN customer ON sale.customer_id = customer.id    


        
        WHERE sale.customer_id = '$id'  AND  payment_status != 'paid' AND sale.deleted = '0'
        GROUP BY 
        FIELD(overdue_age, '0 days', '30 days', '60 days', '90 days', 'More than 90 days');
        
        
        
        ";
        
        

        //echo  $queryReport."<br><br>";











?>
<?php


 //ACCOUNT RECEIVABLE REPORT FOR 1 CUSTOMER
 //$_POST["id"] = 6;//COMMENT THIS LINE WHEN FINISH TESTING
 $id = mysqli_real_escape_string($con, $_POST["id"]); 
 //$id = isset($_POST["id"]) ? $_POST["id"] : null;






        $queryReport = "

        SELECT 
 
            customer.id AS customer_id,
            customer.name,             
            customer.email, 
            company.company_name AS company_name, 
            DATE_FORMAT(NOW(), '%m/%d/%Y %h:%i %p') AS current_dateTime,
            CONCAT('$', FORMAT(SUM(    (sale.grand_total + sale.spent_credit) - (sale.paid_amount + sale.credit_amount )),2) ) AS ageDueAmount,


            CASE
                    WHEN DATEDIFF(CURDATE(), due_date) <= 0 THEN ' No Overdue'
                    WHEN DATEDIFF(CURDATE(), due_date) <= 30 AND DATEDIFF(CURDATE(), due_date) > 0 THEN '1 - 30 Days Past Due'
                    WHEN DATEDIFF(CURDATE(), due_date) <= 60 THEN '31 - 60 Days Past Due'
                    WHEN DATEDIFF(CURDATE(), due_date) <= 90 THEN '61 - 90 Days Past Due'
                    ELSE 'Over 90 Days Past Due'
             END AS overdue_age,


            CONCAT( '[',
            GROUP_CONCAT(
                        DISTINCT(
                        JSON_OBJECT(
                            'id',CONCAT(sale.id),
                            'code',CONCAT(sale.code),
                            'date', CONCAT(DATE_FORMAT(sale.sale_date, '%m/%d/%Y')),
                            'due_date', CONCAT(DATE_FORMAT(sale.due_date, '%m/%d/%Y')),
                            'due_amount',  CONCAT('$', CAST(FORMAT((    (sale.grand_total + sale.spent_credit) - (sale.paid_amount + sale.credit_amount )), 2) AS CHAR CHARACTER SET utf8mb4)),      
                            'original_amount',  CONCAT('$', CAST(FORMAT((grand_total), 2) AS CHAR CHARACTER SET utf8mb4)),      
                            'paid_amount',  CONCAT('$', CAST(FORMAT(paid_amount, 2) AS CHAR CHARACTER SET utf8mb4))
                        )) ORDER BY sale.id ASC SEPARATOR ',
                        '),
                    ']'
                                    
            ) AS unpaidBill








        FROM  customer

        LEFT JOIN sale ON sale.customer_id = customer.id AND payment_status != 'paid'  AND    sale.deleted = '0'
        LEFT JOIN company ON company.id = '1'


        
        WHERE customer.id = '$id' 
         
        GROUP BY 
        overdue_age ORDER BY  overdue_age DESC;
        
        
        
        ";
        
        

        //echo  $queryReport."<br><br>";











?>
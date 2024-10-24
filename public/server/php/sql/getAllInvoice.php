<?php

require "../auth/user.php";
require "../auth/checkAuth.php";
$_POST["entity"] = "receivepayment";
$REQUESTED_ACTION = "readOnly"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE  VALUES ARE readOnly AND readwrite, THIS FILE WILL DOES SELECTS TO DATABASE, SO IT'S A  "readOnly" 
require "../auth/checkAuthorization.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP
require "../sqlFunctions/returnObject.php";

$customer_id            = mysqli_real_escape_string($con, $_POST["customer_id"]); 

$sql = "SELECT 

        CONCAT(
                    '[',
                        
                        '{',
                            '\"tableName\":\"payment_vs_sale\"', 
                            ',\"data\":[',
                                        GROUP_CONCAT(
                                                DISTINCT(
                                                JSON_OBJECT(
                                                    'id','',
                                                    'sale_id', CONCAT('[', JSON_OBJECT('id',   CONCAT(sale.id), 'displayText', CONCAT(sale.code, ' - ',DATE_FORMAT(sale.sale_date, '%m/%d/%Y') ) ),']'),                   
                                                    'po_total_amount', CONCAT(sale.grand_total),
                                                    'due_amount', CONCAT( ( (sale.grand_total + sale.spent_credit) - (sale.paid_amount + sale.credit_amount )) ),  
                                                    'sent_amount', '0'                          
                                                    )

                                                ) ORDER BY sale.id ASC SEPARATOR ','),
                                    ']',
                        '}',  
                    
                    ']'
                )
        
      AS multiTables

 


   FROM sale 
    
        
    WHERE sale.deleted = '0' AND sale.customer_id = '$customer_id'  AND ( (sale.grand_total + sale.spent_credit) - (sale.paid_amount + sale.credit_amount )) > 0
    
 ;

    ";





if (!$result = mysqli_query($con, $sql)) {
  echoReturnObject("MySqlError");
  exit;
}
$rows = [];
while ($row = $result->fetch_assoc()) {
  $rows[] = $row;
  // print_r($row);
}
$mt = "[]";
if (isset($rows[0]["multiTables"])) {
  $mt = $rows[0]["multiTables"];
  unset($rows[0]["multiTables"]);
}



echoReturnObject("ok", $rows, 0, $mt);
mysqli_free_result($result);
mysqli_close($con);




?>
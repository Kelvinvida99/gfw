<?php



///////////CHECKING IF sale HAS SALES PAYMENTS TO ITSELF
///////////CHECKING IF sale HAS SALES PAYMENTS TO ITSELF
///////////CHECKING IF sale HAS SALES PAYMENTS TO ITSELF
///////////CHECKING IF sale HAS SALES PAYMENTS TO ITSELF
///////////CHECKING IF sale HAS SALES PAYMENTS TO ITSELF

function saleHasPayment($con, $id){

  $beforeUpdateQuery = "SELECT COUNT(*) AS rowsQty, GROUP_CONCAT(receivepayment.code) AS paymentsCode FROM payment_vs_sale  
  LEFT JOIN receivepayment ON receivepayment.id = payment_vs_sale.receivepaymentId  
   WHERE payment_vs_sale.sale_id = '$id' AND receivepayment.deleted = '0' AND payment_vs_sale.deleted = '0' ;";

  $resultPayments = executeSelectQuery($con, $beforeUpdateQuery);
  $returObj = new stdClass();
  $returObj->val = "ok";
  $returObj->restrictedFields = [];
  $returObj->info = new stdClass();
  $returObj->info->paymentQty = 0;
  $returObj->info->paymentCode = "";

    while($rs = $resultPayments->fetch_array(MYSQLI_ASSOC)) { 
      
        $returObj->info->paymentQty = $rs["rowsQty"];
        $returObj->info->paymentCode = $rs["paymentsCode"];
    }


   
  
    if($returObj->info->paymentQty > 0){
      
        $returObj->val = "saleHasPayment";
       
        //RESTRICTED FIELD
        $returObj->restrictedFields = [
          (object) ['id' => 'customer_id'],
          (object) ['id' => 'sale_date'],
          (object) ['id' => 'grand_total'],
          (object) ['id' => 'sale_vs_item']          
        ];
        //customer, fecha sale, multitable

        $returObj->fieldsToRemove = ["due_date", "grand_total"];
        $returObj->multiTablesToRemove = ["sale_vs_item"];
  

  }
  mysqli_free_result($resultPayments);
  return $returObj;
}

 



?>
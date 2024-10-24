<?php


///////////CHECKING IF PURCHASE HAS SALES PAYMENTS TO ITSELF
///////////CHECKING IF PURCHASE HAS SALES PAYMENTS TO ITSELF
///////////CHECKING IF PURCHASE HAS SALES PAYMENTS TO ITSELF
///////////CHECKING IF PURCHASE HAS SALES PAYMENTS TO ITSELF
///////////CHECKING IF PURCHASE HAS SALES PAYMENTS TO ITSELF

function purchaseHasPayment($con, $id){

  $beforeUpdateQuery = "SELECT COUNT(*) AS rowsQty,  GROUP_CONCAT(sentpayment.code) AS paymentsCode  FROM payment_vs_po_or_services 
  LEFT JOIN sentpayment ON sentpayment.id = payment_vs_po_or_services.sentpaymentId    
  WHERE payment_vs_po_or_services.expense_id = '$id' AND sentpayment.deleted = '0' AND payment_vs_po_or_services.deleted = '0';";

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
      
        $returObj->val = "purchaseHasPayment";
       
      //RESTRICTED FIELD
      $returObj->restrictedFields = [
        (object) ['id' => 'due_date'],  
        (object) ['id' => 'fill_bill_date'],
        (object) ['id' => 'general_total_price'],
        (object) ['id' => 'general_total_selling_price'],
        (object) ['id' => 'bill_date'],
        (object) ['id' => 'purchase_vs_expenses'],
        (object) ['id' => 'purchase_vs_item']
      ];

        $returObj->fieldsToRemove = ["due_date", "general_total_price", "general_total_selling_price"];
        $returObj->multiTablesToRemove = ["purchase_vs_item"];
  

  }
  mysqli_free_result($resultPayments);
  return $returObj;
}





///////////CHECKING IF PURCHASE HAS SALES ASSOCIATED TO ITSELF
///////////CHECKING IF PURCHASE HAS SALES ASSOCIATED TO ITSELF
///////////CHECKING IF PURCHASE HAS SALES ASSOCIATED TO ITSELF
///////////CHECKING IF PURCHASE HAS SALES ASSOCIATED TO ITSELF
///////////CHECKING IF PURCHASE HAS SALES ASSOCIATED TO ITSELF


function purchaseHasSale($con, $id){
  
  $beforeUpdateQuery = "SELECT GROUP_CONCAT(sale.code SEPARATOR ', ') AS sale_codes, COUNT(sale.code) AS rowsQty  FROM  sale_vs_item 
  LEFT JOIN sale ON sale.id = sale_vs_item.saleId
    LEFT JOIN purchase_vs_item ON sale_vs_item.purchase_vs_itemId = purchase_vs_item.id 
    WHERE  purchase_vs_item.purchaseId = '$id' AND sale_vs_item.deleted = '0'  GROUP BY purchase_vs_item.purchaseId";

  $resultPayments = executeSelectQuery($con, $beforeUpdateQuery);
  $returObj = new stdClass();
  $returObj->val = "ok";
  $returObj->restrictedFields = [];
  $returObj->info = new stdClass();
  $returObj->info->saleQty = 0;
  $returObj->info->saleCodes = "";

    while($rs = $resultPayments->fetch_array(MYSQLI_ASSOC)) { 
      
        $returObj->info->saleQty = $rs["rowsQty"];
        $returObj->info->saleCodes = $rs["sale_codes"]; 
    }
  
  
    if($returObj->info->saleQty > 0){
      
        $returObj->val = "purchaseHasSale";
       
      //RESTRICTED FIELD
      $returObj->restrictedFields = [
        (object) ['id' => 'due_date'],  
        (object) ['id' => 'fill_bill_date'],
        (object) ['id' => 'general_total_price'],
        (object) ['id' => 'general_total_selling_price'],
        (object) ['id' => 'bill_date'],
        (object) ['id' => 'purchase_vs_expenses'],
        (object) ['id' => 'purchase_vs_item']
      ];

        $returObj->fieldsToRemove = ["due_date", "general_total_price", "general_total_selling_price"];
        $returObj->multiTablesToRemove = ["purchase_vs_item"];
  

  }
  mysqli_free_result($resultPayments);
  return $returObj;
}




















?>
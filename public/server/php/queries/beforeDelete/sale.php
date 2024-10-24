<?php



require("../queries/entityFunction/sale-restriction.php");



  ///////////CHECKING IF SALE HAS  PAYMENTS TO ITSELF
  ///////////CHECKING IF SALE HAS  PAYMENTS TO ITSELF
  ///////////CHECKING IF SALE HAS  PAYMENTS TO ITSELF
  ///////////CHECKING IF SALE HAS  PAYMENTS TO ITSELF
  $validIdsToDelete = [];
  $ENTITY_RESTRICTION->info = [];
  foreach($ids as $id){
    $resultFromFuncs = saleHasPayment($con, $id);
    
    if($resultFromFuncs->val !="ok"){

      $ENTITY_RESTRICTION->val = $resultFromFuncs->val;
      $ENTITY_RESTRICTION->info[] = $id;
  
    }
    else{
      $validIdsToDelete[] = $id;
    }
}

$ids = $validIdsToDelete;





  
  











?>
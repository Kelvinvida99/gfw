<?php


require("../queries/entityFunction/purchase-restriction.php");



///////////CHECKING IF PURCHASE HAS SALES PAYMENTS TO ITSELF
///////////CHECKING IF PURCHASE HAS SALES PAYMENTS TO ITSELF
///////////CHECKING IF PURCHASE HAS SALES PAYMENTS TO ITSELF
///////////CHECKING IF PURCHASE HAS SALES PAYMENTS TO ITSELF


$validIdsToDelete = [];
$ENTITY_RESTRICTION->info = [];
foreach($ids as $id){
    $resultFromFuncs = purchaseHasPayment($con, $id);
    //$resultFromFuncs2 = purchaseHasSale($con, $id);
  
  if($resultFromFuncs->val !="ok"){

    $ENTITY_RESTRICTION->val = $resultFromFuncs->val;
    $ENTITY_RESTRICTION->info[] = $id;

  } /*elseif($resultFromFuncs2->val !="ok"){
    $ENTITY_RESTRICTION->val = $resultFromFuncs2->val;
    $ENTITY_RESTRICTION->info[] = $id;
  }*/
  else{
    $validIdsToDelete[] = $id;
  }
}

$ids = $validIdsToDelete;



  
  



?>
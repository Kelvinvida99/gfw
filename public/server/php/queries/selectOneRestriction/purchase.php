<?php


///////////CHECKING IF PURCHASE HAS SALES PAYMENTS TO ITSELF
///////////CHECKING IF PURCHASE HAS SALES PAYMENTS TO ITSELF
///////////CHECKING IF PURCHASE HAS SALES PAYMENTS TO ITSELF
///////////CHECKING IF PURCHASE HAS SALES PAYMENTS TO ITSELF
///////////CHECKING IF PURCHASE HAS SALES PAYMENTS TO ITSELF

require("../queries/entityFunction/purchase-restriction.php");
$resultFromFuncs = purchaseHasPayment($con, $id);


  if($resultFromFuncs->val !="ok"){

    $ENTITY_RESTRICTION->val = $resultFromFuncs->val;
    $ENTITY_RESTRICTION->restrictedFields = $resultFromFuncs->restrictedFields;
    $ENTITY_RESTRICTION->info = $resultFromFuncs->info;
     

  }



///////////CHECKING IF PURCHASE HAS SALES ASSOCIATED TO ITSELF
///////////CHECKING IF PURCHASE HAS SALES ASSOCIATED TO ITSELF
///////////CHECKING IF PURCHASE HAS SALES ASSOCIATED TO ITSELF
///////////CHECKING IF PURCHASE HAS SALES ASSOCIATED TO ITSELF
///////////CHECKING IF PURCHASE HAS SALES ASSOCIATED TO ITSELF
/*$resultFromFuncs = purchaseHasSale($con,$id); DISABLED IT FOR NOW

if($resultFromFuncs->val !="ok"){

  $ENTITY_RESTRICTION->val = $resultFromFuncs->val;
  $ENTITY_RESTRICTION->restrictedFields = $resultFromFuncs->restrictedFields;
  $ENTITY_RESTRICTION->info = $resultFromFuncs->info;



}*/
/**/

?>
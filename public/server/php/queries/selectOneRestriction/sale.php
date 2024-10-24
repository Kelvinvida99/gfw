<?php


///////////CHECKING IF sale HAS SALES PAYMENTS TO ITSELF
///////////CHECKING IF sale HAS SALES PAYMENTS TO ITSELF
///////////CHECKING IF sale HAS SALES PAYMENTS TO ITSELF
///////////CHECKING IF sale HAS SALES PAYMENTS TO ITSELF
///////////CHECKING IF sale HAS SALES PAYMENTS TO ITSELF 

require("../queries/entityFunction/sale-restriction.php");










  ///////////CHECKING IF SALE HAS  PAYMENTS TO ITSELF
  ///////////CHECKING IF SALE HAS  PAYMENTS TO ITSELF
  ///////////CHECKING IF SALE HAS  PAYMENTS TO ITSELF
  ///////////CHECKING IF SALE HAS  PAYMENTS TO ITSELF
  $resultFromFuncs = saleHasPayment($con, $id);
  
    if($resultFromFuncs->val !="ok"){
  
       //PREPARING RESTRICTION GENERAL VALUES
       //PREPARING RESTRICTION GENERAL VALUES
       //PREPARING RESTRICTION GENERAL VALUES
       $ENTITY_RESTRICTION->val = $resultFromFuncs->val;
       $ENTITY_RESTRICTION->restrictedFields = $resultFromFuncs->restrictedFields;
       $ENTITY_RESTRICTION->info = $resultFromFuncs->info;
        
  
    }














?>
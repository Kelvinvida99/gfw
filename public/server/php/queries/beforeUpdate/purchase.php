<?php


require("../queries/entityFunction/purchase-restriction.php");



///////////CHECKING IF PURCHASE HAS SALES PAYMENTS TO ITSELF
///////////CHECKING IF PURCHASE HAS SALES PAYMENTS TO ITSELF
///////////CHECKING IF PURCHASE HAS SALES PAYMENTS TO ITSELF
///////////CHECKING IF PURCHASE HAS SALES PAYMENTS TO ITSELF
$resultFromFuncs = purchaseHasPayment($con, $id);

  if($resultFromFuncs->val !="ok"){

    $obj = new stdClass();
    $obj->fields = $fields ;
    $obj->values = $values ;
    $obj->multiTables = $multiTables ;
    $obj->fieldsToRemove =  $resultFromFuncs->fieldsToRemove;
    $obj->multiTablesToRemove = $resultFromFuncs->multiTablesToRemove;
   //REMOVING RESTRICTED FIELDS FOR update.php GENERAL FILE
   //REMOVING RESTRICTED FIELDS FOR update.php GENERAL FILE
   //REMOVING RESTRICTED FIELDS FOR update.php GENERAL FILE
    $rObj = removeRestrictedFields($obj);
    $fields            = $rObj->fields;
    $values            = $rObj->values; 
    $multiTables       = $rObj->multiTables;

    //PREPARING RESTRICTION GENERAL VALUES
    //PREPARING RESTRICTION GENERAL VALUES
    //PREPARING RESTRICTION GENERAL VALUES
    $ENTITY_RESTRICTION->val = $resultFromFuncs->val;
    $ENTITY_RESTRICTION->restrictedFields = $resultFromFuncs->restrictedFields;
    $ENTITY_RESTRICTION->info = $resultFromFuncs->info;

  }


///////////CHECKING IF PURCHASE HAS SALES ASSOCIATED TO ITSELF
///////////CHECKING IF PURCHASE HAS SALES ASSOCIATED TO ITSELF
///////////CHECKING IF PURCHASE HAS SALES ASSOCIATED TO ITSELF
///////////CHECKING IF PURCHASE HAS SALES ASSOCIATED TO ITSELF

/*if( $ENTITY_RESTRICTION->val == "ok"){ //DISABLED IT TEMPORARY

    $resultFromFuncs = purchaseHasSale($con,$id);

    if($resultFromFuncs->val !="ok"){

      $obj = new stdClass();
      $obj->fields = $fields ;
      $obj->values = $values ;
      $obj->multiTables = $multiTables ;
      $obj->fieldsToRemove =  $resultFromFuncs->fieldsToRemove;
      $obj->multiTablesToRemove = $resultFromFuncs->multiTablesToRemove;
    //REMOVING RESTRICTED FIELDS FOR update.php GENERAL FILE
    //REMOVING RESTRICTED FIELDS FOR update.php GENERAL FILE
    //REMOVING RESTRICTED FIELDS FOR update.php GENERAL FILE
      $rObj = removeRestrictedFields($obj); //writeToTestTxt(json_encode($obj)); exit;
      $fields            = $rObj->fields;
      $values            = $rObj->values; 
      $multiTables       = $rObj->multiTables;

      //PREPARING RESTRICTION GENERAL VALUES
      //PREPARING RESTRICTION GENERAL VALUES
      //PREPARING RESTRICTION GENERAL VALUES
      $ENTITY_RESTRICTION->val = $resultFromFuncs->val;
      $ENTITY_RESTRICTION->restrictedFields = $resultFromFuncs->restrictedFields;
      $ENTITY_RESTRICTION->info = $resultFromFuncs->info;

    }
}*/ 

/*
function removeRestrictedFields22($obj){


  foreach ($obj->fieldsToRemove as $f) {   

        $key = array_search($f, $obj->fields );
        if ($key !== false) {

            unset($obj->fields[$key]);
            unset($obj->values[$key]);
              
          }
      }


      foreach ($obj->multiTablesToRemove as $mt) {   

          $key = findIndexByPropertyValue22($obj->multiTables, "tableName", $mt);
          if ($key !== false) {

              unset($obj->multiTables[$key]);
                
            }
        }


  $obj->fields = array_values($obj->fields);
  $obj->values = array_values($obj->values);
  $obj->multiTables = array_values($obj->multiTables);

  return $obj;

}


function findIndexByPropertyValue22($array, $property, $value) {
  foreach ($array as $index => $item) {
      if ($item->{$property} == $value) {
          return $index;
      }
  }
  return false; // Return -1 if the value is not found
}*/
?>
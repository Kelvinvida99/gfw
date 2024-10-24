<?php



require("../queries/entityFunction/sale-restriction.php");
require("../queries/entityFunction/sale-qtylostvalidate.php");



  ///////////CHECKING IF SALE HAS  PAYMENTS TO ITSELF
  ///////////CHECKING IF SALE HAS  PAYMENTS TO ITSELF
  ///////////CHECKING IF SALE HAS  PAYMENTS TO ITSELF
  ///////////CHECKING IF SALE HAS  PAYMENTS TO ITSELF 
  $resultFromFuncs = saleHasPayment($con, $id);
  
    if($resultFromFuncs->val !="ok"){
  
       // echoReturnObjectRestriction("ok", '[]', '0', "[]", array(), '{}', $resultFromFuncs->val, $resultFromFuncs->restrictedFields);exit;
       /*$fields            = json_decode($_POST["fields"]);
       $values            = json_decode($_POST["values"]); 
       $multiTables       = json_decode($_POST["multiTables"]);
       $resultFromFuncs->fieldsToRemove = ["due_date", "grand_total"];
       $resultFromFuncs->multiTablesToRemove = ["sale_vs_item"];*/

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

$resultFromValidate = saleQtyLostValidate($con, $id, $multiTables);

if ($resultFromValidate->val != "ok") {


  $obj = new stdClass();
  $obj->fields = $fields;
  $obj->values = $values;
  $obj->multiTables = $multiTables;
  $obj->fieldsToRemove = [];
  $obj->multiTablesToRemove = $resultFromValidate->multiTablesToRemove;

  $rObj = removeRestrictedFields($obj);
  $fields            = $rObj->fields;
  $values            = $rObj->values;
  $multiTables       = $rObj->multiTables;


  if ( $ENTITY_RESTRICTION->val == "ok") {
    $ENTITY_RESTRICTION->val = $resultFromValidate->val;
    $ENTITY_RESTRICTION->info = $resultFromValidate->info;
  }else{
    $ENTITY_RESTRICTION->info->saleVsItemID = $resultFromValidate->info->saleVsItemID;
  }
  $ENTITY_RESTRICTION->restrictedFields = [];


}
  
  

/*
function removeRestrictedFields($obj){


      foreach ($obj->fieldsToRemove as $f) {   

            $key = array_search($f, $obj->fields );
            if ($key !== false) {

                unset($obj->fields[$key]);
                unset($obj->values[$key]);
                  
              }
          }

      $obj->fields = array_values($obj->fields);
      $obj->values = array_values($obj->values);
      $obj->multiTables = array_diff($obj->multiTables, $obj->multiTablesToRemove);

      return $obj;

}*/










?>
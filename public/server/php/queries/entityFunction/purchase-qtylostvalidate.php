<?php


///////////valida que la cantidades colocadas en lost no excedan la existencia de los articulos del purchase


function purchaseQtyLostValidate($con, $id, $multiTables)
{



  $returObj = new stdClass();
  $returObj->val = "ok";
  $returObj->restrictedFields = [];
  $returObj->info = new stdClass();
  $returObj->info->purchaseVsItemID = 0;
  $returObj->info->lost_qty = 0;
  // $returObj->info->inventoryStock = [];



  $if_execute_sql = false;

  foreach ($multiTables as $keyMT => $valueMT) {
    if ($valueMT->tableName == "purchase_vs_lost") {

      if (count($valueMT->dataToUpdate) > 0 || count($valueMT->dataToInsert) > 0) {

        //busca las cantidades de los articulos del purchase sin restarle los Lost
        $sql_ItemQtyPurchase = "
              SELECT 
                  purchase_vs_item.id AS id, 
                  purchase_vs_item.qty - purchase_vs_item.sold_qty AS qty_available
              FROM 
                  purchase_vs_item 
                  LEFT JOIN item ON item.id = purchase_vs_item.item_id 
                  LEFT JOIN item_unit ON item_unit.id = purchase_vs_item.type_selling 
              WHERE 
                  purchase_vs_item.deleted = '0' 
                  AND purchase_vs_item.purchaseId = '$id'
          ";



        $result = executeSelectQuery($con, $sql_ItemQtyPurchase);

        
        //para guardar la cantidad total perdida digitada por el usuario y compararla con el total buscando por articulo en el query anterior
        //en la variable $inventoryStock
        $inventoryStock = [];
        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
          $purchaseVsItemId_qty = new stdClass();
          $purchaseVsItemId_qty->id = $rs["id"];
          $purchaseVsItemId_qty->qty_available = $rs["qty_available"];
          $inventoryStock[] = $purchaseVsItemId_qty;
        }
        $if_execute_sql = true;



        foreach ($inventoryStock as $keyIS => $valueIS) {
          $total_ItemQty = 0;


          foreach ($valueMT->dataToUpdate as $keyDTU => $valueDTU) {

            if ($valueDTU->purchase_vs_itemId == $valueIS->id) {
              $total_ItemQty = $total_ItemQty +  $valueDTU->lost_qty;
            }
          }

          foreach ($valueMT->dataToInsert as $keyDTI => $valueDTI) {
            if ($valueDTI->purchase_vs_itemId == $valueIS->id) {
              $total_ItemQty = $total_ItemQty +  $valueDTI->lost_qty;
            }
          }

          if ($total_ItemQty > $valueIS->qty_available) {
            $returObj->val = "insufficientQuantity";
            $returObj->restrictedFields = [];
            $returObj->info = new stdClass();
            $returObj->info->purchaseVsItemID = $valueIS->id;
            // $returObj->info->inventoryStock = $inventoryStock;
            $returObj->multiTablesToRemove = ["purchase_vs_lost"];

            break 2;

          }
        }
      }
    }
  }


  if ($if_execute_sql) {
    mysqli_free_result($result);
  }

  return  $returObj;
}

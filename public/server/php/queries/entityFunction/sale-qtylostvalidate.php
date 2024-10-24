<?php


///////////valida que la cantidades colocadas en lost no excedan la existencia de los articulos del purchase


function saleQtyLostValidate($con, $id, $multiTables)
{



  $returObj = new stdClass();
  $returObj->val = "ok";
  $returObj->restrictedFields = [];
  $returObj->info = new stdClass();
  $returObj->info->saleVsItemID = 0;
  $returObj->info->lost_qty = 0;
  // $returObj->info->inventoryStock = [];



  $if_execute_sql = false;

  foreach ($multiTables as $keyMT => $valueMT) {
    if ($valueMT->tableName == "sale_vs_return") {

      if (count($valueMT->dataToUpdate) > 0 || count($valueMT->dataToInsert) > 0) {

        //busca las cantidades de los articulos del purchase sin restarle los Lost
        $sql_ItemQtySale = "
              SELECT 
                  sale_vs_item.id AS id, 
                  sale_vs_item.qty AS qty_available
              FROM 
                  sale_vs_item 
                  LEFT JOIN purchase_vs_item ON purchase_vs_item.id = sale_vs_item.purchase_vs_itemId 
                  LEFT JOIN item ON item.id = purchase_vs_item.item_id 
                  LEFT JOIN item_unit ON item_unit.id = purchase_vs_item.type_selling 
              WHERE 
                  sale_vs_item.deleted = '0' 
                  AND sale_vs_item.saleId = '$id'
          ";



        $result = executeSelectQuery($con, $sql_ItemQtySale);

        
        //para guardar la cantidad total perdida digitada por el usuario y compararla con el total buscando por articulo en el query anterior
        //en la variable $inventoryStock
        $inventoryStock = [];
        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
          $saleVsItemId_qty = new stdClass();
          $saleVsItemId_qty->id = $rs["id"];
          $saleVsItemId_qty->qty_available = $rs["qty_available"];
          $inventoryStock[] = $saleVsItemId_qty;
        }
        $if_execute_sql = true;



        foreach ($inventoryStock as $keyIS => $valueIS) {
          $total_ItemQty = 0;


          foreach ($valueMT->dataToUpdate as $keyDTU => $valueDTU) {

            if ($valueDTU->sale_vs_itemId == $valueIS->id) {
              $total_ItemQty = $total_ItemQty +  $valueDTU->lost_qty;
            }
          }

          foreach ($valueMT->dataToInsert as $keyDTI => $valueDTI) {
            if ($valueDTI->sale_vs_itemId == $valueIS->id) {
              $total_ItemQty = $total_ItemQty +  $valueDTI->lost_qty;
            }
          }

          if ($total_ItemQty > $valueIS->qty_available) {
            $returObj->val = "insufficientQuantity";
            $returObj->restrictedFields = [];
            $returObj->info = new stdClass();
            $returObj->info->saleVsItemID = $valueIS->id;
            // $returObj->info->inventoryStock = $inventoryStock;
            $returObj->multiTablesToRemove = ["sale_vs_return"];

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

<?php

require "../../../auth/user.php";
require "../../../auth/checkAuth.php";
$_POST["entity"] = "purchase";//COMMENT
$REQUESTED_ACTION = "readOnly"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite, THIS FILE WILL DOES SELECTS TO DATABASE, SO IT'S A  "readOnly"
require "../../../auth/checkAuthorization.php";
require "../../../sqlFunctions/returnObject.php";
require "../../../sqlFunctions/executeSelect.php";
require "../../../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP

    $purchase_id = isset($_POST["purchase_id"]) ? $_POST["purchase_id"] : null;

    // Ahora puedes usar $purchase_id en tu consulta SQL para obtener los datos específicos del purchase.
    $reportQuery = "
        SELECT 
            purchase.*, 
            provider.name AS providerName,
            provider.bill_to_address AS providerBillToAddress, 
            provider.bill_to_city AS providerBillToCity, 
            provider.bill_to_state AS providerBillToState, 
            provider.bill_to_zip AS providerBillToZip, 
            provider.ship_to_address AS providerShipToAddress,
            provider.ship_to_city AS providerShipToCity,
            provider.ship_to_state AS providerShipToState,
            provider.ship_to_zip AS providerShipToZip,
            provider.phone AS providerPhone,
            provider.fax AS providerFax,   
            DATE_FORMAT(purchase.purchase_date, '%m/%d/%Y') AS purchaseDate, 
            CONCAT('$', FORMAT(purchase.general_total_price,2)) AS general_total_price,
            CONCAT(
        '[',
            
            '{',
                '\"tableName\":\"purchase_vs_item\"', 
                ',\"data\":[',
                                GROUP_CONCAT(
                                DISTINCT(
                                JSON_OBJECT(
                                    'id',CONCAT(purchaseVsitem.id),
                                    'item_id', CONCAT(purchaseVsitem.item_id),
                                    'item_id_label', CONCAT(purchaseVsitem.item_id_label),
                                    'type_selling', CONCAT(purchaseVsitem.type_selling),
                                    'item_name', CONCAT(purchaseVsitem.item_name),
                                    'qty', CONCAT(purchaseVsitem.qty),
                                    'unit_price', CONCAT(purchaseVsitem.unit_price),
                                    'selling_price', CONCAT(purchaseVsitem.selling_price),
                                    'total_price', CONCAT(purchaseVsitem.total_price),
                                    'cogs_row_amount', CONCAT(purchaseVsitem.cogs_row_amount)
                                )) SEPARATOR ','),
                          ']',
            '}', 
        
        ']'
        ) AS multiTables
        FROM purchase 
        LEFT JOIN provider ON CONCAT(provider.id) = CONCAT(purchase.provider_id) 
        LEFT JOIN (
            SELECT purchase_vs_item.id AS id, 
            CONCAT('[', JSON_OBJECT('id', CONCAT(item.name),'displayText',  CONCAT(item.name)), ']') AS item_id,
            CONCAT(
                '[',
                JSON_OBJECT(
                    'id', purchase_vs_item.type_selling,
                    'displayText', item_unit.name
                ),
                ']'
            ) AS type_selling,
            item.name AS item_name,
            item.id AS item_id_label,
            purchase_vs_item.qty AS qty,
            purchase_vs_item.unit_price AS unit_price, 
            purchase_vs_item.selling_price AS selling_price,
            purchase_vs_item.total_price AS total_price,
            purchase_vs_item.cogs_row_amount AS cogs_row_amount,
            purchase_vs_item.purchaseId AS purchaseId
            FROM purchase_vs_item 
            LEFT JOIN item ON item.id = purchase_vs_item.item_id 
            LEFT JOIN item_unit ON item_unit.id = purchase_vs_item.type_selling 
            WHERE purchase_vs_item.deleted = '0' 
            AND purchase_vs_item.purchaseId = '$purchase_id'
        ) AS purchaseVsitem ON purchaseVsitem.purchaseId = purchase.id
        WHERE purchase.deleted = '0'
        AND purchase.id = $purchase_id;";


$result = executeSelectQuery($con, $reportQuery);
$rows   = [];

while($row = $result->fetch_assoc()) {
    $rows[] = $row;
};

$mt = "[]";
if(isset($rows[0]["multiTables"])){
    $mt = $rows[0]["multiTables"];
    unset($rows[0]["multiTables"]);
};

$data = json_decode($mt, true);

echo json_encode(['datos'=>$rows,'mt'=>$data]);
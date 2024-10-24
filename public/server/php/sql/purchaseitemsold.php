<?php

require "../auth/user.php";
require "../auth/checkAuth.php";
$_POST["entity"] = "purchase";
$REQUESTED_ACTION = "readOnly"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite, THIS FILE WILL DOES SELECTS TO DATABASE, SO IT'S A  "readOnly" 
require "../auth/checkAuthorization.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP
require "../sqlFunctions/returnObject.php";
require "../sqlFunctions/executeSelect.php";

// para consultar la cantidad vendida de los item del purchase

$purchase_id = isset($_POST["purchase_id"]) ? $_POST["purchase_id"] : null;



if ($purchase_id == null) {
    echoReturnObject("error");
}else{

    $query = "SELECT  purchase_vs_item.id, purchase_vs_item.sold_qty
    FROM 
    purchase
    INNER JOIN purchase_vs_item on purchase.id = purchase_vs_item.purchaseId and purchase_vs_item.deleted = 0
    WHERE purchase.deleted = 0  and purchase.id = $purchase_id;";

    $results = executeSelectQuery($con, $query);

    $r = [];

    while ($rs = $results->fetch_array(MYSQLI_ASSOC)) {
        $item = new stdClass();
        $item->id = $rs["id"];
        $item->sold_qty = $rs["sold_qty"];
        array_push($r,$item );
    }

    if (count($r)> 0) {
        echoReturnObject("ok",  $r, '0', "[]", array(), '{}',"");
    } else{
        echoReturnObject("ok", '[]', '0', "[]", array(), '{}', "");
    }

    mysqli_free_result($results);
    mysqli_close($con);
    exit;
  
}

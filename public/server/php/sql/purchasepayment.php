<?php

require "../auth/user.php";
require "../auth/checkAuth.php";
$_POST["entity"] = "purchase";
$REQUESTED_ACTION = "readOnly"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite, THIS FILE WILL DOES SELECTS TO DATABASE, SO IT'S A  "readOnly" 
require "../auth/checkAuthorization.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP
require "../sqlFunctions/returnObject.php";
require "../sqlFunctions/executeSelect.php";


$purchase_id = isset($_POST["purchase_id"]) ? $_POST["purchase_id"] : null;



if ($purchase_id == null) {
    echoReturnObject("error");
}else{

    $query = "SELECT COUNT(*) AS rowsQty FROM payment_vs_po_or_services WHERE payment_vs_po_or_services.expense_id in ($purchase_id) AND  
    expense_type = 'Purchase' AND payment_vs_po_or_services.deleted = '0';";

    $resultPayments = executeSelectQuery($con, $query);

    $r = 0;
    while ($rs = $resultPayments->fetch_array(MYSQLI_ASSOC)) {
        $r = $rs["rowsQty"];
    }

    if ($r > 0) {
        $restriction =  "PurchaseHasPayment";
        echoReturnObject("ok", '[]', '0', "[]", array(), '{}', $restriction);
    } else{
        echoReturnObject("ok", '[]', '0', "[]", array(), '{}', "");
    }

    mysqli_free_result($resultPayments);
    mysqli_close($con);
    exit;
  
}

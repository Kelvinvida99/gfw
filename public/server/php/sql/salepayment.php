<?php

require "../auth/user.php";
require "../auth/checkAuth.php";
$_POST["entity"] = "sale";
$REQUESTED_ACTION = "readOnly"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite, THIS FILE WILL DOES SELECTS TO DATABASE, SO IT'S A  "readOnly" 
require "../auth/checkAuthorization.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP
require "../sqlFunctions/returnObject.php";
require "../sqlFunctions/executeSelect.php";


$sale_id = isset($_POST["sale_id"]) ? $_POST["sale_id"] : null;



if ($sale_id == null) {
    echoReturnObject("error");
}else{

    $query = "SELECT COUNT(*) AS rowsQty FROM payment_vs_sale WHERE payment_vs_sale.sale_id in ($sale_id) AND payment_vs_sale.deleted = '0';";

    $resultPayments = executeSelectQuery($con, $query);

    $r = 0;
    while ($rs = $resultPayments->fetch_array(MYSQLI_ASSOC)) {
        $r = $rs["rowsQty"];
    }

    if ($r > 0) {
        $restriction =  "SaleHasPayment";
        echoReturnObject("ok", '[]', '0', "[]", array(), '{}', $restriction);
    } else{
        echoReturnObject("ok", '[]', '0', "[]", array(), '{}', "");
    }

    mysqli_free_result($resultPayments);
    mysqli_close($con);
    exit;
  
}

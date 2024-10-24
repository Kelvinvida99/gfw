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
    $reportQuery = "SELECT 
                        p.provider_id,
                        p1.phone,
                        p1.phone2
                    FROM  purchase p
                    INNER JOIN provider p1 ON p1.id = p.provider_id
                    WHERE (p1.phone <> '' OR p1.phone2 <> '') AND p.id = $purchase_id /* 54*/;";


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
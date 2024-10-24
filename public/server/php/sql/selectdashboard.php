<?php
require "../auth/user.php";
require "../auth/checkAuth.php";
$_POST["entity"] = "dashboard";
$REQUESTED_ACTION = "readOnly"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite, THIS FILE WILL DOES SELECTS TO DATABASE, SO IT'S A  "readOnly" 
require "../auth/checkAuthorization.php";
require "../sqlFunctions/filtersFunctions.php";
require "../sqlFunctions/returnObject.php";
require "../sqlFunctions/startDB.php"; //WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP 

$debug = true;





$entity            =  mysqli_real_escape_string($con, $_POST["entity"]);
$action            =  mysqli_real_escape_string($con, $_POST["action"]);
// $arrayX            =  json_encode($_POST["arrayX"]);

//BUILDING ALL ROWS SQL STRING, EACH ENTITY MUST HAVE ITS OWN QUERY
$where_sale = "";
$where_purchase = "";
$where_otherexpense = "";

if ($action == "create") {
  $where = "";
} elseif ($action == "update") {
  $action =  mysqli_real_escape_string($con, $_POST["action"]);

  if (isset($_POST["date_from"])) {

    $date_from          =  mysqli_real_escape_string($con, $_POST["date_from"]);
    $date_to            =  mysqli_real_escape_string($con, $_POST["date_to"]);
    $where_sale         = " and sale.sale_date BETWEEN '$date_from' AND '$date_to'";
    $where_purchase     = " and purchase.purchase_date BETWEEN '$date_from' AND '$date_to'";
    $where_otherexpense = " and otherexpense.date BETWEEN '$date_from' AND '$date_to'";

  } elseif (isset($_POST["typedate"])) {


    $typedate =  mysqli_real_escape_string($con, $_POST["typedate"]);
    $value    =  mysqli_real_escape_string($con, $_POST["value"]);

    switch ($typedate) {
      case 'day':
        $where_sale         = " and sale.sale_date         >= DATE_SUB(CURDATE(), INTERVAL $value DAY)";
        $where_purchase     = " and purchase.purchase_date >= DATE_SUB(CURDATE(), INTERVAL $value DAY)";
        $where_otherexpense = " and otherexpense.date      >= DATE_SUB(CURDATE(), INTERVAL $value DAY)";
        break;

      case 'month':
        $where_sale         = " and sale.sale_date         >= DATE_SUB(CURDATE(), INTERVAL $value MONTH)";
        $where_purchase     = " and purchase.purchase_date >= DATE_SUB(CURDATE(), INTERVAL $value MONTH)";
        $where_otherexpense = " and otherexpense.date      >= DATE_SUB(CURDATE(), INTERVAL $value MONTH)";
        break;

      default:
        break;
    }

  }
}

require "../queries/" . $entity . ".php";

$charts = [];


//EXECUTING SQL QUERY TO GET ROWS
if (!$result = mysqli_query($con, $barsimple)) {
  echoReturnObject("MySqlError");
  exit;
}
$barRows = [];
while ($row = $result->fetch_assoc()) {

  

  $barRows[] = array(
    "x" => "Incomes",
    "y" => $row['total_sale'],
  );

  $barRows[] = array(
    "x" => "Expenses",
    "y" => $row['total_purchase_expenses'],
  );

  $barRows[] = array(
    "x" => "Earnings",
    "y" => $row['total_earnings'],
  );


}


$charts['barsimple'] = $barRows;

echoReturnObject("ok", $charts, '{}', "[]", array(), '{}');
mysqli_free_result($result);
mysqli_close($con);

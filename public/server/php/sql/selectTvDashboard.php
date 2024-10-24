<?php
require "../auth/user.php";
require "../auth/checkAuth.php";
$_POST["entity"] = "tvDashboard";
$REQUESTED_ACTION = "readOnly"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite, THIS FILE WILL DOES SELECTS TO DATABASE, SO IT'S A  "readOnly" 
require "../auth/checkAuthorization.php";
require "../sqlFunctions/filtersFunctions.php";
require "../sqlFunctions/returnObject.php";
require "../sqlFunctions/startDB.php"; //WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP 

$debug = true;

// $entity            = "tvDashboard";
$arrayX            = json_encode('all');

$entity            =  mysqli_real_escape_string($con, $_POST["entity"]);
// $arrayX            =  json_encode($_POST["arrayX"]);

//BUILDING ALL ROWS SQL STRING, EACH ENTITY MUST HAVE ITS OWN QUERY

require "../queries/" . $entity . ".php";

$charts = [];


//EXECUTING SQL QUERY TO GET ROWS
if (!$result = mysqli_query($con, $barSql)) {
  echoReturnObject("MySqlError");
  exit;
}
$barTestRows = [];
while ($row = $result->fetch_assoc()) {
  $barTestRows[] = $row;
}
////////////////////
if (!$result = mysqli_query($con, $totalRevenue)) {
  echoReturnObject("MySqlError");
  exit;
}
$totalRevenueRows = [];
while ($row = $result->fetch_assoc()) {
  $totalRevenueRows[] = $row;
}



if (!$result = mysqli_query($con, $bubbleSql)) {
  echoReturnObject("MySqlError");
  exit;
}
$bubbleTestRows = [];
while ($row = $result->fetch_assoc()) {
  $bubbleTestRows[] = $row;
}



if (!$result = mysqli_query($con, $barTest2)) {
  echoReturnObject("MySqlError");
  exit;
}
$barTest2Rows = [];
while ($row = $result->fetch_assoc()) {
  $barTest2Rows[] = $row;
}


if (!$result = mysqli_query($con, $listSql)) {
  echoReturnObject("MySqlError");
  exit;
}
$listTestRows = [];
while ($row = $result->fetch_assoc()) {
  $listTestRows[] = $row;
}

if (!$result = mysqli_query($con, $statusSql)) {
  echoReturnObject("MySqlError");
  exit;
}
$statusRows = [];
while ($row = $result->fetch_assoc()) {
  $statusRows[] = $row;
}
/////MULTILINES
if (!$result = mysqli_query($con, $multipleLines)) {
  echoReturnObject("MySqlError33");
  exit;
}
$multipleLinesRows = [];
while ($row = $result->fetch_assoc()) {
  $multipleLinesRows[] = $row;
}

/////horizontalBars
//echo $horizontalBars; exit;
if (!$result = mysqli_query($con, $horizontalBars)) {
  echoReturnObject("MySqlError");
  exit;
}
$horizontalBarsRows = [];
while ($row = $result->fetch_assoc()) { 
  $horizontalBarsRows[] = $row; //echo json_encode($horizontalBarsRows); exit;
}
/////horizontalBars
if (!$result = mysqli_query($con, $horizontalSmall)) {
  echoReturnObject("MySqlError");
  exit;
}
$horizontalSmallRows = [];
while ($row = $result->fetch_assoc()) { 
  $horizontalSmallRows[] = $row; 
}











$arrayX_field =  json_decode($arrayX);
// print_r($arrayX_field);
// exit;
if (!is_array($arrayX_field)) {
  if ($arrayX_field == 'all' || $arrayX_field == 'barTest') {
    $charts['barTest'] = [];
    $charts['barTest'][0] = new stdClass();
    
    $charts['barTest'][0]->label = "Services VS Months";
    $charts['barTest'][0]->borderRadius = "0";
    $charts['barTest'][0]->borderWidth = "2";
    $charts['barTest'][0]->color = "yellow";
    $charts['barTest'][0]->value = $barTestRows;

  }
  if ($arrayX_field == 'all' || $arrayX_field == 'totalRevenue') {
    //$charts['totalRevenue'] = [];
    //$charts['totalRevenue'][0] = [];
    
   /* $charts['totalRevenue'][0]->label = "Revenue VS Months";
    $charts['totalRevenue'][0]->borderRadius = "0";
    $charts['totalRevenue'][0]->borderWidth = "2";
    $charts['totalRevenue'][0]->color = "blue";*/
    $charts['totalRevenue']= (json_decode($totalRevenueRows[0]["totalRevenue"]));

  }
  if ($arrayX_field == 'all' || $arrayX_field == 'bubbleTest') {
    $charts['bubbleTest'] = json_decode($bubbleTestRows[0]['bubbleSql']);
  }
  if ($arrayX_field == 'all' || $arrayX_field == 'barTest2') {
    $charts['barTest2'] = json_decode($barTest2Rows[0]['barTest2']);
  }
  if ($arrayX_field == 'all' || $arrayX_field == 'listTest') {
    $charts['listTest'] = $listTestRows;
  }
  if ($arrayX_field == 'all' || $arrayX_field == 'barSimple') {
    $charts['barSimple'] = $statusRows;
  }


  if ($arrayX_field == 'all' || $arrayX_field == 'pieTest') {
    $pieChart = [];
    foreach ($statusRows as $row) {
      $pieChart['label'][] = $row['title'];
      $pieChart['value'][] = $row['num'];
      $pieChart['color'][] = $row['color'];
    }
    $charts['pieTest'] = $pieChart;
  }
  if ($arrayX_field == 'all' || $arrayX_field == 'multipleLines') {
    $charts['multipleLines'] = json_decode($multipleLinesRows[0]["multipleLines"]);
  }

  if ($arrayX_field == 'all' || $arrayX_field == 'horizontalBars') {
    $charts['horizontalBars'] = $horizontalBarsRows;
    $charts['horizontalBars'] = json_decode("[".$horizontalBarsRows[0]["horizontalBars"]."]");
  }
//echo $multipleLinesRows[0]["multipleLines"]; exit;
if ($arrayX_field == 'all' || $arrayX_field == 'horizontalSmall') {
  $charts['horizontalSmall'] = $horizontalSmallRows;
  $charts['horizontalSmall'] = json_decode("[".$horizontalSmallRows[0]["horizontalSmall"]."]");
}


} else {
  if (in_array('all', $arrayX_field) || in_array('barTest', $arrayX_field)) {
   // $charts['barTest']->value  = $barTestRows;
    $charts['barTest'] = new stdClass();
    $charts['barTest']->value = $barTestRows;
  }
  if (in_array('all', $arrayX_field) || in_array('bubbleTest', $arrayX_field)) {
    $charts['bubbleTest'] = $bubbleTestRows;
  }
  if (in_array('all', $arrayX_field) || in_array('listTest', $arrayX_field)) {
    $charts['listTest'] = $listTestRows;
  }
  if (in_array('all', $arrayX_field) || in_array('barSimple', $arrayX_field)) {
    $charts['barSimple'] = $statusRows;
  }
  if (in_array('all', $arrayX_field) || in_array('pieTest', $arrayX_field)) {
    $charts['pieTest'] = $statusRows;
  }
}


echoReturnObject("ok", $charts, '{}', "[]", array(), '{}');
mysqli_free_result($result);
mysqli_close($con);

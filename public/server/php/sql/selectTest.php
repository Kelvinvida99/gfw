<?php

require "../auth/user.php";
require "../auth/checkAuth.php";
$_POST["entity"] = "payrolls";
$REQUESTED_ACTION = "readOnly"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite, THIS FILE WILL DOES SELECTS TO DATABASE, SO IT'S A  "readOnly" 
require "../auth/checkAuthorization.php";
require "../sqlFunctions/filtersFunctions.php";
require "../sqlFunctions/returnObject.php";
require "../sqlFunctions/executeSelect.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP


/**/
$entity            = "payrolls";  
$sortBy            = "id"; 
$sortDirection     = "ASC"; 
$limit1            = 0; 
$limit2            = 5;
$mainFilter        = json_decode('{"fields":["payrolls.id","type" ],"values":["",""]}');
$andFilter         = json_decode('{"fields":[],"values":[]}'); 
$keyWordFilter         = "#exp"; 




/*
$entity            = mysqli_real_escape_string($con, $_POST["entity"]); 
$sortBy            = mysqli_real_escape_string($con, $_POST["sortBy"]); 
$sortDirection     = mysqli_real_escape_string($con, $_POST["sortDirection"]); 
$limit1            = mysqli_real_escape_string($con, $_POST["limit1"]);  
$limit2            = mysqli_real_escape_string($con, $_POST["limit2"]);
$mainFilter        = json_decode($_POST["mainFilter"]);
$andFilter          = json_decode($_POST["andFilter"]);  
*/

//CHECKING IF THERE IS A KEY WORD FILTER FOR REPORT PURPOSES
//CHECKING IF THERE IS A KEY WORD FILTER FOR REPORT PURPOSES
//CHECKING IF THERE IS A KEY WORD FILTER FOR REPORT PURPOSES
$searchValue = str_replace(" ", "", $mainFilter->values[0]);
$firstValueLetter = substr($searchValue,0,1);

if($firstValueLetter == "#"){

  $keyWordFilter            = $searchValue;

}else{

  $keyWordFilter            = "default";

}

###############################################################

//DELETE LINES BELOW, IT'S JUST FOR TESTING

//DELETE LINES BELOW, IT'S JUST FOR TESTING





//if(strpos($sortBy, $entity.".") !== false){
  if(strpos($sortBy, 'date_edited') !== false){
    $sortBy  = $entity.".".$sortBy;
  } else{
      //$sortBy  = $entity.".".$sortBy;
    }/**/





/*       
$entity            = "goku";  
$sortBy            = "id"; 
$sortDirection     = "ASC"; 
$limit1            = 0; 
$limit2            = 5;
$mainFilter        = json_decode('{"fields":["name","__ssn"],"values":["",""]}');
$andFilter         = json_decode('{"fields":[],"values":[]}'); 
*/
//DELETE LINES ABOVE, IT'S JUST FOR TESTING


//SETTING UP FILTERS
$mainFilter->readySqlString = likeFilter($mainFilter->fields,$mainFilter->values,$con);//FILTER FOR TOP INPUT ON EACH ENTITY
$andFilter->readySqlString = andFilter($andFilter->fields,$andFilter->values,$con);//AND FILTERS, WHICH ARE FOR COSTUM ENTITIES


//SETTIGN UP KEY FILTER




//BUILDING ALL ROWS SQL STRING, EACH ENTITY MUST HAVE ITS OWN QUERY

require "../queries/".$entity.".php";





       
//CHECKING IF KEY EXISTS ON ARRAY
//CHECKING IF KEY EXISTS ON ARRAY
//CHECKING IF KEY EXISTS ON ARRAY
//CHECKING IF KEY EXISTS ON ARRAY
if(isset($entityKeyWordFilters[$keyWordFilter])){

  $selectAllRows =  $entityKeyWordFilters[$keyWordFilter];
  $allRowsCountSql = $entityKeyWordFiltersCounter[$keyWordFilter]; 

}else{  

  if(isset($entityKeyWordFilters['default'])){
    $selectAllRows =  $entityKeyWordFilters['default']; 
    $allRowsCountSql = $entityKeyWordFiltersCounter["default"];  
  }else{
    // $selectAllRows & $allRowsCountSql VARIABLES WILL BE SET ALREADY FROM QUERY FILE
  }


} 

//echo  $selectAllRows; exit;
  //writeToTestTxt($selectAllRows);
###############################################################
###############################################################
###############################################################






//EXECUTING SQL QUERY TO GET ROWS
//EXECUTING SQL QUERY TO GET ROWS
$result = executeSelectQuery($con, $selectAllRows);

///CODE BELOW HAS BEEN REPLACED BY CODE ABOVE
 /*if (!$result = mysqli_query($con, $selectAllRows)){
    echoReturnObject("MySqlError");
    exit;
  }*/



  $rows = [];
  while($row = $result->fetch_assoc()) {
      $rows[] = $row;
  }
//EXECUTING SQL QUERY TO GET ROWS QTY WITH CURRENT FILTER
$result = executeSelectQuery($con, $allRowsCountSql);

  $availableRowsWithFilters = 0;
  while($rs = $result->fetch_array(MYSQLI_ASSOC)) {	
      $availableRowsWithFilters = $rs["rowsQty"];
  }

  /////ENTITY CHART IF EXIST
  if(isset($entityCharts)){
    //echo json_encode($entityCharts); exit;
    $entityCharts = json_encode($entityCharts);
  }else{
    $entityCharts = '{}';
  }
 

 

echoReturnObject("ok", $rows, $availableRowsWithFilters, "[]", array(), $entityCharts);
mysqli_free_result($result);
mysqli_close($con);

  







?>
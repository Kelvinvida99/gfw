<?php
require "../auth/user.php";
require "../auth/checkAuth.php";
//$REQUESTED_ACTION = "readOnly"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite, THIS FILE WILL DOES SELECTS TO DATABASE, SO IT'S A  "readOnly" 
//require "../auth/checkAuthorization.php";
require "../sqlFunctions/filtersFunctions.php";
require "../sqlFunctions/returnObject.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP


$entity            = mysqli_real_escape_string($con, $_POST["entity"]); 
$mainFilter        = json_decode($_POST["mainFilter"]);
$andFilter        = json_decode($_POST["andFilter"]);
//$_POST["mainFilter"]



//DELETE LINES BELOW, IT'S JUST FOR TESTING
/*$entity            = "goku"; 
$mainFilter        = json_decode('{"fields":["name","last_name"],"values":["",""]}');*/
//DELETE LINES ABOVE, IT'S JUST FOR TESTING


//SETTING UP FILTERS
$mainFilter->readySqlString = likeFilter($mainFilter->fields,$mainFilter->values,$con);//FILTER FOR TOP INPUT ON EACH ENTITY

//BUILDING ALL ROWS SQL STRING, EACH ENTITY MUST HAVE ITS OWN QUERY
require "../queries/".$entity.".php";

writeToTestTxt($autocompleteQuery);
//EXECUTING SQL QUERY TO GET ROWS
 if (!$result = mysqli_query($con, $autocompleteQuery)){
    echoReturnObject("MySqlError");
    exit;
  }
  $rows = [];
  while($row = $result->fetch_assoc()) {
      $rows[] = $row;
  }

    
echoReturnObject("ok", $rows);
mysqli_free_result($result);
mysqli_close($con);
/*

[{"tableName":"services_vs_status",
  "dataToUpdate":[{"id":"141","N_status":"inProgress","N_date":"2022/08/14","N_time":"10:32:46","notes":""},
{"id":"144","N_status":"scheduled","N_date":"2022/08/14","N_time":"10:37:46","notes":""},
{"id":"145","N_status":"scheduled","N_date":"2022/08/14","N_time":"10:41:00","notes":""}],

"dataToInsert":[{"id":"","N_status":"inProgress","N_date":"2022/08/16","N_time":"07:51:02"}]},{"tableName":"services_vs_tasks","dataToUpdate":[{"id":"151","N_value":"","N_time":"00:00:00"},{"id":"150","N_value":"","N_time":"00:00:00"},
{"id":"149","N_value":"","N_time":"00:00:00"},{"id":"148","N_value":"","N_time":"00:00:00"},{"id":"147","N_value":"","N_time":"00:00:00"},{"id":"146","N_value":"","N_time":"00:00:00"}],"dataToInsert":[]}]


AFTER INSERT
updateServiceStatus 
IF(NEW.N_status = 'inProgress') THEN UPDATE services SET  N_status = NEW.N_status, services.N_clock_in_time = CONCAT(NEW.N_date,' ',NEW.N_time) WHERE services.id = NEW.servicesId; ELSEIF(NEW.N_status = 'submitted') THEN UPDATE services SET N_clock_out_time = CONCAT(NEW.N_date,' ',NEW.N_time), N_status = 'submitted' WHERE id = NEW.servicesId; 
ELSEIF(NEW.N_status = 'scheduled') THEN UPDATE services SET  N_status = 'scheduled', N_notes = '' WHERE id = NEW.servicesId  AND N_notes = 'insertFirstStatus'; ELSE UPDATE services SET N_status = NEW.N_status WHERE id = NEW.servicesId; END IF


AFTER UPDATE
updateServiceStatusByUPDATE

[{"tableName":"services_vs_status","dataToUpdate":[{"id":"145","N_status":"scheduled","N_date":"2022/08/14","N_time":"10:41:00","N_notes":""}],"dataToInsert":[{"id":"","N_status":"inProgress","N_date":"2022/08/22","N_time":"09:16:22"}]},{"tableName":"services_vs_tasks","dataToUpdate":[{"id":"151","N_value":"","N_time":"00:00:00"},{"id":"150","N_value":"","N_time":"00:00:00"},{"id":"149","N_value":"","N_time":"00:00:00"},{"id":"148","N_value":"","N_time":"00:00:00"},{"id":"147","N_value":"","N_time":"00:00:00"},{"id":"146","N_value":"","N_time":"00:00:00"}],"dataToInsert":[]}]


":"services_vs_status","dataToUpdate":[{"id":"145","N_status":"scheduled","N_date":"2022/08/14","N_time":"10:41:00","notes":""}],"dataToInsert":[{"id":"","N_status":"inProgress","N_date":"2022/08/22","N_time":"09:03:02"}]},{"tableName":"services_vs_tasks","dataToUpdate":[{"id":"151","N_value":"","N_time":"00:00:00"},{"id":"150","N_value":"","N_time":"00:00:00"},{"id":"149","N_value":"","N_time":"00:00:00"},{"id":"148","N_value":"","N_time":"00:00:00"},{"id":"147","N_value":"","N_time":"00:00:00"},{"id":"146","N_value":"","N_time":"00:00:00"}],"dataToInsert":[]}]*/
?>
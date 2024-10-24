<?php
//require "generateLogs.php";

function executeDeleteQuery($conn, $sql){
  
     try {     
        
          // Create a prepared statement
        $stmt = $conn->prepare($sql);
  
        // Execute the statement
        if ($stmt->execute() === false) {
            $result->error = "Error in executing statement: " . $conn->error; 
            throw new mysqli_sql_exception("Error in executing statement: " . $stmt->error);
        }
        // Get the result
        $result = true;
  
        // Close the statement
        $stmt->close();
  
  
    } catch (mysqli_sql_exception $e) {

      $e->type = "MySql->DELETE";
      if(isset($_POST["entity"])){
        $e->entity = $_POST["entity"];
      }else{
        $e->entity = 'NA';
      }
      $result = false;
      generateLogs($e);
      echoReturnError($e);

    }

    return $result;
  }


  //function echoReturnError($errorObj = [], $data = [], $availableRowsWithFilters = 0,  $multiTables = "[]", $file = [], $charts = "[]" ){
  /*function echoReturnError($e){
    
    $result = '{    
        "authentication":{"val":"'.$_SESSION["user"]->sessionStatus.'"},
        "authorization":{"val":"'.$_SESSION["user"]->requestPermission.'"},
        "error":{"val":"'.$e->getMessage().'", "file":"'.basename($e->getFile()).'", "line":"'.$e->getLine().'", "type":"'.$e->type.'", "code":"'.$e->getCode().'", "entity":"'.$e->entity.'"},
        "data":"",
        "availableRowsWithFilters":"0",
        "charts":"",
        "multiTables":"",
        "file":""
    }';
   //writeToTestTxt($result);

   echo( $result);
   exit;
}*/




?>
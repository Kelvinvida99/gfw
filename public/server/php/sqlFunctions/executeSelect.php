<?php
//require "generateLogs.php";

function executeSelectQuery($conn, $sql){
  
     try {     
        
          // Create a prepared statement
        $stmt = $conn->prepare($sql);
  
        // Execute the statement
        if ($stmt->execute() === false) {
            $result->error = "Error in executing statement: " . $conn->error; 
            throw new mysqli_sql_exception("Error in executing statement: " . $stmt->error);
        }
        
        // Get the result
        $result = $stmt->get_result();
  
        // Close the statement
        $stmt->close();
  
  
    } catch (mysqli_sql_exception $e) {

      $e->type = "MySql->SELECT";
      if(isset($_POST["entity"])){
        $e->entity = $_POST["entity"];
      }else{
        $e->entity = 'NA';
      }

      generateLogs($e);

      echoReturnError($e);
    }

    return $result;
  }


  



?>
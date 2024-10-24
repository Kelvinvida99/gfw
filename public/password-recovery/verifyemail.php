<?php

require "../server/php/auth/authenticationSettings.php";


$result = new stdClass;
$result->code =200;



try {

    if (isset($_POST["email"])) {
        $conn = mysqli_connect("localhost",gosiveDbUsername,gosiveDbPassword,"gokudb");

        mysqli_set_charset($conn, "utf8");
    
        $email = mysqli_real_escape_string($conn, $_POST["email"]); 
        $result_data = mysqli_query($conn, "SELECT email, AES_DECRYPT(UNHEX(__name), '".SQLSALT."') AS __name, last_name FROM users WHERE email='$email'");
    
        if (!$result_data) {
            throw new Exception();
        }
    
        $rows = [];
        while($row = $result_data->fetch_assoc()) {
            $rows[] = $row;
        }
    
        mysqli_close($conn);
        if (count($rows)>0 ) {
            $result->name =$rows[0]["__name"];
            $result->last_name =$rows[0]["last_name"];
        }else{
            $result->code =300;
        }
    
    }else{
        $result->code = 400;
    }



} catch (Exception $e) {
    $result->code =400;
    mysqli_close($conn);

  
}




echo json_encode($result);



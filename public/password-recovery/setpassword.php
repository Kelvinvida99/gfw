<?php

require "../server/php/auth/authenticationSettings.php";


$result = new stdClass;
$result->code = 200;

try {

    if (isset($_POST["token"]) && isset($_POST["password"]) && isset($_POST["password_copy"])) {
        $conn = mysqli_connect("localhost", gosiveDbUsername, gosiveDbPassword, "gokudb");

        mysqli_begin_transaction($conn);

        $token = mysqli_real_escape_string($conn, $_POST["token"]);
        $password = mysqli_real_escape_string($conn, $_POST["password"]);
        $password_copy = mysqli_real_escape_string($conn, $_POST["password_copy"]);


        $result_data = mysqli_query($conn, "SELECT TIMESTAMPDIFF(MINUTE, date_registered, 
        CURRENT_TIMESTAMP()) AS diff_minute, id, email FROM password_reset WHERE token='$token' and deleted = 0 ");

        if (!$result_data) {
            throw new Exception();
        }

        $rows = [];
        while ($row = $result_data->fetch_assoc()) {
            $rows[] = $row;
        }


        if (count($rows) > 0) {
            $diff_minute = $rows[0]["diff_minute"];
            $id = $rows[0]["id"];
            $email = $rows[0]["email"];

            if ($diff_minute > 2) {
                $result->code = 300;
            } else {


                $update_users = "UPDATE users SET __password = HEX(AES_ENCRYPT('$password','" . SQLSALT . "')) WHERE email = '$email'";

                $result_users = mysqli_query($conn, $update_users);

                if ($result_users) {

                    $update_password_reset = "UPDATE password_reset SET deleted = 1 WHERE id = $id";
                    $result_password_reset = mysqli_query($conn, $update_password_reset);

                    if (!$result_password_reset) {
                        throw new Exception();
                    }
                } else {
                    throw new Exception();
                }
            }

        } else {
            $result->code = 300;
        }

        mysqli_commit($conn);
        mysqli_close($conn);
    } else {
        $result->code = 400;
    }
} catch (Exception $e) {
    $result->code = 400;
    mysqli_rollback($conn);

 //   echo "Error: " . $e->getMessage();
}




echo json_encode($result);

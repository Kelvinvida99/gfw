<?php

    require "../../auth/user.php";
    require "../../auth/checkAuth.php";
    $_POST["entity"] = "purchase_tracking_mail";
    $REQUESTED_ACTION = "readWrite"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite, THIS FILE WILL DOES SELECTS TO DATABASE, SO IT'S A  "readOnly" 
    require "../../auth/checkAuthorization.php";
    require "../../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP
    require "../../sqlFunctions/executeInsert.php";

    $purchase_id = isset($_POST["purchase_id"]) ? $_POST["purchase_id"] : 0;
    $email = isset($_POST["email"]) ? $_POST["email"] : '';
    $provider_id = isset($_POST["provider"]) ? $_POST["provider"] : 0;
    $entit = isset($_POST["entit"]) ? $_POST["entit"] : '';
    $userId = isset($_POST["userId"]) ? $_POST["userId"] : 0;

    echo $purchase_id."</br>";
    echo $email."</br>";
    echo $provider_id."</br>";
    echo $entit."</br>";
    echo $userId."</br>";
    // Ahora puedes usar $purchase_id en tu consulta SQL para obtener los datos específicos del purchase.
    $trackingEmailQuery = "
        INSERT INTO purchase_tracking_mail (purchaseId, email, mail_date, mail_time, providerId, entity, userId) VALUES ('$purchase_id','$email',CURRENT_TIMESTAMP,CURRENT_TIME,'$provider_id','$entit','$userId')
    ";

    $result = executeInsertQuery($con, $trackingEmailQuery);




    
?>

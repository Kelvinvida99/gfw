<?php
require 'vendor/phpmailer/phpmailer/PHPMailerAutoload.php';

set_time_limit(30);
error_reporting(E_ALL);



//require("PHPMailer_5.2.4/class.phpmailer.php");
/*
  
//EXAMPLE FOR SENDING THE EMAIL TO MULTIPLE RECIPIENTS
   // 1)Prepare the recipients
        $recipient1 = new stdClass();
        $recipient1 ->email = "cabrera.yeison@gmail.com";
        $recipient1 ->name = "Yeison";

        $recipient2 = new stdClass();
        $recipient2 ->email = "jmiguel137@gmail.com";
        $recipient2 ->name = "Miguel";

    //2)Create the emailObj and its properties
        $emailObj = new stdClass();
        $emailObj->recipients = [$recipient1];
        $emailObj->subject = "This the Email Subject";

    //3)EXAMPLE FOR RESETING PASSWORD
        $token = generateRandomString($length = 30);//INSERT TOKEN IN DATABASE    
        $emailObj->body = "Hi ".$recipient1 ->name.", <br><br>  Please click the LINK below for resetting your password. <br>  <a href='https://demo.gosive.com/gosiveFW/public/passreset.php?token=".$token."'>Reset Password</a>
             <br><br>  <br><br> 
             If you did not send this request, please click below:
              <br>  <a href='https://demo.gosive.com/gosiveFW/public/warnaccount.php'>Report False Request</a>
            ";  

echo sendEmail($emailObj);
*/

require "../auth/authenticationSettings.php";



$result = new stdClass();
$result->code = 200;

if (!isset($_POST["email"]) || !isset($_POST["type"])) {
    $result->code = 400;
}

switch ($_POST["type"]) {
    case 'password_recovery':

        try {

            if (isset($_POST["name"]) && isset($_POST["last_name"])) {

                $conn = mysqli_connect("localhost", gosiveDbUsername, gosiveDbPassword, "gokudb");

                $last_name = isset($_POST["last_name"]) ? mysqli_real_escape_string($conn, $_POST["last_name"]) : '';
                $email     = mysqli_real_escape_string($conn, $_POST["email"]);
                $name      = mysqli_real_escape_string($conn, $_POST["name"]);

                $recipient        = new stdClass();
                $recipient->email =   $email;
                $recipient->name  =  $name;

                $emailObj = new stdClass();
                $emailObj->recipients = [$recipient];
                $emailObj->subject = "Reiniciar Contraseña";
                $emailObj->removeAttachement = false;
                $emailObj->files = [];

                $token = generateRandomString($length = 30);

                $emailObj->body = "Hi " . $name . ' ' .  $last_name  . ", <br><br>  Please click the LINK below for resetting your password. <br>  <a href='http://demo.gosive.com/gosiveFW/public/password-recovery/password-recovery.html?token=" . $token . "'>Reset Password</a>
                <br><br>  <br><br> 
                If you did not send this request, please ignore the message.
               ";

                $REMOTE_ADDR = $_SERVER['REMOTE_ADDR'];
                $insert = "INSERT INTO password_reset (email, token, public_IP, notes) VALUES ('$email', '$token', '$REMOTE_ADDR' , '')";

                $result_data = mysqli_query($conn, $insert);

                if (!$result_data) {
                    $result->code = 400;
                } else {
                    if (!sendEmail($emailObj)) {
                        $result->code = 400;
                    }
                }
            } else {
                $result->code = 400;
            }
        } catch (Exception $e) {
            $result->code = 400;
        }


        break;

    case 'sendinvoice':
        if (isset($_POST["dbid"]) ||  isset($_POST["entity"]) ||  isset($_POST["userId"])) {


            switch ($_POST["entity"]) {
                case 'sale':
                    
                    if (isset($_POST["dbid"])) {


                        $email                       = $_POST["email"];
                        $recipient                   = new stdClass();
                        $recipient->email            = $email;
                        $recipient->name             = $_POST["name"];
                        $emailObj                    = new stdClass();
                        $emailObj->recipients        = [$recipient];
                        $emailObj->subject           = "SALE ORDER No. " . $_POST["code"];
                        $emailObj->body              = "Hi " . $_POST["name"] . ", please see the attached order";
                        $emailObj->removeAttachement = false;
                        $emailObj->files             = [];
                        $path_full                   = "C:/xampp/htdocs/beestock/public/" . parse_url($_POST["pathpdf"])['path'];
            
            
            
                        $emailObj->files[]           =  $path_full;

                        $sent = "";
            
                        if (!sendEmail($emailObj)) {
                            $result->code = 400;

                        } else {
                            $sent = "true";
                        }

                                    
                        $conn = mysqli_connect("localhost", gosiveDbUsername, gosiveDbPassword, gokuDbName);
            
                        $dbid = mysqli_real_escape_string($conn, $_POST["dbid"]);
                        $userId = mysqli_real_escape_string($conn, $_POST["userId"]);

        
                        $insert = "
                                INSERT INTO sale_tracking_mail (saleId, email, customerId, userId,sent) 
                                SELECT 
                                    sale.id,               
                                    sale.email,   
                                    sale.customer_id,
                                    $userId ,
                                    '$sent'
                                FROM 
                                    sale
                                WHERE 
                                    sale.id = '$dbid' AND sale.send_email = 'true'
                        ";




                        $result_data = mysqli_query($conn, $insert);
        
                        if (!$result_data) {
                            $result->code = 400;
                        } 
                    } 

                    break;

                default:
                    $result->code = 400;
                    break;
            }
        } else {
            $result->code = 400;
        }




        



        break;

    default:
        $result->code = 400;
        break;
}


echo json_encode($result);






function sendEmail($emailObj)
{

    //SMTP SETTING
    //SMTP SETTING
    //SMTP SETTING
    //SMTP SETTING
    $mail = new PHPMailer(true);
    $mail->IsSMTP(); // set mailer to use SMTP    
    $mail->SMTPDebug  = 0;
    $mail->From = "noreply@gosive.com";
    $mail->FromName = "Gosive LLC";
    $mail->Host = "mail.gosive.com"; // specif smtp server    
    $mail->SMTPSecure = ""; // Used instead of TLS when only POP mail is selected    
    $mail->Port = 26; // Used instead of 587 when only POP mail is selected    
    $mail->AuthType = 'PLAIN';
    $mail->SMTPAuth = true;
    $mail->Username = "noreply@gosive.com"; // SMTP username    
    $mail->Password = "G0s1v3(n0r3ply}"; // SMTP password
    $mail->CharSet = 'UTF-8';
    $mail->IsHTML(true); // set email format to HTML
    //$mail->WordWrap = 50; // set word wrap   






    //VERIFYING RECIPTIENTS
    //VERIFYING RECIPTIENTS
    //VERIFYING RECIPTIENTS
    $uniqueRecipients = array_unique($emailObj->recipients);
    foreach ($uniqueRecipients as $recipient) {
        if (filter_var($recipient->email, FILTER_VALIDATE_EMAIL)) {
            $mail->AddAddress($recipient->email, $recipient->name);
        }
    }






    //ATTACHMENTS
    //ATTACHMENTS
    //ATTACHMENTS
    //ATTACHMENTS
    foreach ($emailObj->files as $file) {
        if (file_exists($file)) {
            $mail->AddAttachment($file);
        }
    }






    //PREPARING EMAIL   
    //PREPARING EMAIL   
    //PREPARING EMAIL   
    //PREPARING EMAIL   
    $mail->AddReplyTo($mail->From, "Gosive LLC");
    $mail->Subject = $emailObj->subject;
    $mail->Body = $emailObj->body;




    //SENDING EMAIL
    //SENDING EMAIL
    //SENDING EMAIL
    //SENDING EMAIL
    if ($mail->Send()) {
        //echo "Send mail successfully";  
        $sendResult = true;
    } else {
        $sendResult = false;
    }


    //REMOVE ATTACHMENT
    //REMOVE ATTACHMENT
    //REMOVE ATTACHMENT
    //REMOVE ATTACHMENT
    if ($emailObj->removeAttachement) {
        foreach ($emailObj->files as $file) {
            if (file_exists($file)) {
                unlink($file);
            }
        }
    }




    return $sendResult;
}









function generateRandomString($length = 10)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';

    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }

    return $randomString;
}

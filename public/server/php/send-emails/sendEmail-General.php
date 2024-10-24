<?php
require 'vendor/phpmailer/phpmailer/PHPMailerAutoload.php';
set_time_limit(30);
error_reporting(E_ALL);



//require "../auth/authenticationSettings.php";




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
    if($emailObj->removeAttachement){
        foreach ($emailObj->files as $file) {
            if (file_exists($file)){
                unlink($file);
            }
        }
    }



    
    return $sendResult;

}




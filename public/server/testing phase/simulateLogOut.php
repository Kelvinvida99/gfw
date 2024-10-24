<?php

require "../php/auth/user.php";
$_SESSION["user"]->logOff();

 session_destroy();
 session_unset();
 header('Location: index.php');
?>
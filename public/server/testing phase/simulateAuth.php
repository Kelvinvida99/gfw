<?php

    require "php/auth/user.php";
    require "../../gokuPhpVars/dbConfig.php";
    $_SESSION["user"] = new User();
    $_SESSION["user"]->tryAuthenticate("gosive","Hola123");
    //CONVERT(AES_DECRYPT('Hola123','u-KP2n94W?7cq') USING 'utf8')
    header('Location: index.php');
/*

*/
        ?>
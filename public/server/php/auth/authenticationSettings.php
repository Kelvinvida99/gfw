<?php
//SYSTEM CONSTANTS
//SYSTEM CONSTANTS
//SYSTEM CONSTANTS


//GOSIVE CONTROL CREDENTIALS
//GOSIVE CONTROL CREDENTIALS
define("gokuDbName", "beestock");
define("gosiveDbUsername", "gosivemngdbu");
define("gosiveDbPassword", "MY.G0s!v3@mng.P0w3r");

//PUBLIC AUTHENTICATION CREDENTIALS
//PUBLIC AUTHENTICATION CREDENTIALS
define("publicLoginUser", "tryauthdbu");
define("publicLoginPassword", "g0s!v3.(99)YM");


//ECRYPTIONS KEYS, DO NOT CHANGE THESE SALT VALUES
//ECRYPTIONS KEYS, DO NOT CHANGE THESE SALT VALUES
define("SQLSALT", "uValKP2n94W8200cq");
define("PHPSALT", '$5$rounds=6000$y30H73');


//AUTHENTICATION POLICY GLOBAL CONSTANTS
//AUTHENTICATION POLICY GLOBAL CONSTANTS
define("minUsernameLenth", 6);
define("maxUsernameLenth", 16);
define("minPasswordLenth", 6);
define("maxPasswordLenth", 16);
define("sessionIdleTimeOut", 30);//MINUTES
define("maxFailedAttempts", 5);
define("failedAttempsBlockedTime", 360);//seconds


//THIS PROJECT SPECIFIC MULTITABLES WITH PERMISSIONS LEVEL (THIS CASE CASE PATIENTS AND NURSES AGREEMENTS)
define("restrictedMultiTables", array("patients_vs_agreements", "nurses_vs_agreements"));




?>
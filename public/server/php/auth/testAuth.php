<?php

require "user.php";
require "../sqlFunctions/returnObject.php";

//$username = $_POST["username"];
//$password = $_POST["password"];
//echo  substr(crypt('CompanyPassword', '$5$rounds=6000$y30H73'), 50)." ---";

 $username = "invest";
$password = "HHola123";

$_SESSION["user"] = new User();
if(isset($username) && isset($password)){
	if(strlen($username) < 5 || strlen($password) < 6){
		echoReturnObject("error");
		exit;
	}
	else{
		$_SESSION["user"]->tryAuthenticate($username,$password); 
	}
}
else{
	echoReturnObject("error");
	exit;
}

echoReturnObject("ok");


?>
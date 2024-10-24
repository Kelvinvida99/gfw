<?php
header('Content-Type: application/json');
require "../auth/user.php";
require "../auth/checkAuth.php";
//$_POST["entity"] = "goku";//delete this line, it's just for testing
//each php file must have this variable, posible values are filesreadonly and fileswrite
$REQUESTED_ACTION = "filesWrite";
require "../sqlFunctions/returnObject.php";

$entity         = $_POST["entity"];
$currentPath    = $_POST["currentPath"];// if none, = ""
$id             = $_POST["id"];
$oldName        = $_POST["oldName"];
$newName        = $_POST["newName"];

if(isset($_POST["currentPath"])){
    
    // structured as: /storage/companyname/entities/entity_name/id/uploaded_files/
    $path = '../../storage/'.
            $_SESSION["user"]->dbName.
            '/entities/'.
            $entity.
            '/'.
            $id.
            '/uploaded_files/'.
            $currentPath.
            '/';
}else {
    echoReturnObject("FilePostVar");
    exit;
}

//checking if file name is available
if(file_exists($path.$newName)){

    echoReturnObject("FolFileNameExist");
    exit;  
}

if(!file_exists($path.$oldName)){

    echoReturnObject("FilNotExist");
    exit;  
}

//checking if file name is valid, sanitizing
$isItValid = validFilename($newName);
if( $isItValid != "ok"){

    echoReturnObject("FileStrName"); 
    exit;
}

//after validating filename, proceed to rename it
if(rename ($path.$oldName, $path.$newName)){

    if (file_exists($path."lowlowlowCompression/".$oldName))   rename ($path."lowlowlowCompression/".$oldName, $path."lowlowlowCompression/".$newName);//NECESARY FOR PICTURES COMPRESSION
    if (file_exists($path."midmidmidCompression/".$oldName)) rename ($path."midmidmidCompression/".$oldName, $path."midmidmidCompression/".$newName);//NECESARY FOR PICTURES COMPRESSION

    //tracking user action
    if(!$_SESSION["user"]->tracking("Rename-File",$entity,$id,"FROM: ".$oldName.", TO: ".$newName)){
        echoReturnObject("UserTrac");
        exit;
    }
    //getting element files
    require "getFilesFuncLocal.php";
    $file = getFiles($entity, $id, $currentPath);
    echoReturnObject("ok", array(),0,"[]",$file);   
    exit;
}
else{
    echoReturnObject("FileError"); 
    exit;
}

function validFilename($name){

    $validChars   = "abcdefghijklmnopqrstuwvxyzABCDEFGHIJKLMNOPQRSTUWVXYZ -_.()0123456789";//white list characters
    $validChars   = str_split($validChars);
    $chars        = str_split($name);
    foreach($chars as $char){

     if(!in_array($char, $validChars)){

        //one of the chanracter was not found in white list array
        return "Sorry, the character <".$char."> is not allowed in this file system! Please try another name.";
     }    
    }

    //checking the number of dots in the string name
    $charCount = array_count_values($chars);
    if(isset($charCount["."])){

        if($charCount["."] > 1){

            //more than one dot is not allowed
            return "Sorry, only one dot is allowed in this file system, your text has ".$charCount["."]." dots!";
        }
        else{
            return "ok";
        }
    }
    else{//no hay puntos        
        return "ok";//
    }    
}
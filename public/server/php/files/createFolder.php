<?php
// Este código crea una nueva carpeta en un directorio existente. 
// La carpeta se crea en la ruta proporcionada por `$_POST["currentPath"]` y `$_POST["name"]`. 

// Primero, se realizan varias comprobaciones para verificar si el nombre de la carpeta es válido y 
// si la ruta proporcionada existe en el sistema. Si todo está bien, se crea la carpeta llamando a la función `mkdir()`.

// Luego se llama a la función `getFiles()` en el archivo `getFilesFuncLocal.php` para obtener 
// los archivos dentro de la carpeta actual, y finalmente se devuelve un objeto de retorno que 
// indica el éxito de la solicitud y una lista de archivos actualizados dentro de la carpeta.

header('Content-Type: application/json');
require "../auth/user.php";
require "../auth/checkAuth.php";
//$_POST["entity"] = "goku";//DELETE THIS LINE, IT'S JUST FOR TESTING
$REQUESTED_ACTION = "filesWrite"; //EACH PHP FILE MUST HAVE THIS VARIABLE, POSIBLE VALUES ARE filesReadOnly AND filesWrite
require "../auth/checkAuthorizationFiles.php";
require "../sqlFunctions/returnObject.php";

$entity         = $_POST["entity"];
$id             = $_POST["id"];
$currentPath    = $_POST["currentPath"];// if none, = ""
$folderName     = $_POST["name"];// if none, = ""

/*
$entity            = "goku"; 
$id               = "1"; 
$currentPath               = "A";// if none, equals to "", or name of current folder
$folderName               = "Anthooo";// if none, equals to ""
$_POST["currentPath"] = "A";*/

//checking if file name is valid, sanitizing
$isItValid = validFilename($folderName);
if($isItValid != "ok"){
    echoReturnObject("FileStrName"); 
    exit;
}

if(isset($_POST["currentPath"])){
    // structured as: /storage/companyname/entities/entity_name/id/uploaded_files/	
    $path = '../../storage/'.$_SESSION["user"]->dbName.'/entities/'.$entity.'/'.$id.'/uploaded_files/'.$currentPath.'/'.$folderName;
}else {
    echoReturnObject("FileError");
    exit;
}

//checking if folder already exist		
if(is_dir($path))  echoReturnObject("FolFileNameExist");

else if (!mkdir($path, 0777, true)) echoReturnObject("FolderError");

else{
    //tracking user action
    if(!$_SESSION["user"]->tracking("Add-Folder",$entity,$id,$folderName)){
        echoReturnObject("UserTrac");
        exit;
    }
   //getting element files
    require "getFilesFuncLocal.php";
    $file = getFiles($entity, $id, $currentPath);
    echoReturnObject("ok", array(),0,"[]",$file);   
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
        }else{
            return "ok";
        }
    }else{//no hay puntos        
        return "ok";//
    }    
}
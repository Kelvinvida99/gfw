<?php

header('Content-Type: application/json');
require "../auth/user.php";
require "../auth/checkAuth.php";
//$_POST["entity"] = "goku";//DELETE THIS LINE, IT'S JUST FOR TESTING
$REQUESTED_ACTION = "readWrite"; //EACH PHP FILE MUST HAVE THIS VARIABLE, POSIBLE VALUES ARE filesReadOnly AND filesWrite 
require "../auth/checkAuthorizationFiles.php";
require "../sqlFunctions/returnObject.php";

ini_set ('gd.jpeg_ignore_warning', 1);
error_reporting(E_ERROR | E_PARSE);

$entity             = "users";
$currentPath        = "";// if none, = ""
$id                 = $_POST["id"];
$avatarName         = $_POST["avatarName"];
$filesAndFolders    = json_decode("['".$avatarName."']");

/*
$entity            = "goku"; 
$currentPath               = "";// if none, equals to "", or name of current folder
$id               = "1";// if none, equals to "", or name of current folder
$_POST["currentPath"] = "";
$filesAndFolders = json_decode('["toribio.png","rosi.png"]');
//$filesAndFolders = json_decode('[{"name":"C2"},{"name":"camry.jpg"},{"name":"2zzge.jpg"}]');
*/

$currentYear = date("Y");
if(isset($_POST["currentPath"])){
    // structured as: /storage/companyname/entities/entity_name/id/uploaded_files/	
    $path = '../../storage/'.
            $_SESSION["user"]->dbName.
            '/entities/'.
            $entity.
            '/'.
            $id.
            '/avatar/';
    
    // structured as: /storage/companyname/entities/entity_name/id/uploaded_files/
    $deletePath = '../../storage/'.
                  $_SESSION["user"]->dbName.
                  '/entities/'.
                  $entity.
                  '/'.
                  $id.
                  '/removedAvatars/';
    //$deletePath = '../../storage/'.$_SESSION["user"]->dbName.'/deleted_files/'.$currentYear.'/';
    if (!is_dir($deletePath)) {
        mkdir($deletePath, 0777, true);
    }    
}else{
    echoReturnObject("FilePostVar");
    exit;
}

//making sure the ramdon folder name doesnt exist 
$uniqueFolder       = generateRandomString(20);
$fullPathToDelete   = $deletePath.$uniqueFolder;
while(file_exists($fullPathToDelete)){
    $uniqueFolder       = generateRandomString(20);
    $fullPathToDelete   = $deletePath.$uniqueFolder;
}

mkdir($fullPathToDelete);
mkdir($fullPathToDelete."/lowlowlowCompression");
mkdir($fullPathToDelete."/midmidmidCompression");

//if requested file doesnt exist, dont execute the code
if(rename ($path.$avatarName, $fullPathToDelete."/".$avatarName)){ 
    if(file_exists($path."lowlowlowCompression/".$avatarName))  rename ($path."lowlowlowCompression/".$avatarName, $fullPathToDelete."/lowlowlowCompression/".$avatarName);
    if(file_exists($path."midmidmidCompression/".$avatarName))  rename ($path."midmidmidCompression/".$avatarName, $fullPathToDelete."/midmidmidCompression/".$avatarName);
    $_SESSION["user"]->deleteUserAvatar("", $id);
    // rmdir($path."lowlowlowCompression/".$avatarName);

    if(file_exists($path."lowlowlowCompression")) rmdir($path."lowlowlowCompression");
    if(file_exists($path."midmidmidCompression")) rmdir($path."midmidmidCompression");
}

//tracking user action
if(!$_SESSION["user"]->tracking("Delete-Avatar",$entity,$id,$avatarName)){
    echoReturnObject("UserTrac");
    exit;
}

//getting element files
//require "getFilesFuncLocal.php";
//$file = getFiles($entity, $id, $currentPath);
$a = [];
echoReturnObject("ok", array(),0,"[]",$a);   

function generateRandomString($length = 20) {
    return substr(str_shuffle(str_repeat($x='0123456789abcde-fghijklmnopqrstuvwxyz', ceil($length/strlen($x)) )),1,$length);
}

function insertDeletedFile($entity, $entityId, $uniqueFolder, $currentPath, $fileName){	
    $con = $_SESSION["user"]->initCompanyDBConn();
    if (!$con) {
        die('Could not connect: ' . mysqli_error($con));
        return "0";
    }    
    $entity         = mysqli_real_escape_string($con,$entity);
    $entityId       = mysqli_real_escape_string($con,$entityId);
    $uniqueFolder   = mysqli_real_escape_string($con,$uniqueFolder);
    $currentPath    = mysqli_real_escape_string($con,$currentPath);

    $sql = "INSERT INTO  deleted_files (entity, entityId, uniqueFolder, currentPath, fileName) 
    VALUES ('$entity', '$entityId',  '$uniqueFolder', '$currentPath', '$fileName') ";

    if (!mysqli_query($con,$sql)) { 
        $r = false; 
    }       
    else{
        $r = true;
    }
    mysqli_close($con);
    return $r;
}
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

$entity             = $_POST["entity"];
$currentPath        = $_POST["currentPath"];// if none, = ""
$id                 = $_POST["id"];
$filesAndFolders    = json_decode($_POST["filesAndFolders"] );

/*
$entity            = "goku"; 
$currentPath               = "";// IF NONE, EQUALS TO "", OR NAME OF CURRENT FOLDER
$id               = "1";// IF NONE, EQUALS TO "", OR NAME OF CURRENT FOLDER
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
            '/uploaded_files/'.
            $currentPath.'/';
    $deletePath = '../../storage/'.$_SESSION["user"]->dbName.'/deleted_files/'.$currentYear.'/';
    if (!is_dir($deletePath)) {
        mkdir($deletePath, 0777, true);
    }    
}	
else{
    echoReturnObject("FilePostVar");
    exit;
}

$deletedFilesCount    = 0;
$failedFilesCount     = 0;
$filesNameDeleted     = [];
foreach ($filesAndFolders as $fileOrFolder){
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
    if(!file_exists($path.$fileOrFolder)){
        $failedFilesCount++;
    }else{
        if(rename ($path.$fileOrFolder, $fullPathToDelete."/".$fileOrFolder)){ 
            if(file_exists($path."lowlowlowCompression/".$fileOrFolder))  rename ($path."lowlowlowCompression/".$fileOrFolder, $fullPathToDelete."/lowlowlowCompression/".$fileOrFolder);
            if(file_exists($path."midmidmidCompression/".$fileOrFolder))  rename ($path."midmidmidCompression/".$fileOrFolder, $fullPathToDelete."/midmidmidCompression/".$fileOrFolder);
            
            if(file_exists($path."lowlowlowCompression")) rmdir($path."lowlowlowCompression");
            if(file_exists($path."midmidmidCompression")) rmdir($path."midmidmidCompression");
            
            $filesNameDeleted[] = $fileOrFolder;
            //echo insertDeletedFile($entity, $id, $currentYear."/".$uniqueFolder, $currentPath, $fileOrFolder);
            //inserting deleted files on db table
            if(!insertDeletedFile($entity, $id, $currentYear."/".$uniqueFolder, $currentPath, $fileOrFolder)){
                //if row could not be isnerted, undo the deleted files
                rename ($fullPathToDelete."/".$fileOrFolder, $path.$fileOrFolder);
                rmdir($fullPathToDelete);
                $failedFilesCount++;
            }else{
                $deletedFilesCount++;
            }
        }else{
            $failedFilesCount++;
        } 
    }     
}

//tracking user action
if(!$_SESSION["user"]->tracking("Delete-File",$entity,$id,implode(",",$filesNameDeleted))){
    echoReturnObject("UserTrac");
    exit;
}

//getting element files
require "getFilesFuncLocal.php";
$file = getFiles($entity, $id, $currentPath);

echoReturnObject("ok", array(),0,"[]",$file);   

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
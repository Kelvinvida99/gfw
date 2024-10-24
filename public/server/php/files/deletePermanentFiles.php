<?php

//header('Content-Type: application/json');
require "../auth/user.php";
require "../auth/checkAuth.php";
//$_POST["entity"] = "goku";//DELETE THIS LINE, IT'S JUST FOR TESTING
$REQUESTED_ACTION = "filesWrite"; //EACH PHP FILE MUST HAVE THIS VARIABLE, POSIBLE VALUES ARE filesReadOnly AND filesWrite
require "../sqlFunctions/startDB.php";
require "../auth/checkAuthorizationFiles.php";
require "../sqlFunctions/returnObject.php";

$filesAndFoldersIds   = json_decode($_POST["filesAndFolders"] );
$entity               = mysqli_real_escape_string($con, $_POST["entity"]);
$id                   = mysqli_real_escape_string($con, $_POST["id"]);
$currentPath          = $_POST["currentPath"];

/*
$filesAndFoldersIds = json_decode('[30]');//ARRAY WITH FILES ID
$entity            = "goku"; 
$id  = "1";
$currentPath               = "";
*/

$restoredFiles    = [];//ARRAY WITH FILES ID
$deletePath       = '../../storage/'.$_SESSION["user"]->dbName.'/deleted_files/';
$currentYear      = date("Y");
$realDeletePath   = '../../storageBackup/'.$_SESSION["user"]->dbName.'/deleted_files';

if (!is_dir($realDeletePath.'/'.$currentYear)) {
    mkdir($realDeletePath.'/'.$currentYear, 0777, true);
} 

$deletedFilesCount    = 0;
$failedFilesCount     = 0;
$filesNameDeleted     = [];
//preparing sql query
$result               = selectFiles($filesAndFoldersIds);

while($row = $result->fetch_assoc()) {
    $uniqueFolder = $row["uniqueFolder"];
    $fullPathToDelete = $deletePath.$uniqueFolder;

    //if requested file doesnt exist, dont execute the code
    if(!file_exists($fullPathToDelete."/".$row["fileName"])){
        $failedFilesCount++;
    }else{            
        if(rename ($fullPathToDelete, $realDeletePath."/".$uniqueFolder)){ 
            //updating restored files/folders on db table 
            if(!permanentDeletedFile($row["id"])){
                //if row could not be updated, undo the permanent deleted files
                rename ( $realDeletePath, $fullPathToDelete);
                $failedFilesCount++;
            }else{
                $deletedFilesCount++;
            }
        }else{
            $failedFilesCount++;
        } 
        //tracking user action
        if(!$_SESSION["user"]->tracking("PermDeleted-File",$row["entity"],$row["entityId"],$uniqueFolder."/".$row["fileName"])){
            echoReturnObject("UserTrac", mysqli_error($con));
            exit;
        }
    }
}

//echoReturnObject("ok", "Permanent Deleted Successfully: ".$deletedFilesCount.", Failed: ".$failedFilesCount);//check later
require "getDeletedFilesFuncLocal.php";
$allFile                  = new stdClass();
$allFile->deletedFiles    = getDeletedFiles($entity, $id);
echoReturnObject("ok", array(),0,"[]", $allFile);   

function permanentDeletedFile($fileId){	
    $con = $_SESSION["user"]->initCompanyDBConn();
    if (!$con) {
        die('Could not connect: ' . mysqli_error($con));
        return "0";
    }
    
    $fileId   = mysqli_real_escape_string($con,$fileId);
    $sql      = "UPDATE deleted_files SET deleted = '2' WHERE id = '$fileId'";
    if (!mysqli_query($con,$sql)) { 
        $r = false; 
    }       
    else{
        $r = true;
    }
    mysqli_close($con);
    return $r;
}

function selectFiles($filesAndFoldersIds){	
    $con = $_SESSION["user"]->initCompanyDBConn();
    if (!$con) {
        die('Could not connect: ' . mysqli_error($con));
        return "0";
    }
    //$fileId = mysqli_real_escape_string($con,$fileId);
    $sql = "SELECT *FROM deleted_files WHERE id IN ('".implode("','",$filesAndFoldersIds)."');";
    //executing sql query to get rows
    if (!$result = mysqli_query($con, $sql)){
        echoReturnObject("MySqlError", mysqli_error($con));
        exit;
    }
    return $result;
}
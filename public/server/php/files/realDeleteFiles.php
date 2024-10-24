<?php
header('Content-Type: application/json');
require "../auth/user.php";
require "../auth/checkAuth.php";
$_POST["entity"] = "goku";//delete this line, it's just for testing
//each php file must have this variable, posible values are filesreadonly and fileswrite
$REQUESTED_ACTION = "filesWrite";
require "../auth/checkAuthorizationFiles.php";
require "../sqlFunctions/returnObject.php";

$filesAndFoldersIds = json_decode($_POST["filesAndFolders"] );

$restoredFiles    = [];//array with files id
$deletePath       = '../../storage/'.$_SESSION["user"]->dbName.'/deleted_files/';
$currentYear      = date("Y");
$realDeletePath   = '../../storageBackup/'.$_SESSION["user"]->dbName.'/deleted_files';

if (!is_dir($realDeletePath)) {
    mkdir($realDeletePath, 0777, true);
} 

$deletedFilesCount    = 0;
$failedFilesCount     = 0;
$filesNameDeleted     = [];
//preparing sql query
$result = selectFiles($filesAndFoldersIds);

while($row = $result->fetch_assoc()) {
    $uniqueFolder       = $row["uniqueFolder"];
    $fullPathToDelete   = $deletePath.$uniqueFolder;
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

echoReturnObject("ok");//check later

function permanentDeletedFile($fileId){	
    $con = $_SESSION["user"]->initDataDBConn();
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
    $con = $_SESSION["user"]->initDataDBConn();
    if (!$con) {

        die('Could not connect: ' . mysqli_error($con));
        return "0";
    }

    $sql = "SELECT *FROM deleted_files WHERE id IN ('".implode("','",$filesAndFoldersIds)."');";
    //executing sql query to get rows
    if (!$result = mysqli_query($con, $sql)){
        echoReturnObject("MySqlError", mysqli_error($con));
        exit;
    }
    return $result;
}
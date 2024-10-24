<?php
header('Content-Type: application/json');
require "../auth/user.php";
require "../auth/checkAuth.php";
//$_POST["entity"] = "goku";//delete this line, it's just for testing
//each php file must have this variable, posible values are filesreadonly and fileswrite
$REQUESTED_ACTION = "filesWrite"; 
require "../sqlFunctions/startDB.php";
require "../auth/checkAuthorizationFiles.php";
require "../sqlFunctions/returnObject.php";

$filesAndFoldersIds   = json_decode($_POST["filesAndFolders"] );
$entity               = mysqli_real_escape_string($con, $_POST["entity"]);
$id                   = mysqli_real_escape_string($con, $_POST["id"]);
$currentPath          = $_POST["currentPath"];
$restoredFiles        = [];//array with files id
$deletePath           = '../../storage/'.$_SESSION["user"]->dbName.'/deleted_files/';
$restoredFilesCount   = 0;
$failedFilesCount     = 0;
$filesNameRestored    = [];
//preparing sql query
$result               = selectFiles($filesAndFoldersIds);

while($row = $result->fetch_assoc()) {
    $uniqueFolder = $row["uniqueFolder"];
    $fileName =  $row["fileName"];
    $fullPathToDelete = $deletePath.$uniqueFolder;
    //if requested file doesnt exist, dont execute the code
    if(!file_exists($fullPathToDelete."/".$row["fileName"])){

        $failedFilesCount++;
    }else{
        //checking if the folder that contains the deleted file/folder exist, if it doesnt, then create it
        $restorePath = '../../storage/'.
                        $_SESSION["user"]->dbName.
                        '/entities/'.
                        $row["entity"].
                        '/'.
                        $row["entityId"].
                        '/uploaded_files/'.
                        $row["currentPath"].
                        '/';
        $fullPathToRestore = $restorePath."/".$row["fileName"];
        if (!is_dir($restorePath)){

            mkdir($restorePath, 0777, true);
        //if folder already existed, we must check if there is a file/folder with the same name than the one that needs to be restored
        }else{  
            
            //checking if the file to be restored is a file or a folder
            if(is_file($fullPathToDelete."/".$row["fileName"])){

                $ext    = strtolower(pathinfo($row["fileName"], PATHINFO_EXTENSION));
                $c      = 2;
                while(file_exists($fullPathToRestore)){

                    $fullPathToRestore    = str_replace(".".$ext, " (".$c.").".$ext, $restorePath."/".$row["fileName"]);
                    $fileName             = str_replace(".".$ext, " (".$c.").".$ext, $row["fileName"]);
                    $c++;
                }
            }else{//if its a folder     
                $c = 2;
                while(file_exists($fullPathToRestore)){
                    $fullPathToRestore = $restorePath."/".$row["fileName"]." (".$c.")";
                    $fileName =  $row["fileName"]." (".$c.")";
                    $c++;  
                }
            }
        }
            
        if(rename ($fullPathToDelete."/".$row["fileName"], $fullPathToRestore)){

            if(!is_dir($restorePath."lowlowlowCompression")) mkdir($restorePath."lowlowlowCompression", 0777, true);
            if(!is_dir($restorePath."midmidmidCompression")) mkdir($restorePath."midmidmidCompression", 0777, true);

            if(file_exists($fullPathToDelete."/lowlowlowCompression/".$row["fileName"]))  rename ($fullPathToDelete."/lowlowlowCompression/".$row["fileName"], $restorePath."lowlowlowCompression/". $fileName);
            if(file_exists($fullPathToDelete."/midmidmidCompression/".$row["fileName"]))  rename ($fullPathToDelete."/midmidmidCompression/".$row["fileName"], $restorePath."midmidmidCompression/". $fileName);
                
            //updating restored files/folders on db table
            if(!restoreDeletedFile($row["id"])){
                //if row could not be isnerted, undo the restored files
                rename ($fullPathToRestore, $fullPathToDelete."/".$row["fileName"]);
                if(file_exists($restorePath."lowlowlowCompression/".$row["fileName"]))  rename ($restorePath."lowlowlowCompression/". $fileName,$fullPathToDelete."/lowlowlowCompression/".$row["fileName"]);
                if(file_exists( $restorePath."midmidmidCompression/".$row["fileName"]))  rename ($restorePath."midmidmidCompression/". $fileName, $fullPathToDelete."/midmidmidCompression/".$row["fileName"]);
                $failedFilesCount++;
            }else{
                if(is_dir($fullPathToDelete."/lowlowlowCompression")) rmdir($fullPathToDelete."/lowlowlowCompression");
                if(is_dir($fullPathToDelete."/midmidmidCompression")) rmdir($fullPathToDelete."/midmidmidCompression");
                rmdir($fullPathToDelete);
                $restoredFilesCount++;
            }
        }else{
            $failedFilesCount++;
        } 
        //tracking user action
        if(!$_SESSION["user"]->tracking("Restore-File",$row["entity"],$row["entityId"],str_replace("../../storage/".$_SESSION["user"]->dbName."/entities/","",$fullPathToRestore))){
            echoReturnObject("UserTrac");
            exit;
        }
    } 
}

//getting element files
require "getFilesFuncLocal.php";
//echo getDeletedFiles($entity, $id);
require "getDeletedFilesFuncLocal.php"; 

$allFile                  = new stdClass();
$allFile->regularFiles    = getFiles($entity, $id, $currentPath);
$allFile->deletedFiles    = getDeletedFiles($entity, $id);

echoReturnObject("ok", array(),0,"[]", $allFile);   

function restoreDeletedFile($fileId){

    $con = $_SESSION["user"]->initCompanyDBConn();
    if (!$con) {

        die('Could not connect: ' . mysqli_error($con));
        return "0";
    }

    $fileId   = mysqli_real_escape_string($con,$fileId);
    $sql      = "UPDATE deleted_files SET deleted = '1' WHERE id = '$fileId'";
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

    $sql = "SELECT *FROM deleted_files WHERE id IN ('".implode("','",$filesAndFoldersIds)."');";
    //executing sql query to get rows
    if (!$result = mysqli_query($con, $sql)){
        echoReturnObject("MySqlError", mysqli_error($con));
        exit;
    }
    return $result;
}
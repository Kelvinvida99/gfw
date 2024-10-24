<?php
require "../auth/user.php";
require "../auth/checkAuth.php";
$_POST["entity"] = "users";
//each php file must have this variable, posible values are filesreadonly and fileswrite
$REQUESTED_ACTION = "readWrite"; 
require "../auth/checkAuthorizationFiles.php";
require "../sqlFunctions/returnObject.php";
require "../sqlFunctions/startDB.php";
require "compressFunc.php";

$entity           = "users";
$id               = mysqli_real_escape_string($con, $_POST["id"]);
$existingAvatar   = ["avatar.png", "avatar.jpg", "avatar.jpeg", "avatar.jfif", "avatar.gif",  "avatar.webp"];

ini_set ('gd.jpeg_ignore_warning', 1);

$valid_exts   = array(
                        'jpeg', 
                        'jpg', 
                        'png', 
                        'gif', 
                        'JFIF', 
                        'jfif'); // valid extensions
$outp         = "[";
$json         = array();

if($_SERVER['REQUEST_METHOD'] === 'POST'){

    // structured as: /storage/companyName/entities/entity_name/id/uploaded_files/
    $path      = '../../storage/'.$_SESSION["user"]->dbName.'/entities/users/'.$id."/avatar/";
	$path_low  = $path."lowlowlowCompression/";
	$path_mid  = $path."midmidmidCompression/";

    foreach($existingAvatar as $ca){
        if (file_exists($path.$ca)){
            unlink($path.$ca);
        }	
    }

	if (!file_exists($path_low)) {
	  mkdir($path_low, 0777, true);
	}	
	if (!file_exists($path_mid)) {
	  mkdir($path_mid, 0777, true);
	}
}else {
    echoReturnObject("FilePostVar");
    exit;
}

if ( $_SERVER['REQUEST_METHOD'] === 'POST' ){

    for($i=0;$i<count($_FILES['fileInputElement']['tmp_name']);$i++){

        if(is_uploaded_file($_FILES['fileInputElement']['tmp_name'][$i])){

            if (!file_exists($path)) {
                mkdir($path, 0777, true);
            }

            // get uploaded file extension
            $ext = strtolower(pathinfo($_FILES['fileInputElement']['name'][$i], PATHINFO_EXTENSION));
            // looking for format and size validity
            if (in_array($ext, $valid_exts) ){

                $date           = date('Y-m-d-H-i-s');
                $path2          = $path."avatar.".$ext;
                $returnJson[]   = array("filepath"=>$path);

                // move uploaded file from temp to uploads directory
                $c            = 2;
                $temp_file    = "avatar.".$ext;
                if (move_uploaded_file($_FILES['fileInputElement']['tmp_name'][$i], $path2)){

                    $_SESSION["user"]->updateUserAvatar("avatar.".$ext, $id);

                    //tracking user action
                    if(!$_SESSION["user"]->tracking("Avatar-Upload",$entity,$id,$temp_file)){
                        echoReturnObject("UserTrac", mysqli_error($con));
                        exit;
                    }
                    //compressing file if it's an image
                    if($ext == 'jpeg' || $ext == 'jpg' || $ext == 'png' || $ext == 'gif' || $ext == 'jfif' || $ext == 'JFIF') {
                        compress($path2, $path_low.$temp_file, 4, 150);
                        compress($path2, $path_mid.$temp_file, 4, 500);
                    }
                    if ($outp != "[") {	$outp .= ",";	}
                        $outp .= '{"name":'      . json_encode($temp_file). ', "folder":""}';					  
                }else{
                    $status = 'Upload Fail: Unknown error occurred!';
                    echoReturnObject("FilUpFail");
                    exit;
                }
            }else{
                $status = 'Upload Fail: Unsupported file format or It is too large to upload!';
                echoReturnObject("FileExt");
                exit;
            }
        }else{
            $status = 'Upload Fail: File not uploaded!';
            echoReturnObject("FileError");
            exit;
        }
    }
}else{
    $status = 'Invalid Request!';
    echoReturnObject("InvReqType");
    exit;
}

//getting element files
$avatarFullPath =  'server/storage/'.$_SESSION["user"]->companyID.'/entities/users/'.$id.'/avatar/lowlowlowCompression/'.$temp_file;
echoReturnObject("ok", json_decode('[{"avatar":"'.$avatarFullPath.'"}]'),0,'[]',array());
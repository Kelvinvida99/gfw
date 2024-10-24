<?php
require "../auth/user.php";
require "../auth/checkAuth.php";
require "../sqlFunctions/returnObject.php";
require "compressFunc.php";

/*
$entity            = "users"; 
$id               = "61"; 
$currentAvatar      = "avatar.png";*/

$id               = $_SESSION["user"]->userId;
$existingAvatar   = ["avatar.png", "avatar.jpg", "avatar.jpeg", "avatar.jfif", "avatar.gif", "avatar.webp"];
$entity           = "users";

if($_SESSION["user"]->typeApp == "nurse"){
  $entity        = "nurses";
}

ini_set ('gd.jpeg_ignore_warning', 1);
error_reporting(E_ERROR | E_PARSE);

$valid_exts   = array('jpeg', 'jpg', 'png', 'gif', 'JFIF', 'jfif'); // valid extensions
$outp         = "[";
$json         = array();

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    // structured as: /storage/companyname/entities/entity_name/id/uploaded_files/
    $path      = '../../storage/'.$_SESSION["user"]->dbName.'/entities/'.$entity .'/'.$id."/avatar/";
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
                //$temp_file = str_replace(" ", "", $_FILES['fileInputElement']['name'][$i]);
                $temp_file    = "avatar.".$ext;

                    if (move_uploaded_file($_FILES['fileInputElement']['tmp_name'][$i], $path2)){
                        //$status = 'Image successfully uploaded!';

                       // $_SESSION["user"]->updateAvatar("avatar.".$ext);
                       updateEntityAvatar($temp_file, $id, $entity);
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

                    }else {
                        $status = 'Upload Fail: Unknown error occurred!';
                        echoReturnObject("FilUpFail");
                        exit;
                    }
            }else{
                $status = 'Upload Fail: Unsupported file format or It is too large to upload!';
                echoReturnObject("FileExt");
                exit;
            }
        }else {
            $status = 'Upload Fail: File not uploaded!';
            echoReturnObject("FileError");
            exit;
        }
    }

}else {
    $status = 'Invalid Request!';
    echoReturnObject("InvReqType");
    exit;
}

//getting element files
//require "getFilesFuncLocal.php";
$avatarFullPath =  'server/storage/'.$_SESSION["user"]->companyID.'/entities/'.$entity .'/'.$_SESSION["user"]->userId.'/avatar/lowlowlowCompression/'.$temp_file;
echoReturnObject("ok", json_decode('[{"avatar":"'.$avatarFullPath.'"}]'),0,'[]',array());        

function updateEntityAvatar($avatar, $id, $entity){	
    $con = $_SESSION["user"]->initCompanyDBConn();
    if (!$con) {
        die('Could not connect: ' . mysqli_error($con));
        return "0";
    }
    $avatar = mysqli_real_escape_string($con, 'server/storage/'.
                                        $_SESSION["user"]->companyID.
                                        '/entities/'.
                                        $entity.
                                        '/'.
                                        $id.
                                        '/avatar/lowlowlowCompression/'.
                                        $avatar);


    $sql = "UPDATE $entity SET avatar = '$avatar' WHERE id = '".$id."'";
    if (!mysqli_query($con,$sql)) { 
        $r = false; 
     }       
    else{
        $r = true;

        if($_SESSION["user"]->typeApp == "staff"){

            //if updated user is the same as the logged one
            if($id == $_SESSION["user"]->userId)
              $_SESSION["user"]->avatar = $avatar;

        }

        //$this->avatar = '/server/storage/'.$this->companyID.'/entities/users/'.$this->userId.'/avatar/'.$avatar;
        //$this->avatar = $avatar;
    }
    mysqli_close($con);
    return $r;
}
<?php
require "../auth/user.php";
require "../auth/checkAuth.php";
//$_POST["entity"] = "goku";//delete this line, it's just for testing
//each php file must have this variable, posible values are filesreadonly and fileswrite
$REQUESTED_ACTION = "filesWrite"; 
require "../auth/checkAuthorizationFiles.php";
require "../sqlFunctions/returnObject.php";
require "compressFunc.php";

$entity         = $_POST["entity"];
$id             = $_POST["id"];
$currentPath    = $_POST["currentPath"];// if none, = ""
ini_set ('gd.jpeg_ignore_warning', 1);

$valid_exts     = array('jpeg', 'jpg', 'png', 'gif', 'pdf', 'txt', 'doc', 'docx', 'csv', 'xls', 'xlsx', 'JFIF', 'jfif', 'mp4'); // valid extensions
$outp           = "[";
$json           = array();

if(isset($_POST["currentPath"])){

    // structured as: /storage/companyname/entities/entity_name/id/uploaded_files/
    $path      = '../../storage/'.
                $_SESSION["user"]->dbName.
                '/entities/'.$entity.
                '/'.
                $id.
                '/uploaded_files/'.
                $currentPath.
                '/';
    $path_low  = $path."lowlowlowCompression/";
    $path_mid  = $path."midmidmidCompression/";
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
                $path2          = $path.$_FILES['fileInputElement']['name'][$i];
                $returnJson[]   = array("filepath"=>$path);

                // move uploaded file from temp to uploads directory
                $c            = 2;
                $temp_file    = $_FILES['fileInputElement']['name'][$i];
                while(file_exists($path2)){

                    $path2        = str_replace(".".$ext, " (".$c.").".$ext,  $path.$_FILES['fileInputElement']['name'][$i]);
                    $temp_file    = str_replace(".".$ext, " (".$c.").".$ext, $_FILES['fileInputElement']['name'][$i]);
                    $c++;
                }
                if (move_uploaded_file($_FILES['fileInputElement']['tmp_name'][$i], $path2)){

                    //tracking user action
                    if(!$_SESSION["user"]->tracking("File-Upload",$entity,$id,$temp_file)){

                        echoReturnObject("UserTrac", mysqli_error($con));
                        exit;
                    }
                    //compressing file if it's an image
                    if($ext == 'jpeg' || $ext == 'jpg' || $ext == 'png' || $ext == 'gif' || $ext == 'jfif' || $ext == 'JFIF') {     
                        compress($path2, $path_low.$temp_file, 4, 150);
                        compress($path2, $path_mid.$temp_file, 4, 500);
                    }
                    elseif($ext == 'MPEG' || $ext == 'AVI' || $ext == 'WMV'  || $ext == 'MP4' || $ext == 'WebM' || $ext == 'Ogg ' || $ext == 'mp4'){//VIDEO
                        videoThumbail($path2, $path_low.$temp_file);

                    }
                    if ($outp != "[") { $outp .= ",";   }
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
        }else {
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
require "getFilesFuncLocal.php";
$file = getFiles($entity, $id, $currentPath);
echoReturnObject("ok", array(),0,"[]",$file);        

function videoThumbail($video, $thumbail){

    $frame        = 10;
    $thumbnail    = $thumbail.'.png';
    $mov          = new ffmpeg_movie($video);
    $frame        = $mov->getFrame($frame);
    if ($frame) {
        $gd_image = $frame->toGDImage();
        if ($gd_image) {
            imagepng($gd_image, $thumbnail);
            imagedestroy($gd_image);
        }
    }
}
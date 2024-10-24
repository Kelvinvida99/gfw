<?php
//header('Content-Type: application/json');
//require "../auth/user.php";
///require "../../gokuPhpVars/dbConfig.php";
//require "../auth/checkAuth.php";
//$_POST["entity"] = "goku";//delete this line, it's just for testing
//$REQUESTED_ACTION = "filesReadOnly"; //each php file must have this variable, posible values are filesreadonly and fileswrite
//require "../auth/checkAuthorizationFiles.php";
//require "../sqlFunctions/returnObject.php";

function getFiles($entity, $id, $currentPath){
    //each php file must have this variable, posible values are filesreadonly and fileswr
    $filePermission = checkFileAuth("readOnly"); 
    if($filePermission != "ok"){//if user is not authorized
        
        return $filePermission;
    }

    //if user is allowed to read files on this entity, execute code below
    $files_on_path    = "";
    $dh               = "";
    $path             = '../../storage/'.$_SESSION["user"]->dbName.'/entities/'.$entity.'/'.$id.'/uploaded_files/'.$currentPath.'/';
    $filesFound       = [];
    if (is_dir($path)) {

        if ($dh = opendir($path)){

            $count            = 0;
            $files_on_path    = scandir($path);
            $files_on_path    = array_slice($files_on_path, 2);
            $c                = 0;
            foreach($files_on_path as $file){	

                if( is_file($path.$file) || is_dir($path.$file) && ($file != "midmidmidCompression" && $file != "lowlowlowCompression" )) {	
                    
                    $filesFound[]             = new stdClass();
                    $pos                      = sizeof($filesFound)-1;
                    $filesFound[$pos]->name   = $files_on_path[$c];
                    $filesFound[$pos]->folder = json_encode(is_dir($path.$file));
                    if(is_dir($path.$file)){
                        
                        $filesFound[$pos]->emptyClass = (count(glob($path.$file."/*")) === 0) ? 'cont-folder-empty' : 'cont-folder';
                    }
                }
                $c++;	
            }                
            closedir($dh);	
        }
    }
    return  $filesFound;
}

function checkFileAuth($REQUESTED_ACTION){
    $returnObj = '';
    if(isset($_SESSION["user"])){

        if(isset($_POST["entity"])){

            if(!$_SESSION["user"]->isAuthorizedFiles($_POST["entity"], $REQUESTED_ACTION)){//if user is not authorized

                return "notAllowed";
            }
        }else{//if entity variable was not posted
            return "NO ENTITY REQUESTED";  
        }
    }else{//if user session does not exist
        return "NO SESSION";
    }
    return "ok";
}
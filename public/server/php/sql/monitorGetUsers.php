<?php
require "../auth/user.php";
require "../auth/checkAuth.php";
$_POST["entity"]= "users";
$REQUESTED_ACTION = "readOnly"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite, THIS FILE WILL DOES SELECTS TO DATABASE, SO IT'S A  "readOnly" 
require "../auth/checkAuthorization.php";
require "../sqlFunctions/returnObject.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP





$sql = "SELECT id, AES_DECRYPT(UNHEX(__name ), '".SQLSALT."') AS name, privilege AS 'right', avatar, '' AS html, active FROM users WHERE deleted = '0' ORDER BY name ASC";

//EXECUTING SQL QUERY TO GET ROWS
 if (!$result = mysqli_query($con, $sql)){
    echoReturnObject("MySqlError");
    exit;
  }
  $rows = [];
  while($row = $result->fetch_assoc()) {
      $rows[] = $row;
  }

$data = [];


$obj = new stdClass();
$obj->name = $_SESSION["user"]->company;
$obj->payment = "On time";

$fSize = getFolderSize();
$currentLimit = getCurrentStorage($con);


$obj->storage = $fSize."GB of ".$currentLimit."GB (".round((($fSize/$currentLimit)*100),2)."%)";
$obj->user = $rows;
$data[] = $obj;  



echoReturnObject("ok", $data, 0);
mysqli_free_result($result);
//mysqli_close($con);


function getFolderSize(){
    $f = "C:/xampp/htdocs/gosiveFW/public/server/storage/".$_SESSION["user"]->companyID;
    $obj = new COM ( 'scripting.filesystemobject' );
/*
IF COM ERROR -> 

add COM support in php.ini
[COM_DOT_NET]
extension=php_com_dotnet.dll
*/
    if ( is_object ( $obj ) )
    {
        $ref = $obj->getfolder ( $f );
        //echo 'Directory: ' . $f . ' => Size: ' . $ref->size;
        $obj = null;
        return number_format(round($ref->size/1000000000,2),2);
    }
    else
    {
        echo 'can not create object';
        return 0;
    }

}


function getCurrentStorage($con){

    $sql="SELECT storageLimitGB, lastPayment FROM settings LIMIT 1";

    $result = mysqli_query($con,$sql);
    $qty = 0;
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) { 
        $qty = $rs["storageLimitGB"];
    }        
    mysqli_close($con);

    return number_format($qty,2); 

}


?>
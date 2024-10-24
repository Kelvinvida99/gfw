<?php
require "../auth/user.php";
require "../auth/checkAuth.php";
//$_POST["entity"] = "goku";
//$REQUESTED_ACTION = "readWrite"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite
//require "../auth/checkAuthorization.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP
require "../sqlFunctions/returnObject.php";
/**/

echo  $_GET["newEntity"];
$new = $_GET["newEntity"];
$original = $_GET["original"];
//exit;
$sql = "CREATE TABLE $new (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255),
    deleted tinyint DEFAULT 0,
    date_registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_edited  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);";


//EXECUTING SQL QUERY TO GET ROWS
 if (!mysqli_query($con, $sql)){    
    echoReturnObject("MySQL Error", mysqli_error($con)); 
    exit;  
  }
  else{
   //CREATING ENTITY QIERU FILE

   $newQueryFile = "../queries/".$new.".php";
   if(!file_exists($newQueryFile)){
        copy('../queries/newentity.php', $newQueryFile);
        //read the entire string
        $str=file_get_contents($newQueryFile);
        
        //replace something in the file string - this is a VERY simple example
        $str=str_replace("newentity", $new, $str);
        
        //write the entire string
        file_put_contents($newQueryFile, $str);

   }

   else{
       echo "entity folder already exist!";
       exit;
   }


  }
  
//SQL QUERY TO UPDATE MAIN ENTITY ROW
echo " Entity created successfully";

  mysqli_close($con);
?>
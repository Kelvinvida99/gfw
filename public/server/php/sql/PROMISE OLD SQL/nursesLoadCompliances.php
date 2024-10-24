


<?php

require "../auth/user.php";
require "../auth/checkAuth.php";
$_POST["entity"] = "nurses";
$REQUESTED_ACTION = "readOnly"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite, THIS FILE WILL DOES SELECTS TO DATABASE, SO IT'S A  "readOnly" 
//require "../auth/checkAuthorization.php";
require "../sqlFunctions/filtersFunctions.php";
require "../sqlFunctions/returnObject.php";
require "../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP


$id            = mysqli_real_escape_string($con, $_POST["id"]); 
//$id            = 43; 
//$NURSE_ID = $_SESSION["user"]->userId;
$selectRow = "SELECT departments.id AS department,


CONCAT(
    '[',
        
       
        '{',
            '\"tableName\":\"departments_vs_nursescompliances\"', 
            ',\"data\":[',
                        GROUP_CONCAT(

                                DISTINCT(

                                JSON_OBJECT(
                                    'id',CONCAT(''),                                  
                                    'name', IFNULL(departments_vs_nursescompliances.name, ''),
                                    'expiration_days', CONCAT(IFNULL(departments_vs_nursescompliances.expiration_days, '')), 
                                   
                                    'notes', IFNULL(departments_vs_nursescompliances.notes, '') ,
                                    'mandatory', IFNULL(departments_vs_nursescompliances.mandatory, '')                             
                                    


                                         )

                              ) ORDER BY  departments_vs_nursescompliances.id ASC  SEPARATOR ','),
                      ']',
        '}',
        
        
    
        

    ']'
    
    
        ) AS multiTables

        FROM departments

LEFT JOIN departments_vs_nursescompliances ON departments_vs_nursescompliances.departmentsId = departments.id
 WHERE departments.id = '$id'  AND departments.deleted = '0' GROUP BY departments.id;"; 




//writeToTestTxt($selectRow);
//echo $selectRow; exit;
//EXECUTING SQL QUERY TO GET ROWS
//mysqli_query($con, "SET @@sql_mode = 'NO_BACKSLASH_ESCAPES';");
 if (!$result = mysqli_query($con, $selectRow)){
    echoReturnObject("MySqlError");
    exit;
  }
  $rows = [];
  while($row = $result->fetch_assoc()) {
      $rows[] = $row;
     // print_r($row);
  }
  $mt = "[]";
if(isset($rows[0]["multiTables"])){
  $mt = $rows[0]["multiTables"];  
  unset($rows[0]["multiTables"]);
}

//GETTING ELEMENT FILES



//writeToTestTxt(json_encode($rows));


echoReturnObject("ok", $rows, 0, $mt);
mysqli_free_result($result);
mysqli_close($con);
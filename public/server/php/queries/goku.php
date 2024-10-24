<?php

$originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');
if($originFile == "select"){
    $selectAllRows = "SELECT id, name, last_name, AES_DECRYPT(UNHEX(__ssn), '".SQLSALT."') AS ssn FROM goku WHERE goku.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString."  ORDER BY $sortBy $sortDirection LIMIT $limit1, $limit2 ;";
    $allRowsCountSql = "SELECT  COUNT(*) AS rowsQty FROM goku WHERE goku.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString." ;";  
}
/*elseif($originFile == "selectOne"){
    $selectRow = "SELECT id, name, last_name, AES_DECRYPT(UNHEX(__ssn), '".SQLSALT."') AS ssn, geo, signature FROM goku WHERE goku.id = '$id'  AND goku.deleted = '0';"; 
}*/

elseif($originFile == "autocomplete"){
    $autocompleteQuery = "SELECT id, CONCAT( name, ' ', last_name) AS displayText,  '{}' AS otherField FROM goku WHERE goku.deleted = '0' ".$mainFilter->readySqlString." 
     ORDER BY name LIMIT 10 ;";
}

elseif($originFile == "update" || $originFile == "insert" || $originFile == "selectOne"){

    $departmentsIds = getTableValue('goku', 'department', $id, );
    //$powerIds = getPowerIds($id);

    //echo "DEPARTMENTS IDs: ".$departmentsIds;
    //echo "<br>DEPARTMENTS IDs: ".$powerIds."<br>";

  

// 
    $selectRow = "SELECT goku.id AS id, goku.name AS name, goku.last_name AS last_name, goku.dob AS dob,  goku.gender AS gender, goku.getAlert AS getAlert, goku.car AS car, COALESCE(AES_DECRYPT(UNHEX(__ssn), '".SQLSALT."'),'') AS ssn, geo, signature,
    
     
     
    COALESCE(CONCAT(
        '[',
   
        GROUP_CONCAT( DISTINCT( 
   
                                        JSON_OBJECT('id', CONCAT(departments.id), 'displayText',  departments.name)
   
                                       
                                   )
                     
                     
                       SEPARATOR ',' 
                    ),
   
       ']'
   
                ),'') AS department,





       CONCAT(
    '[',
        
        '{',
            '\"tableName\":\"goku_vs_powers\"', 
            ',\"data\":[',
                              GROUP_CONCAT(DISTINCT(JSON_OBJECT('id',CONCAT(gokuVsPowers.rowId),'au__goku_vs_powers_vs_power',CONCAT('[',gokuVsPowers.rowPowers,']'), 'powerValue',gokuVsPowers.powerValue)) ORDER BY gokuVsPowers.auRowId ASC SEPARATOR ','),
                      ']',
        '},',  

        '{',
            '\"tableName\":\"goku_vs_countries\"', 
            ',\"data\":[',
                        GROUP_CONCAT(DISTINCT(JSON_OBJECT('id',CONCAT(goku_vs_countries.id),'name',goku_vs_countries.name, 'dateVisited',goku_vs_countries.dateVisited, 'tropical',goku_vs_countries.tropical, 'continent',goku_vs_countries.continent, 'race', goku_vs_countries.race )) ORDER BY goku_vs_countries.id ASC SEPARATOR ','),
                      ']',
        '}', 
    
    
    ']'
    
    
        ) AS multiTables









FROM goku
      
    LEFT JOIN  departments ON   departments.id IN ( $departmentsIds )







    LEFT JOIN (

        
                    SELECT au__goku_vs_powers_vs_power.id AS auRowId, goku_vs_powers.id AS rowId, goku_vs_powers.gokuId AS gokuId, goku_vs_powers.powerValue AS powerValue, GROUP_CONCAT(JSON_OBJECT('id',   CONCAT(powers.id), 'displayText', powers.name) ORDER BY goku_vs_powers.id ASC SEPARATOR ',') AS rowPowers
                    
                    FROM  goku_vs_powers 

                    LEFT JOIN au__goku_vs_powers_vs_power ON  au__goku_vs_powers_vs_power.goku_vs_powersId = goku_vs_powers.id 
                    LEFT JOIN powers ON  powers.id = au__goku_vs_powers_vs_power.power
                    WHERE  goku_vs_powers.deleted = '0' AND  goku_vs_powers.gokuId = '$id' GROUP BY goku_vs_powers.id
        
        
        ) AS gokuVsPowers ON gokuVsPowers.gokuId = goku.id 



     

     LEFT JOIN goku_vs_countries ON goku_vs_countries.gokuId = goku.id AND goku_vs_countries.deleted = '0'
     




     WHERE goku.id = '$id'  AND goku.deleted = '0' GROUP BY goku.id;"; 




    



}

//SELECT goku_vs_powers.id AS rowId, powers.id AS powerId, powers.name AS name FROM powers, goku_vs_powers WHERE ','+powers.id+',' LIKE goku_vs_powers.powerId AND goku_vs_powers.gokuId = 1 ;
//SELECT goku_vs_powers.id AS rowId, powers.id AS powerId, powers.name AS name FROM powers, goku_vs_powers WHERE CONCAT(',',powers.id,',') LIKE CONCAT('%,',goku_vs_powers.powerId,',%') AND goku_vs_powers.gokuId = 1;
//SELECT goku_vs_powers.id AS rowId, powers.id AS powerId, powers.name AS name FROM powers, goku_vs_powers WHERE goku_vs_powers.powerId LIKE '%,2,%' AND goku_vs_powers.gokuId = 1;
/*



     LEFT JOIN goku_vs_powers ON goku_vs_powers.gokuId = goku.id AND goku_vs_powers.deleted = '0'

     LEFT JOIN au__goku_vs_powers_vs_power ON  au__goku_vs_powers_vs_power.goku_vs_powersId = goku_vs_powers.id  








   CONCAT(
    '[',
        
        '{',
            '\"tableName\":\"goku_vs_powers\"', 
            ',\"data\":[',
                        GROUP_CONCAT(DISTINCT(JSON_OBJECT('id',CONCAT(goku_vs_powers.id),'powerId',JSON_OBJECT('id',   CONCAT(powers.id), 'displayText', powers.name), 'powerValue',goku_vs_powers.powerValue)) SEPARATOR ','),
                      ']',
        '},',  

        '{',
            '\"tableName\":\"goku_vs_countries\"', 
            ',\"data\":[',
                        GROUP_CONCAT(DISTINCT(JSON_OBJECT('id',CONCAT(goku_vs_countries.id),'name',goku_vs_countries.name, 'dateVisited',goku_vs_countries.dateVisited, 'tropical',goku_vs_countries.tropical, 'continent',goku_vs_countries.continent, 'race', goku_vs_countries.race )) SEPARATOR ','),
                      ']',
        '}', 
    
    
    ']'
    
    
        ) AS multiTables










[{"tableName":"goku_vs_powers",

"dataToUpdate":[{"id":"131","au__goku_vs_powers_vs_power":"42","powerValue":"asdf2"},
{"id":"130","au__goku_vs_powers_vs_power":"42","powerValue":"ASDF"},
{"id":"114","au__goku_vs_powers_vs_power":"1","powerValue":"asx"},
{"id":"115","au__goku_vs_powers_vs_power":"5,4,3","powerValue":"11500"},
{"id":"116","au__goku_vs_powers_vs_power":"5,1,6","powerValue":"11600"}],

"dataToInsert":[{"id":"","au__goku_vs_powers_vs_power":"42","powerValue":"zzz"}]},
{"tableName":"goku_vs_countries","dataToUpdate":[{"id":"153","name":"asd","dateVisited":"2022-03-03","tropical":"","continent":"","race":"prieto"}],"dataToInsert":[]}]








*/

// LEFT JOIN  departments ON   CONCAT(',',departments.id,',') LIKE '%'+goku.department+'%'

function getTableValue($table, $field, $id){
    $con = $_SESSION['user']->initCompanyDBConn();
    if (!$con) {
        die('Could not connect: ' . mysqli_error($con));
        return "0";
    }

    $id            = mysqli_real_escape_string($con, $id);
    $sql="SELECT department FROM goku WHERE id = '$id'";
    $result = mysqli_query($con,$sql);
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) { 
        $departments = $rs["department"];
    }
    mysqli_close($con);
    return $departments;
}
     


function getPowerIds($gokuId){
    $con = $_SESSION['user']->initCompanyDBConn();
    $powers = [];
    if (!$con) {
        die('Could not connect: ' . mysqli_error($con));
        return "0";
    }

 
    $sql="SELECT GROUP_CONCAT(powerId SEPARATOR ',') AS powers FROM goku_vs_powers WHERE gokuId = '$gokuId'";
    $result = mysqli_query($con,$sql);
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) { 
        //$powers = implode(',', explode(',', $rs["powers"]));
       $powers = implode(',', array_unique(explode(',', $rs["powers"])));
    }
    mysqli_close($con);
    return $powers;
}

?>
<?php

$originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');
if($originFile == "select"){
    $selectAllRows = "SELECT 
    users.id AS id, 
    users.code, 
    users.username, 
    AES_DECRYPT(UNHEX(__name), '".SQLSALT."') AS __name,  
    last_name, 
    privilege,
    IF(active = 'true', 'Active', 'Inactive') AS status, 
    phone,
    email,
    users.privilege AS type, 
    COALESCE(DATE_FORMAT(MAX(users_logs.created_date), '%m/%d/%y %h:%i %p'), 'None') AS lastLogon, 
    IF(users.privilege = 'admin', 'Full Access', GROUP_CONCAT(users_vs_permissions.entity SEPARATOR ', ')) AS entities, 
    users.avatar 
    FROM users 
    LEFT JOIN users_logs ON users_logs.usersId = users.id
    LEFT JOIN users_vs_permissions ON users_vs_permissions.usersId = users.id AND users_vs_permissions.deleted = '0' AND users_vs_permissions.privilegeDB != 'none'
    
    
    WHERE users.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString." GROUP BY users.id ORDER BY $sortBy $sortDirection LIMIT $limit1, $limit2 ;";
    
    $allRowsCountSql = "SELECT  COUNT(*) AS rowsQty FROM users WHERE users.deleted = '0' ".$mainFilter->readySqlString.$andFilter->readySqlString." ;";  
}
/*elseif($originFile == "selectOne"){
    $selectRow = "SELECT id, name, last_name, AES_DECRYPT(UNHEX(__ssn), '".SQLSALT."') AS ssn, geo, signature FROM users WHERE users.id = '$id'  AND users.deleted = '0';";  
}*/

elseif($originFile == "autocomplete"){
    $autocompleteQuery = "SELECT id, avatar,CONCAT( AES_DECRYPT(UNHEX(__name), '".SQLSALT."'), ' ', last_name) AS displayText, '{}' as otherField FROM users WHERE users.deleted = '0' ".$mainFilter->readySqlString." 
     ORDER BY __name ;";
}

elseif($originFile == "update" || $originFile == "insert" || $originFile == "selectOne" || $originFile == "selectMyUser" || $originFile == "updateUsers" || $originFile == "insertUsers"  || $originFile == "updateMyUser"){
    $selectRow = "SELECT 
    
    users.id AS id,     
    users.code,     
    AES_DECRYPT(UNHEX(__name), '".SQLSALT."') AS __name, 
    users.last_name AS last_name, 
    users.sex, 
    users.ssn, 
    users.dob, 
    users.address,
    users.apt,
    users.city,
    users.state,
    users.zip,
    users.payroll, 
    users.salary, 
    users.active AS active,
    users.username AS username, 
    privilege,
    users.privilege AS type, 
    IF(active = 'true', 'Active', 'Inactive') AS status, 
    '' AS __password, 
    users.notes AS notes,
    language,  
    COALESCE(DATE_FORMAT(MAX(users_logs.created_date), '%m/%d/%y %h:%i %p'), 'None') AS lastLogon,    
    IF(users.privilege = 'admin', 'Full Access', GROUP_CONCAT(users_vs_permissions.entity SEPARATOR ', ')) AS entities,   
    
    users.avatar, 
    AES_DECRYPT(UNHEX(users.__password), '".SQLSALT."') AS __oldPassword,
   
    users.phone AS phone,
    users.email AS email,
    users.language AS languaje,
     

   
   CONCAT(
    '[',
        
        '{',
            '\"tableName\":\"users_vs_permissions\"', 
            ',\"data\":[',
                        GROUP_CONCAT(DISTINCT(JSON_OBJECT(
                            'id',CONCAT(users_vs_permissions.id), 
                            'entity',users_vs_permissions.entity,
                            'privilegeDB',users_vs_permissions.privilegeDB,
                            'privilegeFile',users_vs_permissions.privilegeFile,
                            'privilegeAgrmt',users_vs_permissions.privilegeAgrmt
                            )) SEPARATOR ','),
                      ']'
        '}' 
    
    
    ']'
    
    
        ) AS multiTables
     FROM users
     LEFT JOIN users_vs_permissions ON users_vs_permissions.usersId = users.id AND users_vs_permissions.deleted = '0'
     LEFT JOIN users_logs ON users_logs.usersId = users.id
     WHERE users.id = '$id'  AND users.deleted = '0';"; 
}



     


?>
<?php

$queryA = "UPDATE sale SET code = CONCAT('INV',LPAD(id, 6, '0')) WHERE sale.id =  '$id' AND sale.code = '';";

// insert the change into the newly created element
$user_id = $_SESSION['user']->userId;
$queryB = "
    INSERT INTO entity_audit (entity, entity_id, code, action, changes, user_id) 
    SELECT 
    	'sale' AS entity,
        s.id AS entity_id,
        s.code AS code,  
        'INSERT' AS action,   
        CONCAT('{\"userId\":', $user_id, ',\"input\":[{\"elemId\":\"Sale created\",\"from\":\"\",\"to\":\"\"}],\"mt\":[]}') AS changes,          
        $user_id AS user_id
    FROM 
        sale s
    WHERE 
        s.id = '$id'

";

//$queryB = "UPDATE sale SET shipped_time = CURRENT_TIMESTAMP WHERE sale.id =  '$id' AND sale.shipping_status != 'shipped';";

$afterInsertEntityQuery = [$queryA, $queryB]; 

?>
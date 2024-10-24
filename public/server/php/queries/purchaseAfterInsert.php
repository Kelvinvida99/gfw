<?php

$queryA = "
	UPDATE purchase 
	SET code = CONCAT('PU',LPAD(id, 6, '0'))
	WHERE purchase.id =  '$id' AND purchase.code = '';
";



$queryB = "
   	UPDATE purchase
	SET purchase_date = CURRENT_TIMESTAMP
	WHERE purchase.id = '$id' AND purchase.deleted = '0';
";

$queryC = "
   	UPDATE purchase
	SET creation_date = CURRENT_TIMESTAMP
	WHERE purchase.id = '$id' AND purchase.deleted = '0';
";

$queryD = "
		INSERT INTO purchase_tracking_mail (purchaseId, email, mail_date, providerId) 
		SELECT 
			purchase.id,               
			purchase.provider_email,   
			CURRENT_TIMESTAMP, 
			purchase.provider_id       
		FROM 
			purchase
		WHERE 
			purchase.id = '$id' AND purchase.check_mail = 'true'
"; 

// insert the change into the newly created element
$user_id = $_SESSION['user']->userId;
$queryE = "
    INSERT INTO entity_audit (entity, entity_id, code, action, changes, user_id) 
    SELECT 
    	'purchase' AS entity,
        p.id AS entity_id,
        p.code AS code,  
        'INSERT' AS action,   
        CONCAT('{\"userId\":', $user_id, ',\"input\":[{\"elemId\":\"Purchase created\",\"from\":\"\",\"to\":\"\"}],\"mt\":[]}') AS changes,          
        $user_id AS user_id
    FROM 
        purchase p
    WHERE 
        p.id = '$id'

";

$afterInsertEntityQuery = [$queryA, $queryB, $queryC, $queryD, $queryE];
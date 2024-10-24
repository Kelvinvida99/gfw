<?php

$afterInsertEntityQuery[] = "UPDATE equitydeposit SET code = CONCAT('DEP',LPAD(id, 5, '0')) WHERE equitydeposit.id =  '$id' AND equitydeposit.code = '';";


$afterInsertEntityQuery[]  = "
	INSERT INTO transaction (account, entity, amount, action, date_time, date, entity_id, user_id, employee_id) 
	SELECT
	account_id, 
		'equitydeposit',
		amount, 
		'in', 
		CURRENT_TIME,
		CURRENT_TIMESTAMP,
		'$id',
		" . $_SESSION["user"]->userId  . " ,
		user_id

	FROM equitydeposit
	WHERE equitydeposit.id =  '$id' AND equitydeposit.deleted = '0';
";

?>
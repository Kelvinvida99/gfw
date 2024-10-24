<?php
$user_id = 0;
if (isset($_SESSION['user'])) {
	$user_id = $_SESSION["user"]->userId;
}

$queryA = "
UPDATE transaction
SET deleted = '1'
WHERE entity = 'equitydeposit' AND  entity_id = '$id'; ";

$queryB = "
	INSERT INTO transaction (account, entity, amount, action, date_time, date, entity_id, user_id, employee_id) 
	SELECT
	account_id, 
		'equitydeposit',
		amount, 
		'in', 
		CURRENT_TIME,
		CURRENT_TIMESTAMP,
		'$id',
		'$user_id',
		user_id

	FROM equitydeposit
	WHERE equitydeposit.id =  '$id' AND equitydeposit.deleted = '0';
";

$afterUpdateEntityQuery = [$queryA, $queryB];
















?>


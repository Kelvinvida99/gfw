<?php
$user_id = 0;
if (isset($_SESSION['user'])) {
	$user_id = $_SESSION["user"]->userId;
}

$queryA = "
UPDATE transaction
SET deleted = '1'
WHERE entity = 'receivepayment' AND  entity_id = '$id'; ";

$queryB = "
	INSERT INTO transaction (account, entity, amount, action, date_time, date, entity_id, user_id, customer_id) 
	SELECT
		accounts_id, 
		'receivepayment',
		amount, 
		'in', 
		CURRENT_TIME,
		CURRENT_TIMESTAMP,
		'$id',
		'$user_id',
		customer_id

	FROM receivepayment
	WHERE receivepayment.id =  '$id' AND receivepayment.deleted = '0';
";

$afterUpdateEntityQuery = [$queryA, $queryB];


















?>


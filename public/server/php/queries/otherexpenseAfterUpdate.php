<?php
$user_id = 0;
if (isset($_SESSION['user'])) {
	$user_id = $_SESSION["user"]->userId;
}

$queryA = "
UPDATE transaction
SET deleted = '1'
WHERE entity = 'otherexpense' AND  entity_id = '$id'; ";

$queryB = "
	INSERT INTO transaction (account, entity, amount, action, date_time, date, entity_id, user_id, provider_id) 
	SELECT
		accounts_bank_id, 
		'otherexpense',
		amount, 
		'out', 
		CURRENT_TIME,
		CURRENT_TIMESTAMP,
		'$id',
		'$user_id',
		provider_id

	FROM otherexpense
	WHERE otherexpense.id =  '$id' AND otherexpense.deleted = '0';
";

$afterUpdateEntityQuery = [$queryA, $queryB];
















?>


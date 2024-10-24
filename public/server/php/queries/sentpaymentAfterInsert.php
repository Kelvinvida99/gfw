<?php
$user_id = 0;
if (isset($_SESSION['user'])) {
	$user_id = $_SESSION["user"]->userId;
}

$queryA = "UPDATE sentpayment SET code = CONCAT('SP',LPAD(id, 5, '0')) WHERE sentpayment.id =  '$id' AND sentpayment.code = '';";
$queryB = "DELETE FROM payment_vs_po_or_services WHERE sent_amount = 0 AND sentpaymentId = '$id';";
$queryC = "
	INSERT INTO transaction (account, entity, amount, action, date_time, date, entity_id, user_id, provider_id) 
	SELECT
		accounts_id, 
		'sentpayment',
		amount, 
		'out', 
		CURRENT_TIME,
		CURRENT_TIMESTAMP,
		'$id',
		'$user_id',
		provider_id

	FROM sentpayment
	WHERE sentpayment.id =  '$id' AND sentpayment.deleted = '0';
";

$afterInsertEntityQuery = [$queryA, $queryB, $queryC];
// $afterInsertEntityQuery[] = "";





?>
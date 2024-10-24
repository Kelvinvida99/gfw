<?php
$user_id = 0;
if (isset($_SESSION['user'])) {
	$user_id = $_SESSION["user"]->userId;
}



$afterInsertEntityQuery[] = "UPDATE employesspayment SET code = CONCAT('EP',LPAD(id, 5, '0')) WHERE employesspayment.id =  '$id' AND employesspayment.code = '';";
$afterInsertEntityQuery[] = "
	INSERT INTO transaction (account, entity, amount, action, date_time, date, entity_id, user_id, employee_id) 
	SELECT
		account_id, 
		'employesspayment',
		amount, 
		'out', 
		CURRENT_TIME,
		CURRENT_TIMESTAMP,
		'$id',
		'$user_id',
		employee

	FROM employesspayment
	WHERE employesspayment.id =  '$id' AND employesspayment.deleted = '0';
";
?>  
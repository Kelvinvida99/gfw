<?php
$user_id = 0;
if (isset($_SESSION['user'])) {
	$user_id = $_SESSION["user"]->userId;
}

$queryA = "
UPDATE transaction
SET deleted = '1'
WHERE entity = 'equitydeposit' AND  entity_id = '$id'; ";



$afterDeleteEntityQuery = [$queryA];
















?>


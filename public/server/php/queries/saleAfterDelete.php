<?php
$user_id = 0;
if (isset($_SESSION['user'])) {
	$user_id = $_SESSION["user"]->userId;
}

$afterDeleteEntityQuery[] = "
UPDATE sale_vs_item
SET deleted = '1'
WHERE saleId = '$id'; ";






















?>


<?php
$user_id = 0;
if (isset($_SESSION['user'])) {
	$user_id = $_SESSION["user"]->userId;
}

$afterDeleteEntityQuery[] = "
UPDATE purchase_vs_item
SET deleted = '1'
WHERE purchaseId = '$id'; ";

$afterDeleteEntityQuery[] = "
UPDATE purchase_vs_expenses
SET deleted = '1'
WHERE purchaseId = '$id'; ";









/*

INSERT INTO beestock.item (name, brand, notes) 
SELECT  name, brand, description  FROM rodin.items;

UPDATE item SET code = CONCAT('IT',id)



INSERT INTO  beestock.customer 

(name, contact, type, phone, other_phone,fax, email, bill_to_address, bill_to_apt, bill_to_city, bill_to_state, bill_to_zip , ship_to_address, ship_to_apt, ship_to_city, ship_to_state, ship_to_zip, credit, inv_terms, description) 
SELECT  company, contact, 'Freight', phone, cell,fax, email, address, address2, city, state, zip, address, address2, city, state, zip, credit, inv_terms, comments  FROM rodin.customers WHERE deleted = 'no'; 

UPDATE customer 
SET code = CONCAT('P',LPAD(id, 5, '0'));*/



?>


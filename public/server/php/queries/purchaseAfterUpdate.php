<?php 

// verifica que la el monto de inversion sea menor o igual
// al minimo de inversion, de no cumplirse resetea el ultimo monto de inversion = 0
// agregado en la tabla purchase_vs_investment
// este actua en caso de presentarse algun error en el primer paso de verificacion
// purchase-fullcont-handler.js
$queryA = "
   	UPDATE purchase_vs_investment
	SET invested_amount = 0
	WHERE purchase_vs_investment.purchaseId = '$id'
	AND invested_amount > (
	    SELECT p.min_amount
	    FROM purchase p
	    WHERE p.id = '$id'
	)
	ORDER BY purchase_vs_investment.id DESC
	LIMIT 1;
";

// verifica que la suma total de los montos de inversion sea menor o igual
// al precio total de inversion, de no cumplirse resetea el ultimo monto de inversion = 0
// agregado en la tabla purchase_vs_investment
$queryB = "
   	UPDATE purchase_vs_investment
	SET invested_amount = 0
	WHERE purchase_vs_investment.purchaseId = '$id'
	AND (
	    SELECT SUM(pvi.invested_amount)
	    FROM purchase_vs_investment pvi
	    WHERE pvi.purchaseId = '$id'
	) > (
	    SELECT p.price
	    FROM purchase p
	    WHERE p.id = '$id'
	)
	ORDER BY purchase_vs_investment.id DESC
	LIMIT 1;
";

// suma los campos total_price en la tabla purchase_vs_item
// y las inserta en el campo general_total_price de la tabla purchase
$queryC = "
   	UPDATE purchase
	SET general_total_price = (
		SELECT SUM(pvi.total_price)
		FROM purchase_vs_item pvi
		WHERE pvi.purchaseId = '$id'
		AND pvi.deleted = '0'
	)
	WHERE purchase.id = '$id'
	AND purchase.deleted = '0'
";

$queryD = "
   	UPDATE purchase
	SET general_total_selling_price = (
		SELECT SUM(pvi.selling_price * pvi.qty)
		FROM purchase_vs_item pvi
		WHERE pvi.purchaseId = '$id'
		AND pvi.deleted = '0'
	)
	WHERE purchase.id = '$id'
	AND purchase.deleted = '0'
";


$queryF = "
   	UPDATE purchase
	SET general_total_expenses = (
		SELECT SUM(pve.amount)
		FROM purchase_vs_expenses pve
		WHERE pve.purchaseId = '$id'
		AND pve.deleted = '0'
	)
	WHERE purchase.id = '$id'
	AND purchase.deleted = '0'
";

// $queryF = "
// 		INSERT INTO purchase_tracking_mail (purchaseId, email, mail_date, providerId) 
// 		SELECT 
// 			purchase.id,               
// 			purchase.provider_email,   
// 			CURRENT_TIMESTAMP, 
// 			purchase.provider_id      
// 		FROM 
// 			purchase
// 		WHERE 
// 			purchase.id = '$id' AND purchase.check_mail = 'true'
// "; 

$afterUpdateEntityQuery = [$queryA, $queryB, $queryC, $queryD,  $queryF];
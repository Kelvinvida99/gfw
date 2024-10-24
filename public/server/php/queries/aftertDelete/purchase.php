<?php





///$afterDeleteEntityQuery[] = "UPDATE sale SET payment_status = CONCAT('RP',receivepayment.id) WHERE receivepayment.id =  '$id' AND receivepayment.code = '';";

$afterDeleteEntityQuery[] = "UPDATE purchase_vs_item SET deleted = '1' WHERE purchaseId = '$id'";


/*saleId = '109' OR saleId = '168' OR saleId = '175' OR saleId = '238' OR saleId = '316' OR saleId = '322' OR saleId = '377' OR saleId = '458' OR saleId = '493' OR saleId = '502' OR saleId = '507' OR saleId = '514' OR saleId = '516' OR saleId = '526' OR saleId = '557' OR saleId = '582' OR saleId = '584' OR saleId = '620' OR saleId = '658' OR saleId = '678' OR saleId = '714' OR saleId = '717' OR saleId = '725'



;";*/

?>
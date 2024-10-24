<?php





$afterDeleteEntityQuery[] = "UPDATE sale SET payment_status = CONCAT('RP',receivepayment.id) WHERE receivepayment.id =  '$id' AND receivepayment.code = '';";



?>
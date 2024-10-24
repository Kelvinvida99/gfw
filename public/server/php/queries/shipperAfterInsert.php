<?php


$afterInsertEntityQuery[] = "UPDATE shipper SET code = CONCAT('S',LPAD(id, 5, '0')) WHERE shipper.id =  '$id' AND shipper.code = '';";




?>
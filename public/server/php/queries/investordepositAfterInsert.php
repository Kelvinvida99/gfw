<?php


$afterInsertEntityQuery[] = "UPDATE investordeposit SET code = CONCAT('DEP',LPAD(id, 5, '0')) WHERE investordeposit.id =  '$id' AND investordeposit.code = '';";




?>
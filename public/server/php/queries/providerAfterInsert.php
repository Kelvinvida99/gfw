<?php


$afterInsertEntityQuery[] = "UPDATE provider SET code = CONCAT('P',LPAD(id, 5, '0')) WHERE provider.id =  '$id' AND provider.code = '';";




?>
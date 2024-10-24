<?php


$afterInsertEntityQuery[] = "UPDATE investor SET code = CONCAT('I',LPAD(id, 5, '0')) WHERE investor.id =  '$id' AND investor.code = '';";




?>
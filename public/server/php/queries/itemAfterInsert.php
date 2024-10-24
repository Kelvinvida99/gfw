<?php


$afterInsertEntityQuery[] = "UPDATE item SET code = CONCAT('IT',LPAD(id, 5, '0')) WHERE item.id =  '$id' AND item.code = '';";




?>
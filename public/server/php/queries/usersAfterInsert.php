<?php

$afterInsertEntityQuery[] = "UPDATE users SET code = CONCAT('EMP',LPAD(id, 3, '0')) WHERE users.id =  '$id' AND users.code = '';";

?>
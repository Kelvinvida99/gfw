<?php

$queryA = "UPDATE accounts SET code = CONCAT('A00',accounts.id) WHERE accounts.id =  '$id' AND accounts.code = '';";

$queryB = "UPDATE accounts SET registered_date = CURRENT_TIMESTAMP WHERE accounts.id =  '$id' AND accounts.registered_date = '';";

$afterInsertEntityQuery = [$queryA, $queryB];

?>
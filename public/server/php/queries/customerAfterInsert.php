<?php



$queryA = "UPDATE customer SET code = CONCAT('C',LPAD(id, 4, '0')) WHERE customer.id =  '$id' AND customer.code = '';";

//asignar un color aleatorio al campo avatarcolor y colocar la primera letra del customer
//en el campo avatarletter
$randomColor = generateRandomHexColor();
$queryB = "UPDATE customer SET avatarColor = '$randomColor', avatarLetter = SUBSTRING(name, 1, 1)  
WHERE customer.id =  '$id';";


$afterInsertEntityQuery = [$queryA, $queryB ]; 


?>
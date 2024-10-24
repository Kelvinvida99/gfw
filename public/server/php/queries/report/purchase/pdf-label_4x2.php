<?php
require "../../../auth/user.php";
require "../../../auth/checkAuth.php";
$_POST["entity"] = "purchase_id"; //COMMENT
$REQUESTED_ACTION = "readOnly"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite, THIS FILE WILL DOES SELECTS TO DATABASE, SO IT'S A  "readOnly"
require "../../../auth/checkAuthorization.php";
require "../../../sqlFunctions/returnObject.php";
require "../../../sqlFunctions/executeSelect.php";
require "../../../sqlFunctions/startDB.php"; //WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP




$purchase_id = isset($_POST["purchase_id"]) ? $_POST["purchase_id"] : null;

$opcion = isset($_POST["opcion"]) ?  json_decode($_POST["opcion"]) : null;



if ($purchase_id == NULL) {
    echo echoReturnObject("error");
    die;
}



require "query-label.php";


//GET ALL THE NECESARY DATA FIRST, CREATE AN EFFICIENT QUERY
//GET ALL THE NECESARY DATA FIRST, CREATE AN EFFICIENT QUERY
//GET ALL THE NECESARY DATA FIRST, CREATE AN EFFICIENT QUERY
//GET ALL THE NECESARY DATA FIRST, CREATE AN EFFICIENT QUERY
//GET ALL THE NECESARY DATA FIRST, CREATE AN EFFICIENT QUERY
//GET ALL THE NECESARY DATA FIRST, CREATE AN EFFICIENT QUERY
//GET ALL THE NECESARY DATA FIRST, CREATE AN EFFICIENT QUERY
//GET ALL THE NECESARY DATA FIRST, CREATE AN EFFICIENT QUERY

//EXECUTE QUERY AND GET DATA HERE
//EXECUTING SQL QUERY TO GET ROWS

$result = executeSelectQuery($con, $reportQuery);
$rows   = [];

while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
};

$mt = "[]";
if (isset($rows[0]["multiTables"])) {
    $mt = $rows[0]["multiTables"];
    unset($rows[0]["multiTables"]);
};

$data = json_decode($mt, true);
$check_mail = false;
// Iterar sobre los datos

if (count($rows) < 1) {
    echo echoReturnObject("error");
    die;
}

// print_r($rows);
// die;

require __DIR__ . '/../../../fpdf/library/fpdf.php';

$pdf = new FPDF();

//$pdf->setData($header); //ADDING THE DATABASE DATA TO PDF OBJECT
$pdf->AliasNbPages();



foreach ($data as $table) {
    foreach ($table['data'] as $key => $elem) {
        foreach ($opcion as $key => $value) {
            if ($value->item_id == $elem['item_id'] && $value->purchase_item_id== $elem['id']) {

                for ($i = 1; $i <= $value->cant; $i++) {
                    $pdf->AddPage('L', array(55, 100));

                    $pdf->SetMargins(1, 0, 0);
                    $pdf->SetAutoPageBreak(true, 0); 



                    $pdf->Rect(1, 1, 98.2, 53);

                    // $pdf->SetFont('Arial', 'B', 14);
                    // $pdf->SetXY(1, 1);
                    // //$pdf->Cell(98.2, 8, substr($rows[0]["company_name"], 0, 30), 0, 0, 'C'); // Nombre del artículo

                    // $pdf->SetXY(1, 6);
                    // $pdf->SetFont('Arial', '', 7);
                    // //$pdf->Cell(35, 8, $rows[0]["company_phone"], 0, 0, 'L');
                    // //$pdf->Cell(50, 8, $rows[0]["company_bill_to_address"], 0, 0, 'L');

                    // $pdf->SetXY(1, 9.5);
                    // //$pdf->Cell(35, 8, $rows[0]["company_email"], 0, 0, 'L');
                    // //$pdf->Cell(50, 8, $rows[0]["company_bill_to_city"] . ', ' . $rows[0]["company_bill_to_state"], 0, 0, 'L');


                    $pdf->Rect(1, 17, 98.2, 15);
                    $pdf->SetXY(1, 15);
                    $pdf->SetFont('Arial', 'B', 8);
                    $pdf->Cell(98.2, 8, "PURCHASE NUMBER", 0, 0, 'C');
                    $pdf->SetXY(1, 23);
                    $pdf->SetFont('Arial', 'B', 30);
                    $pdf->Cell(98.2, 8, $rows[0]["code"], 0, 0, 'C');

                    $pdf->Rect(1, 32, 98.2, 10);
                    $pdf->SetXY(1, 36);
                    $pdf->SetFont('Arial', 'B', 15);
                    $pdf->Cell(98.2, 2, substr($elem['item_name'], 0, 20), 0, 0, 'C');


                    // $pdf->SetXY(1, 53);
                    // $pdf->SetFont('Arial', '', 8);
                    // $pdf->Cell(98.2, 8, substr($elem['origin_country'], 0, 30), 0, 0, 'C');

                    // $pdf->Rect(1, 62, 49.1, 12);
                    // $pdf->Rect(50, 62, 49.2, 12);

                    $pdf->Rect(1, 42, 49.2, 12);

                    $pdf->SetXY(1, 41);
                    $pdf->SetFont('Arial', '', 7);
                    $pdf->Cell(50, 8, "Types", 0, 0, 'C');
                    $pdf->Cell(50, 8, "Code", 0, 0, 'C');

                    $pdf->SetXY(1, 45);
                    $pdf->SetFont('Arial', 'B', 14);
                    $pdf->Cell(50, 8, $elem['type_selling'], 0, 0, 'C');
                    $pdf->Cell(50, 8, $elem['item_code'], 0, 0, 'C');


                    // $pdf->Rect(1, 74, 49.1, 12);
                    // $pdf->Rect(50, 74, 49.2, 12);

                    // $pdf->SetXY(1, 73);
                    // $pdf->SetFont('Arial', '', 7);


                    // $pdf->SetXY(1, 78);
                    // $pdf->SetFont('Arial', 'B', 14);

                    // $pdf->Rect(1, 86.1, 98.2, 63);


                    // $pdf->SetXY(1, 100);
                    // $pdf->SetFont('Arial', 'B', 50);



                }
            }
        }


        // $item          = new stdClass(); // Crear un nuevo objeto para cada elemento 
        // $item->desc    = $elem['item_name'];
        // $item->unit    = $elem['selling_type'];
        // $item->qty     = $elem['qty'];
        // $item->price   = $elem['price'];
        // $item->total   = $elem['total'];







    }
}



// function RectWithTransparentSide($pdf, $x, $y, $w, $h, $transparentSide) {
//     $pdf->Rect($x, $y, $w, $h); // Dibuja el rectángulo exterior
//     // Dibuja un rectángulo blanco para simular el lado transparente
//     if ($transparentSide == 'top') {
//         $pdf->SetFillColor(255); // Establece el color de relleno blanco
//         $pdf->Rect($x, $y, $w, 0.1, 'F'); // Dibuja un rectángulo blanco en la parte superior
//     } elseif ($transparentSide == 'bottom') {
//         $pdf->SetFillColor(255); // Establece el color de relleno blanco
//         $pdf->Rect($x, $y + $h, $w, 0.1, 'F'); // Dibuja un rectángulo blanco en la parte inferior
//     } elseif ($transparentSide == 'left') {
//         $pdf->SetFillColor(255); // Establece el color de relleno blanco
//         $pdf->Rect($x, $y, 0.1, $h, 'F'); // Dibuja un rectángulo blanco en el lado izquierdo
//     } elseif ($transparentSide == 'right') {
//         $pdf->SetFillColor(255); // Establece el color de relleno blanco
//         $pdf->Rect($x + $w, $y, 0.1, $h, 'F'); // Dibuja un rectángulo blanco en el lado derecho
//     }
// }




// $pdf->SetXY(1,66);
// $pdf->SetFont('Arial','B',14);
// $pdf->Cell(50, 8, "PALLET 8", 0, 0, 'C'); 
// $pdf->Cell(50, 8, "IT4", 0, 0, 'C'); 









$file_name = "Label-" . rand(89, 9999999) . ".pdf";
$file_path = "../../../../storage/beestock/entities/purchase/sent-invoice/$file_name";
$pdf->Output($file_path, 'F');

$host        = $_SERVER['HTTP_HOST'];
//$fullUrl     = $_SERVER['REQUEST_SCHEME'] . "://$host" . "/beeStock/public/server/storage/beestock/entities/purchase/sent-invoice/$file_name";
$fullUrl     = $_SERVER['REQUEST_SCHEME'] . "://$host" . "/server/storage/beestock/entities/purchase/sent-invoice/$file_name";







$data_return = new stdClass();
$data_return->file_path  = $fullUrl;


echo json_encode($data_return);

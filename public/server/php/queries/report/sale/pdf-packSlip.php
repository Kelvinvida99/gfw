<?php
require "../../../auth/user.php";
require "../../../auth/checkAuth.php";
$_POST["entity"] = "sale";//COMMENT
$REQUESTED_ACTION = "readOnly"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite, THIS FILE WILL DOES SELECTS TO DATABASE, SO IT'S A  "readOnly"
require "../../../auth/checkAuthorization.php";
require "../../../sqlFunctions/returnObject.php";
require "../../../sqlFunctions/executeSelect.php";
require "../../../sqlFunctions/executeUpdate.php";
require "../../../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP




$sale_id = isset($_POST["sale_id"]) ? $_POST["sale_id"] : null;

if ($sale_id == NULL) {
    echo echoReturnObject("error");
    die;
}

$update = "update sale set packing_slip_last_printed=CURRENT_DATE() where id = $sale_id";
$result = executeUpdateQuery($con, $update);



require "query-invoice.php";
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

while($row = $result->fetch_assoc()) {
    $rows[] = $row;
};

$mt = "[]";
if(isset($rows[0]["multiTables"])){
    $mt = $rows[0]["multiTables"];
    unset($rows[0]["multiTables"]);
};

$data = json_decode($mt, true);
$check_mail = false;
// Iterar sobre los datos

if (count($rows)<1) {
    echo echoReturnObject("error");
    die;
}

$invoice_item          = new stdClass();
$invoice_item->items[] = array(); // Inicializar el array fuera del bucle




foreach ($data as $table) {

    foreach ($table['data'] as $elem) {
        //INVOICE ITEMS
        //INVOICE ITEMS
        // Acceder a los datos individuales
        // $item_id       = json_decode($elem['item_id'], true);//ordenar los invoice acco receivable by date , latest on top, hide total returns if there is not return, po number onitems invoice, error on received payment, poner fech en las facturas ks e cargan cuando creando un payment
        // $qty           = $elem['qty'];
        // $selling_price = $elem['selling_price'];
        // $total_price   = $elem['total_price'];
        // $type_selling  = json_decode($elem['type_selling'], true);
        // $unit_price    = $elem['unit_price'];


        $item          = new stdClass(); // Crear un nuevo objeto para cada elemento 
        $item->desc    = $elem['purchase_code']." - ".$elem['item_name']." ".$elem['item_brand'];
        $item->unit    = $elem['selling_type'];
        $item->qty     = $elem['qty'] ;
        $item->returnedQty     = $elem['returnedQty'] ;
        $item->price   = $elem['price'];
        $item->total   = $elem['total'];

        $invoice_item->items[] = (object)$item;
        // print_r($item);
    }
}

//HEADER
//HEADER
$header           = new stdClass();
$header->title    = "PACKING SLIP";
if ($rows[0]["company_avatar"] == "") {
    $header->logo_url = '../../../../storage/beestock/entities/company/logo/logo.png';
}else{
    //$header->logo_url = '../../../' . str_replace('server/','../',$rows[0]["company_avatar"]);
    $header->logo_url = '../../../'. str_replace('server/','../',$rows[0]["company_avatar"]);
    $header->logo_url = str_replace('lowlowlowCompression/','',$header->logo_url);
}

$header->name     = $rows[0]["company_name"];
$header->address  = $rows[0]["company_bill_to_address"];
$header->tel      = $rows[0]["company_phone"];
$header->email    = $rows[0]["company_email"];
$header->fax      = $rows[0]["customerFax"];
$header->footer   = $rows[0]["company_fax"];

$dateTimeString = $rows[0]["shipped_time"];

// Separar la fecha y la hora
list($datePart, $timePart) = explode(' ', $dateTimeString);

// Separar la fecha en año, mes y día
list($year, $month, $day) = explode('-', $datePart);

// Formatear la fecha en mm/dd/yyyy
$formattedDate = sprintf("%02d/%02d/%04d", $month, $day, $year);

// Separar la fecha y la hora
list($datePart, $timePart) = explode(' ', $dateTimeString);

// Separar la hora en horas, minutos y segundos
list($hour, $minute, $second) = explode(':', $timePart);

// Formatear la hora en hh:mm:ss
$formattedTime = sprintf("%02d:%02d", $hour, $minute);

//DESPUES DE CONSEGUIR TODA LA DATA, EMPEZAR A CREAR EL PDF

//STARTING PDF PAGE
//STARTING PDF PAGE
//STARTING PDF PAGE
// require realpath(__DIR__.'/../../fpdf/gosive/fpdf-classes.php');
require __DIR__ . '/../../../fpdf/gosive/fpdf-classes.php';

$pdf = new PDF();
$pdf->setData($header);//ADDING THE DATABASE DATA TO PDF OBJECT
$pdf->AliasNbPages();
$pdf->AddPage();

///SHIP TO AND BILL TO
///SHIP TO AND BILL TO
///SHIP TO AND BILL TO
///SHIP TO AND BILL TO
///SHIP TO AND BILL TO


$pdf->Cell(18,6,'INV. NO: ',0,0,"L");
$pdf->SetFont('Arial','',11);
$pdf->Cell(30,6,$rows[0]["code"] ,0,0);



$pdf->SetFont('Arial','B',11);
$pdf->Cell(26,6,'SHIPPED ON: ',0,0,"L");
$pdf->SetFont('Arial','',11);
$pdf->Cell(35,6,$formattedDate." ".$formattedTime,0,0);



$pdf->SetFont('Arial','B',11);
$pdf->Cell(25,5,'INV DATE: ',0,0,"L");
$pdf->SetFont('Arial','',11);
$pdf->Cell(30,5,$rows[0]["saleDate"],0,1);
$pdf->SetFont('Arial','B',11);
$pdf->SetTextColor(0,0,0);
$pdf->Cell(3100,6,"" ,0,1);
//
$pdf->Cell(90,6,'BILL TO:',0,0);
$pdf->Cell(90,6,"SHIP TO:" ,0,1);


// addres info
// line 1
//$pdf->Cell(40,4,"Date: ".$formattedDate ,0,0);
$pdf->SetFont('Arial','',11);
$pdf->Cell(90,4,$rows[0]["customerName"] ,0,0);
$pdf->Cell(90,4, $rows[0]["customerName"] ,0,1,'L');

//$pdf->Cell(40,4,"Time: ".$formattedTime ,0,0);
$pdf->Cell(90,4,$rows[0]["bill_to_address"] ,0,0);
$pdf->Cell(90,4, $rows[0]["ship_to_address"] ,0,1,'L');
// line 2
//$pdf->Cell(40,4,"" ,0,0);
$pdf->Cell(90,4,$rows[0]["bill_to_city"]." ".$rows[0]["bill_to_state"]." ".$rows[0]["bill_to_zip"],0,0);
$pdf->Cell(90,4,$rows[0]["ship_to_city"]." ".$rows[0]["bill_to_state"]." ".$rows[0]["bill_to_zip"],0,1);
// line 3
/*$pdf->Cell(65,4,$rows[0]["bill_to_state"],0,0);
$pdf->Cell(1,4,$rows[0]["ship_to_state"],0,1,'L');
// line 4
$pdf->Cell(50,4, $rows[0]["bill_to_zip"] ,0,0);
$pdf->Cell(1,4,$rows[0]["ship_to_zip"] ,0,0);*/

//ITEMS
//ITEMS
//ITEMS
//ITEMS
//ITEMS
//ITEMS
//ITEMS
//ITEMS
// $pdf->SetDrawColor(100,100,100);
// $pdf->Line(10, 95, 202, 95);
$pdf->Ln(8);
//$pdf->SetDrawColor(0,0,0);
$pdf->SetTextColor(0,0,0);
$pdf->SetFillColor(255,255,255);
$pdf->SetFont('Arial','B',11);  //$pdf->Cell(50);
$pdf->Cell(120,5,'ITEM',0,0,'L',1);
$pdf->Cell(50,5,'UNIT',0,0,'L',1);
$pdf->Cell(19,5,'QTY',0,0,'L',1);

///CICLO FOR PRINTING ITEMS
$pdf->SetFont('Arial','',13);  //$pdf->Cell(50);
$pdf->SetTextColor(5,5,5);
$pdf->Ln(5);

$subtotal = 0;
$contador = 0;
$qtyTotal = 0;
$returnTotal = 0;
foreach ($invoice_item->items as $key => $elem) {
    if ($key !== 0) {

        $subtotal += $elem->total;
        if ($contador % 2 == 0) {
            $pdf->SetFillColor(220,220,220);
            //     echo hexdec($gray_hex);
            //     echo $contador;
            $contador++;

        } else {
            $pdf->SetFillColor(255,255,255);
            //     echo "blanco";
            //     echo $contador;
            $contador++;
        }

        $pdf->SetFont('Arial','',12);  //$pdf->Cell(50);

        $pdf->Cell(120, 6, $elem->desc, 0, 0, '', 1);
        // $pdf->SetFont('Arial','',10);  //$pdf->Cell(50);

        $pdf->Cell(50, 6, $elem->unit, 0, 0,'', 1);
        $pdf->Cell(19, 6, $elem->qty, 0, 1, '', 1);
        $qtyTotal += $elem->qty;




        //CHECKING IF THIS ITEM HAS RETURNS
        if($elem->returnedQty > 0){
            //$subtotal -= ($elem->returnedQty * $elem->price) ;
            if ($contador % 2 == 0) {
                $pdf->SetFillColor(220,220,220);
                //     echo hexdec($gray_hex);
                //     echo $contador;
                $contador++;

            } else {
                $pdf->SetFillColor(255,255,255);
                //     echo "blanco";
                //     echo $contador;
                $contador++;
            }
            $pdf->SetFont('Arial','',12);  //$pdf->Cell(50);

            $pdf->Cell(120, 6, $elem->desc." (RETURNED)", 0, 0, '', 1);
            // $pdf->SetFont('Arial','',10);  //$pdf->Cell(50);
    
            $pdf->Cell(50, 6, $elem->unit, 0, 0,'', 1);
            $pdf->Cell(19, 6, "-".$elem->returnedQty, 0, 1, '', 1);
            $returnTotal += $elem->returnedQty;
            
        }
















    }
}

if ($contador % 2 == 0)
$pdf->SetFillColor(220,220,220);
else
$pdf->SetFillColor(255,255,255);


if($returnTotal != 0){
    $pdf->SetFont('Arial','B',16); 
    $pdf->Cell(120, 6, "", 0, 0, '', 1);
    $pdf->Cell(50, 6,"Returned: ", 0, 0,'R', 1);
    $pdf->Cell(19, 6, $returnTotal, 0, 1, 'L', 1);
}



$pdf->SetFont('Arial','B',16); 
$pdf->Cell(120, 6, "", 0, 0, '', 1);
$pdf->Cell(50, 6,"Total: ", 0, 0,'R', 1);
$pdf->Cell(19, 6, ($qtyTotal - $returnTotal), 0, 1, 'L', 1);


//PRINTING INVOICE TOTAL


$pdf->Ln(10);

$pdf->SetFont('Arial','',8);
$pdf->MultiCell( 150, 4, $rows[0]["sale_statement"],0,'L');


$pdf->Ln(10);
$pdf->SetTextColor(0,0,0);




$file_name = '';
$file_name = "f-packSlip_id-".rand ( 89 , 9999999 ).".pdf";
$file_path = "../../../../storage/beestock/entities/sale/sent-invoice/$file_name";
$pdf->Output($file_path, 'F');

$host        = $_SERVER['HTTP_HOST'];
//$fullUrl     = $_SERVER['REQUEST_SCHEME'] . "://$host". "/beeStock/public/server/storage/beestock/entities/sale/sent-invoice/$file_name";
$fullUrl     = $_SERVER['REQUEST_SCHEME'] . "://$host". "/server/storage/beestock/entities/sale/sent-invoice/$file_name";


$data_return = new stdClass();
$data_return->file_path  = $fullUrl;
$data_return->print = "true";
$data_return->check_mail = "";


echo json_encode($data_return) ; 

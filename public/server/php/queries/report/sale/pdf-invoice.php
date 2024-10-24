<?php
require "../../../auth/user.php";
require "../../../auth/checkAuth.php";
$_POST["entity"] = "sale";//COMMENT
$REQUESTED_ACTION = "readOnly"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite, THIS FILE WILL DOES SELECTS TO DATABASE, SO IT'S A  "readOnly"
require "../../../auth/checkAuthorization.php";
require "../../../sqlFunctions/returnObject.php";
require "../../../sqlFunctions/executeSelect.php";
require "../../../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP


//$_POST["sale_id"] = 54;

$sale_id = isset($_POST["sale_id"]) ? $_POST["sale_id"] : null;

if ($sale_id == NULL) {
    echo echoReturnObject("error");
    die;
}



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
$check_mail    = $rows[0]['send_email'];



// print_r($rows[0]);
// die;


// foreach ($rows as $row) {
//     print_r($row);
//     die;


//     $email         = $row['email_email'];
//     $name          = $row["customerName"];
//     $code          = $row["code"];
//     // bill
//     $billToAddress = $row["bill_to_address"];
//     $billToCity    = $row["bill_to_city"];
//     $billToState   = $row["bill_to_state"];
//     $billToZip     = $row["bill_to_zip"];
//     // ship
//     $shipToAddress = $row["ship_to_address"];
//     $shipToCity    = $row["ship_to_city"];
//     $shipToState   = $row["ship_to_state"];
//     $shipToZip     = $row["ship_to_zip"];
//     // contac
//     $phone         = $row["customerPhone"];
//     $fax           = $row["customerFax"];

//     // //VENDOR
//     // //VENDOR
//     // $vendor       = new stdClass();
//     // $vendor->name = $row["providerName"];

//     //COMPANY
//     //COMPANY
//     $company                  = new stdClass();
//     $company->name            = $name;
//     // bill
//     $company->bill_to_address = $billToAddress;
//     $company->bill_to_city    = $billToCity;
//     $company->bill_to_state   = $billToState;
//     $company->bill_to_zip     = $billToZip;
//     // ship
//     $company->ship_to_address = $shipToAddress;
//     $company->ship_to_city    = $shipToCity;
//     $company->ship_to_state   = $shipToState;
//     $company->ship_to_zip     = $shipToZip;
//     $company->good_bye_msg    = "THANK YOU FOR YOUR BUSINESS !";

//     //INVOICE
//     //INVOICE
//     $invoice                     = new stdClass();
//     $invoice->number             = $code;
//     $invoice->total              = "$1,250.00";
//     $invoice->date               = $row["purchaseDate"];
//     $invoice->barCode            = "                                    ";
//     $invoice->purchase_statement = "";
//     $invoice->purchase_footer    = "The perishable agricultural comm. listed on this invoice. are sold subject to the statutory trust authority. by Section 5 of the Perishable Agricultural Commodities Act,1930(7 U.S.C. 499 e).The seller of these comm. retains a trust claim over these comm.,all inventories of food or other products derived from these comm.,and any receivables or proceeds from the sale of these comm. until full payment. is received.";
// }
$invoice_item          = new stdClass();
$invoice_item->items[] = array(); // Inicializar el array fuera del bucle




foreach ($data as $table) {

    foreach ($table['data'] as $elem) {
        //INVOICE ITEMS
        //INVOICE ITEMS
        // Acceder a los datos individuales
        // $item_id       = json_decode($elem['item_id'], true);
        // $qty           = $elem['qty'];
        // $selling_price = $elem['selling_price'];
        // $total_price   = $elem['total_price'];
        // $type_selling  = json_decode($elem['type_selling'], true);
        // $unit_price    = $elem['unit_price'];


        $item          = new stdClass(); // Crear un nuevo objeto para cada elemento
        $item->desc    = $elem['purchase_code']." - ".$elem['item_name'];
        $item->unit    = $elem['selling_type'];
        $item->qty     = $elem['qty'];
        $item->returnedQty     = $elem['returnedQty'];
        $item->price   = $elem['price'];
        $item->total   = $elem['total'];

        $invoice_item->items[] = (object)$item;
        // print_r($item);
    }
}

//HEADER
//HEADER
$header           = new stdClass();
$header->title    = "INVOICE";
if ($rows[0]["company_avatar"] == "") {
    $header->logo_url = '../../../../storage/beestock/entities/company/logo/logo.png';
}else{
    //$header->logo_url = '../../../' . str_replace('server/','../',$rows[0]["company_avatar"]);
    $header->logo_url = '../../../'. str_replace('server/','../',$rows[0]["company_avatar"]);
    $header->logo_url = str_replace('lowlowlowCompression/','',$header->logo_url);
    //$header->logo_url = '../../../../storage/beestock/entities/company/logo/logo.png';
}


$header->tel      = $rows[0]["company_phone"];
$header->name     = $rows[0]["company_name"];
$header->address  = $rows[0]["company_bill_to_address"];
$header->tel      = $rows[0]["company_phone"];
$header->email    = $rows[0]["company_email"];
$header->fax      = $rows[0]["customerFax"];
$header->footer   = $rows[0]["sale_footer"];
$header->barCode   = $rows[0]["code"];

//DESPUES DE CONSEGUIR TODA LA DATA, EMPEZAR A CREAR EL PDF

//STARTING PDF PAGE
//STARTING PDF PAGE
//STARTING PDF PAGE
// require realpath(__DIR__.'/../../fpdf/gosive/fpdf-classes.php');
require __DIR__ . '/../../../fpdf/gosive/fpdf-classes.php';
//require __DIR__ . '/../../../fpdf/gosive/bar-codes.php';

//$pdf = new PDF();
$pdf = new PDF();
$pdf->setData($header);//ADDING THE DATABASE DATA TO PDF OBJECT
$pdf->AliasNbPages();
$pdf->AddPage();

///SHIP TO AND BILL TO
///SHIP TO AND BILL TO
///SHIP TO AND BILL TO
///SHIP TO AND BILL TO
///SHIP TO AND BILL TO
/*$pdf->SetFont('Arial','B',11);
$pdf->Cell(150,5,'Date: ',0,0,"R");
$pdf->SetFont('Arial','',10);
$pdf->Cell(1,5,$rows[0]["saleDate"],0,1);
$pdf->SetFont('Arial','B',11);
$pdf->SetTextColor(0,0,0);
$pdf->Cell(50,6,'BILL TO:',0,0);
$pdf->Cell(76,6,"SHIP TO:" ,0,0);
$pdf->Cell(30,6,'INV. NO: ',0,0,"R");
$pdf->SetFont('Arial','',11);
$pdf->Cell(1,6,$rows[0]["code"] ,0,1);

// addres info
// line 1
$pdf->Cell(50,4,$rows[0]["customerName"] ,0,0);
$pdf->Cell(1,4, $rows[0]["customerName"] ,0,1,'L');

$pdf->Cell(50,4,$rows[0]["bill_to_address"] ,0,0);
$pdf->Cell(1,4, $rows[0]["ship_to_address"] ,0,1,'L');
// line 2
$pdf->Cell(50,4,$rows[0]["bill_to_city"]." ".$rows[0]["bill_to_state"]." ".$rows[0]["bill_to_zip"],0,0);
$pdf->Cell(1,4,$rows[0]["ship_to_city"]." ".$rows[0]["ship_to_state"]." ".$rows[0]["ship_to_zip"],0,1);*/












$pdf->SetFont('Arial','B',11);
$pdf->Cell(164,5,'Date: ',0,0,"R");
$pdf->SetFont('Arial','',11);
$pdf->Cell(1,5,$rows[0]["saleDate"],0,1);
$pdf->SetFont('Arial','B',11);
$pdf->Cell(164,5,'Due Date: ',0,0,"R");
$pdf->SetFont('Arial','',11);
$pdf->Cell(1,6,$rows[0]["dueDate"],0,1);
$pdf->SetFont('Arial','B',11);
$pdf->SetTextColor(0,0,0);
$pdf->Cell(80,6,'BILL TO:',0,0);
$pdf->Cell(60,6,"SHIP TO:" ,0,0);
$pdf->Cell(22,6,'INV. NO: ',0,0,"R");
$pdf->SetFont('Arial','',11);
$pdf->Cell(1,7,$rows[0]["code"] ,0,1);

// addres info
// line 1
$pdf->Cell(80,4,$rows[0]["customerName"] ,0,0);
$pdf->Cell(1,4, $rows[0]["customerName"] ,0,1,'L');

$pdf->Cell(80,4,$rows[0]["bill_to_address"] ,0,0);
$pdf->Cell(1,4, $rows[0]["ship_to_address"] ,0,1,'L');
// line 2
$pdf->Cell(80,4,$rows[0]["bill_to_city"]." ".$rows[0]["bill_to_state"]." ".$rows[0]["bill_to_zip"],0,0);
$pdf->Cell(1,4,$rows[0]["ship_to_city"]." ".$rows[0]["bill_to_state"]." ".$rows[0]["bill_to_zip"],0,1);



















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
$pdf->Cell(74,5,'ITEM ',0,0,'L',1);
$pdf->Cell(39,5,'UNIT',0,0,'L',1);
$pdf->Cell(24,5,'QTY',0,0,'L',1);
$pdf->Cell(37,5,'UNIT PRICE',0,0,'L',1);
$pdf->Cell(20,5,'TOTAL',0,0,'L',1);

///CICLO FOR PRINTING ITEMS
$pdf->SetFont('Arial','',10);  //$pdf->Cell(50);
$pdf->SetTextColor(5,5,5);
$pdf->Ln(5);

$subtotal = 0;
$returnedTotal = 0;
$contador = 0;
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

        $pdf->Cell(74, 6, $elem->desc, 0, 0, '', 1);
        $pdf->Cell(39, 6, $elem->unit, 0, 0,'', 1);
        $pdf->Cell(24, 6, $elem->qty, 0, 0, '', 1);
        $pdf->Cell(37, 6, '$'.number_format($elem->price, 2), 0, 0, '',1);
        $pdf->Cell(20, 6, '$'.number_format($elem->total, 2), 0, 1,'',1);


        //CHECKING IF THIS ITEM HAS RETURNS
        if($elem->returnedQty > 0){
            $returnedTotal += ($elem->returnedQty * $elem->price) ;
            
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

            $pdf->Cell(74, 6, $elem->desc." (RETURNED)", 0, 0, '', 1);
            $pdf->Cell(39, 6, $elem->unit, 0, 0,'', 1);
            $pdf->Cell(24, 6, "-".$elem->returnedQty, 0, 0, '', 1);
            $pdf->Cell(37, 6, '$'.number_format($elem->price, 2), 0, 0, '',1);
            $pdf->Cell(20, 6, '-$'.number_format(($elem->returnedQty * $elem->price), 2), 0, 1,'',1);
        }

















    }
}

//PRINTING INVOICE TOTAL
//$taxes  = 0;
//$taxes1 = $taxes;
//$taxes  = round($subtotal*$taxes,2);
$total  = $rows[0]["grand_total"];
$pdf->SetDrawColor(100,100,100);
$posy = $pdf->GetY();
$pdf->SetY( $posy+8);
// $pdf->Line(10, $posy+3, 202, $posy+3);
$pdf->SetTextColor(5,5,5);
$posy = $pdf->GetY();//PARA EL SUBTOTAL, TAXES Y TOTAL
$pdf->SetFont('Arial','',8);
$pdf->MultiCell( 100, 4, $rows[0]["sale_statement"],0,'L');


$pdf->SetFillColor(220,220,220);
$pdf->SetFont('Arial','B',12);
$pdf->SetXY(145, $posy);
$pdf->Cell(32,5,'Subtotal:',0,0,'',1);
$pdf->SetFont('Arial','',12);
$pdf->Cell(30,5,"$".number_format($subtotal,2),0,1,'',1);
//$pdf->Cell(17,5,'QTY',0,0,'C',1); $pdf->Cell(20,5,'RATE',0,0,'L',1); $pdf->Cell(28,5,'AMOUNT',0,1,'L',1);

if($returnedTotal != 0){
    $pdf->SetFillColor(220,220,220);
    $pdf->SetFont('Arial','B',12);
    $pdf->SetXY(145, $posy+5);
    $pdf->Cell(32,5,'Total Returns:',0,0,'',1);
    $pdf->SetFont('Arial','',12);
    $pdf->Cell(30,5,"-$".number_format($returnedTotal,2),0,1,'',1);
    //$pdf->Cell(17,5,'QTY',0,0,'C',1); $pdf->Cell(20,5,'RATE',0,0,'L',1); $pdf->Cell(28,5,'AMOUNT',0,1,'L',1);
    
}


$pdf->SetTextColor(248,248,248);
$pdf->SetFillColor(0,120,212);
$pdf->SetFont('Arial','B',12);
$pdf->SetXY(145,$posy+10);
$pdf->Cell(32,8,'Grand Total',0,0,'',1);
$pdf->SetFont('Arial','B',17);
$pdf->Cell(30,8,"$".number_format($subtotal - $returnedTotal,2),0,1,'',1);
$pdf->Ln(10);
$pdf->SetTextColor(0,0,0);




//CHEQUIAR SI EL INVOICE NECESITA SER ENVIADO PRO EMAIL, SI ES ASI, EL ARCHIVO NECESITA SER CREADO EN PDF PARA ADJUNTARSE AL CORREO, Y LUEGO ENVIARLO

$type = isset($_POST["type"]) ? $_POST["type"] : null;
$file_name = '';
if ($type == 'print_sendmail') {


    $file_name = "f-invoice_id-".rand ( 89 , 9999999 ).".pdf";
    $file_path = "../../../../storage/beestock/entities/sale/sent-invoice/$file_name";
    $pdf->Output($file_path, 'F');

    $currentFile = $_SERVER["PHP_SELF"];
    $host        = $_SERVER['HTTP_HOST'];
    $fullUrl     = $_SERVER['REQUEST_SCHEME'] . "://$host". "/server/storage/beestock/entities/sale/sent-invoice/$file_name";


    $data_return = new stdClass();
    $data_return->file_path  = $fullUrl;
    $data_return->check_mail = $check_mail;
    $data_return->print = "true";
    $data_return->name = $rows[0]['customerName'];
    $data_return->code = $rows[0]['code'];

    
    echo json_encode($data_return) ; 


    // if($check_mail == true) {
    //     require("../../../send-emails/sendEmail-General.php");
    //     $recipient                   = new stdClass();
    //     $recipient->email            = $rows[0]['email'];
    //     $recipient->name             = $rows[0]['customerName'];
    //     $emailObj                    = new stdClass();
    //     $emailObj->recipients        = [$recipient];
    //     $emailObj->subject           = "SALE ORDER No. " . $rows[0]['code'];
    //     $emailObj->body              = "Hi" .  $rows[0]['customerName'] .", please see the attached order";
    //     $emailObj->removeAttachement = false;
    //     $emailObj->files             = [];
    //     $emailObj->files[]           = $file_name;
    //     sendEmail($emailObj);
    // }



}else if($type == 'print'){

    $file_name = "f-invoice_id-".rand ( 89 , 9999999 ).".pdf";
    $file_path = "../../../../storage/beestock/entities/sale/sent-invoice/$file_name";
    $pdf->Output($file_path, 'F');

    $host        = $_SERVER['HTTP_HOST'];
   // $fullUrl     = $_SERVER['REQUEST_SCHEME'] . "://$host". "/beeStock/public/server/storage/beestock/entities/sale/sent-invoice/$file_name";
    $fullUrl     = $_SERVER['REQUEST_SCHEME'] . "://$host". "/server/storage/beestock/entities/sale/sent-invoice/$file_name";


    $data_return = new stdClass();
    $data_return->file_path  = $fullUrl;
    $data_return->print = "true";
    $data_return->check_mail = "";


    echo json_encode($data_return) ; 

}else{
   
    $file_name = "f-invoice_id-".rand ( 89 , 9999999 ).".pdf";
    $file_path = "../../../../storage/beestock/entities/sale/sent-invoice/$file_name";
    $pdf->Output($file_path, 'F');

    $host        = $_SERVER['HTTP_HOST'];
    $fullUrl     = $_SERVER['REQUEST_SCHEME'] . "://$host". "/server/storage/beestock/entities/sale/sent-invoice/$file_name";


    $data_return = new stdClass();
    $data_return->file_path  = $fullUrl;
    $data_return->print = "false";
    $data_return->check_mail = "true";
    $data_return->name = $rows[0]['customerName'];
    $data_return->code = $rows[0]['code'];


    echo json_encode($data_return) ; 
}


// // Guardar el PDF
// $file_name = "../../../../storage/beestock/entities/sale/sent-invoice/f-invoice_id-" . rand(89, 9999999) . ".pdf";
// $pdf->Output($file_name, 'F');

// // Imprimir el código JavaScript para manejar errores en la carga del PDF
// echo $file_name; // Devolver el nombre del archivo generado
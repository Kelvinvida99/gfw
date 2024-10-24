<?php
require "../../../auth/user.php";
require "../../../auth/checkAuth.php";
$_POST["entity"] = "receivepayment";//COMMENT
//EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite, 
// THIS FILE WILL DOES SELECTS TO DATABASE, SO IT'S A  "readOnly"
$REQUESTED_ACTION = "readOnly"; 
require "../../../auth/checkAuthorization.php";
require "../../../sqlFunctions/returnObject.php";
require "../../../sqlFunctions/executeSelect.php";
require "../../../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP

require "query-invoice.php";
//GET ALL THE NECESARY DATA FIRST, CREATE AN EFFICIENT QUERY

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
foreach ($rows as $row) {
    $company_name = $row['company_name'];
    $email        = $row['customer_email'];
    $name         = $row["customer_name"];
    $code         = $row["code"];
    $po  = $row["sale_code"];

    // contac
    $phone         = $row["customer_phone"];
    $fax           = $row["customer_fax"];

    //VENDOR
    $vendor       = new stdClass();
    $vendor->name = $row["customer_name"];

    //COMPANY
    $company                  = new stdClass();
    $company->name            = $company_name;
    $company->good_bye_msg    = "THANK YOU FOR YOUR BUSINESS !";

    //INVOICE
    //INVOICE
    $invoice                     = new stdClass();
    $invoice->number             = $code;
    $invoice->p_number           = $po;
    $invoice->total              = "$1,250.00";
    $invoice->date               = $row["date_td"];
    $invoice->purchase_statement = "";
    $invoice->purchase_footer    = "The perishable agricultural comm. listed on this invoice. are sold subject to the statutory trust authority. by Section 5 of the Perishable Agricultural Commodities Act,1930(7 U.S.C. 499 e).The seller of these comm. retains a trust claim over these comm.,all inventories of food or other products derived from these comm.,and any receivables or proceeds from the sale of these comm. until full payment. is received.";
}
$invoice_item          = new stdClass();
$invoice_item->items[] = array(); // Inicializar el array fuera del bucle
foreach ($data as $table) {

    foreach ($table['data'] as $elem) {
        //INVOICE ITEMS
        //INVOICE ITEMS
        // Acceder a los datos individuales
        $sale_id               = json_decode($elem['sale_id'], true);
        $po_total_amount       = $elem['po_total_amount'];
        $due_amount            = $elem['due_amount'];
        $sent_amount           = $elem['sent_amount'];
        $item                  = new stdClass(); // Crear un nuevo objeto para cada elemento
        $item->name            = $sale_id[0]['displayText'];
        $item->po_total_amount = $po_total_amount;
        $item->due_amount      = $due_amount;
        $item->sent_amount     = $sent_amount;

        $invoice_item->items[] = (object)$item;
        // print_r($item);
    }
}

//HEADER
$header           = new stdClass();
$header->title    = "RECEIVE PAYMENT";

if ($rows[0]["company_avatar"] == "") {
    $header->logo_url = '../../../../storage/beestock/entities/company/logo/logo.png';
}else{
    $header->logo_url = '../../../'. str_replace('server/','../',$rows[0]["company_avatar"]);
    $header->logo_url = str_replace('lowlowlowCompression/','',$header->logo_url);
}
$header->name     = $company->name   ;
$header->tel      = $phone ;
$header->email    = $email;
$header->fax      = $fax;
$header->footer   = $invoice->purchase_footer;
//$header->barCode = $code ; 

//END OF QUERIES

//DESPUES DE CONSEGUIR TODA LA DATA, EMPEZAR A CREAR EL PDF

//STARTING PDF PAGE
require __DIR__ . '/../../../fpdf/gosive/fpdf-classes.php';

$pdf = new PDF();
$pdf->setData($header);//ADDING THE DATABASE DATA TO PDF OBJECT
$pdf->AliasNbPages();
$pdf->AddPage();

///SHIP TO AND BILL TO
$pdf->Cell(110,4,"",0,1);
$pdf->SetFont('Arial','B',11);
$pdf->SetTextColor(0,0,0);
$pdf->Cell(22,6,'CUSTOMER',0,0);
$pdf->Cell(150,6,'PAYMENT#: ',0,0,"R");
$pdf->SetFont('Arial','',11);
$pdf->Cell(1,6,$invoice->number ,0,1);
$pdf->Cell(22,4,$vendor->name  ,0,0);

$pdf->SetFont('Arial','B',11);
$pdf->Cell(150,6,'PO#: ',0,0,"R");
$pdf->SetFont('Arial','',11);
$pdf->Cell(1,6,$invoice->p_number ,0,1);

// info
// line 1
$pdf->SetFont('Arial','B',11);
$pdf->Cell(172,6,'Date: ',0,0,"R");
$pdf->SetFont('Arial','',10);
$pdf->Cell(1,6,$invoice->date,0,1);

//ITEMS
// $pdf->SetDrawColor(100,100,100);
// $pdf->Line(10, 95, 202, 95);
$pdf->Ln(8);
//$pdf->SetDrawColor(0,0,0);
$pdf->SetTextColor(0,0,0);
$pdf->SetFillColor(255,255,255);
$pdf->SetFont('Arial','B',11);  //$pdf->Cell(50);
$pdf->Cell(47,5,'SALE',0,0,'L',1);
$pdf->Cell(47,5,'TOTAL AMOUNT',0,0,'L',1);
$pdf->Cell(47,5,'BALANCE',0,0,'L',1);
$pdf->Cell(47,5,'SENT AMOUNT',0,0,'L',0);

///CICLO FOR PRINTING ITEMS
$pdf->SetFont('Arial','',10);  //$pdf->Cell(50);
$pdf->SetTextColor(5,5,5);
$pdf->Ln(5);

$subtotal = 0;
$total    = 0;
$contador = 0;
foreach ($invoice_item->items as $key => $elem) {
    if ($key !== 0) {

        $total += floatval($elem->sent_amount);
        $subtotal = floatval($elem->due_amount)-floatval($elem->sent_amount);
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

        $pdf->Cell(47, 6, "Sale ".$elem->name, 0, 0, '', 1);
        $pdf->Cell(47, 6, "$".number_format($elem->po_total_amount,2), 0, 0,'', 1);
        $pdf->Cell(47, 6, "$".number_format($subtotal,2), 0, 0, '', 1);
        $pdf->Cell(47, 6, "$".number_format($elem->sent_amount,2), 0, 0, '', 1);
    }
}

//PRINTING INVOICE TOTAL
$posy = $pdf->GetY();//PARA EL SUBTOTAL, TAXES Y TOTAL
$pdf->SetTextColor(0,0,0);
$pdf->SetFillColor(255,255,255);
$pdf->SetFont('Arial','',12);
$pdf->SetXY(150,$posy+12);
$pdf->Cell(24,8,'Total',0,0,'',1);
$pdf->SetFont('Arial','B',17);
$pdf->Cell(26,8,"$".number_format($total,2),0,1,'',1);
$pdf->Ln(10);
$pdf->SetTextColor(0,0,0);
$pdf->SetFont('Arial','I',9);
$pdf->Cell(30,9,$company->good_bye_msg ,0,1,"L");

$file_name = "../../../../storage/beestock/entities/receivepayment/sent-invoice/f-received_id-".rand ( 89 , 9999999 ).".pdf";
$pdf->Output($file_name, 'F');
echo $file_name; // Devolver el nombre del archivo generado


///CHEQUIAR SI EL INVOICE NECESITA SER ENVIADO PRO EMAIL, SI ES ASI, EL ARCHIVO NECESITA SER CREADO EN PDF PARA ADJUNTARSE AL CORREO, Y LUEGO ENVIARLO
// $type = isset($_POST["type"]) ? $_POST["type"] : null;
// $file_name = '';
// if ($type == 'sendinvoice') {
//     if($check_mail == true) {
//         //GENERATING THE PDF FILE
//         //GENERATING THE PDF FILE

//         $file_name = "../../../../storage/beestock/entities/purchase/sent-invoice/f-invoice_id-".rand ( 89 , 9999999 ).".pdf";
//         $pdf->Output($file_name, 'F');

//         // //PREPARING EMAIL OBJECT
//         // //PREPARING EMAIL OBJECT
//         require("../../../send-emails/sendEmail-General.php");
//         $recipient                   = new stdClass();
//         $recipient->email            =  $email;
//         $recipient->name             =  $name;
//         $emailObj                    = new stdClass();
//         $emailObj->recipients        = [$recipient];
//         $emailObj->subject           = "PURCHASE ORDER No. 123123123";
//         $emailObj->body              = "Hi $name, please see the attached order";
//         $emailObj->removeAttachement = false;
//         $emailObj->files             = [];
//         $emailObj->files[]           = $file_name;
//         sendEmail($emailObj);
//         echo json_encode(["success" => true]);
//     }else{

//         $pdf->Output();
//         echo json_encode(["success" => false, "message" => "Error sending email"]);
//     }
// }else if($type == 'print'){
//     // Guardar el PDF
//     $file_name = "../../../../storage/beestock/entities/purchase/sent-invoice/f-invoice_id-" . rand(89, 9999999) . ".pdf";
//     $pdf->Output($file_name, 'F');

//     // Imprimir el código JavaScript para manejar errores en la carga del PDF
//     echo $file_name; // Devolver el nombre del archivo generado
// }else{
//     echo "No se encontro un tipo de accion";
// }
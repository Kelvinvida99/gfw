<?php
require "../../../auth/user.php";
require "../../../auth/checkAuth.php";
$_POST["entity"] = "purchase";//COMMENT
$REQUESTED_ACTION = "readOnly"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite, THIS FILE WILL DOES SELECTS TO DATABASE, SO IT'S A  "readOnly"
require "../../../auth/checkAuthorization.php";
require "../../../sqlFunctions/returnObject.php";
require "../../../sqlFunctions/executeSelect.php";
require "../../../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP

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
foreach ($rows as $row) {
    $check_mail    = $row['check_mail'];
    $company_name         = $row['company_name'];
    $email         = $row['provider_email'];
    $name          = $row["providerName"];
    $code          = $row["code"];
    // bill
    $billToAddress = $row["providerBillToAddress"];
    $billToCity    = $row["providerBillToCity"];
    $billToState   = $row["providerBillToState"];
    $billToZip     = $row["providerBillToZip"];
    // ship
    $shipToAddress = $row["providerShipToAddress"];
    $shipToCity    = $row["providerShipToCity"];
    $shipToState   = $row["providerShipToState"];
    $shipToZip     = $row["providerShipToZip"];
    // contac
   
    $phone         = $row["providerPhone"];
    $fax           = $row["providerFax"];

    //VENDOR
    //VENDOR
    $vendor       = new stdClass();
    $vendor->name = $row["providerName"];

    //COMPANY
    //COMPANY
    $company                  = new stdClass();
    $company->name            = $company_name;
    // bill
    $company->bill_to_address = $billToAddress;
    $company->bill_to_city    = $billToCity;
    $company->bill_to_state   = $billToState;
    $company->bill_to_zip     = $billToZip;
    // ship
    $company->ship_to_address = $shipToAddress;
    $company->ship_to_city    = $shipToCity;
    $company->ship_to_state   = $shipToState;
    $company->ship_to_zip     = $shipToZip;
    $company->good_bye_msg    = "THANK YOU FOR YOUR BUSINESS !";

    //INVOICE
    //INVOICE
    $invoice                     = new stdClass();
    $invoice->number             = $code;
    $invoice->total              = "$1,250.00";
    $invoice->date               = $row["purchaseDate"];
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
        $item_id       = json_decode($elem['item_id'], true);
        $qty           = $elem['qty'];
        $selling_price = $elem['selling_price'];
        $total_price   = $elem['total_price'];
        $type_selling  = json_decode($elem['type_selling'], true);
        $unit_price    = $elem['unit_price'];
        $item          = new stdClass(); // Crear un nuevo objeto para cada elemento
        $item->name    = $item_id[0]['displayText'];
        //$item->desc    = "AVOCADO FROM MEXICO";
        $item->desc    = $elem['notes'];
        $item->unit    = $type_selling[0]['displayText'];
        $item->qty     = $qty;
        $item->price   = $unit_price;

        $invoice_item->items[] = (object)$item;
        // print_r($item);
    }
}

//HEADER
//HEADER
$header           = new stdClass();
$header->title    = "PURCHASE ORDER";
//$header->logo_url = '../../../../storage/beestock/entities/company/logo/logo.png';
//$rows[0]["company_avatar"] = "../storage/beestock/entities/company/1/avatar/lowlowlowCompression/avatar.png";

if ($rows[0]["company_avatar"] == "") {
    $header->logo_url = '../../../../storage/beestock/entities/company/logo/logo.png';
}else{
    $header->logo_url = '../../../'. str_replace('server/','../',$rows[0]["company_avatar"]);
    $header->logo_url = str_replace('lowlowlowCompression/','',$header->logo_url);
    //$header->logo_url = '../../../../storage/beestock/entities/company/logo/logo.png';   
    //$header->logo_url = '../../../../storage/beestock/entities/company/1/avatar/avatar.png';
}
$header->name     = $company->name   ;
$header->address  = $billToAddress;
$header->tel      = $phone ;
$header->email    = $email;
$header->fax      = $fax;
$header->footer   = $invoice->purchase_footer;
//$header->barCode = $code ; 

//END OF QUERIES
//END OF QUERIES
//END OF QUERIES
//END OF QUERIES
//END OF QUERIES

//DESPUES DE CONSEGUIR TODA LA DATA, EMPEZAR A CREAR EL PDF
//DESPUES DE CONSEGUIR TODA LA DATA, EMPEZAR A CREAR EL PDF
//DESPUES DE CONSEGUIR TODA LA DATA, EMPEZAR A CREAR EL PDF
//DESPUES DE CONSEGUIR TODA LA DATA, EMPEZAR A CREAR EL PDF
//DESPUES DE CONSEGUIR TODA LA DATA, EMPEZAR A CREAR EL PDF
//DESPUES DE CONSEGUIR TODA LA DATA, EMPEZAR A CREAR EL PDF
//DESPUES DE CONSEGUIR TODA LA DATA, EMPEZAR A CREAR EL PDF
//DESPUES DE CONSEGUIR TODA LA DATA, EMPEZAR A CREAR EL PDF
//DESPUES DE CONSEGUIR TODA LA DATA, EMPEZAR A CREAR EL PDF
//DESPUES DE CONSEGUIR TODA LA DATA, EMPEZAR A CREAR EL PDF
//DESPUES DE CONSEGUIR TODA LA DATA, EMPEZAR A CREAR EL PDF
//DESPUES DE CONSEGUIR TODA LA DATA, EMPEZAR A CREAR EL PDF
//DESPUES DE CONSEGUIR TODA LA DATA, EMPEZAR A CREAR EL PDF
//DESPUES DE CONSEGUIR TODA LA DATA, EMPEZAR A CREAR EL PDF
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
$pdf->Cell(110,1,"",0,1);
$pdf->SetFont('Arial','B',11);
$pdf->SetTextColor(0,0,0);
$pdf->Cell(140,10,'VENDOR',0,0);
$pdf->Cell(10,10,'PO#: ',0,0,"R");
$pdf->Cell(1,10,$invoice->number ,0,1);

$pdf->SetFont('Arial','',11);
$pdf->Cell(140,3,$vendor->name,0,0);
$pdf->SetFont('Arial','B',11);
$pdf->Cell(10,3,'Date: ',0,0,"R");
$pdf->SetFont('Arial','',11);
$pdf->Cell(5,3,$invoice->date,0,1);

$pdf->SetFont('Arial','B',11);
$pdf->Cell(65,10,'BILL TO',0,0);
$pdf->Cell(65,10,"SHIP TO" ,0,1);

// addres info
// line 1
$pdf->SetFont('Arial','',11);
$pdf->Cell(65,1,$company->name  ,0,0);
$pdf->Cell(65,1,$company->name  ,0,1,'L');


// // line 2
// $pdf->Cell(22,4);
$pdf->Cell(65,8,$company->bill_to_address  ,0,0);
$pdf->Cell(54,8,$company->ship_to_address  ,0,1,'L');


// // line 3
// $pdf->Cell(22,4);
$pdf->Cell(65,2,$company->bill_to_city." ".$company->bill_to_state." ".$company->bill_to_zip  ,0,0);
$pdf->Cell(65,2,$company->ship_to_city." ".$company->ship_to_state." ".$company->ship_to_zip   ,0,0);


// line 3
/*$pdf->Cell(30,4);
$pdf->Cell(50,4,$company->bill_to_state  ,0,0);
$pdf->Cell(1,4,$company->ship_to_state  ,0,1,'L');
// line 4
$pdf->Cell(30,4);
$pdf->Cell(50,4,$company->bill_to_zip  ,0,0);
$pdf->Cell(1,4,$company->ship_to_zip  ,0,0);*/

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
$pdf->Cell(47,5,'ITEMS/SERVICES',0,0,'L',1);
$pdf->Cell(50,5,'DESCRIPTION',0,0,'L',1);
$pdf->Cell(24,5,'UNIT',0,0,'L',1);
$pdf->Cell(22,5,'QTY',0,0,'L',1);
$pdf->Cell(20,5,'RATE',0,0,'L',1);
$pdf->Cell(24,5,'TOTAL',0,1,'L',1);

///CICLO FOR PRINTING ITEMS
$pdf->SetFont('Arial','',10);  //$pdf->Cell(50);
$pdf->SetTextColor(5,5,5);
$pdf->Ln(2);

$subtotal = 0;
$contador = 0;
foreach ($invoice_item->items as $key => $elem) {
    if ($key !== 0) {

        $subtotal += floatval($elem->qty) * floatval($elem->price);
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

        $pdf->Cell(47, 6, $elem->name, 0, 0, '', 1);
        $pdf->Cell(50, 6, $elem->desc, 0, 0,'', 1);
        $pdf->Cell(24, 6, $elem->unit, 0, 0, '', 1);
        $pdf->Cell(22, 6, $elem->qty, 0, 0, '', 1);
        $pdf->Cell(20, 6, "$".number_format($elem->price, 2), 0, 0, '',1);
        $pdf->Cell(24, 6, "$".number_format(round(floatval($elem->qty) * floatval($elem->price), 2), 2), 0, 1,'',1);
    }
}
/*while($rs = $result->fetch_array(MYSQLI_ASSOC)) {

//$rs["department_id"]=trim(preg_replace('/\s\s+/', ' ', $rs["department_id"]));
$subtotal=$subtotal+(floatval($rs["qty"])*floatval($rs["price"]));


$pdf->Cell(47,6,$rs["name"],0,0); $pdf->Cell(30,6,$rs["brand"],0,0);    $pdf->Cell(22,6,$rs["origin"],0,0);   $pdf->Cell(37,6,$rs["description"],0,0);
$pdf->Cell(17,6,$rs["qty"],0,0,"C"); $pdf->Cell(20,6,number_format($rs["price"],2),0,0); $pdf->Cell(28,6,number_format(round(floatval($rs["qty"])*floatval($rs["price"]),2), 2),0,1);

}*/


//PRINTING INVOICE TOTAL
//PRINTING INVOICE TOTAL
//PRINTING INVOICE TOTAL
//PRINTING INVOICE TOTAL
$taxes  = 0;
$taxes1 = $taxes;
$taxes  = round($subtotal*$taxes,2);
$total  = round(($subtotal*$taxes1)+$subtotal,2);
$pdf->SetDrawColor(100,100,100);
$posy = $pdf->GetY();
$pdf->SetY( $posy+8);
// $pdf->Line(10, $posy+3, 202, $posy+3);
$pdf->SetTextColor(5,5,5);
$posy = $pdf->GetY();//PARA EL SUBTOTAL, TAXES Y TOTAL
$pdf->SetFont('Arial','',8);
$pdf->MultiCell( 100, 4, $invoice->purchase_statement,0,'L');

$pdf->SetFillColor(220,220,220);
$pdf->SetFont('Arial','B',12);
$pdf->SetXY(150, $posy);
$pdf->Cell(24,5,'Subtotal',0,0,'',1);
$pdf->SetFont('Arial','',12);
$pdf->Cell(30,5,"$".number_format($subtotal,2),0,1,'',1);
//$pdf->Cell(17,5,'QTY',0,0,'C',1); $pdf->Cell(20,5,'RATE',0,0,'L',1); $pdf->Cell(28,5,'AMOUNT',0,1,'L',1);

$pdf->SetTextColor(248,248,248);
$pdf->SetFillColor(0,120,212);
$pdf->SetFont('Arial','',10);
$pdf->SetXY(150,$posy+5);
$pdf->Cell(24,8,'Total',0,0,'',1);
$pdf->SetFont('Arial','B',17);
$pdf->Cell(30,8,"$".number_format($total,2),0,1,'',1);
$pdf->Ln(10);
$pdf->SetTextColor(0,0,0);
$pdf->SetFont('Arial','I',9);
$pdf->Cell(30,9,$company->good_bye_msg ,0,1,"L");

///CHEQUIAR SI EL INVOICE NECESITA SER ENVIADO PRO EMAIL, SI ES ASI, EL ARCHIVO NECESITA SER CREADO EN PDF PARA ADJUNTARSE AL CORREO, Y LUEGO ENVIARLO
///CHEQUIAR SI EL INVOICE NECESITA SER ENVIADO PRO EMAIL, SI ES ASI, EL ARCHIVO NECESITA SER CREADO EN PDF PARA ADJUNTARSE AL CORREO, Y LUEGO ENVIARLO
///CHEQUIAR SI EL INVOICE NECESITA SER ENVIADO PRO EMAIL, SI ES ASI, EL ARCHIVO NECESITA SER CREADO EN PDF PARA ADJUNTARSE AL CORREO, Y LUEGO ENVIARLO
///CHEQUIAR SI EL INVOICE NECESITA SER ENVIADO PRO EMAIL, SI ES ASI, EL ARCHIVO NECESITA SER CREADO EN PDF PARA ADJUNTARSE AL CORREO, Y LUEGO ENVIARLO
$type = isset($_POST["type"]) ? $_POST["type"] : null;
$file_name = '';
if ($type == 'sendinvoice') {
    if($check_mail == true) {
        //GENERATING THE PDF FILE
        //GENERATING THE PDF FILE

        $file_name = "../../../../storage/beestock/entities/purchase/sent-invoice/f-invoice_id-".rand ( 89 , 9999999 ).".pdf";
        $pdf->Output($file_name, 'F');

        // //PREPARING EMAIL OBJECT
        // //PREPARING EMAIL OBJECT
        require("../../../send-emails/sendEmail-General.php");
        $recipient                   = new stdClass();
        $recipient->email            =  $email;
        $recipient->name             =  $name;
        $emailObj                    = new stdClass();
        $emailObj->recipients        = [$recipient];
        $emailObj->subject           = "PURCHASE ORDER No. 123123123";
        $emailObj->body              = "Hi $name, please see the attached order";
        $emailObj->removeAttachement = false;
        $emailObj->files             = [];
        $emailObj->files[]           = $file_name;
        sendEmail($emailObj);
        echo json_encode(["success" => true]);
    }else{

        $pdf->Output();
        echo json_encode(["success" => false, "message" => "Error sending email"]);
    }
}else if($type == 'print'){
    // Guardar el PDF
    $file_name = "../../../../storage/beestock/entities/purchase/sent-invoice/f-invoice_id-" . rand(89, 9999999) . ".pdf";
    $pdf->Output($file_name, 'F');

    // Imprimir el código JavaScript para manejar errores en la carga del PDF
    echo $file_name; // Devolver el nombre del archivo generado

}else{
    echo "No se encontro un tipo de accion";
}
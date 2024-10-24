<?php
require "../../../auth/user.php";
require "../../../auth/checkAuth.php";
$_POST["entity"] = "customer";//COMMENT
$REQUESTED_ACTION = "readOnly"; //EACH PHP FILE MUST HAVE THIS VARIABLE,POSIBLE VALUES ARE readOnly AND readwrite, THIS FILE WILL DOES SELECTS TO DATABASE, SO IT'S A  "readOnly"
require "../../../auth/checkAuthorization.php";
require "../../../sqlFunctions/returnObject.php";
require "../../../sqlFunctions/executeSelect.php";
require "../../../sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND END PHP

require "account-receivable-one.php";
//GET ALL THE NECESARY DATA FIRST, CREATE AN EFFICIENT QUERY

//EXECUTE QUERY AND GET DATA HERE
//EXECUTING SQL QUERY TO GET ROWS
$result = executeSelectQuery($con, $queryReport);
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

    // echo json_encode(['datos'=>$rows,'mt'=>$data]);
    $datos[] = json_decode($rows[0]['unpaidBill'], true);

//HEADER
$header          = new stdClass();
$header->title   = "Account Receivable Aging Report";
$header->subText = "This is a financial document that provides information about money owed to a company by its customers or clients for goods or services provided on credit.";
$header->titulos = array('Date','Code','Due Date','Due Amount','Original Amount');

// if ($rows[0]["company_avatar"] == "") {
//     $header->logo_url = '../../../../storage/beestock/entities/company/logo/logo.png';
// }else{
//     $header->logo_url = '../../../'. str_replace('server/','../',$rows[0]["company_avatar"]);
//     $header->logo_url = str_replace('lowlowlowCompression/','',$header->logo_url);
// }

$header->logo_url = '../../../../storage/beestock/entities/company/logo/logo.png';

//END OF QUERIES
//DESPUES DE CONSEGUIR TODA LA DATA, EMPEZAR A CREAR EL PDF

//STARTING PDF PAGE
require __DIR__ . '../../../../fpdf/gosive/fpdf-classes.php';

$pdf = new FPDF();
// $pdf->setData($header);//ADDING THE DATABASE DATA TO PDF OBJECT
$pdf->AliasNbPages();
$pdf->AddPage();

// title
$pdf->SetFont('Arial','B',25);
$pdf->SetTextColor(0,0,0);
$pdf->Cell(0,10,$header->title,0,1);

// sub-text
$pdf->SetFont('Arial','',9);
$pdf->SetTextColor(0,0,0);
$pdf->MultiCell(0,5,$header->subText,0,1);

// company name
$pdf->SetFont('Arial','B',18);
$pdf->SetTextColor(0,0,0);
$pdf->Cell(0,30,$rows[0]['company_name'],0,1,'C');

// sub-text company name
$pdf->SetFont('Arial','B',10);
$pdf->SetTextColor(0,0,0);
$pdf->Cell(0,-20,'Account Receivable Aging Report',0,1,'C');

$pdf->SetFont('Arial','B',10);
$pdf->SetTextColor(0,0,0);
$pdf->Cell(0,28,'As of '.$rows[0]['current_dateTime'],0,1,'C');

// table title
$pdf->SetFont('Arial','',12);
$pdf->SetTextColor(0,0,0);
$pdf->Cell(0,5,$rows[0]['name'].' '.'Unpaid Invoices',0,1);

//Colores, ancho de línea y fuente en negrita
$pdf->SetFillColor(255,255,255);
$pdf->SetTextColor(0);
$pdf->SetDrawColor(0,0,0);
$pdf->SetLineWidth(.3);
$pdf->SetFont('Arial','',8);
    
//Cabecera
for($i=0;$i<count($header->titulos);$i++)
$pdf->Cell(38,7,$header->titulos[$i],0,0,'C',1);
$pdf->Ln();

$pdf->SetFont('Arial','B',12);
$pdf->SetFillColor(240,240,240);
$pdf->SetTextColor(0,0,0);
$pdf->Cell(0,7,'As of '.$rows[0]['overdue_age'].' '.$rows[0]['ageDueAmount'],0,1,'C',1);
    
//Restauración de colores y fuentes
$pdf->SetFillColor(255,255,255);
$pdf->SetFont('Arial','',9);
$pdf->SetTextColor(0);
    
//datos
$pdf->Cell(38,6,$datos[0][0]['date'],0,0,'C',1);
$pdf->Cell(38,6,$datos[0][0]['code'],0,0,'C',1);
$pdf->Cell(38,6,$datos[0][0]['due_date'],0,0,'C',1);
$pdf->Cell(38,6,$datos[0][0]['due_amount'],0,0,'C',1);
$pdf->Cell(38,6,$datos[0][0]['original_amount'],0,0,'C',1);

$pdf->Ln();

$pdf->SetFont('Arial','B',20);
$pdf->SetFillColor(240,240,240);
$pdf->SetTextColor(0,0,0);
$pdf->Cell(120,10,'Total Due ',0,0,'R',1);

$pdf->SetFont('Arial','B',20);
$pdf->SetFillColor(240,240,240);
$pdf->SetTextColor(0,0,0);
$pdf->Cell(70,10,$rows[0]['ageDueAmount'],0,0,'',1);

//chequea si el customer posee un correo al cual se pueda enviar el reporte
$file_name = '';

if($datos[0][0]['due_amount'] != NULL || $datos[0][0]['due_date'] != NULL){
    if($rows[0]['email'] != "") {
        //GENERATING THE PDF FILE
    
        $file_name = "../../../../storage/beestock/entities/customer/sent-invoice/f-report-".rand ( 89 , 9999999 ).".pdf";
        $pdf->Output($file_name, 'F');
        $name = $rows[0]["name"];
        //PREPARING EMAIL OBJECT
        //PREPARING EMAIL OBJECT
        require("../../../send-emails/sendEmail-General.php");
        $recipient                   = new stdClass();
        $recipient->email            =  $rows[0]['email'];
        $recipient->name             =  $rows[0]['name'];
        $emailObj                    = new stdClass();
        $emailObj->recipients        = [$recipient];
        $emailObj->subject           = "Accounts Receivable Aging Report";
        $emailObj->body              = "Hi $name, please see the attached report";
        $emailObj->removeAttachement = false;
        $emailObj->files             = [];
        $emailObj->files[]           = $file_name;
        
        if (sendEmail($emailObj)) {
            echo json_encode(["success" => true, "message" => "Send email"]);
        }
    }else{
    
        echo json_encode(["success" => false, "message" => "Error sending email"]);
    }    
}else{
    echo json_encode(["success" => false, "message" => "No due invoices"]);
}


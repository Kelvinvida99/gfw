<?php



require __DIR__ . '/bar-codes.php';


//class PDF extends FPDF
class PDF extends PDF_Code128
{   
        
    // Page header
    function Header()
    {
        
           
        // Logo
        $this->Image($this->logo_url,160,0,40, 35);
        // Arial bold 15
        $this->SetFont('Arial','B',11);
        // Move to the right
    
        // Title
       //$this->Cell(49);
       //$this->Cell(34,10,$this->company_name,4,0,48, 35);
        // Arial bold 15company,0,0,'L');

        $this->SetFont('Arial','B',30);
        $this->Cell(5,5,$this->title,0,1);
        $this->Ln(2);


        $this->SetFont('Arial','B',11);
        $this->Cell(5,6,$this->name,0,1,'L');        
        
        if($this->tel!=""){
            $this->SetFont('Arial','B',11);
            // $this->Cell(49);
            $this->Cell(5,6,'Phone: '.$this->tel,0,1,'L');
        }

        if($this->fax!=""){
            $this->SetFont('Arial','B',11);
            $this->Cell(5,6,'Fax: '.$this->fax,0,1,'L');
        }  
        
        $this->SetFont('Arial','B',11);
        $this->Cell(5,6,"Email: ".$this->email,0,1,'L');
        $this->Ln(3);
        // Line break        
    }

    function body() {

        $this->SetFont('Arial','',13);
        $this->Cell(49);
        $this->Cell(34,10,'INVOICE',0,0,'L');
        $this->Ln(6);

    }
    // Page footer
    function Footer(){ 
        // Position at 1.5 cm from bottom 
        $this->SetY(-15);
        // Arial italic 8
        $this->SetFont('Arial','I',8);
        // Page number
        $this->MultiCell( 0, 3, $this->footer , 0, 'C');
        //$this->Cell(0,10,'Page '.$this->PageNo().'/{nb}',0,'C');


        /*if (isset($this->barCode)) {
            $this->SetFillColor(0,0,0);
            $this->Code128(90,8,$this->barCode,55,16);
            $this->SetXY(90,24);
            $this->Write(5,$this->barCode);
            $this->SetFillColor(0,120,212);
        }*/





    }

    function setData($newProperties){ 

        $props = get_object_vars($newProperties);
        foreach ($props as $name => $value) {
            $this->$name = $value;
        }
    }


}

?>
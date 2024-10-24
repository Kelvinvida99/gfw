<?php
require("../auth/try.php");
if(!isAuthenticated()) header('Location: ../../login.php');
require('..\..\homecare libraries\fpdf.php');
require('fpdf_tables_funcs.php');
//error_reporting(E_ALL ^ E_WARNING); 


$n            = $_GET["p"]; //x define if is add or update
$fdate            = $_GET["f"]; //x define if is add or update
$tdate            = $_GET["t"];; //x define if is add or update
$f = new DateTime($fdate);
$t = new DateTime($tdate);

//CALENDAR DAYS//

class calendar {
	function create_headers($f, $t){		
		$this->datef = new DateTime($f);
		$this->datet = new DateTime($t);
		$datec = $this->datef ;
		while($datec <= $this->datet){
			$this->weekdays[] = strtoupper(date("l",strtotime($datec->format("Y-m-d"))))."  ".$datec->format("m/d/y");
			$this->days[] = $datec->format("Y-m-d");
			$datec->modify('+1 day');	
		}
	}
}

class Patient  {
	public $name;
	public $address;
	public $phone;
	function Patient($n, $a, $p){
		$this->name = $n;
		$this->address = $a;
		$this->phone = $p;
	}
}
$calendar = new calendar();
$calendar->create_headers($fdate, $tdate);


$pdf=new PDF_MC_Table();
$pdf->AddPage();
$pdf->Image('pdf_header.png',30,10, -170);
$pdf->SetFont('Arial','B',13); //$pdf->Write(5,'Schedule Period: ');
$pdf->SetXY(16, 45);	
$pdf->Cell(0, 7, "NURSE SCHEDULE REPORT", 0, 0, 'C');
$pdf->Ln();	
$pdf->SetFont('Arial','',10); //$pdf->Write(5,'Schedule Period: ');	
$pdf->Cell(0, 5, "PERIOD: ". $f->format("m/d/y")." - ".$t->format("m/d/y"), 0, 0, 'C');




$db = $_SESSION["user"]->dbCredentials;
$mySql = new initSecMySql();
$con = $mySql->conn;
$nurse_id            = mysqli_real_escape_string($con, $n); //x define if is add or update
$fdate            = mysqli_real_escape_string($con, $fdate); //x define if is add or update
$tdate            = mysqli_real_escape_string($con, $tdate); //x define if is add or update

 
$sql="SELECT individual_clocks.*, CONCAT(patients.name, ' ', patients.last_name) AS patient_name,
CONCAT(patients.N_address, ', ', patients.N_city, ' ', patients.N_state, ' ', patients.N_zip) AS patient_address, patients.N_mothers_name AS patient_mother,  patients.phone AS patient_phone,  patients.N_sex AS patient_sex,
CONCAT(start_date, ' ', DATE_FORMAT(start_time, '%h:%i %p')) AS starts,
 DATE_FORMAT(start_time, '%h:%i%p') AS start_time,
CONCAT(end_date, ' ', DATE_FORMAT(end_time, '%h:%i %p')) AS ends, 
end_date, 
DATE_FORMAT(end_time, '%h:%i%p') AS end_time,
CONCAT(nurses.name,' ', nurses.last_name) AS nurse, nurses.phone AS nurse_phone, CONCAT(nurses.N_address, ', ', nurses.N_city, ' ', nurses.N_state, ' ', nurses.N_zip) AS nurse_address 
FROM individual_clocks, patients, nurses, patients_schedule WHERE patients_schedule.N_deleted = '0' AND individual_clocks.N_nurses = '$nurse_id' AND end_date >= '$fdate' AND end_date <= '$tdate'
AND individual_clocks.N_patients_schedule = patients_schedule.id AND patients_schedule.N_patient = patients.id 
AND nurses.id = individual_clocks.N_nurses 
GROUP BY individual_clocks.id ASC ";
$result = mysqli_query($con,$sql);
$patients_schedule = [];
$patients = [];
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) { //echo $rs["end_date"]."----";
		if($patients_schedule == []){
			$nurse_name = iconv('UTF-8', 'windows-1252',$rs["nurse"]);
			$nurse_address = iconv('UTF-8', 'windows-1252',$rs["nurse_address"]);
			$nurse_phone = iconv('UTF-8', 'windows-1252',$rs["nurse_phone"]);
	
		}
		if(isset($patients_schedule[$rs["end_date"]]))	$patients_schedule[$rs["end_date"]] .= " -------------------------- ".$rs["start_time"]."-".$rs["end_time"]."  	".$rs["patient_name"];
		else $patients_schedule[$rs["end_date"]] = $rs["start_time"]."-".$rs["end_time"]."  	".iconv('UTF-8', 'windows-1252',$rs["patient_name"]);
		$p =  new Patient($rs["patient_name"], $rs["patient_address"], $rs["patient_phone"]);
		if(!in_array($p, $patients)){
			$patients[] = $p;
		}		
	}

	
	

$pdf->SetXY(10, 60);
$pdf->SetWidths(array(27.6,27.6,27.6,27.6,27.6,27.6,27.6));
$pdf->Ln();	
if(isset($nurse_name)){
	//PRINTING NURSE INFO:	
	$pdf->SetFont('Arial','B',9); $pdf->Write(5,'Nurse Name: ');	$pdf->SetFont('Arial','',9); $pdf->Write(5,$nurse_name);	$pdf->Ln();	
	$pdf->SetFont('Arial','B',9); $pdf->Write(5,'Nurse Address: ');	$pdf->SetFont('Arial','',9); $pdf->Write(5,$nurse_address); $pdf->Ln();		
	$pdf->SetFont('Arial','B',9); $pdf->Write(5,'Nurse Phone: ');	$pdf->SetFont('Arial','',9); $pdf->Write(5,$nurse_phone); $pdf->Ln();	
	$pdf->Ln();	
	///////////////////////////////	
	$pdf->SetFont('Arial','B',11); 	
	$pdf->Cell(95, 5, "Calendar", 0, 0, 'L');
	//////////////////////////////		
	$pdf->Ln();		
	$row = [];
	$c = 0;
	$c2 = 0;
	$block_length = sizeof($calendar->weekdays);
	$pdf->SetFont('Arial','B',9);
	if($c + 7 <= $block_length)	$pdf->Row(array_slice($calendar->weekdays, $c, 7));
	else $pdf->Row(array_slice($calendar->weekdays, $c, $block_length));
	$pdf->SetFont('Arial','',8);


	foreach ($calendar->days as &$day) { 
		if(isset($patients_schedule[$day])) $row[] = $patients_schedule[$day];
		else $row[] = " - ";
		
		if($c2 == 6 || $c == $block_length-1 ){//MEANS ANOTHER BLOCK HAS TO BE PRINTED
			$pdf->Row($row);	
			$row = [];
			$c2 = -1;
			$pdf->SetFont('Arial','B',9);
			$pdf->Ln();
			if(isset($calendar->weekdays[$c])){
				if($c + 7 <= $block_length){
					$pdf->Row(array_slice($calendar->weekdays, $c+1, 7));
				}
				else{
					$pdf->Row(array_slice($calendar->weekdays, $c+1, $block_length-$c ));
				}
				$pdf->SetFont('Arial','',8);
			}		
		}
		
		$c2++;
		$c++;
	}
	
//PRINTING EACH LISTED PATIENT CONTACT INFORMATION	
	$pdf->Ln();
	$pdf->SetFont('Arial','B',11); //$pdf->Write(5,'Schedule Period: ');	
	$pdf->Cell(95, 5, "Patients Contact Information ", 0, 0, 'L');
	$pdf->Ln();
	$pdf->SetFont('Arial','B',10); //$pdf->Write(5, $f->format("m/d/y")."-".$t->format("m/d/y"));	$pdf->Ln();
	$pdf->SetWidths(array(30,95,25));	
	$pdf->Row(array("Name", "Address", "Phone"));
	$pdf->SetFont('Arial','',10);
	foreach ($patients as &$patient) { 		
		$pdf->SetFont('Arial','',9); 
		$pdf->Row(array($patient->name,$patient->address,$patient->phone));	
	}
//END PRINTING EACH LISTED PATIENT CONTACT INFORMATION	
}

else{
	get_nurse_info($nurse_id,$con);
	$pdf->Ln();
	$pdf->SetFont('Arial','B',11); 
	$pdf->Cell(16, 5, "Period: ", 0, 0, 'L');	
	$pdf->SetFont('Arial','',11); 	
	$pdf->Cell(40, 5, $f->format("m/d/y")." - ".$t->format("m/d/y"), 0, 0, 'L');
	$pdf->Ln();
	$pdf->write(5, " Nurse does not have any schedule on this period.");	
}

$pdf->Output();

function get_nurse_info($id,$con){
	$sql="SELECT CONCAT(nurses.name,' ', nurses.last_name) AS nurse, nurses.phone AS nurse_phone, CONCAT(nurses.N_address, ', ', nurses.N_city, ' ', nurses.N_state, ' ', nurses.N_zip) AS nurse_address 
	FROM nurses WHERE id = '$id'";
	$result = mysqli_query($con,$sql);
	$patients_schedule = [];
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) { 
		$nurse_name = iconv('UTF-8', 'windows-1252',$rs["nurse"]);
		$nurse_address = iconv('UTF-8', 'windows-1252',$rs["nurse_address"]);
		$nurse_phone = iconv('UTF-8', 'windows-1252',$rs["nurse_phone"]);	
	}
	$GLOBALS["pdf"]->SetFont('Arial','B',9); $GLOBALS["pdf"]->Write(5,'Nurse Name: ');	$GLOBALS["pdf"]->SetFont('Arial','',9); $GLOBALS["pdf"]->Write(5,$nurse_name);	$GLOBALS["pdf"]->Ln();		
	$GLOBALS["pdf"]->SetFont('Arial','B',9); $GLOBALS["pdf"]->Write(5,'Nurse Address: ');	$GLOBALS["pdf"]->SetFont('Arial','',9); $GLOBALS["pdf"]->Write(5,$nurse_address); $GLOBALS["pdf"]->Ln();		
	$GLOBALS["pdf"]->SetFont('Arial','B',9); $GLOBALS["pdf"]->Write(5,'Nurse Phone: ');	$GLOBALS["pdf"]->SetFont('Arial','',9); $GLOBALS["pdf"]->Write(5,$nurse_phone); $GLOBALS["pdf"]->Ln();	
	
}

?>
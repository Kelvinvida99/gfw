<?php 

function generateLogs($e){
	 date_default_timezone_set('America/Caracas');

      $date = date("Y-m");
      $hora = date("H:i:a");
      //$dir = '../../logs/MySql '.$date.'.txt';
      $dir = '../logs/MySql '.$date.'.txt';
      if (file_exists($dir)) {

        $archivo = fopen($dir, 'a');
        fwrite($archivo, date("Y-m-d"));
        fwrite($archivo, " ".$hora);
        fwrite($archivo, " ".$_SESSION["user"]->username);
        fwrite($archivo, "@".$_SESSION["user"]->userid);
        fwrite($archivo, ",  ".$e->getMessage());
        fwrite($archivo, ", ".basename($e->getFile()));
        fwrite($archivo, "@".$e->getLine());
        fwrite($archivo, ", ".$e->type);
        fwrite($archivo, "@".$e->getCode());
        fwrite($archivo, ", ".$e->entity."\n");

      }else{
        $archivo = fopen($dir, 'w');
        fwrite($archivo, "      "."     User Info     ");
        fwrite($archivo, "                            Error Info                        ");
        fwrite($archivo, "                            Entity"."\n");
        fwrite($archivo, "\n");
        fwrite($archivo, date("Y-m-d"));
        fwrite($archivo, " ".$hora);
        fwrite($archivo, " ".$_SESSION["user"]->username);
        fwrite($archivo, "@".$_SESSION["user"]->userid);
        fwrite($archivo, ",  ".$e->getMessage());
        fwrite($archivo, ", ".basename($e->getFile()));
        fwrite($archivo, "@".$e->getLine());
        fwrite($archivo, ", ".$e->type);
        fwrite($archivo, "@".$e->getCode());
        fwrite($archivo, ", ".$e->entity."\n");
      }
      
      fclose($archivo);
}



function echoReturnError($e){
    
  $result = '{    
      "authentication":{"val":"'.$_SESSION["user"]->sessionStatus.'"},
      "authorization":{"val":"'.$_SESSION["user"]->requestPermission.'"},
      "restriction":{"val":"ok","restrictedFields":[]},
      "error":{"val":"'.$e->getMessage().'", "file":"'.basename($e->getFile()).'", "line":"'.$e->getLine().'", "type":"'.$e->type.'", "code":"'.$e->getCode().'", "entity":"'.$e->entity.'"},
      "data":"",
      "availableRowsWithFilters":"0",
      "charts":"",
      "multiTables":"",
      "file":""
  }';
 //writeToTestTxt($result);

 echo( $result);
 exit();
}

?>
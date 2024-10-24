<?php
//error_reporting(E_ERROR | E_PARSE);
    $original = "goku";
    $new = "services";


if(!file_exists($new))
    mkdir($new);
    else{
        echo "entity folder already exist!";
        exit;
    }
        //xcopy($original, $new);


        foreach (scandir($original) as $file) {
            if (!is_readable($original . '/' . $file)) continue;
            if (is_dir($original .'/' . $file) && ($file != '.') && ($file != '..') ) {
                //IF ITS A FOLDER, DO NOTHIN
            } else {
                $newName = $new . '/' . str_replace($original, $new, $file);

                copy($original . '/' . $file, $newName);






                $oldMessage = '';
                
                $deletedFormat = '';
                
                //read the entire string
                $str=file_get_contents($newName);
                
                //replace something in the file string - this is a VERY simple example
                $str=str_replace($original, $new, $str);
                
                //write the entire string
                file_put_contents($newName, $str);



            }
        }


//creating entity on server side 
header('Location: ..\..\public\server\php\sql\copyEntity.php?newEntity='.$new.'&original='.$original);


    
?>
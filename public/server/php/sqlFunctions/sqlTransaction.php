<?php

//MYSQL TRANSACTIONS
//MYSQL TRANSACTIONS
//MYSQL TRANSACTIONS
function runQueries($queriesArray, $con){
    if($queriesArray != []){
        //mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        mysqli_begin_transaction($con);
        try {
            foreach ($queriesArray as $query) {
                mysqli_query($con, $query); 
            }
            mysqli_commit($con);
            return true;
        } catch (mysqli_sql_exception $exception) {
            writeToTestTxt($query);
            mysqli_rollback($con);
            //throw $exception;
            return false;            
        }
    }            
}




?>
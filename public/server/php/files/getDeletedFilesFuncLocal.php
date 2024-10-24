<?php

function getDeletedFiles($entity, $entityId){

    $con        = $_SESSION["user"]->initCompanyDBConn();
    $entity     = mysqli_real_escape_string($con, $entity);
    $entityId   = mysqli_real_escape_string($con, $entityId);
    
    //building all rows sql string, each entity must have its own query
    $selectAllRows = "SELECT id, 
                      currentPath, 
                      fileName AS name,  uniqueFolder, DATE_FORMAT(deleted_date, '%m/%d/%y %h:%i %p') 
                      AS deletedDate 
                      FROM deleted_files 
                      WHERE deleted_files.deleted = '0' 
                      AND deleted_files.entity = '$entity' 
                      AND deleted_files.entityId = '$entityId' 
                      ORDER BY deleted_files.id DESC;";
    
    //executing sql query to get rows
    if (!$result = mysqli_query($con, $selectAllRows)){
        echoReturnObject("MySqlError");
        exit;
    }

    $rows = [];
    $path = '../../storage/'.$_SESSION["user"]->dbName.'/deleted_files/';
    while($row = $result->fetch_assoc()) {

        $row["folder"]    = json_encode(is_dir($path.$row["uniqueFolder"].'/'.$row["name"]));
        $rows[]           = $row;
        
    }

    mysqli_free_result($result);
    mysqli_close($con);
    return $rows;
}
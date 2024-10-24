<?php

echo '<br><br><a href="simulateAuth.php">Log Me In</a> ';
echo '<br><br><a href="php/auth/logMeOut.php">Log Me Out</a><br> ';
echo '<br><a href="php/auth/logOthersOut.php">Log Others Out</a><br> <br>';
echo '<a href="php/Auth/unlockOrLockUsers.php">Lock Unlock Users</a> <br><br>';
echo '<a href="php/autocomplete.php">Autocomplete</a> <br><br>';
echo '<a href="php/select.php">SELECT</a> <br><br>';
echo '<a href="php/sql/changeMyPassword.php">Change my pass</a> <br><br>';
echo '<a href="php/selectOne.php">SELECT ONE</a> <br><br>';
echo '<a href="php/delete.php">DELETE</a> <br><br>';
echo '<a href="php/files/createFolder.php">Create Folder</a> <br><br>';
echo '<a href="php/files/deleteFiles.php">Delete Files</a> <br><br>';
echo '<a href="php/files/getFiles.php">List Files</a> <br><br>';
echo '<a href="php/files/renameFile.php">Rename File</a> <br><br>';
echo '<a href="php/files/realDeleteFiles.php">Real Delete File</a> <br><br>';
echo '<a href="php/files/restoreFiles.php">RESTORE Deleted File</a> <br><br>';
?>
 <br><br>
 <h2>FILE TESTING</h2>
<form method="post" action="php/files/avatarUpload.php" name ='photo' class="upload_form upload_form_nurses" id='upload_form_nurses' enctype="multipart/form-data" data-file_type="uploaded_files" >
    <input  type="text"  name="currentPath" value="" />   
	<input  class="fileupload" type="file"  name="fileInputElement[]" multiple />
    <div><input type="submit" value="Send file"></div>
</form>

<?php
require "php/auth/user.php";
//require "../../gokuPhpVars/dbConfig.php";
require "php/auth/checkAuth.php";
require "php/sqlFunctions/startDB.php";//WILL TRY TO START DB $con VAR, IF FAILED IT WILL RETURN APPROPIATED OBJ AND QUIT PHP 
require "php/sqlFunctions/filtersFunctions.php";
require "php/sqlFunctions/returnObject.php";





if(isset($_SESSION["user"])){

    echo "<br><br>SESSION STATUS:  ".$_SESSION["user"]->sessionStatus." <br> SESSION MSG: ".$_SESSION["user"]->sessionStatusMsg;
}
else { echo "<br>NO SESSION";}
?>
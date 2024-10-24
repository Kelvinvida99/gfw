<?php
// Este script define la clase `User` que encapsula toda la funcionalidad relacionada con los usuarios del sistema. 
// El script también contiene algunas funciones auxiliares.

// La clase `User` tiene las siguientes propiedades:

// - `userId`: el ID del usuario.
// - `name`: el nombre del usuario.
// - `username`: el nombre de usuario del usuario.
// - `password`: la contraseña del usuario.
// - `sessionId`: el ID de sesión PHP original generado por PHP.
// - `remoteIp`: la dirección IP remota del ordenador.
// - `privilege`: el privilegio del usuario ("user" o "admin").
// - `allowedEntities`: un array con los nombres de entidad permitidos concatenados con la acción permitida, por ejemplo, 
//    "patients@readWrite" o "patients@readOnly".
// - `companyName`: el nombre de la empresa.
// - `dbName`: el nombre de la base de datos de la empresa.
// - `sqlSalt`: la sal utilizada para encriptar la contraseña.
// - `lastRequestTime`: el momento en que se hizo la última solicitud al servidor.
// - `sessionStatus`: el estado de la sesión actual ("login", "ok", "expired", "failed", "lockedAcc", "tooManyFailed", 
//    "forcedLogOut" o "IpChanged").
// - `sessionStatusMsg`: la descripción del estado de la sesión.
// - `requestPermission`: el permiso de la solicitud actual ("ok" o "notAllowed").
// - `requestPermissionMsg`: la descripción del permiso de la solicitud actual.
// - `requestPermissionFiles`: el permiso de archivos de la solicitud actual ("ok" o "notAllowed").
// - `requestPermissionMsgFiles`: la descripción del permiso de archivos de la solicitud actual.
// - `sessionMaxTimeOut`: tiempo máximo de espera después de la última solicitud en minutos, valor predeterminado 30 minutos.

// La clase `User` tiene los siguientes métodos:

// - `__construct()`: constructor que inicializa la sesión, la dirección IP remota y el estado de la sesión.
// - `getLoginAttemps($username)`: función que devuelve el número de intentos de inicio de sesión fallidos, 
//para un nombre de usuario dado.
// - `initCompanyDBConn()`: función que inicializa la conexión a la base de datos de la empresa.
// - `initTryAuthDbConnOLD()`: función que inicializa la conexión a la base de datos de autenticación (version antigua).
// - `initTryAuthDbConn()`: función que inicializa la conexión a la base de datos de autenticación.
// - `initGosiveControlDbConn()`: función que inicializa la conexión a la base de datos GosiveControl.
// - `forcedLogoutByAdminOrLockedUser()`: función que devuelve `true` si el usuario ha sido bloqueado o cerrado
//por un administrador.
/* `tryAuthenticate($username, $password)`: función que intenta autenticar al usuario llamando a la función `tryAuthUser()` o `tryAuthInvestor()` 
según sea el caso */
// - `tryAuthInvestor()`: función que intenta autenticar al usuario en la base de datos GosiveControl como enfermera.
// - `tryAuthUser()`: función que intenta autenticar al usuario en la base de datos de la empresa.
// - `logOff()`: función que cierra la sesión actual.
// - `isAuthtenticated()`: función que devuelve el estado de la sesión actual y comprueba si el usuario sigue siendo autenticado 
//    en función del tiempo pasado desde la última solicitud, la dirección IP y si ha sido bloqueado o cerrado por un administrador.
// - `isAdminAuthorized()`: función que comprueba si el usuario tiene permisos de administrador.
// - `isAuthorized($entity, $action)`: función que comprueba si el usuario tiene permisos para una acción en una entidad determinada.
// - `isAuthorizedFiles($entity, $action)`: función que comprueba si el usuario tiene permisos para acceder a archivos de una entidad determinada.
// - `isAuthorizedAgrmts($entity, $action)`: función que comprueba si el usuario tiene permisos para acceder a acuerdos de una entidad determinada.
// - `insertFailedLog()`: función que inserta un registro en la tabla users_failed_logs cada vez que falla un intento de inicio de sesión.
// - `tracking($action, $entity, $entity_id, $notes = "")`: función que inserta un registro en la tabla users_tracking cada vez que se realiza 
//    un seguimiento de una acción del usuario.
// - `updateUserAvatar($avatar, $id)`: función que actualiza el avatar de un usuario en la base de datos de la empresa.
// - `updateAvatar($avatar)`: función que actualiza el avatar del usuario actual en la base de datos de la empresa.
// - `changeMyPassword($pass)`: función que cambia la contraseña del usuario actual en la base de datos de la empresa y en la base de datos GosiveControl.
// - `changeOtherUserPassword($id, $pass)`: función que cambia la contraseña de otro usuario en la base de datos de la empresa 
//    y en la base de datos GosiveControl.
// - `changeGosiveControlPassword($pass)`: función que cambia la contraseña del usuario en la base de datos GosiveControl.
// - `changeGosiveControlPasswordOtherUser($pass, $id, $companyID)`: función que cambia la contraseña de otro usuario 
//    en la base de datos GosiveControl.
// - `changeGosiveControlStatus($status, $id, $companyID)`: función que cambia el estado de un usuario en la base de datos GosiveControl.
// - `arePasswordsSame($newPass, $oldpass)`: función que comprueba si la nueva contraseña es igual a la contraseña anterior.
// - `usernameRequirement($pass)`: función que comprueba si el nombre de usuario cumple los requisitos de longitud.
// - `confirmCurrentPass($oldPass)`: función que comprueba si la contraseña actual es correcta.
// - `getUsernameAvailability($username)`: función que comprueba si el nombre de usuario ya existe.
// - `passwordRequirement($pass)`: función que comprueba si la contraseña cumple los requisitos de longitud.
// - `insertLog()`: función que inserta un registro en la tabla users_logs cada vez que se registra un usuario.
// - `insertLogOut()`: función que inserta un registro en la tabla users_Log_out cada vez que se desconecta un usuario.
// - `resetAllForcedLogOutRequest()`: función que restablece todas las solicitudes de cierre de sesión forzado.
session_start();
require "authenticationSettings.php";
require realpath(__DIR__.'/../sqlFunctions/generateLogs.php');
// require "../sqlFunctions/generateLogs.php";


class User{
    //array with allowed entity names concatenated with allowed action, example: patients@readwrite or patients@readonly  
    //possible $action values are (readonly, readwrite)
    var $allowedentities;
    var $companyname;// company
    var $dbname;//database name
    //last server request time
    var $lastrequesttime;
    var $name;
    //var $dbpassword;//password for db connections
    private $password;
    var $privilege;//user or admin
    //remote computer public or private ip
    var $remoteip;
    var $requestpermission;//ok, notallowed
    var $requestpermissionfiles;//ok, notallowed
    //description for $requestpermission
    var $requestpermissionmsg;
    //description for $requestpermissionfiles
    var $requestpermissionmsgfiles;
    //original php session id generated by php
    var $sessionid;
    //max iddle time after last request in minutes,default 30 mins
    var $sessionmaxtimeout;
    //ok, expired, failed, login, logged-out, ipchanged
    var $sessionstatus;
    //description for $sessionstatus
    var $sessionstatusmsg;
    var $sqlsalt;
    var $userid;
    //var $dbusername;//username for db connections
    var $username;


    function __construct() {
        $this->sessionId            = session_id();
        $this->remoteIp             = getLiveIpAddr();
        $this->userId               = 0;
        $this->sessionStatus        = "login";
        //default is 30 minutes, value will be updated from db table users 
        $this->sessionMaxTimeOut    = 30;       
    }

    function getLoginAttemps($username){
        $con = $this->initTryAuthDbConn();
        if (!$con) {
            die('Could not connect: ' . mysqli_error($con));
            return "0";
        }

        $attempts   = 0;
        $ip         = $this->remoteIp;
        $liveIp     = getLiveIpAddr();
        $period     = time() - failedAttempsBlockedTime;
        $username   = mysqli_real_escape_string($con, $username);
        $sql        = "SELECT COUNT(*) 
                       AS attempts 
                       FROM users_failed_logs 
                       WHERE (ip = '$ip' OR ip = '$liveIp' OR  username = '$username ') 
                       AND time > $period ";
        $result     = mysqli_query($con,$sql);
        while($rs = $result->fetch_array(MYSQLI_ASSOC)) { 
            $attempts = $rs["attempts"];
        }

        mysqli_close($con);
        return $attempts;
    }

    function initCompanyDBConn(){ 

        $conn = mysqli_connect("localhost",$this->dbUsername ,$this->dbPassword ,gokuDbName );
        if (!$conn) {
            die("mysqli_init failed");
            return false;
        } 
        else{
            return $conn;
        }   
    }

    //this user can only read the tables (gosivecontrol.company_users, gosivecontrol.users_logs), can only insert on (users_logs)
    function initTryAuthDbConnOLD(){ 

        $conn = mysqli_connect("localhost",publicLoginUser,publicLoginPassword,"gosivecontrol");
        if (!$conn) {
        die("mysqli_init failed");
        return false;
        } 
        else{
            return $conn;
        }   
    }

    //this user can only read the tables (users_logs), can only insert on (users_logs)
    function initTryAuthDbConn(){ 

        $conn = mysqli_connect("localhost",publicLoginUser,publicLoginPassword, gokuDbName);
        if (!$conn) {
        die("mysqli_init failed");
        return false;
        } 
        else{
            return $conn;
        }   
    }


//this user can only read the tables (gosivecontrol.company_users, gosivecontrol.users_logs), can only insert on (users_logs)
    function initGosiveControlDbConn(){ 
       
        $conn = mysqli_connect("localhost",gosiveDbUsername,gosiveDbPassword,"gosivecontrol");
        if (!$conn) {
        die("mysqli_init failed");
        return false;
        } 
        else{
            return $conn;
        }   
    }

//after successfullky authenticated the user, all user info can be pulled from company db
    function forcedLogoutByAdminOrLockedUser(){
        $con = $this->initCompanyDBConn();
        if (!$con) {
            die('Could not connect: ' . mysqli_error($con));
            return "0";
        }
        $r    = false;
        $sql  = "SELECT users_forced_log_out.id AS requestedLogOutByOther,
            users.active AS userStatus 
            FROM users 
            LEFT JOIN users_forced_log_out ON users_forced_log_out.usersId = '".$this->userId."'   
            AND users_forced_log_out.created_date > NOW() - INTERVAL 120 MINUTE 
            WHERE users.id = '".$this->userId."' 
            AND  ( users.active != 'true' OR ( users_forced_log_out.success = '0')) LIMIT 1";
    
        $result = mysqli_query($con,$sql); 
       
            while($rs = $result->fetch_array(MYSQLI_ASSOC)){

                if($rs["requestedLogOutByOther"] > 0 || $rs["userStatus"] != 'true'){

                    $r =  true;
                }
            } 
        mysqli_close($con);
        return $r;
    }


   function tryAuthenticate($username, $password){ 

        $loginAttemps = $this->getLoginAttemps($username);
        if($loginAttemps > maxFailedAttempts){
            $this->sessionStatus    = "tooManyFailed";
            $this->sessionStatusMsg = "Too many filed login attemps, please try after ".(failedAttempsBlockedTime/60)." minutes.";
        }else{

            $con = $this->initTryAuthDbConn();
            $this->username = mysqli_real_escape_string( $con, $username); 
            $this->password = mysqli_real_escape_string( $con, $password);

           if($this->tryAuthUser() != false){

           }
           elseif($this->tryAuthInvestor() != false){          }
           else{
            $this->insertFailedLog();
           }

          mysqli_close($con);

        } 
    }


    function tryAuthInvestor(){//AFTER SUCCESSFULLKY AUTHENTICATED THE USER, ALL USER INFO CAN BE PULLED FROM COMPANY DB
        

        $con = mysqli_connect("localhost",gosiveDbUsername,gosiveDbPassword,gokuDbName);        
        if (!$con) { 
        die("mysqli_init failed");
        return false;
        } 

        


        $sql = "SELECT investor.id AS userId, name AS name, 
         investor.avatar, bg, settings.wsPort AS wsPort,  investor.allow_phone_app AS status,
        company.company_name AS company, settings.timeZone AS timeZone, investor.app_language AS language, appCancelByAppBefore, investor_support_phone,
        settings.dbUsername AS dbUsername, settings.dbPassword AS dbPassword, purchase_statement, purchase_footer, sale_statement, sale_footer, default_shelf_life,
        alert_shelf_life
        


       
       
       
        FROM investor 

        LEFT JOIN settings ON settings.id = 1
        LEFT JOIN company ON company.id = 1
        WHERE username = '$this->username' AND __password = HEX(AES_ENCRYPT('".$this->password."','".SQLSALT."'))  AND  investor.deleted = 0  GROUP BY investor.id";	
       // echo $sql;           
        $result = mysqli_query($con,$sql); 
        if(mysqli_num_rows($result)> 0){
            while($rs = $result->fetch_array(MYSQLI_ASSOC)){
                if($rs["userId"] > 0){ 
                                       

                    if($rs["status"] == "true"){                        

                       
                        $this->userId = $rs["userId"]; 
                        $this->dbName = gokuDbName;
                        $this->sessionStatus = "ok";
                        $this->sessionStatusMsg = "You've been logged in successfully";
                        $this->lastRequestTime = time();
                        $this->name = $rs["name"]; 
                        $this->avatar = $rs["avatar"]; 
                        $this->bg = $rs["bg"]; 
                        $this->language = $rs["language"]; 
                        $this->wsPort = $rs["wsPort"]; 
                        $this->company = $rs["company"]; 
                        $this->companyID = $this->dbName; 
                        $this->timeZone = $rs["timeZone"];
                        $this->privilege = "investor";
                        $this->dbUsername = $rs["dbUsername"];
                        $this->dbPassword  = substr(crypt($rs["dbPassword"], PHPSALT), 50);   
                        $this->allowedEntities  = "NA";                    
                        $this->sessionMaxTimeOut = 60;
                        $this->appCancelByAppBefore = $rs["appCancelByAppBefore"];
                       // $this->aids_support_phone = $rs["aids_support_phone"];
                        $this->requestPermission = "ok";
                        $this->typeApp = "investor";
                        $this->sessionStatus = "ok";


                        $this->purchase_statement = $rs["purchase_statement"]; 
                        $this->purchase_footer = $rs["purchase_footer"]; 
                        $this->sale_statement = $rs["sale_statement"]; 
                        $this->sale_footer = $rs["sale_footer"]; 
                        $this->default_shelf_life = $rs["default_shelf_life"];
                        $this->alert_shelf_life = $rs["alert_shelf_life"];  
          


                        $this->insertLog();

                    }else{
                        $this->sessionStatus = "lockedAcc";
                        $this->sessionStatusMsg = "Account has been locked";
                    }


                }
                else{
                    $this->sessionStatus = "InvalidID";
                    $this->sessionStatusMsg = "ERROR: Corrupted Account. Contact system administrator";
                }
            }        
        }//
        else{
            
            $this->sessionStatus = "CompFailed";
            $this->requestPermission = "";
            $this->sessionStatusMsg = "ERROR: No user found on company DataBase. Contact system administrator";
        }
        mysqli_close($con);
        if($this->sessionStatus != "ok"){
            return false;
        }
        else{
            return true; 
        }
    }











    function tryAuthUser(){//AFTER SUCCESSFULLKY AUTHENTICATED THE USER, ALL USER INFO CAN BE PULLED FROM COMPANY DB
         

        $con = mysqli_connect("localhost",gosiveDbUsername,gosiveDbPassword,gokuDbName);        
        if (!$con) { 
        die("mysqli_init failed");
        return false;
        } 

        


        $sql = "SELECT users.id AS userId, CONCAT(AES_DECRYPT(UNHEX(__name), '".SQLSALT."'), ' ', users.last_name) AS name, privilege, sessionMaxTimeOut, users.avatar, bg, settings.wsPort AS wsPort,  users.active AS status,
        company.company_name AS company, settings.timeZone AS timeZone, users.language AS language,
        settings.dbUsername AS dbUsername, settings.dbPassword AS dbPassword, appCancelByAppBefore, 
         purchase_statement, purchase_footer, sale_statement, sale_footer, default_shelf_life, alert_shelf_life, allow_to_sell_from_shipped, allow_to_sell_from_ordered,grace_period,
        



        
        CONCAT('[',GROUP_CONCAT(DISTINCT(JSON_OBJECT(
                                                        'entity',users_vs_permissions.entity,
                                                        'privilegeDB',users_vs_permissions.privilegeDB,
                                                        'privilegeFile',users_vs_permissions.privilegeFile,
                                                        'privilegeAgrmt',users_vs_permissions.privilegeAgrmt
                                                    )
                                        ) SEPARATOR ','
                                ),
                ']'
            )  AS allowedEntities
       
       
       
        FROM users  LEFT JOIN users_vs_permissions ON  users_vs_permissions.usersId = users.id AND users_vs_permissions.deleted = '0'
        LEFT JOIN settings ON settings.id = 1
        LEFT JOIN company ON company.id = 1
        WHERE username = '$this->username' AND __password = HEX(AES_ENCRYPT('".$this->password."','".SQLSALT."'))  AND  users.deleted = 0  GROUP BY users.id";	
          
       // writeToTestTxt($sql); exit;

        $result = mysqli_query($con,$sql); 
        if(mysqli_num_rows($result)> 0){
            while($rs = $result->fetch_array(MYSQLI_ASSOC)){ 
                if($rs["userId"] > 0){ 
                                       

                    if($rs["status"] == "true"){


                        $this->lastRequestTime = time();
                        $this->userId = $rs["userId"]; 
                        $this->dbName = gokuDbName;
                        $this->sessionStatus = "ok";
                        $this->sessionStatusMsg = "You've been logged in successfully";
                        $this->name = $rs["name"]; 
                        $this->avatar = $rs["avatar"]; 
                        $this->bg = $rs["bg"]; 
                        $this->language = $rs["language"]; 
                        $this->wsPort = $rs["wsPort"]; 
                        $this->company = $rs["company"]; 
                        $this->companyID = $this->dbName; 
                        $this->timeZone = $rs["timeZone"];
                        $this->privilege = $rs["privilege"];
                        $this->dbUsername = $rs["dbUsername"];
                        $this->dbPassword  = substr(crypt($rs["dbPassword"], PHPSALT), 50);   
                        $this->allowedEntities  = json_decode($rs["allowedEntities"]);                    
                        $this->sessionMaxTimeOut = $rs["sessionMaxTimeOut"];
                        $this->appCancelByAppBefore = $rs["appCancelByAppBefore"];

                        $this->purchase_statement = $rs["purchase_statement"]; 
                        $this->purchase_footer = $rs["purchase_footer"]; 
                        $this->sale_statement = $rs["sale_statement"]; 
                        $this->sale_footer = $rs["sale_footer"]; 
                        $this->default_shelf_life = $rs["default_shelf_life"]; 
                        $this->alert_shelf_life = $rs["alert_shelf_life"]; 
                        $this->allow_to_sell_from_ordered = $rs["allow_to_sell_from_ordered"]; 
                        $this->allow_to_sell_from_shipped = $rs["allow_to_sell_from_shipped"];
                        $this->grace_period = $rs["grace_period"]; 
                        
                        //$this->aids_support_phone = $rs["aids_support_phone"];
                        $this->requestPermission = "ok";
                        $this->sessionStatus = "ok";
                        $this->typeApp = "staff";
                        $this->insertLog();

                    }else{
                        $this->sessionStatus = "lockedAcc";
                        $this->sessionStatusMsg = "Account has been locked";
                    }


                }
                else{
                    $this->sessionStatus = "InvalidID";
                    $this->sessionStatusMsg = "ERROR: Corrupted Account. Contact system administrator";
                }
            }        
        }
        else{
            
            $this->sessionStatus = "CompFailed";
            $this->requestPermission = "";
            $this->sessionStatusMsg = "ERROR: No user found on company DataBase. Contact system administrator";
        }
        mysqli_close($con);
        if($this->sessionStatus == "ok" ){
            return true;
        }
       elseif($this->sessionStatus == "lockedAcc" ){
            return true;
        }
        else{
            return false; 
        }
    }




    function logOff(){
        $this->insertLogOut();
        $this->lastRequestTime = time();
        $this->userId = 0; 
       // $this->dbUsername =  ""; 
        //$this->dbPassword = "";
        $this->name = ""; 
        $this->privilege = "";
        $this->allowedEntities  = [];
        $this->sessionStatus = "logged-out";
        $this->sessionStatusMsg = "You've been logged out";
        $this->sessionMaxTimeOut = 30;
	}

    
  

    function isAuthtenticated(){
        if($this->sessionStatus == "ok"){
            $timeElapsed = (time() - $this->lastRequestTime)/60;//TIME ELAPSED IN MINUTES AFTER LAST SERVER REQUEST
            if($timeElapsed < $this->sessionMaxTimeOut){//CHECK IF ELAPSED TIME AFTER LAST REQUEST IS ACEPTABLE TO BE STILL AUTHENTICATED
                if($this->remoteIp == getLiveIpAddr()){//CHECK IF INITIAL IP IS STILL THE SAME 
                   if($this->forcedLogoutByAdminOrLockedUser()){
                        $this->resetAllForcedLogOutRequest();
                        $this->sessionStatus = "ForcedLogOut";
                        $this->sessionStatusMsg = "You've been logged out by an administrator!"; 
                   }
                   else{
                        $this->lastRequestTime = time();
                        $this->sessionStatus = "ok";
                        $this->sessionStatusMsg = "You are logged in"; 
                   } 
                }
                else{
                    $this->sessionStatus = "IpChanged";
                    $this->sessionStatusMsg = "Seems like your IP has changed, please try to login again!";          
                } 
            }else{
                $this->sessionStatus = "expired";
                $this->sessionStatusMsg = "Your session has expired ".($timeElapsed - $this->sessionMaxTimeOut)." minutes ago. ";    
            }
        }
        //echo  $this->sessionStatus;
        return $this->sessionStatus	;        
    }

    function isAdminAuthorized(){//POSSIBLE $action VALUES ARE (readOnly, readWrite)
        if($this->privilege == "admin" || $this->privilege == "adminGosive"){
           $this->requestPermission = "ok";
           $this->requestPermissionMsg = "Allowed";
           return true;
        }
        $this->requestPermission = "notAllowed";//notAllowed
        $this->requestPermissionMsg = "You don't have administrator privileges!";//ok, notAllowed
        return false;     
   }  
  
    /*
    function isAuthorized($entity, $action){//POSSIBLE $action VALUES ARE (readOnly, readWrite)
         if($this->privilege == "admin"){
            $this->requestPermission = "ok";
            $this->requestPermissionMsg = "Allowed";
            return true;
         }else{
             if(in_array($entity."@readWrite", $this->allowedEntities) || in_array($entity."@".$action, $this->allowedEntities)){
                $this->requestPermission = "ok";//ok
                $this->requestPermissionMsg = $entity." is Allowed";//ok
                return true;
             }
         }
         $this->requestPermission = "notAllowed";//notAllowed
         $this->requestPermissionMsg = "You are notAllowed to ".str_replace("Only", "", $action)." on ".$entity;//ok, notAllowed
         return false;     
    }*/

    //possible db $action values are (none, readonly, readwrite)
    function isAuthorized($entity, $action){
        if($this->privilege == "admin"){
           $this->requestPermission = "ok";
           $this->requestPermissionMsg = "Allowed";
           return true;
        }else{

            $entityPermission = $this->getEntityPermission($entity);
            if($entityPermission->privilegeDB == "readWrite" || $entityPermission->privilegeDB == $action){
               $this->requestPermission = "ok";//ok
               $this->requestPermissionMsg = $entity." is Allowed";//ok
               return true;
            }
        }
        $this->requestPermission = "notAllowed";//notAllowed
        $this->requestPermissionMsg = "You are notAllowed to ".str_replace("Only", "", $action)." on ".$entity;//ok, notAllowed
        return false;     
   }

   //possible file $action values are (none, filesreadonly, fileswrite)
    function isAuthorizedFiles($entity, $action){

        if($this->privilege == "admin"){

           $this->requestPermissionFiles    = "ok";
           //i am marking this as ok because files request and database request cannot be made on same request
           $this->requestPermission         = "ok";
           $this->requestPermissionMsgFiles = "Allowed";
           return true;
        }else{            

            $entityPermission = $this->getEntityPermission($entity);
            if($entityPermission->privilegeFile == "readWrite" || $entityPermission->privilegeFile == $action){

                $this->requestPermissionFiles       = "ok";//ok
                //i am marking this as ok because files request and database request cannot be made on same request
                $this->requestPermission            = "ok";
                $this->requestPermissionMsgFiles    = $entity." is Allowed";//ok
               return true;
            }
        }
        $this->requestPermissionFiles       = "notAllowed";//notAllowed
        $this->requestPermissionMsgFiles    = "You are notAllowed to ".str_replace("Only", "", $action)." on ".$entity;//ok, notAllowed
        return false;     
    }

   //possible file $action values are (none, filesreadonly, fileswrite)
    function isAuthorizedAgrmts($entity, $action){

        if($this->privilege == "admin"){

        $this->requestPermissionFiles    = "ok";
        //i am marking this as ok because files request and database request cannot be made on same request
        $this->requestPermission         = "ok";
        $this->requestPermissionMsgFiles = "Allowed";
        return true;
        }else{            

            $entityPermission = $this->getEntityPermission($entity);
            if($entityPermission->privilegeAgrmt == "readWrite" || $entityPermission->privilegeAgrmt == $action){

                $this->requestPermissionFiles       = "ok";//ok
                //i am marking this as ok because files request and database request cannot be made on same request
                $this->requestPermission            = "ok";
                $this->requestPermissionMsgFiles    = $entity." is Allowed";//ok
            return true;
            }
        }
        $this->requestPermissionFiles       = "notAllowed";//notAllowed
        $this->requestPermissionMsgFiles    = "You are notAllowed to ".str_replace("Only", "", $action)." on ".$entity;//ok, notAllowed
        return false;     
    }









    function insertFailedLog(){	
        $con = $this->initTryAuthDbConn();
        if (!$con) {
            die('Could not connect: ' . mysqli_error($con));
            return "0";
        }
        $time = time();
        $sql = "INSERT INTO users_failed_logs (username, result, ip,time, usertype) 
        VALUES ('$this->username', '$this->sessionStatus', '$this->remoteIp','$time', 'na') "; ///echo $sql; exit;
        if (!mysqli_query($con,$sql)) { 
            $r = false; 
         }       
        else{
            $r = true;
        }
        mysqli_close($con);
        return $r;
    }

    function tracking($action,$entity,$entity_id,$notes = ""){	
        $con = $this->initCompanyDBConn();
        if (!$con) {
            die('Could not connect: ' . mysqli_error($con));
            return "0";
        }
        $action = mysqli_real_escape_string($con,$action);
        $entity = mysqli_real_escape_string($con,$entity);
        $entity_id = mysqli_real_escape_string($con,$entity_id);
        $notes = mysqli_real_escape_string($con,$notes);


        $sql = "INSERT INTO  users_tracking (action, entity, entity_id, usersId,notes, usertype) 
        VALUES ('$action', '$entity', '$entity_id', '$this->userId', '$notes', '$this->typeApp') ";
        if (!mysqli_query($con,$sql)) { 
            $r = false; 
         }       
        else{
            $r = true;
        }
        mysqli_close($con);
        return $r;
    }
    


    function updateUserAvatar($avatar, $id){	
        $con = $this->initCompanyDBConn();
        if (!$con) {
            die('Could not connect: ' . mysqli_error($con));
            return "0";
        }
        $avatar = mysqli_real_escape_string($con, 'server/storage/'.$this->companyID.'/entities/users/'.$id.'/avatar/lowlowlowCompression/'.$avatar);


        $sql = "UPDATE users SET avatar = '$avatar' WHERE users.id = '".$id."'";
        if (!mysqli_query($con,$sql)) { 
            $r = false; 
         }       
        else{
            $r = true;
            //$this->avatar = '/server/storage/'.$this->companyID.'/entities/users/'.$this->userId.'/avatar/'.$avatar;
            if($id == $this->userId)//IF UPDATED USER IS THE SAME AS THE LOGGED ONE
            $this->avatar = $avatar;
        }
        mysqli_close($con);
        return $r;
    }


    function deleteUserAvatar($avatar, $id){	
        $con = $this->initCompanyDBConn();
        if (!$con) {
            die('Could not connect: ' . mysqli_error($con));
            return "0";
        }
       // $avatar = mysqli_real_escape_string($con, 'server/storage/'.$this->companyID.'/entities/users/'.$id.'/avatar/lowlowlowCompression/'.$avatar);


        $sql = "UPDATE users SET avatar = '' WHERE users.id = '".$id."'";
        if (!mysqli_query($con,$sql)) { 
            $r = false; 
         }       
        else{
            $r = true;
            //$this->avatar = '/server/storage/'.$this->companyID.'/entities/users/'.$this->userId.'/avatar/'.$avatar;
            if($id == $this->userId)//IF UPDATED USER IS THE SAME AS THE LOGGED ONE
            $this->avatar = $avatar;
        }
        mysqli_close($con);
        return $r;
    }




    function updateAvatar($avatar){	
        $con = $this->initCompanyDBConn();
        if (!$con) {
            die('Could not connect: ' . mysqli_error($con));
            return "0";
        }
        $avatar = mysqli_real_escape_string($con, 'server/storage/'.$this->companyID.'/entities/users/'.$this->userId.'/avatar/lowlowlowCompression/'.$avatar);


        $sql = "UPDATE users SET avatar = '$avatar' WHERE users.id = '".$this->userId."'";
        if (!mysqli_query($con,$sql)) { 
            $r = false; 
         }       
        else{
            $r = true;
            //$this->avatar = '/server/storage/'.$this->companyID.'/entities/users/'.$this->userId.'/avatar/'.$avatar;
            $this->avatar = $avatar;
        }
        mysqli_close($con);
        return $r;
    }


    function changeMyPassword($pass){	
        $con = $this->initCompanyDBConn();
        if (!$con) {
            die('Could not connect: ' . mysqli_error($con));
            return "0";
        }

        $sql = "UPDATE users SET __password = HEX(AES_ENCRYPT('".$pass."','".SQLSALT."')) WHERE users.id = '".$this->userId."'";
        if (!mysqli_query($con,$sql)) { 
            mysqli_close($con);
            return false; 
         }       
        else{
            mysqli_close($con);
           return $this->changeGosiveControlPassword($pass);
        }
    }


    function changeOtherUserPassword($id, $pass){   
        $con = $this->initCompanyDBConn();
        if (!$con) {
            die('Could not connect: ' . mysqli_error($con));
            return "0";
        }

        $sql = "UPDATE users SET __password = HEX(AES_ENCRYPT('".$pass."','".SQLSALT."')) WHERE users.id = '".$id."'";
        if (!mysqli_query($con,$sql)) { 
            mysqli_close($con);
            return false; 
         }       
        else{
            mysqli_close($con);
           return $this->changeGosiveControlPassword($pass);
        }
    }





    function changeGosiveControlPassword($pass){
         $con = $this->initGosiveControlDBConn();
        if (!$con) {
            die('Could not connect: ' . mysqli_error($con));
            return "0";
        }

        $sql = "UPDATE companies_users SET __password = HEX(AES_ENCRYPT('".$pass."','".SQLSALT."')) WHERE usersId = '".$this->userId."' AND data_base = '".$this->companyID."' ";
        //echo $sql;
        if (!mysqli_query($con, $sql)) { 
            $r = false; 
        }       
        else{
            $r = true;
        }
        mysqli_close($con);
        return $r;
    }


    function changeGosiveControlPasswordOtherUser($pass, $id, $companyID){
        
         $con = $this->initGosiveControlDBConn();
        if (!$con) {
            die('Could not connect: ' . mysqli_error($con));
            return "0";
        }

        $sql = "UPDATE companies_users SET __password = HEX(AES_ENCRYPT('".$pass."','".SQLSALT."')) WHERE usersId = '".$id."' AND data_base = '".$companyID."' ";
        //echo $sql;
        if (!mysqli_query($con, $sql)) { 
            $r = false; 
        }       
        else{
            $r = true;
        }
        mysqli_close($con);
        return $r;
    }



    

    function changeGosiveControlStatus($status, $id, $companyID){
        
        $con = $this->initGosiveControlDBConn();
        
        if (!$con) {
            die('Could not connect: ' . mysqli_error($con));
            return "0";
        }

        $sql = "UPDATE companies_users SET active = '$status' WHERE usersId = '".$id."' AND data_base = '".$companyID."' ";
        //echo $sql;
        if (!mysqli_query($con, $sql)) { 
            $r = false; 
        }       
        else{
            $r = true;
        }
        mysqli_close($con);
        return $r;
    }






 


    function arePasswordsSame($newPass, $oldpass){	
        if($newPass == $oldpass){
            return true;
        }
        else{
            return false;
        }
    }

    function usernameRequirement($pass){    
        if(strlen($pass) > 4 && strlen($pass)< 12){
            return true;
        }
        else{
            return false;
        }
    }
    
    function confirmCurrentPass($oldPass){
        $con = $this->initCompanyDBConn();
        if (!$con) {
            die('Could not connect: ' . mysqli_error($con));
            return "0";
        }

        $sql="SELECT COUNT(*) AS qty FROM users WHERE username = '".$this->username."' AND __password = HEX(AES_ENCRYPT('".$oldPass."','".SQLSALT."')) AND deleted = '0'";

        $result = mysqli_query($con,$sql);
        $qty = 0;
        while($rs = $result->fetch_array(MYSQLI_ASSOC)) { 
            $qty = $rs["qty"];
        }        
        mysqli_close($con);

        if($qty == 1){
            return true;
        }
        else{
            return false;
        }

    }




    function getUsernameAvailability($username){
        $con = $this->initCompanyDBConn();
        if (!$con) {
            die('Could not connect: ' . mysqli_error($con));
            return "0";
        }

        $username            = mysqli_real_escape_string($con, $username);
        $sql="SELECT COUNT(*) AS qty FROM users WHERE username = '$username'";
        $result = mysqli_query($con,$sql);
        while($rs = $result->fetch_array(MYSQLI_ASSOC)) { 
            $qty = $rs["qty"];
        }
        mysqli_close($con);
        return $qty;
    }



    function passwordRequirement($pass){    
        if(strlen($pass) > 6 && strlen($pass)< 20){
            return true;
        }
        else{
            return false;
        }
    }
    
    

    
function insertLog(){	
        $con = $this->initCompanyDBConn();
        if (!$con) {
            die('Could not connect: ' . mysqli_error($con));
            return "0";
        }
        $sql = "INSERT INTO users_logs (username, usersId, result, remote_ip, usertype) 
        VALUES ('$this->username', '$this->userId', '$this->sessionStatus', '$this->remoteIp','$this->typeApp') ";
        if (!mysqli_query($con,$sql)) { 
            $r = false; 
         }       
        else{
            $r = true;
        }
        mysqli_close($con);
        return $r;
    }

    function insertLogOut(){	
        $con = $this->initCompanyDBConn();
        if (!$con) {
            die('Could not connect: ' . mysqli_error($con));
            return "0";
        }
        $ip = getLiveIpAddr();
        $sql = "INSERT INTO users_log_out (username, usersId, result, remote_ip, usertype) 
        VALUES ('$this->username', '$this->userId', '$this->sessionStatus', '$ip', '$this->typeApp') ";
        if (!mysqli_query($con,$sql)) { 
            $r = false; 
         }       
        else{
            $r = true;
        }
        mysqli_close($con);
        return $r;
    }

    function resetAllForcedLogOutRequest(){	
        $con = $this->initCompanyDBConn();
        if (!$con) {
            die('Could not connect: ' . mysqli_error($con));
            return "0";
        }       
        $sql = "UPDATE users_forced_log_out SET success = '1' WHERE  usersId = '".$this->userId."' AND created_date > NOW() - INTERVAL 120 MINUTE ;";
        if (!mysqli_query($con,$sql)) { 
            $r = false; 
         }       
        else{
            $r = true;
        }
        mysqli_close($con);
        return $r;
    }

    /*function changeMyPassword($pass){	       
        $con = $this->initCompanyDBConn();
        $status = mysqli_real_escape_string($con, $status);//possible values are: true, false
        if (!$con) {
            die('Could not connect: ' . mysqli_error($con)); 
            return "0";
        }       
        $sql = "UPDATE users SET active = '$status' WHERE  usersId = '".$userId."';";
        if (!mysqli_query($con,$sql)) { 
            $r = false; 
         }       
        else{
            $r = true;
        }
        mysqli_close($con);
        return $r;
    }*/

    function getEntityPermission($entity){
        foreach ( $this->allowedEntities as $permission ) {
            if ( $entity == $permission->entity ) {
                return $permission;
            }
        }    
        return false;
    }


    function addGosiveControlUser($username,$pass, $id, $companyID, $active){


         $con = $this->initGosiveControlDBConn();
        if (!$con) {
            die('Could not connect: ' . mysqli_error($con));
            return "0";
        }


        $username            = mysqli_real_escape_string($con, $username);
        $pass            = mysqli_real_escape_string($con, $pass);
        $id            = mysqli_real_escape_string($con, $id);
        $companyID            = mysqli_real_escape_string($con, $companyID);
        $active            = mysqli_real_escape_string($con, $active);


        $sql="INSERT INTO  companies_users (username, __password, usersId, data_base, active) VALUES ('$username', HEX(AES_ENCRYPT('".$pass."','".SQLSALT."')), '$id', '$companyID', '$active')";
         if (!mysqli_query($con, $sql)){    
                echoReturnObject("MySQL Error", mysqli_error($con)); 
                exit;  
            }
        mysqli_close($con);
        return true;
    }


}




function getLiveIpAddr(){
    if(!empty($_SERVER['HTTP_CLIENT_IP'])){
    $ipAddr=$_SERVER['HTTP_CLIENT_IP'];
    }elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
    $ipAddr=$_SERVER['HTTP_X_FORWARDED_FOR'];
    }else{
    $ipAddr=$_SERVER['REMOTE_ADDR'];
    }
    return $ipAddr;
}

function writeToTestTxt($txt){
    $myfile = fopen("test.txt", "w") or die("Unable to open file!");
  //$txt = "Hello world\n";
  fwrite($myfile, $txt);
  $txt = " Php.\n";
  //fwrite($myfile, $txt);
  fclose($myfile);
  }

  
function get_entity_vals($id, $tn, $fields, $con){

	$sql="SELECT $fields FROM $tn WHERE id = '$id'";
	$result = mysqli_query($con,$sql);
    return $result->fetch_array(MYSQLI_ASSOC);	 
}

?>
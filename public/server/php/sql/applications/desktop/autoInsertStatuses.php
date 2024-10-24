<?php

//delete FROM `services_vs_status` WHERE N_status != 'scheduled';
$inProgress = "
INSERT INTO nostatusservices (serviceId, N_date, N_time, N_status,status_by) 
SELECT id, N_start_date, N_start_time,'inProgress', 'aid'  FROM services WHERE deleted = '0'  AND N_payroll in ('18','19','20','21') AND N_status = 'scheduled';


INSERT INTO services_vs_status (servicesId, N_date, N_time, N_status,status_by) 
SELECT serviceId, N_date, N_time, N_status, status_by  FROM nostatusservices ;

DELETE FROM nostatusservices;


";



$submitted = "
INSERT INTO nostatusservices (serviceId, N_date, N_time, N_status,status_by) 
SELECT id, N_end_date, N_end_time,'submitted', 'aid'  FROM services WHERE deleted = '0'  AND  N_payroll in ('18','19','20','21')  AND N_status = 'inProgress';


INSERT INTO services_vs_status (servicesId, N_date, N_time, N_status,status_by) 
SELECT serviceId, N_date, N_time, N_status, status_by  FROM nostatusservices ;

DELETE FROM nostatusservices;


";


///TASKS
$tasks = "
UPDATE services_vs_tasks SET N_value = 'true' WHERE N_data_type = 'checkbox';

UPDATE services_vs_tasks SET N_value = FLOOR( RAND() * (200-100) + 100) WHERE N_data_type = 'number';
UPDATE services_vs_tasks SET N_value = CONCAT('TEST ', FLOOR( RAND() * (200-100) + 100)) WHERE N_data_type = 'text';";


 //NEW PATIEST
 $patients = "
UPDATE patients SET address = CONCAT( FLOOR( RAND() * (200-100) + 100), ' Broadway '), city = 'New York', state = 'NY', zip =  '10005', languages = 'English, Spanish' ;
UPDATE nurses SET address = CONCAT( FLOOR( RAND() * (200-100) + 100), ' Main St '), city = 'New York', state = 'NY', zip =  '10007', languages = 'English, Spanish', race = 'white', ethnicity = 'Hispanic',
__dob = 'F7E8C1C0D5CC3862B6197A168DB21204'
;

"






?>
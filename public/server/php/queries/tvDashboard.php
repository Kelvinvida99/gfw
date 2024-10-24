<?php 
$originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');
if ($originFile == "selectTvDashboard") {

   if ($debug) {
      $barSqlAppend = '';
      $bubbleSqlAppend = '';
      $statusSqlAppend = '';
   } else {
      $barSqlAppend = 'WHERE YEAR(date)=YEAR(CURRENT_DATE)';
      $bubbleSqlAppend = 'WHERE MONTH(date)=MONTH(CURRENT_DATE())';
      $statusSqlAppend = 'WHERE MONTH(N_start_date)=MONTH(CURRENT_DATE()) AND YEAR(N_start_date)=YEAR(CURRENT_DATE)';
   }

   $barSql = "SELECT MONTHNAME(date) as x, CASE WHEN SUM(time) < 0 THEN 0 ELSE SUM(time) END AS y 

   FROM (SELECT N_start_date as date,TIMESTAMPDIFF(HOUR, CONCAT(services.N_start_date,' ',services.N_start_time),CONCAT(services.N_end_date,' ',services.N_end_time)) AS time FROM services) 
   AS data " . $barSqlAppend . "  GROUP BY MONTH(date) LIMIT 0,12;";

   
   
   
   $bubbleSql = "
   SELECT CONCAT('[', GROUP_CONCAT(ObjTable.obj SEPARATOR ','), ']') AS bubbleSql FROM 
   
   
   
   (SELECT 
   
   
   JSON_OBJECT(
   

               'label', departments.name,
                  'color',
                           CASE  WHEN services.N_nurse_department = 1 THEN 'blue'
                                       ELSE 'purple'
                                       END,

                        'value',   CONCAT('[',GROUP_CONCAT(
                                                            JSON_OBJECT(
                                                                        'x',CONCAT(DAY(services.N_start_date)),
                                                                        'y', CONCAT(HOUR(services.N_start_time)),
                                                                        'r', CONCAT(TIMESTAMPDIFF(HOUR, CONCAT(services.N_start_date,' ',services.N_start_time),   CONCAT(services.N_end_date,' ',services.N_end_time)))
                                                                     )                                                        
                                                                  
                                                            SEPARATOR ','), ']')
)

AS obj
   FROM services
   LEFT JOIN departments ON departments.id = services.N_nurse_department 
   WHERE departments.deleted = '0'  
   GROUP BY N_nurse_department) AS ObjTable

   
  
   
   
    ";






    $barTest2 = "

    SELECT CONCAT('[', GROUP_CONCAT(ObjTable.obj SEPARATOR ','), ']') AS barTest2 FROM 



    (
                  SELECT 
                  
                  JSON_OBJECT(
                  
               
                     'label', departments.name,
                     'borderRadius', '32',
                     'borderWidth', '4',
                     'color',
                                 CASE  WHEN departments.id = 1 THEN 'blue'
                                             ELSE 'purple'
                                             END,

                              'value',   CONCAT('[',GROUP_CONCAT(
                                                                  JSON_OBJECT(
                                                                              'x',servicesByDeptMonth.gmonth,
                                                                              'y', servicesByDeptMonth.income
                                                                              
                                                                           )                                                        
                                                                        
                                                                  SEPARATOR ','), ']')
               ) AS obj
                  
                  
                  
                  
                  
                  
                  
                  
                  FROM 

                  departments 
                  LEFT JOIN 
                  
                  



                  (
                        SELECT 
                                       MONTHNAME(services.N_start_date) AS gmonth,
                                       services.N_nurse_department AS gdepartment,

                                       SUM(      
                                          services.nurse_agrmt_hourly_payrate *    
                                          (TIMESTAMPDIFF(HOUR, CONCAT(services.N_start_date,' ',services.N_start_time),CONCAT(services.N_end_date,' ',services.N_end_time)))   
                                       ) AS expenses,


                                    SUM(      
                                          services.patient_agrmt_hourly_payrate *    
                                          (TIMESTAMPDIFF(HOUR, CONCAT(services.N_start_date,' ',services.N_start_time),CONCAT(services.N_end_date,' ',services.N_end_time)))   
                                       ) AS income

               FROM services WHERE services.deleted = '0' GROUP BY  services.N_nurse_department, MONTHNAME(services.N_start_date) ORDER BY services.N_start_date

               ) AS servicesByDeptMonth ON servicesByDeptMonth.gdepartment = departments.id

               WHERE departments.deleted = '0'    GROUP BY departments.id


) AS ObjTable
 
    
   
    
    
     ";










   $listSql = "SELECT name as title, 
   'person' AS icon, 
   d.notes AS des,

   CASE
                                          WHEN d.id = 1  THEN 'blue'
                                          ELSE 'purple'
                                       END AS color,
   
   (SELECT count(id) FROM `nurses_vs_agreements` as na WHERE department=d.id) as num 
   
   
   from departments as d WHERE d.deleted = '0'  ";

   $statusSql = "SELECT N_status as title, COUNT(id) as num,
   
   CASE
                                          WHEN N_status = 'inProgress'  THEN 'green'
                                          WHEN N_status = 'scheduled'  THEN 'yellow'
                                          WHEN N_status = 'submitted'  THEN 'blue'
                                          ELSE 'OrangeRed'
                                       END AS color
   
    FROM services " . $statusSqlAppend . " GROUP BY N_status";

  //made by Yeison:  select departments.name as title, count(nurses_vs_agreements.id) as num from departments left join nurses_vs_agreements ON nurses_vs_agreements.department = departments.id GROUP BY departments.id 

  //MULTI LINES GRAPHIC



  $multipleLines = "SELECT   CONCAT(
                           '[',
                              
                                 '{',
                                    '\"label\":\"expenses\"', 
                                    ',\"color\":\"red\"', 
                                    ',\"tension\":\"0\"', 
                                    ',\"borderWidth\":\"4\"', 
                                    ',\"value\":[',
                                                GROUP_CONCAT(DISTINCT(
                                                   JSON_OBJECT(
                                                      'x',CONCAT(serviceVSpayroll.weekNumber),
                                                      'y', CONCAT(ROUND(serviceVSpayroll.expenses,2)) 
                                                              )                                                        
                                                         
                                                         ) ORDER BY  serviceVSpayroll.payroll_id DESC SEPARATOR ','),
                                             ']',
                                  '},', 



                                  '{',
                                    '\"label\":\"income\"', 
                                    ',\"color\":\"blue\"', 
                                    ',\"tension\":\"0\"', 
                                    ',\"borderWidth\":\"4\"', 
                                    ',\"value\":[',
                                                GROUP_CONCAT(DISTINCT(
                                                   JSON_OBJECT(
                                                      'x',CONCAT(serviceVSpayroll.weekNumber),
                                                      'y', CONCAT(ROUND(serviceVSpayroll.income, 2))
                                                               )                                                        
                                                         
                                                         ) ORDER BY  serviceVSpayroll.payroll_id DESC SEPARATOR ','),
                                             ']',
                                  '}', 

                           
                           
                           ']'                           
                                 
                     ) AS multipleLines



                                 
      
      FROM (SELECT payrolls.id AS id, payrolls.N_from AS N_from FROM payrolls WHERE payrolls.deleted = '0' ORDER BY payrolls.id DESC LIMIT 10)  AS payrollss


      LEFT JOIN
      (              SELECT  
                              payrolls.id AS payroll_id,
                              WEEK(payrolls.N_from) AS weekNumber,                            
                                    
                                    
                                    SUM(      
                                          services.nurse_agrmt_hourly_payrate *    
                                          (TIMESTAMPDIFF(HOUR, CONCAT(services.N_start_date,' ',services.N_start_time),CONCAT(services.N_end_date,' ',services.N_end_time)))   
                                       ) AS expenses,
                                    
                                    
                                    SUM(      
                                          services.patient_agrmt_hourly_payrate *    
                                          (TIMESTAMPDIFF(HOUR, CONCAT(services.N_start_date,' ',services.N_start_time),CONCAT(services.N_end_date,' ',services.N_end_time)))   
                                       ) AS income
                                       
         
                     FROM payrolls 
                     LEFT JOIN services ON services.N_payroll = payrolls.id
                     WHERE services.deleted = '0' AND payrolls.deleted = '0' 
                     
                     GROUP BY services.N_payroll ORDER BY payrolls.id DESC  LIMIT 10 
     ) AS serviceVSpayroll ON serviceVSpayroll.payroll_id = payrollss.id



      ;";

      ///////////////////////////////////////////////////////////
      $allServicesCount = " SELECT COUNT(id) FROM services 
      WHERE deleted = '0' AND  (N_status = 'scheduled' OR N_status = 'inProgress' OR N_status = 'submitted')";



      $horizontalBars = " SELECT GROUP_CONCAT(ObjTable.obj SEPARATOR ',') AS horizontalBars FROM 
      
      (SELECT 
                        JSON_OBJECT('title', N_status, 
                                    'num', CONCAT(COUNT(id)), 
                                    'per', CONCAT( round( (COUNT(id) / ($allServicesCount))*100) ), 
                                    'color', 


                                    CASE
                                          WHEN N_status = 'inProgress'  THEN 'green'
                                          WHEN N_status = 'scheduled'  THEN 'yellow'
                                          WHEN N_status = 'submitted'  THEN 'blue'
                                          ELSE 'orangeRed'
                                       END
                                    
                                    
                                    ) AS obj FROM services ".$statusSqlAppend." GROUP BY  N_status) AS ObjTable" 
                                    
                                    
                                    
                                    ;

      ///////////////////////////////////////////////////////////
  
      $allAgrmtCount = " SELECT COUNT(id) FROM nurses_vs_agreements 
      WHERE deleted = '0' ";

      $horizontalSmall = " SELECT GROUP_CONCAT(ObjTable.obj SEPARATOR ',') AS horizontalSmall FROM 
      
      (SELECT 
                        JSON_OBJECT('title', departments.name, 
                                    'num', CONCAT(COUNT(nurses_vs_agreements.id)), 
                                    'per', CONCAT( round( (COUNT(nurses_vs_agreements.id) / ($allAgrmtCount))*100) ), 
                                    'color', 


                                    CASE
                                          WHEN departments.id = '1'  THEN 'blue'
                                          ELSE 'purple'
                                       END,
                                    'type', 'tvcard-bar-tiny'
                                    
                                    
                                    ) AS obj FROM departments
                                    
                                    LEFT JOIN nurses_vs_agreements ON nurses_vs_agreements.department = departments.id
                                    WHERE departments.deleted = '0' 
                                     ".$statusSqlAppend." GROUP BY  departments.id) AS ObjTable" 
                                    
                                    
                                    
                                    ;








                                    

//REVENEW VS MONTHS
      $totalRevenue = " SELECT CONCAT('[', GROUP_CONCAT(ObjTable.obj SEPARATOR ','),']') AS totalRevenue FROM 

      (SELECT 
                        JSON_OBJECT('label', MONTHNAME(N_start_date),
                                    'borderRadius', '0',
                                    'borderWidth', '4',
                          
                                    'color', 


                                    CASE
                                          WHEN MONTH(N_start_date) = 1  THEN 'gray'
                                          WHEN MONTH(N_start_date) = 2  THEN 'orange'
                                          WHEN MONTH(N_start_date) = 3  THEN 'green'
                                          WHEN MONTH(N_start_date) = 4  THEN 'blue'
                                          WHEN MONTH(N_start_date) = 5  THEN 'red'
                                          WHEN MONTH(N_start_date) = 6  THEN 'purple'
                                          WHEN MONTH(N_start_date) = 7  THEN 'maroon'
                                          WHEN MONTH(N_start_date) = 8  THEN 'silver'
                                          WHEN MONTH(N_start_date) = 9  THEN 'yellow'
                                          WHEN MONTH(N_start_date) = 10  THEN 'fuchsia'
                                          WHEN MONTH(N_start_date) = 11  THEN 'aqua'
                                          WHEN MONTH(N_start_date) = 12  THEN 'navy'
                                          
                                          ELSE 'white'
                                       END,


                                    'value', CONCAT('[', JSON_OBJECT( 'x',  MONTHNAME(N_start_date), 'y', 
                                    

                                   CONCAT (
                                       SUM(      
                                          services.patient_agrmt_hourly_payrate *    
                                          (TIMESTAMPDIFF(HOUR, CONCAT(services.N_start_date,' ',services.N_start_time),CONCAT(services.N_end_date,' ',services.N_end_time)))   
                                       ) -
                                    
                                    SUM(      
                                          services.nurse_agrmt_hourly_payrate *    
                                          (TIMESTAMPDIFF(HOUR, CONCAT(services.N_start_date,' ',services.N_start_time),CONCAT(services.N_end_date,' ',services.N_end_time)))   
                                       ) 
                                    )
                                    
                                    
                                    ),']')
                                    
                                    

                                    
                                    
     
                                    
                                    
                                    ) AS obj FROM services ".$statusSqlAppend." GROUP BY  MONTHNAME(N_start_date) ORDER BY N_start_date DESC   LIMIT 4)  AS ObjTable" 
                                    
                                    
                                    
                                    ;




}





?>
<?php

//receivePaymentMultitables UPDATE
//receivePaymentMultitables UPDATE
//receivePaymentMultitables UPDATE

BEGIN
       IF NEW.deleted = '1' THEN

              UPDATE payment_vs_sale
                     SET payment_vs_sale.deleted = '1' 
                     WHERE payment_vs_sale.receivepaymentId = NEW.id;
              
              UPDATE transaction
                     SET deleted = '1' 
                     WHERE entity = 'receivepayment' AND entity_id = NEW.id;        
        
        END IF;
    
    
       IF NEW.deleted = '0' THEN
     
          	UPDATE transaction
        	SET deleted = '1', account = '1',  amount = NEW.amount
        	WHERE entity = 'receivepayment' AND  entity_id = NEW.id;  

              INSERT INTO transaction
        	 (account, entity, entity_id, amount, action, date_time, date, user_id, customer_id ) 
               VALUES (NEW.accounts_id, 'receivepayment', NEW.id, NEW.amount, 'in', NEW.date, NEW.date, NEW.id, NEW.customer_id);
        	
        
        
        
        END IF;
    
    
    
    
    
END




//TransactionUpdateAccount UPDATE

BEGIN
       IF NEW.deleted = '1' THEN

              IF NEW.action = 'in' THEN 

                     UPDATE accounts
                            SET balance = balance - NEW.amount 
                            WHERE accounts.id = NEW.account;
                     
              END IF;   


              IF NEW.action = 'out' THEN 

                     UPDATE accounts
                            SET balance = balance + NEW.amount 
                            WHERE accounts.id = NEW.account;
                     
              END IF;    
        
        END IF;
     
END


//TransactionUpdateAccount INSERT

BEGIN
       IF NEW.deleted = '0' THEN

              IF NEW.action = 'in' THEN 

                     UPDATE accounts
                            SET balance = balance + NEW.amount 
                            WHERE accounts.id = NEW.account;
                     
              END IF;   


              IF NEW.action = 'out' THEN 

                     UPDATE accounts
                            SET balance = balance - NEW.amount 
                            WHERE accounts.id = NEW.account;
                     
              END IF;    
        
        END IF;
     
END









?>
<?php
    $otherexpense_id = isset($_POST["otherexpense_id"]) ? $_POST["otherexpense_id"] : null;
    // $otherexpense_id = 20;
    //$_POST["type"] = "print";

    // Ahora puedes usar $purchase_id en tu consulta SQL para obtener los datos específicos del purchase.
    $reportQuery = "
    SELECT 
    a.*,
    company.company_name,
    company.bill_to_address as company_bill_to_address,
    company.phone as company_phone,
    company.email as company_email,
    company.fax as company_fax,
    company.avatar as company_avatar

    
    FROM (
        SELECT  
        otherexpense.id,
        otherexpense.code,
        CONCAT('[', JSON_OBJECT('id', CONCAT(otherexpense.provider_id), 'displayText',  CONCAT(provider.name)), ']') AS provider_id,
        otherexpense.date,
        DATE_FORMAT(otherexpense.date, '%m/%d/%Y') as date_td,
        CONCAT('[', JSON_OBJECT('id', CONCAT(otherexpense.accounts_bank_id), 'displayText',  CONCAT(bank_account.name)), ']') AS accounts_bank_id,
        CONCAT('[', JSON_OBJECT('id', CONCAT(otherexpense.accounts_expense_id), 'displayText',  CONCAT(expense_account.name)), ']') AS accounts_expense_id,
        CONCAT(otherexpense.amount) as amount,
        CONCAT('$',FORMAT(otherexpense.amount,2)) as amount_dt,
        provider.name as provider_name,
        provider.email AS provider_email,
        provider.phone AS provider_phone,
        provider.fax AS provider_fax,
        bank_account.name as accounts_bank_name,  -- Alias for clarity
        expense_account.name as accounts_expense_name,  -- Alias for clarity
        otherexpense.reference_number,
        otherexpense.notes
        FROM otherexpense 
        INNER JOIN provider on provider.id = otherexpense.provider_id 
        INNER JOIN accounts AS bank_account on bank_account.id = otherexpense.accounts_bank_id  -- Use bank_account alias
        INNER JOIN accounts AS expense_account on expense_account.id = otherexpense.accounts_expense_id  -- Use expense_account alias
        WHERE otherexpense.deleted = '0' AND otherexpense.id = '$otherexpense_id'

    )  as a, company;";
?>

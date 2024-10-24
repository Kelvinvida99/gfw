<?php 

// suma los campos total_price en la tabla purchase_vs_item
// y las inserta en el campo general_total_price de la tabla purchase
$afterUpdateEntityQuery = []; 



$afterUpdateEntityQuery[] = "
   	UPDATE sale_vs_item
SET 
    returned_qty = (
       COALESCE(
          (SELECT SUM(sale_vs_return.lost_qty)
           FROM sale_vs_return
           WHERE sale_vs_return.sale_vs_itemId = sale_vs_item.id
           AND sale_vs_return.deleted = '0'), 0
       )
    )
WHERE sale_vs_item.saleId = '$id'
AND sale_vs_item.deleted = '0'
";

$afterUpdateEntityQuery[] = "
UPDATE sale_vs_return 
JOIN sale_vs_item ON sale_vs_item.id = sale_vs_return.sale_vs_itemId
SET sale_vs_return.lost_price = (sale_vs_return.lost_qty * sale_vs_item.price)
WHERE sale_vs_return.saleId = '$id';
;
";



$afterUpdateEntityQuery[] = "
   	UPDATE sale
	SET grand_total = (
		SELECT SUM(svi.total)
		FROM sale_vs_item svi
		WHERE svi.saleId = '$id'
		AND svi.deleted = '0'
	),
	credit_amount = (
		SELECT SUM(svi.returned_qty * svi.price)
		FROM sale_vs_item svi
		WHERE svi.saleId = '$id'
		AND svi.deleted = '0'
	)

	WHERE sale.id = '$id'
	AND sale.deleted = '0'
";


$afterUpdateEntityQuery[] = "
   	UPDATE sale
    SET payment_status = 
        CASE
            WHEN (grand_total + spent_credit = paid_amount + credit_amount) THEN 'paid'
            WHEN ((paid_amount  + credit_amount < grand_total + spent_credit) AND paid_amount > 0) THEN 'partially_paid'
            WHEN ((paid_amount  + credit_amount > grand_total + spent_credit) AND paid_amount > 0) THEN 'credited'
            ELSE 'unpaid'
        END
    WHERE sale.id = '$id';
";








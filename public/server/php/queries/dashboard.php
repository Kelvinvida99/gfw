<?php 
$originFile = basename($_SERVER["SCRIPT_FILENAME"], '.php');
if ($originFile == "selectdashboard") {


   $barsimple = "SELECT 
               SUM(a.total_sale) as total_sale, 
 		         SUM(a.total_purchase_expenses) +   SUM(a.total_otherexpenses) as total_purchase_expenses,
               SUM(a.total_earnings) as total_earnings
               from (
                     SELECT
                        COALESCE(ROUND(sum(sale.grand_total),2),0) as total_sale, 0 as total_purchase_expenses, 0 as total_otherexpenses  , 0  as total_earnings 
                        from sale where sale.deleted = 0 and sale.grand_total = sale.paid_amount  $where_sale 
                        UNION

                        SELECT 0,  COALESCE(ROUND(Sum(purchase.general_total_price + purchase.general_total_expenses),2),0) as total_expenses,0,0 
                        from purchase where purchase.deleted = 0 $where_purchase

                        UNION

                        select 0, 0, COALESCE(sum(otherexpense.amount),0), 0 
                        from otherexpense where deleted = 0 $where_otherexpense

                        UNION

                        select 0,0,0,
                        COALESCE( round(sum(
                        
                        (sale_vs_item.qty*sale_vs_item.price)   -
                        (sale_vs_item.qty * (purchase_vs_item.unit_price + (IF(purchase_vs_item.qty != 0, (purchase_vs_item.cogs_row_amount / purchase_vs_item.qty), 0))))
                        
                        ),2),0) as total_purchase_expenses
                        from purchase_vs_item
                        INNER JOIN purchase on purchase.id = purchase_vs_item.purchaseId
                        INNER JOIN sale_vs_item on sale_vs_item.purchase_vs_itemId = purchase_vs_item.id and sale_vs_item.deleted  = 0
                        INNER JOIN sale on sale.id = sale_vs_item.saleId and sale.deleted  = 0
                        where purchase_vs_item.deleted = 0 and purchase.deleted = 0 $where_sale
            ) as a
      
    ";





}





?>
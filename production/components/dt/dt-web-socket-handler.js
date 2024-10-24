//desktop
const customerDt         = require('../../applications/staff/desktop/entity/customer/customer-dt')
const providerDt         = require('../../applications/staff/desktop/entity/provider/provider-dt')
const accountsDt         = require('../../applications/staff/desktop/entity/accounts/accounts-dt')
const areasDt            = require('../../applications/staff/desktop/entity/areas/areas-dt')
const inventoryDt        = require('../../applications/staff/desktop/entity/inventory/inventory-dt')
const investorDt         = require('../../applications/staff/desktop/entity/investor/investor-dt')
const investordepositDt  = require('../../applications/staff/desktop/entity/investordeposit/investordeposit-dt')
const itemDt             = require('../../applications/staff/desktop/entity/item/item-dt')
const item_unitDt        =  require('../../applications/staff/desktop/entity/item_unit/item_unit-dt')
const otherexpenseDt     = require('../../applications/staff/desktop/entity/otherexpense/otherexpense-dt')
const purchaseDt         = require('../../applications/staff/desktop/entity/purchase/purchase-dt')
const receivepaymentDt   = require('../../applications/staff/desktop/entity/receivepayment/receivepayment-dt')
const saleDt             = require('../../applications/staff/desktop/entity/sale/sale-dt')
const sentpaymentDt      = require('../../applications/staff/desktop/entity/sentpayment/sentpayment-dt')
const shipperDt          = require('../../applications/staff/desktop/entity/shipper/shipper-dt')
const usersDt            = require('../../applications/staff/desktop/entity/users/users-dt')
const employesspaymentDt = require('../../applications/staff/desktop/entity/employesspayment/employesspayment-dt')
const equitydepositDt    = require('../../applications/staff/desktop/entity/equitydeposit/equitydeposit-dt')


export function start (detail) { 
    //console.log('dt-web-scocket>', detail.row[0].dest)
    switch (detail.row[0].dest){

        case 'customer':        customerDt.start(detail);         break;
        case 'provider':        providerDt.start(detail);         break;
        case 'accounts':        accountsDt.start(detail);         break;
        case 'areas':           areasDt.start(detail);            break;
        case 'inventory':       inventoryDt.start(detail);        break;
        case 'investor':        investorDt.start(detail);         break;
        case 'investordeposit': investordepositDt.start(detail);  break;
        case 'item':            itemDt.start(detail);             break;
        case 'item_unit':       item_unitDt.start(detail);        break;
        case 'otherexpense':    otherexpenseDt.start(detail);     break;
        case 'purchase':        purchaseDt.start(detail);         break;
        case 'receivepayment':  receivepaymentDt.start(detail);   break;
        case 'sale':            saleDt.start(detail);             break;
        case 'sentpayment':     sentpaymentDt.start(detail);      break;
        case 'shipper':         shipperDt.start(detail);          break;
        case 'users':           usersDt.start(detail);            break;
        case 'employesspayment':employesspaymentDt.start(detail); break;
        case 'equitydeposit':   equitydepositDt.start(detail);    break;
    }
}
//25/10/2023 marco molina
//archivo creado a partir del archivo click-obj pero solo con los componentes de las entidades 

///// require entities
const goku            = require ('../entity/goku/goku')
const myuser          = require ('../entity/myuser/myuser')
const users           = require ('../applications/staff/desktop/entity/users/users')
const employesspayment = require ('../applications/staff/desktop/entity/employesspayment/employesspayment')
const equitydeposit    = require ('../applications/staff/desktop/entity/equitydeposit/equitydeposit')
const admin           = require ('../applications/staff/desktop/entity/admin/admin')
const provider        = require ('../applications/staff/desktop/entity/provider/provider')
const customer        = require ('../applications/staff/desktop/entity/customer/customer')
const investor        = require ('../applications/staff/desktop/entity/investor/investor')
const investordeposit = require ('../applications/staff/desktop/entity/investordeposit/investordeposit')
const otherexpense    = require ('../applications/staff/desktop/entity/otherexpense/otherexpense')
const receivepayment  = require ('../applications/staff/desktop/entity/receivepayment/receivepayment')
const sentpayment     = require ('../applications/staff/desktop/entity/sentpayment/sentpayment')
const accounts        = require ('../applications/staff/desktop/entity/accounts/accounts')
const areas           = require ('../applications/staff/desktop/entity/areas/areas')
const item            = require ('../applications/staff/desktop/entity/item/item')
const item_unit       = require ('../applications/staff/desktop/entity/item_unit/item_unit')
const purchase        = require ('../applications/staff/desktop/entity/purchase/purchase')
const sale            = require ('../applications/staff/desktop/entity/sale/sale')
const shipper         = require ('../applications/staff/desktop/entity/shipper/shipper')
const company         = require ('../applications/staff/desktop/entity/company/company')
const inventory       = require ('../applications/staff/desktop/entity/inventory/inventory')
const transaction     = require ('../applications/staff/desktop/entity/transaction/transaction')
const dashboard     = require ('../applications/staff/desktop/entity/dashboard/dashboard')




// tv
const tvDashboardHome   = require ('../applications/staff/tv/entity/tvDashboardHome/tvDashboardHome')

export const obj_entity = {


    //entities
    goku:          { start: function(detail){  goku.start(detail)           }},
    myuser:        { start: function(detail){  myuser.start(detail)         }},
    users:         { start: function(detail){  users.start(detail)          }},
    employesspayment:  { start: function(detail){  employesspayment.start(detail)          }},
    equitydeposit:  { start: function(detail){  equitydeposit.start(detail)          }},
    admin:          { start: function(detail) {  admin.start(detail)          }},
    provider:          { start: function(detail) {  provider.start(detail)          }},
    customer:          { start: function(detail) {  customer.start(detail)          }},
    investor:          { start: function(detail) {  investor.start(detail)          }},
    investordeposit:          { start: function(detail) {  investordeposit.start(detail)          }},
    otherexpense:          { start: function(detail) {  otherexpense.start(detail)          }},
    receivepayment:          { start: function(detail) {  receivepayment.start(detail)          }},
    sentpayment:          { start: function(detail) {  sentpayment.start(detail)          }},
    accounts:          { start: function(detail) {  accounts.start(detail)          }},
    areas:          { start: function(detail) {  areas.start(detail)          }},
    item:          { start: function(detail) {  item.start(detail)          }},
    item_unit:          { start: function(detail) {  item_unit.start(detail)          }},
    purchase:      { start: function(detail) {  purchase.start(detail)          }},
    sale:          { start: function(detail) {  sale.start(detail)          }},
    shipper:          { start: function(detail) {  shipper.start(detail)          }},
    company:          { start: function(detail) {  company.start(detail)          }},
    inventory:          { start: function(detail) {  inventory.start(detail)          }},
    transaction:          { start: function(detail) {  transaction.start(detail)          }},
    tvDashboardHome:    { start: function(detail){  tvDashboardHome.start(detail)       }},
    dashboard:    { start: function(detail){  dashboard.start(detail)       }},

}
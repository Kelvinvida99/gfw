const file      = require ('../components/file/file')
const textfield = require ('../components/textfield/textfield')
const purchase  = require ('../applications/staff/desktop/entity/purchase/purchase')
const sale      = require ('../applications/staff/desktop/entity/sale/sale')
const customer  = require ('../applications/staff/desktop/entity/customer/customer')
const provider  = require ('../applications/staff/desktop/entity/provider/provider')
const dashboard  = require ('../applications/staff/desktop/entity/dashboard/dashboard')



export const obj = {
   
        file:          { start: function(detail){ file.start(detail)          }},
        textfield:     { start: function(detail){ textfield.start(detail)     }},
        sale:          { start: function(detail) {  sale.start(detail)        }},
        purchase:      { start: function(detail) {  purchase.start(detail)    }},
        customer:      { start: function(detail) {  customer.start(detail)    }},
        provider:      { start: function(detail) {  provider.start(detail)    }},
        dashboard:     { start: function(detail) {  dashboard.start(detail)   }},
        

}
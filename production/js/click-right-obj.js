const goku             = require ('../entity/goku/goku')
const users            = require('../applications/staff/desktop/entity/users/users')
const provider         = require('../applications/staff/desktop/entity/provider/provider')
const investor         = require('../applications/staff/desktop/entity/investor/investor')
const investordeposit  = require('../applications/staff/desktop/entity/investordeposit/investordeposit')
const item             = require('../applications/staff/desktop/entity/item/item')
const item_unit        = require('../applications/staff/desktop/entity/item_unit/item_unit')
const otherexpense     = require('../applications/staff/desktop/entity/otherexpense/otherexpense')
const receivepayment   = require('../applications/staff/desktop/entity/receivepayment/receivepayment')
const sentpayment      = require('../applications/staff/desktop/entity/sentpayment/sentpayment')
const sale             = require('../applications/staff/desktop/entity/sale/sale')
const purchase         = require('../applications/staff/desktop/entity/purchase/purchase')
const customer         = require('../applications/staff/desktop/entity/customer/customer')
const employesspayment = require('../applications/staff/desktop/entity/employesspayment/employesspayment')
const equitydeposit    = require('../applications/staff/desktop/entity/equitydeposit/equitydeposit')
const inventory        = require('../applications/staff/desktop/entity/inventory/inventory')

export const obj = {
   
        customer:         { start: function(detail){ customer.start(detail)           }},
        employesspayment: { start: function(detail){ employesspayment.start(detail)   }},
        equitydeposit:    { start: function(detail){ equitydeposit.start(detail)      }},
        goku:             { start: function(detail){ goku.start(detail)               }},
        inventory:        { start: function(detail){ inventory.start(detail)          }},
        investor:         { start: function(detail){ investor.start(detail)           }},
        investordeposit:  { start: function(detail){ investordeposit.start(detail)    }},
        item:             { start: function(detail){ item.start(detail)               }},
        item_unit:        { start: function(detail){ item_unit.start(detail)          }},
        otherexpense:     { start: function(detail){ otherexpense.start(detail)       }},
        provider:         { start: function(detail){ provider.start(detail)           }},
        purchase:         { start: function(detail){ purchase.start(detail)           }},
        receivepayment:   { start: function(detail){ receivepayment.start(detail)     }},
        sale:             { start: function(detail){ sale.start(detail)               }},
        sentpayment:      { start: function(detail){ sentpayment.start(detail)        }},
        users:            { start: function(detail){ users.start(detail)              }},
}
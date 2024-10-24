const autocomplete    = require('../components/textfield/autocomplete')
const dt              = require('../components/dt/dt')
const file            = require('../components/file/file')
const login           = require('../components/login/login')
const textfield       = require('../components/textfield/textfield')

//entitie
const goku            = require ('../entity/goku/goku')

//staff desktop
const users           = require('../applications/staff/desktop/entity/users/users')
const provider        = require('../applications/staff/desktop/entity/provider/provider')
const investor        = require('../applications/staff/desktop/entity/investor/investor')
const investordeposit = require('../applications/staff/desktop/entity/investordeposit/investordeposit')
const otherexpense    = require('../applications/staff/desktop/entity/otherexpense/otherexpense')
const receivepayment  = require('../applications/staff/desktop/entity/receivepayment/receivepayment')
const sentpayment        = require('../applications/staff/desktop/entity/sentpayment/sentpayment')
const sale            = require('../applications/staff/desktop/entity/sale/sale')
const customer        = require('../applications/staff/desktop/entity/customer/customer')
const purchase        = require('../applications/staff/desktop/entity/purchase/purchase')
const accounts        = require('../applications/staff/desktop/entity/accounts/accounts')
const areas           = require('../applications/staff/desktop/entity/areas/areas')
const item_unit           = require('../applications/staff/desktop/entity/item_unit/item_unit')
const item           = require('../applications/staff/desktop/entity/item/item')
const inventory           = require('../applications/staff/desktop/entity/inventory/inventory')
const equitydeposit    = require('../applications/staff/desktop/entity/equitydeposit/equitydeposit')
const employesspayment = require('../applications/staff/desktop/entity/employesspayment/employesspayment')


//tv
const staffTv         = require ('../applications/staff/tv/staff-tv')

export const obj = {
        
        autocomplete:{ start: function(detail){ autocomplete.start(detail)   }},
        dt:          { start: function(detail){ dt.start(detail)             }},
        file:        { start: function(detail){ file.start(detail)           }},
        login:       { start: function(detail){ login.start(detail)          }},
        textfield:   { start: function(detail){ textfield.start(detail)      }},

        //entities
        goku:        { start: function(detail){ goku.start(detail)         }},
        users:       { start: function(detail){ users.start(detail)        }},
        provider:       { start: function(detail){ provider.start(detail)        }},
        investor:       { start: function(detail){ investor.start(detail)        }},
        investordeposit:       { start: function(detail){ investordeposit.start(detail)        }},
        otherexpense:       { start: function(detail){ otherexpense.start(detail)        }},
        receivepayment:       { start: function(detail){ receivepayment.start(detail)        }},
	sentpayment:       { start: function(detail){ sentpayment.start(detail)        }},
        sale:       { start: function(detail){ sale.start(detail)        }},
        customer:       { start: function(detail){ customer.start(detail)        }},
        purchase:       { start: function(detail){ purchase.start(detail)        }},
        accounts:       { start: function(detail){ accounts.start(detail)        }},
        areas:          { start: function(detail){ areas.start(detail)        }},
        item_unit:          { start: function(detail){ item_unit.start(detail)        }},
        item:          { start: function(detail){ item.start(detail)        }},
        inventory:          { start: function(detail){ inventory.start(detail)        }},
        equitydeposit:          { start: function(detail){ equitydeposit.start(detail)        }},
        employesspayment:          { start: function(detail){ employesspayment.start(detail)        }},

        staffTv:    { start: function(detail){ staffTv.start(detail)       }},
}

const sale            = require('../applications/staff/desktop/entity/sale/sale')
const purchase        = require('../applications/staff/desktop/entity/purchase/purchase')



//tv
const staffTv         = require ('../applications/staff/tv/staff-tv')

export const obj = {
        sale:       { start: function(detail){ sale.start(detail)        }},
        purchase:       { start: function(detail){ purchase.start(detail)        }},


}

const customerBackdrop        = require('./customer-backdrop')
const customerConfirmation    = require('./customer-confirmation')
const customerDialog          = require('./customer-dialog')
const customerDt              = require('./customer-dt')
const customerFullcont        = require('./customer-fullcont')
const customerMenu            = require('./customer-menu')
const customerPage            = require('./customer-page')
const customerSnack           = require('./customer-snack')
const customerReport          = require('./customer-report')



export function start(detail){  //console.log('goku-dt 5>', detail)
         
      obj[detail.elem].start(detail)

}/**/




const obj = {
   
      backdrop:        { start: (detail)=>{  customerBackdrop.start(detail)         }},
      confirmation:    { start: (detail)=>{  customerConfirmation.start(detail)     }},
      dialog:          { start: (detail)=>{  customerDialog.start(detail)           }},
      dt:              { start: (detail)=>{  customerDt. start(detail)              }},
      fullcont:        { start: (detail)=>{  customerFullcont. start(detail)        }},
      menu:            { start: (detail)=>{  customerMenu.start(detail)             }},
      page:            { start: (detail)=>{  customerPage.start(detail)             }},
      snack:           { start: (detail)=>{  customerSnack.start(detail)            }},
      report:          { start: (detail)=>{  customerReport.start(detail)           }},

}
const sentpaymentBackdrop     = require('./sentpayment-backdrop')
const sentpaymentConfirmation = require('./sentpayment-confirmation')
const sentpaymentDialog       = require('./sentpayment-dialog')
const sentpaymentDt           = require('./sentpayment-dt')
const sentpaymentFullcont     = require('./sentpayment-fullcont')
const sentpaymentMenu         = require('./sentpayment-menu')
const sentpaymentPage         = require('./sentpayment-page')
const sentpaymentSnack        = require('./sentpayment-snack')
const sentpaymentMT           = require('./sentpayment-fullcont-multitable')

export function start(detail){  
        
      obj[detail.elem].start(detail)

}/**/

const obj = {
   
      backdrop:        { start: (detail)=>{  sentpaymentBackdrop.start(detail)         }},
      confirmation:    { start: (detail)=>{  sentpaymentConfirmation.start(detail)     }},
      dialog:          { start: (detail)=>{  sentpaymentDialog.start(detail)           }},
      dt:              { start: (detail)=>{  sentpaymentDt. start(detail)              }},
      fullcont:        { start: (detail)=>{  sentpaymentFullcont. start(detail)        }},
      menu:            { start: (detail)=>{  sentpaymentMenu.start(detail)             }},
      multitable:      { start: (detail)=>{  sentpaymentMT.start(detail)               }},
      page:            { start: (detail)=>{  sentpaymentPage.start(detail)             }},
      snack:           { start: (detail)=>{  sentpaymentSnack.start(detail)            }},

}
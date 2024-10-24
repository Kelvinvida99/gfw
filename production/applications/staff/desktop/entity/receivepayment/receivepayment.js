
const receivepaymentBackdrop        = require('./receivepayment-backdrop')
const receivepaymentConfirmation    = require('./receivepayment-confirmation')
const receivepaymentDialog          = require('./receivepayment-dialog')
const receivepaymentDt              = require('./receivepayment-dt')
const receivepaymentFullcont        = require('./receivepayment-fullcont')
const receivepaymentMenu            = require('./receivepayment-menu')
const receivepaymentPage            = require('./receivepayment-page')
const receivepaymentSnack           = require('./receivepayment-snack')
const receivepaymentMT                        = require('./receivepayment-fullcont-multitable')




export function start(detail){  

         
      obj[detail.elem].start(detail)

}/**/




const obj = {
   
      backdrop:        { start: (detail)=>{  receivepaymentBackdrop.start(detail)         }},
      confirmation:    { start: (detail)=>{  receivepaymentConfirmation.start(detail)     }},
      dialog:          { start: (detail)=>{  receivepaymentDialog.start(detail)           }},
      dt:              { start: (detail)=>{  receivepaymentDt. start(detail)              }},
      fullcont:        { start: (detail)=>{  receivepaymentFullcont.start(detail)        }},
      multitable:      { start: (detail)=>{  receivepaymentMT.start(detail)               }},
      menu:            { start: (detail)=>{  receivepaymentMenu.start(detail)             }},
      page:            { start: (detail)=>{  receivepaymentPage.start(detail)             }},
      snack:           { start: (detail)=>{  receivepaymentSnack.start(detail)            }},

}
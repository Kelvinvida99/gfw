const purchaseBackdrop        = require('./purchase-backdrop')
const purchaseConfirmation    = require('./purchase-confirmation')
const purchaseDialog          = require('./purchase-dialog')
const purchaseDt              = require('./purchase-dt')
const purchaseFullcont        = require('./purchase-fullcont')
const purchaseMenu            = require('./purchase-menu')
const purchaseMT              = require('./purchase-fullcont-multitable')
const purchasePage            = require('./purchase-page')
const purchaseSnack           = require('./purchase-snack')
const purchaseReport          = require('./purchase-report')
const purchaseKey             = require('./purchase-key')




export function start(detail){  //console.log('goku-dt 5>', detail)
         
      obj[detail.elem].start(detail)

}/**/




const obj = {
   
      backdrop:        { start: (detail)=>{  purchaseBackdrop.start(detail)         }},
      confirmation:    { start: (detail)=>{  purchaseConfirmation.start(detail)     }},
      dialog:          { start: (detail)=>{  purchaseDialog.start(detail)           }},
      dt:              { start: (detail)=>{  purchaseDt. start(detail)              }},
      fullcont:        { start: (detail)=>{  purchaseFullcont. start(detail)        }},
      multitable:      { start: (detail)=>{  purchaseMT.start(detail)               }},
      menu:            { start: (detail)=>{  purchaseMenu.start(detail)             }},
      page:            { start: (detail)=>{  purchasePage.start(detail)             }},
      snack:           { start: (detail)=>{  purchaseSnack.start(detail)            }},
      report:          { start: (detail)=>{  purchaseReport.start(detail)           }},
      key:             { start: (detail)=>{  purchaseKey.start(detail)              }},

}
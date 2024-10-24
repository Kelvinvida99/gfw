const transactionBackdrop        = require('./transaction-backdrop')
const transactionConfirmation    = require('./transaction-confirmation')
const transactionDialog          = require('./transaction-dialog')
const transactionDt              = require('./transaction-dt')
const transactionPage            = require('./transaction-page')
const transactionSnack           = require('./transaction-snack')
const transactionReport          = require('./transaction-report')

export function start(detail){  //console.log('goku-dt 5>', detail)
         
      obj[detail.elem].start(detail)

}/**/

const obj = {
   
      backdrop:        { start: (detail)=>{  transactionBackdrop.start(detail)         }},
      confirmation:    { start: (detail)=>{  transactionConfirmation.start(detail)     }},
      dialog:          { start: (detail)=>{  transactionDialog.start(detail)           }},
      dt:              { start: (detail)=>{  transactionDt. start(detail)              }},
      page:            { start: (detail)=>{  transactionPage.start(detail)             }},
      report:          { start: (detail)=>{  transactionReport.start(detail)           }},
      snack:           { start: (detail)=>{  transactionSnack.start(detail)            }},

}
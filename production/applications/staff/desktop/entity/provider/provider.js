
const providerBackdrop        = require('./provider-backdrop')
const providerConfirmation    = require('./provider-confirmation')
const providerDialog          = require('./provider-dialog')
const providerDt              = require('./provider-dt')
const providerFullcont        = require('./provider-fullcont')
const providerMenu            = require('./provider-menu')
const providerPage            = require('./provider-page')
const providerSnack           = require('./provider-snack')
const providerReport          = require('./provider-report')



export function start(detail){  //console.log('goku-dt 5>', detail)
         
      obj[detail.elem].start(detail)

}/**/




const obj = {
   
      backdrop:        { start: (detail)=>{  providerBackdrop.start(detail)         }},
      confirmation:    { start: (detail)=>{  providerConfirmation.start(detail)     }},
      dialog:          { start: (detail)=>{  providerDialog.start(detail)           }},
      dt:              { start: (detail)=>{  providerDt. start(detail)              }},
      fullcont:        { start: (detail)=>{  providerFullcont. start(detail)        }},
      menu:            { start: (detail)=>{  providerMenu.start(detail)             }},
      page:            { start: (detail)=>{  providerPage.start(detail)             }},
      snack:           { start: (detail)=>{  providerSnack.start(detail)            }},
      report:          { start: (detail)=>{  providerReport.start(detail)            }},

}
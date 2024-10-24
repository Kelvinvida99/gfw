
const investordepositBackdrop        = require('./investordeposit-backdrop')
const investordepositConfirmation    = require('./investordeposit-confirmation')
const investordepositDialog          = require('./investordeposit-dialog')
const investordepositDt              = require('./investordeposit-dt')
const investordepositFullcont        = require('./investordeposit-fullcont')
const investordepositMenu            = require('./investordeposit-menu')
const investordepositPage            = require('./investordeposit-page')
const investordepositSnack           = require('./investordeposit-snack')



export function start(detail){  

         
      obj[detail.elem].start(detail)

}/**/




const obj = {
   
      backdrop:        { start: (detail)=>{  investordepositBackdrop.start(detail)         }},
      confirmation:    { start: (detail)=>{  investordepositConfirmation.start(detail)     }},
      dialog:          { start: (detail)=>{  investordepositDialog.start(detail)           }},
      dt:              { start: (detail)=>{  investordepositDt. start(detail)              }},
      fullcont:        { start: (detail)=>{  investordepositFullcont. start(detail)        }},
      menu:            { start: (detail)=>{  investordepositMenu.start(detail)             }},
      page:            { start: (detail)=>{  investordepositPage.start(detail)             }},
      snack:           { start: (detail)=>{  investordepositSnack.start(detail)            }},

}
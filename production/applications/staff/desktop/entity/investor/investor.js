
const investorBackdrop        = require('./investor-backdrop')
const investorConfirmation    = require('./investor-confirmation')
const investorDialog          = require('./investor-dialog')
const investorDt              = require('./investor-dt')
const investorFullcont        = require('./investor-fullcont')
const investorMenu            = require('./investor-menu')
const investorPage            = require('./investor-page')
const investorSnack           = require('./investor-snack')



export function start(detail){  //console.log('goku-dt 5>', detail)
         
      obj[detail.elem].start(detail)

}/**/




const obj = {
   
      backdrop:        { start: (detail)=>{  investorBackdrop.start(detail)         }},
      confirmation:    { start: (detail)=>{  investorConfirmation.start(detail)     }},
      dialog:          { start: (detail)=>{  investorDialog.start(detail)           }},
      dt:              { start: (detail)=>{  investorDt. start(detail)              }},
      fullcont:        { start: (detail)=>{  investorFullcont. start(detail)        }},
      menu:            { start: (detail)=>{  investorMenu.start(detail)             }},
      page:            { start: (detail)=>{  investorPage.start(detail)             }},
      snack:           { start: (detail)=>{  investorSnack.start(detail)            }},

}
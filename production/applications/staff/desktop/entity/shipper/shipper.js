
const shipperBackdrop        = require('./shipper-backdrop')
const shipperConfirmation    = require('./shipper-confirmation')
const shipperDialog          = require('./shipper-dialog')
const shipperDt              = require('./shipper-dt')
const shipperFullcont        = require('./shipper-fullcont')
const shipperMenu            = require('./shipper-menu')
const shipperPage            = require('./shipper-page')
const shipperSnack           = require('./shipper-snack')



export function start(detail){  //console.log('goku-dt 5>', detail)
         
      obj[detail.elem].start(detail)

}/**/




const obj = {
   
      backdrop:        { start: (detail)=>{  shipperBackdrop.start(detail)         }},
      confirmation:    { start: (detail)=>{  shipperConfirmation.start(detail)     }},
      dialog:          { start: (detail)=>{  shipperDialog.start(detail)           }},
      dt:              { start: (detail)=>{  shipperDt. start(detail)              }},
      fullcont:        { start: (detail)=>{  shipperFullcont. start(detail)        }},
      menu:            { start: (detail)=>{  shipperMenu.start(detail)             }},
      page:            { start: (detail)=>{  shipperPage.start(detail)             }},
      snack:           { start: (detail)=>{  shipperSnack.start(detail)            }},
}
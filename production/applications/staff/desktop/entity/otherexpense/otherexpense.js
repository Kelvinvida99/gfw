
const otherexpenseBackdrop        = require('./otherexpense-backdrop')
const otherexpenseConfirmation    = require('./otherexpense-confirmation')
const otherexpenseDialog          = require('./otherexpense-dialog')
const otherexpenseDt              = require('./otherexpense-dt')
const otherexpenseFullcont        = require('./otherexpense-fullcont')
const otherexpenseMenu            = require('./otherexpense-menu')
const otherexpensePage            = require('./otherexpense-page')
const otherexpenseSnack           = require('./otherexpense-snack')



export function start(detail){  

         
      obj[detail.elem].start(detail)

}/**/




const obj = {
   
      backdrop:        { start: (detail)=>{  otherexpenseBackdrop.start(detail)         }},
      confirmation:    { start: (detail)=>{  otherexpenseConfirmation.start(detail)     }},
      dialog:          { start: (detail)=>{  otherexpenseDialog.start(detail)           }},
      dt:              { start: (detail)=>{  otherexpenseDt.start(detail)              }},
      fullcont:        { start: (detail)=>{  otherexpenseFullcont.start(detail)        }},
      menu:            { start: (detail)=>{  otherexpenseMenu.start(detail)             }},
      page:            { start: (detail)=>{  otherexpensePage.start(detail)             }},
      snack:           { start: (detail)=>{  otherexpenseSnack.start(detail)            }},

}
const saleBackdrop        = require('./sale-backdrop')
// const saleBanner          = require('./sale-banner')
const saleConfirmation    = require('./sale-confirmation')
const saleDialog          = require('./sale-dialog')
const saleDt              = require('./sale-dt')
const saleFullcont        = require('./sale-fullcont')
// const saleFullcontStepper = require('./sale-fullcont-stepper')
const saleMenu            = require('./sale-menu')
const saleMT              = require('./sale-fullcont-multitable')
const salePage            = require('./sale-page')
const saleSnack           = require('./sale-snack')
const saleKey             = require('./sale-key')



export function start(detail){  //console.log('goku-dt 5>', detail)
      
      obj[detail.elem].start(detail)

}/**/




const obj = {
   
      backdrop:        { start: (detail)=>{  saleBackdrop.start(detail)         }},
      // banner:          { start: (detail)=>{  saleBanner.start(detail)           }},
      confirmation:    { start: (detail)=>{  saleConfirmation.start(detail)     }},
      dialog:          { start: (detail)=>{  saleDialog.start(detail)           }},
      dt:              { start: (detail)=>{  saleDt. start(detail)              }},
      fullcont:        { start: (detail)=>{  saleFullcont. start(detail)        }},
      // fullcontStepper: { start: (detail)=>{  saleFullcontStepper. start(detail) }},
      multitable:      { start: (detail)=>{  saleMT.start(detail)               }},
      menu:            { start: (detail)=>{  saleMenu.start(detail)             }},
      page:            { start: (detail)=>{  salePage.start(detail)             }},
      snack:           { start: (detail)=>{  saleSnack.start(detail)            }},
      key:             { start: (detail)=>{  saleKey.start(detail)              }},

}








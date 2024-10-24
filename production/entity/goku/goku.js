
const gokuBackdrop        = require('./goku-backdrop')
const gokuBanner          = require('./goku-banner')
const gokuConfirmation    = require('./goku-confirmation')
const gokuDialog          = require('./goku-dialog')
const gokuDt              = require('./goku-dt')
const gokuFullcont        = require('./goku-fullcont')
const gokuFullcontStepper = require('./goku-fullcont-stepper')
const gokuMenu            = require('./goku-menu')
const gokuMT              = require('./goku-fullcont-multitable')
const gokuPage            = require('./goku-page')
const gokuSnack           = require('./goku-snack')



export function start(detail){  //console.log('goku-dt 5>', detail)
         
      obj[detail.elem].start(detail)

}/**/




const obj = {
   
      backdrop:        { start: (detail)=>{  gokuBackdrop.start(detail)         }},
      banner:          { start: (detail)=>{  gokuBanner.start(detail)           }},
      confirmation:    { start: (detail)=>{  gokuConfirmation.start(detail)     }},
      dialog:          { start: (detail)=>{  gokuDialog.start(detail)           }},
      dt:              { start: (detail)=>{  gokuDt. start(detail)              }},
      fullcont:        { start: (detail)=>{  gokuFullcont. start(detail)        }},
      fullcontStepper: { start: (detail)=>{  gokuFullcontStepper. start(detail) }},
      multitable:      { start: (detail)=>{  gokuMT.start(detail)               }},
      menu:            { start: (detail)=>{  gokuMenu.start(detail)             }},
      page:            { start: (detail)=>{  gokuPage.start(detail)             }},
      snack:           { start: (detail)=>{  gokuSnack.start(detail)            }},

}








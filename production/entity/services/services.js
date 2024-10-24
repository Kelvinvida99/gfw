
const servicesBackdrop        = require('./services-backdrop')
const servicesBanner          = require('./services-banner')
const servicesConfirmation    = require('./services-confirmation')
const servicesDialog          = require('./services-dialog')
const servicesDt              = require('./services-dt')
const servicesFullcont        = require('./services-fullcont')
const servicesFullcontStepper = require('./services-fullcont-stepper')
const servicesMenu            = require('./services-menu')
const servicesMT              = require('./services-fullcont-multitable')
const servicesPage            = require('./services-page')
const servicesSnack           = require('./services-snack')



export function start(detail){  //console.log('services-dt 5>', detail)
         
      obj[detail.elem].start(detail)

}/**/




const obj = {
   
      backdrop:        { start: (detail)=>{  servicesBackdrop.start(detail)         }},
      banner:          { start: (detail)=>{  servicesBanner.start(detail)           }},
      confirmation:    { start: (detail)=>{  servicesConfirmation.start(detail)     }},
      dialog:          { start: (detail)=>{  servicesDialog.start(detail)           }},
      dt:              { start: (detail)=>{  servicesDt. start(detail)              }},
      fullcont:        { start: (detail)=>{  servicesFullcont. start(detail)        }},
      fullcontStepper: { start: (detail)=>{  servicesFullcontStepper. start(detail) }},
      multitable:      { start: (detail)=>{  servicesMT.start(detail)               }},
      menu:            { start: (detail)=>{  servicesMenu.start(detail)             }},
      page:            { start: (detail)=>{  servicesPage.start(detail)             }},
      snack:           { start: (detail)=>{  servicesSnack.start(detail)            }},

}








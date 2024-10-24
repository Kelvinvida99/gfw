const areasBackdrop     = require('./areas-backdrop')
const areasConfirmation = require('./areas-confirmation')
const areasDialog       = require('./areas-dialog')
const areasDt           = require('./areas-dt')
const areasFullcont     = require('./areas-fullcont')
const areasMenu         = require('./areas-menu')
const areasPage         = require('./areas-page')
const areasSnack        = require('./areas-snack')



export function start(detail){  //console.log('goku-dt 5>', detail)
         
      obj[detail.elem].start(detail)

}/**/




const obj = {
   
      backdrop:        { start: (detail) =>{  areasBackdrop.start(detail)         }},
      confirmation:    { start: (detail) =>{  areasConfirmation.start(detail)     }},
      dialog:          { start: (detail) =>{  areasDialog.start(detail)           }},
      dt:              { start: (detail) =>{  areasDt. start(detail)              }},
      fullcont:        { start: (detail) =>{  areasFullcont. start(detail)        }},
      menu:            { start: (detail) =>{  areasMenu.start(detail)             }},
      page:            { start: (detail) =>{  areasPage.start(detail)             }},
      snack:           { start: (detail) =>{  areasSnack.start(detail)            }},

}
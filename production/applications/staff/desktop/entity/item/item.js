const itemBackdrop     = require('./item-backdrop')
const itemConfirmation = require('./item-confirmation')
const itemDialog       = require('./item-dialog')
const itemDt           = require('./item-dt')
const itemFullcont     = require('./item-fullcont')
const itemMenu         = require('./item-menu')
const itemPage         = require('./item-page')
const itemSnack        = require('./item-snack')



export function start(detail){  //console.log('goku-dt 5>', detail)
         
      obj[detail.elem].start(detail)

}/**/




const obj = {
   
      backdrop:        { start: (detail) =>{  itemBackdrop.start(detail)         }},
      confirmation:    { start: (detail) =>{  itemConfirmation.start(detail)     }},
      dialog:          { start: (detail) =>{  itemDialog.start(detail)           }},
      dt:              { start: (detail) =>{  itemDt. start(detail)              }},
      fullcont:        { start: (detail) =>{  itemFullcont. start(detail)        }},
      menu:            { start: (detail) =>{  itemMenu.start(detail)             }},
      page:            { start: (detail) =>{  itemPage.start(detail)             }},
      snack:           { start: (detail) =>{  itemSnack.start(detail)            }},

}
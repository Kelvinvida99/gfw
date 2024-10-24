const item_unitBackdrop     = require('./item_unit-backdrop')
const item_unitConfirmation = require('./item_unit-confirmation')
const item_unitDialog       = require('./item_unit-dialog')
const item_unitDt           = require('./item_unit-dt')
const item_unitFullcont     = require('./item_unit-fullcont')
const item_unitMenu         = require('./item_unit-menu')
const item_unitPage         = require('./item_unit-page')
const item_unitSnack        = require('./item_unit-snack')



export function start(detail){  //console.log('goku-dt 5>', detail)
         
      obj[detail.elem].start(detail)

}/**/




const obj = {
   
      backdrop:        { start: (detail) =>{  item_unitBackdrop.start(detail)         }},
      confirmation:    { start: (detail) =>{  item_unitConfirmation.start(detail)     }},
      dialog:          { start: (detail) =>{  item_unitDialog.start(detail)           }},
      dt:              { start: (detail) =>{  item_unitDt. start(detail)              }},
      fullcont:        { start: (detail) =>{  item_unitFullcont. start(detail)        }},
      menu:            { start: (detail) =>{  item_unitMenu.start(detail)             }},
      page:            { start: (detail) =>{  item_unitPage.start(detail)             }},
      snack:           { start: (detail) =>{  item_unitSnack.start(detail)            }},

}
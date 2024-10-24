
const inventoryBackdrop        = require('./inventory-backdrop')
const inventoryConfirmation    = require('./inventory-confirmation')
const inventoryDialog          = require('./inventory-dialog')
const inventoryDt              = require('./inventory-dt')
//const inventoryFullcont        = require('./inventory-fullcont')
const inventoryMenu            = require('./inventory-menu')
const inventoryPage            = require('./inventory-page')
const inventorySnack           = require('./inventory-snack')
const inventoryReport          = require('./inventory-report')



export function start(detail){  //console.log('goku-dt 5>', detail)
         
      obj[detail.elem].start(detail)

}/**/




const obj = {
   
      backdrop:        { start: (detail)=>{  inventoryBackdrop.start(detail)         }},
      confirmation:    { start: (detail)=>{  inventoryConfirmation.start(detail)     }},
      dialog:          { start: (detail)=>{  inventoryDialog.start(detail)           }},
      dt:              { start: (detail)=>{  inventoryDt. start(detail)              }},
     // fullcont:        { start: (detail)=>{  inventoryFullcont. start(detail)        }},
      menu:            { start: (detail)=>{  inventoryMenu.start(detail)             }},
      page:            { start: (detail)=>{  inventoryPage.start(detail)             }},
      snack:           { start: (detail)=>{  inventorySnack.start(detail)            }},
      report:          { start: (detail)=>{  inventoryReport.start(detail)            }},

}
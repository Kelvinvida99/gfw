const accountsBackdrop     = require('./accounts-backdrop')
const accountsConfirmation = require('./accounts-confirmation')
const accountsDialog       = require('./accounts-dialog')
const accountsDt           = require('./accounts-dt')
const accountsFullcont     = require('./accounts-fullcont')
const accountsMenu         = require('./accounts-menu')
const accountsPage         = require('./accounts-page')
const accountsSnack        = require('./accounts-snack')

export function start(detail){  //console.log('goku-dt 5>', detail)
         
      obj[detail.elem].start(detail)

}/**/

const obj = {
   
      backdrop:        { start: (detail) =>{  accountsBackdrop.start(detail)         }},
      confirmation:    { start: (detail) =>{  accountsConfirmation.start(detail)     }},
      dialog:          { start: (detail) =>{  accountsDialog.start(detail)           }},
      dt:              { start: (detail) =>{  accountsDt. start(detail)              }},
      fullcont:        { start: (detail) =>{  accountsFullcont. start(detail)        }},
      menu:            { start: (detail) =>{  accountsMenu.start(detail)             }},
      page:            { start: (detail) =>{  accountsPage.start(detail)             }},
      snack:           { start: (detail) =>{  accountsSnack.start(detail)            }},
}
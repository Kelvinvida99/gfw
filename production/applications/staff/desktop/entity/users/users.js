const usersDialog   = require('./users-dialog')
const usersMT       = require('./users-fullcont-multitable')
const chagePassword = require('./users-change-password')
const usersDt       = require('./users-dt')
const usersFullcont = require('./users-fullcont')
const usersPage     = require('./users-page')

export function start(detail){  //console.log('users-dt 5>', detail)
         
      obj[detail.elem].start(detail)

}/**/

const obj = {
   
      autoGenPassword: { start: (detail)=>{  chagePassword.autoGenPassword(detail)    }},
      chagePassword:   { start: (detail)=>{  chagePassword.start(detail)              }},
      dialog:          { start: (detail)=>{  usersDialog.start(detail)                }},
      dt:              { start: (detail)=>{  usersDt. start(detail)                   }},
      fullcont:        { start: (detail)=>{  usersFullcont. start(detail)             }}, 
      menu:            { start: (detail)=>{  usersMenu.start(detail)                  }},
      multitable:      { start: (detail)=>{  usersMT.start(detail)                    }},
      page:            { start: (detail)=>{  usersPage.start(detail)                  }},
      select:          { start: (detail)=>{ usersFullcont.start(detail)               }},
}
const equitydepositDt              = require('./equitydeposit-dt')
const equitydepositFullcont        = require('./equitydeposit-fullcont')
const equitydepositPage            = require('./equitydeposit-page')
const equitydepositMenu            = require('./equitydeposit-menu')

export function start(detail){  //console.log('equitydeposit-dt 5>', detail)
         
      obj[detail.elem].start(detail)
}/**/

const obj = {
   
      dt:              { start: (detail)=>{  equitydepositDt. start(detail)              }},
      fullcont:        { start: (detail)=>{  equitydepositFullcont. start(detail)        }},   
      page:            { start: (detail)=>{  equitydepositPage.start(detail)             }},
      select:   { start: (detail)=>{ equitydepositFullcont.start(detail)  }},
      menu:            { start: (detail)=>{  equitydepositMenu.start(detail)             }},
}
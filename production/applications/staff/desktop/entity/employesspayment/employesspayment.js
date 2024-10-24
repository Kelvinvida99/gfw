const employesspaymentDt              = require('./employesspayment-dt')
const employesspaymentFullcont        = require('./employesspayment-fullcont')
const employesspaymentPage            = require('./employesspayment-page')
const employesspaymentMenu            = require('./employesspayment-menu')

export function start(detail){  //console.log('employesspayment-dt 5>', detail)
         
      obj[detail.elem].start(detail)

}/**/




const obj = {
   
      dt:              { start: (detail)=>{  employesspaymentDt. start(detail)              }},
      fullcont:        { start: (detail)=>{  employesspaymentFullcont. start(detail)        }},   
      page:            { start: (detail)=>{  employesspaymentPage.start(detail)             }},
      menu:            { start: (detail)=>{  employesspaymentMenu.start(detail)             }},
      select:   { start: (detail)=>{ employesspaymentFullcont.start(detail)  }},
}
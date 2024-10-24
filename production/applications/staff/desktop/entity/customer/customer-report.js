

const accountReceivable        = require ('./customer-report-account-receivable')
const accountReceivableAll     = require ('./customer-report-account-receivable-all')

export function start(detail){  //console.log('goku-dt 5>', detail)
         
      obj[detail.reportType].start(detail)

}/**/




const obj = {
   
      accountReceivable:     { start: (detail)=>{  accountReceivable.start(detail)  }},
      accountReceivableAll:  { start: (detail)=>{  accountReceivableAll.start(detail)  }},




}


//Account Receivable 
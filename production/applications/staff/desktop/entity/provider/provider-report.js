

const accountPayable          = require ('./provider-report-account-payable')
const accountPayableAll       = require ('./provider-report-account-payable-all')

export function start(detail){  //console.log('goku-dt 5>', detail)
         
      obj[detail.reportType].start(detail)

}/**/




const obj = {
   
      accountPayable:     { start: (detail)=>{  accountPayable.start(detail)  }},
      accountPayableAll:  { start: (detail)=>{  accountPayableAll.start(detail)  }},


}



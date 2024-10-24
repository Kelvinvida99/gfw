

// const accountPayable          = require ('./inventory-report-account-payable')
// const accountPayableAll       = require ('./inventory-report-account-payable-all')
const reportOne       = require ('./inventory-report-one')


export function start(detail){  //console.log('goku-dt 5>', detail)
         
      obj[detail.reportType].start(detail)

}/**/




const obj = {
   
      // accountPayable:     { start: (detail)=>{  accountPayable.start(detail)  }},
      // accountPayableAll:  { start: (detail)=>{  accountPayableAll.start(detail)  }},
      reportOne:  { start: (detail)=>{  reportOne.start(detail)  }},



}



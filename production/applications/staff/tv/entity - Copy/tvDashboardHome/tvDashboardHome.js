
const dashboardTvPage        = require('./tvDashboardHome-page')
const dashboardTvChart       = require('./tvDashboardHome-page-chart')




export function start(detail){  console.log('tvDashboardHome>', detail)
         
      obj[detail.elem].start(detail)

}/**/




const obj = {
   
      page:            { start: (detail)=>{  dashboardTvPage.start(detail)             }},
      charts:          { start: (detail)=>{  dashboardTvChart.start(detail)            }},

}








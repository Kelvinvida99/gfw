
const dashboardTvPage        = require('./tvDashboardHome-page')
const dashboardTvChart       = require('./tvDashboardHome-page-chart')




export function start(detail){  //console.log('tvDashboardHome 88888888888888888>', detail)
         
      obj[detail.elem].start(detail)

}/**/


const obj = {
   
      page:            { start: (detail)=>{  dashboardTvPage.start(detail)             }},
      charts:          { start: (detail)=>{  dashboardTvChart.start(detail)            }},
}








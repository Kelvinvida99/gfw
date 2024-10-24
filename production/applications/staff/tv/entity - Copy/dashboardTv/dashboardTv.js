
const dashboardTvPage        = require('./dashboardTv-page')




export function start(detail){  console.log('dashboardTv>', detail)
         
      obj[detail.elem].start(detail)

}/**/




const obj = {
   
      page:            { start: (detail)=>{  dashboardTvPage.start(detail)             }},

}








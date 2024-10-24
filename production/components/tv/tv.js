






const tvcardList     = require('./tvcard-list')
const tvcardBarBig   = require('./tvcard-bar-big')
const tvcardBarSmall = require('./tvcard-bar-small')



export function start(detail){ // console.log('CHART JSSSSSSSS>', detail)
         
      obj[detail.elem].start(detail)

}/**/




const obj = {
   
      list:      { start: (detail)=>{  tvcardList.start(detail)        }},
      barBig:    { start: (detail)=>{  tvcardBarBig.start(detail)      }},
      barSmall:  { start: (detail)=>{  tvcardBarSmall.start(detail)    }},




}





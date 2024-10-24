

const chartjsLine    = require('./chartjs-line')
const chartjsPie     = require('./chartjs-pie')
const chartjsBar     = require('./chartjs-bar')
const chartjsBubble  = require('./chartjs-bubble')



export function start(detail){ // console.log('CHART JSSSSSSSS>', detail)
         
      obj[detail.elem].start(detail)

}/**/




const obj = {
   
      bar:      { start: (detail)=>{  chartjsBar.start(detail)    }},
      line:     { start: (detail)=>{  chartjsLine.start(detail)   }},
      pie:      { start: (detail)=>{  chartjsPie.start(detail)    }},
      bubble:   { start: (detail)=>{  chartjsBubble.start(detail) }},

}



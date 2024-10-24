

import Chart      from 'chart.js/auto';
import { Colors } from 'chart.js';


const chartColor = require('./chart-color')

//verify if the user send personalize options
export function optionsCheck_createOneValue(detail, setup){


      if(detail.data[0].borderRadius   != undefined){ setup.data.datasets[0].borderRadius    = detail.data[0].borderRadius   }
      if(detail.data[0].borderWidth    != undefined){ setup.data.datasets[0].borderWidth     = detail.data[0].borderWidth    }
      if(detail.options.aspectRatio    != undefined){ setup.options.aspectRatio     = detail.options.aspectRatio             }     
      if(detail.data[0].color          != undefined){ 
            let rightColor = chartColor.get(detail.data[0].color)
            setup.data.datasets[0].backgroundColor =   rightColor.backgroundColor
            setup.data.datasets[0].borderColor     =   rightColor.borderColor
      }

      if(detail.options.legend     != undefined){ setup.options.plugins.legend.display = detail.options.legend }       


}




//verify if the user send personalize options
export function optionsCheck(detail, setup){

     //don't print legend for one element
     if(detail.data.length === 1){ setup.options.plugins.legend.display = false}
     
     if(detail.options === undefined){return}      
     if(detail.options.aspectRatio != undefined){ setup.options.aspectRatio = detail.options.aspectRatio }      
     if(detail.options.legend != undefined)     { setup.options.plugins.legend.display = detail.options.legend }      


}




export function getDataSet(data){  // console.log(`data`, data); 

      const datasets = []

      data.forEach((unit)=>{  
            //server send data as string
            unit.value[0].y = parseInt(unit.value[0].y)

            let value =                {
                  label:unit.label,
                  data: unit.value.map(row => row.y), ////
                  backgroundColor: Chart.register(Colors),
                  borderWidth: 4,
                  borderRadius: 0,
                  maxBarThickness: 92,
                }
            
            if(unit.borderRadius    != undefined){ value.borderRadius = parseInt(unit.borderRadius)  }
            if(unit.borderWidth     != undefined){ value.borderWidth  = parseInt(unit.borderWidth)   }
            if(unit.color           != undefined){ chartColor.set(unit.color, value)                 }

            datasets.push(value)
      })  
      
      //console.log('xxxxxxxxxxx', datasets)

      return     datasets
}








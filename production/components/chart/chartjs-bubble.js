
import Chart      from 'chart.js/auto';
import { Colors } from 'chart.js';

const chartColor = require('./chart-color')

export function start(detail){ 
         
      obj[detail.act].start(detail)

}/**/


const obj = {
   
      createSimple:      { start: (detail)=>{  createSimple(detail)  }},
      updateSimple:      { start: (detail)=>{  updateSimple(detail)  }},

}


function createSimple(detail){ //console.log('BUBBLE CHART> createSimple', detail)


      const setup = {
            type: 'bubble',
            data: {
              labels: detail.data[0].value.map(row => row.x),////
              datasets: getDataSet(detail.data)
            },/*data*/
           
            options: {
                  responsive: false,
                  indexAxis: 'x', ///y for horizontal
                  title:{ display:false, },
                  aspectRatio: 16/6,  // 1square 
                  scales: {
                        y:{
                              beginAtZero: true
                        }
                  },
                  plugins: {
                        legend: {
                          display: true,
                          position: 'bottom',
                          fontSize: 54
                        }
                  },
            }
      }

     optionsCheck(detail, setup)

      detail.targetChart.chart = new Chart( detail.targetChart.html, setup )



}


function updateSimple(detail){ //console.log('updateSimple', detail)

      const long = detail.data.length


      for( let i=0; i<detail.data.length; i++ ){
           detail.targetChart.chart.data.datasets[i].data = detail.data[i].value
      }

      detail.targetChart.chart.update()
}



function getDataSet(data){

      const datasets = []

      data.forEach((unit)=>{ //console.log('unit', unit.color)
            let value =                {
                  label:unit.label,
                  data: unit.value, ////
                  backgroundColor: Chart.register(Colors),
                  borderWidth: 1,
                  borderRadius: 0,
                }
            if(unit.color != undefined){ chartColor.set(unit.color, value)      }
            datasets.push(value)
      })  
      //console.log('xxxxxxxxxxx', datasets)

      return     datasets
}





//verify if the user send personalize options
function optionsCheckOLD(detail, setup){

     //don't print legend for one element
     if(detail.data.length === 1){ setup.options.plugins.legend.display = false}
     
     if(detail.options === undefined){return}      
      detail.options.forEach((elem)=>{
            setup.options[elem.name] = elem.value
      })

}


//verify if the user send personalize options
function optionsCheck(detail, setup){

     //don't print legend for one element
     if(detail.data.length === 1){ setup.options.plugins.legend.display = false}
     
     if(detail.options === undefined){return}      
     if(detail.options.aspectRatio != undefined){ setup.options.aspectRatio = detail.options.aspectRatio }      
     if(detail.options.legend != undefined)     { setup.options.plugins.legend.display = detail.options.legend }      


}




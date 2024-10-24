
import Chart from 'chart.js/auto';
import { Colors } from 'chart.js';

const chartColor = require('./chart-color')

export function start(detail){  //console.log('PIE CHART>')
         
      obj[detail.act].start(detail)

}/**/


const obj = {
   
      createSimple:      { start: (detail)=>{  createSimple(detail)  }},
      updateSimple:      { start: (detail)=>{  updateSimple(detail)  }},
}


function createSimple(detail){ //console.log('PIE CHART> createSimple')

      const setup = {
            type: 'doughnut',
            data: {
              labels:detail.data.label,
              datasets: getDataSet(detail.data),
            },/*data*/
            options: {
                  responsive: false,
                  title:{ display:false, },
                  plugins: {
                        legend: {
                          display:true,
                          position: 'right',
                          fontSize:54
                        }
                  },
            }
      }

      optionsCheck(detail, setup)
     
      detail.targetChart.chart = new Chart( detail.targetChart.html, setup ) 
}



function updateSimple(detail){ //console.log('updateSimple PIE')


      detail.targetChart.chart.data.datasets[0].data = detail.data.value
  
      detail.targetChart.chart.update()
}





function getDataSet(data){ //console.log('data', data)

      
      const datasets = [ {

            label: '',
            data: data.value,
            backgroundColor: Chart.register(Colors),
            borderColor: Chart.register(Colors),
            borderWidth: 2, 

      }]

      if(data.color != undefined){  
            let newColor = chartColor.pieColor(data.color)


            datasets[0].backgroundColor = newColor.backgroundColor
            datasets[0].borderColor     = newColor.borderColor
      }

      return     datasets
}






//verify if the user send personalize options
function optionsCheck(detail, setup){

     //don't print legend for one element
     if(detail.data.length === 1){ setup.options.plugins.legend.display = false}
     
     if(detail.options === undefined){return}      
     if(detail.options.aspectRatio != undefined){ setup.options.aspectRatio = detail.options.aspectRatio }      
     if(detail.options.legend != undefined)     { setup.options.plugins.legend.display = detail.options.legend }      


}




import Chart      from 'chart.js/auto';
import { Colors } from 'chart.js';

const chartColor = require('./chart-color')
const handler    = require('./chartjs-bar-handler')


export function start(detail){  //console.log('BAR CHART>')
         
      obj[detail.act].start(detail)

}/**/


const obj = {
   
      createSimple:      { start: (detail)=>{  createSimple(detail)  }},
      updateSimple:      { start: (detail)=>{  updateSimple(detail)  }},

      createOneValue:    { start: (detail)=>{  createOneValue(detail)  }},

}




//create multiples values 
function createSimple(detail){ //console.log('BAR CHART> createSimplee', detail.data)

      const setup = {
            type: 'bar',
            data: {
              labels: [''],////
              datasets:  handler.getDataSet(detail.data)
            },/*data*/
           
            options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  indexAxis: 'x', ///y for horizontal
                  title:{ display:false, },
                  aspectRatio: 16/4,  // 1 > square 
                  plugins: {
                        legend: {
                          display: true,
                          position: 'bottom',
                          fontSize: 54
                        }
                  },
            }, 
      }

      handler.optionsCheck(detail, setup)

      //console.log('BAR CHART> createSimple', setup)

      detail.targetChart.chart = new Chart( detail.targetChart.html, setup )

}



function updateSimple(detail){ //console.log('updateSimple', detail)

      const long = detail.data.length


      for( let i=0; i<detail.data.length; i++ ){
           detail.targetChart.chart.data.datasets[i].data = detail.data[i].value.map(row => row.y)
      }

      detail.targetChart.chart.update()
}



//create multiples values 
function createOneValue(detail){  //console.log('createOneValue',detail)

      var setup = {
                type: 'bar',
                 data: {
                    labels: detail.data[0].value.map(row => row.x),
                    datasets: [{
                        label: '',
                        data: detail.data[0].value.map(row => row.y),
                        backgroundColor: Chart.register(Colors),
                        borderWidth: 4,
                        borderRadius: 0,
                        maxBarThickness: 92,   
                    }]
                 },
                  options: {
                        responsive: false,
                        indexAxis: 'x', ///y for horizontal
                        title:{ display:false, },
                        aspectRatio: 16/4,  // 1 > square 
                        
                        plugins: {
                              legend: {
                                      display: true,
                                      position: 'bottom',
                                      fontSize: 54
                              }
                        },
                  }, 
      }

      handler.optionsCheck_createOneValue(detail, setup)

      detail.targetChart.chart = new Chart( detail.targetChart.html, setup )
}









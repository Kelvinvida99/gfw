
import Chart from 'chart.js/auto';
import { Colors } from 'chart.js';
const chartColor = require('./chart-color')


export function start(detail){ // console.log('BAR CHART JSSSSSSSS>', detail)
         
      obj[detail.act].start(detail)

}/**/


const obj = {
   
      createSimple:      { start: (detail)=>{  createSimple(detail)    }},
      updateSimple:      { start: (detail)=>{  updateSimple(detail)    }},
      createMultiple:    { start: (detail)=>{  createMultiple(detail)  }},
      updateMultiple:    { start: (detail)=>{  updateMultiple(detail)  }},

}



function createSimple( detail){ //console.log('LINE CHART> createSimple', detail)

      const setup = {
            type: 'line',
            data: {
              labels: detail.data[0].value.map(row => row.x),////
              datasets: getDataSet(detail.data)
            },/*data*/

            options: {
                  responsive: false,
                  indexAxis: 'x', ///y for horizontal
                  aspectRatio: 16/8,  // 1square 
                  title:{ display:false, },
                  plugins: {
                        legend: {
                          display:false,
                          position: 'bottom',
                          fontSize:54
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
           detail.targetChart.chart.data.datasets[i].data = detail.data[i].value.map(row => row.y)
      }

      detail.targetChart.chart.update()
}




function createMultiple( detail){  //console.log('LINE Multiple CHART>', detail)

      cleanLineData(detail.data)

      const setup = {
            type: 'line',
            data: {
              labels: detail.data[0].value.map(row => row.x),////
              datasets: getDataSetMultiple(detail.data)
            },/*data*/

            options: {
                  responsive: false,
                  indexAxis: 'x', ///y for horizontal
                  aspectRatio: 16/8,  // 1square 
                  title:{ display:false, },
                  plugins: {
                        legend: {
                          display:false,
                          position: 'bottom',
                          fontSize:54
                        }
                  },
            }
      }

      optionsCheck(detail, setup)

     // console.log('LINE Multiple>', setup)


      detail.targetChart.chart = new Chart( detail.targetChart.html, setup )

}

function updateMultiple(detail){ //console.log('updateMultiple', detail)

      const long = detail.data.length


      for( let i=0; i<detail.data.length; i++ ){
           detail.targetChart.chart.data.datasets[i].data = detail.data[i].value.map(row => row.y)
      }

      detail.targetChart.chart.update()
}







export function getDataSetMultiple(data){ //console.log(data[0].value.map(row => row.y))

      const datasets = []

      data.forEach((unit)=>{

            let value =  {
                        type: 'line',
                        label: unit.label,
                        data: unit.value.map(row => row.y), ////
                        backgroundColor: Chart.register(Colors),
                        borderWidth: 4,
                        borderRadius: 20,
                        fill: false,
                        tension: 0    //curva de la grafica    
            }

            if(unit.color    != undefined)    { chartColor.set(unit.color, value)      }                  
            if(unit.tension  != undefined)    { value.tension = unit.tension           }
            if(unit.borderWidth  != undefined){ value.borderWidth = unit.borderWidth   }


            datasets.push(value )
      })  

      return     datasets
}




function getDataSet(data){

      const datasets = []

      data.forEach((unit)=>{
            let value = {
                        type: 'line',
                        label:'',
                        data: data[0].value.map(row => row.y), ////
                        backgroundColor: Chart.register(Colors),
                        borderWidth: 4,
                        fill: true,
                        tension: 0.3    //curva de la grafica
            }
             
            if(unit.color        != undefined){ chartColor.set(unit.color, value)      }                  
            if(unit.tension      != undefined){ value.tension = unit.tension           }
            if(unit.borderWidth  != undefined){ value.borderWidth = unit.borderWidth   }     
            if(unit.fill         != undefined){ value.fill = unit.fill                 }     
                  
            datasets.push( value )  

      })  

      return     datasets
}



//verify if the user send personalize options
function optionsCheck(detail, setup){

     //don't print legend for one element
     if(detail.data.length === 1){ setup.options.plugins.legend.display = false}
     
     if(detail.options === undefined)           {return}      
     if(detail.options.aspectRatio != undefined){ setup.options.aspectRatio = detail.options.aspectRatio }      
     if(detail.options.legend != undefined)     { setup.options.plugins.legend.display = detail.options.legend }    

}



//this value need to be an intenger to avodi the graph large padding
//borderWidth and tension
function cleanLineData(targetData){

            targetData.forEach((elem)=>{
                  elem.borderWidth = parseInt(elem.borderWidth)
                  elem.tension     = parseInt(elem.tension) 
            })

}



const chartjs    = require('../../../../../components/chart/chartjs')
const tv         = require('../../../../../components/tv/tv')
const pageDB     = require('./tvDashboardHome-db')

/****************ELEMENTS*****************/
var HTMLwasSelected  = false
const allCharts   = {
         barTest:   		{ html:'', chart: '',  },
         barSimple: 		{ html:'', chart: '',  },
         multipleLines: { html:'', chart: '',  },
         bubleTest:     { html:'', chart: '',  },
         pieTest:       { html:'', chart: '',  },
         listTest:      { html:'', chart: '',  },



}

const allCard = {
		listTest: '',
		horizontalBars:'',
		horizontalSmall:'',
}


function HTMLselect(detail){ //console.log('goku init>')
	
	HTMLwasSelected = true
	allCharts.barTest.html        = document.getElementById('barTest')
	allCharts.barSimple.html 	   = document.getElementById('barSimple')
	allCharts.multipleLines.html  = document.getElementById('multipleLines')
	allCharts.bubleTest.html      = document.getElementById('bubleTest')
	allCharts.pieTest.html        = document.getElementById('pieTest')

	allCard.listTest              = document.getElementById('listTest')
	allCard.horizontalBars        = document.getElementById('horizontalBars')
	allCard.horizontalSmall       = document.getElementById('horizontalSmall')



}/*init*/
/****************ELEMENTS*****************/



export function start(detail){  //console.log('TV page Chart >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	 obj[detail.act].start(detail)
}


const obj = {
   
      createAllChart:  { start: (detail)=>{  createAllChart(detail)	}},
      updateAll:       { start: (detail)=>{  updateAllChart(detail)	}},


}/**/


function createAllChart(detail){// console.log('########## GO TO CREATE ALL CHARTS')
		
	pageDB.load((result)=>{ //console.log('########## GO TO CREATE ALL CHARTS', result)  

		console.log('########## create simple', result[1].totalRevenue )  


		chartjs.start({elem:'bar', act:'createOneValue', targetChart: allCharts.barTest, 
			            data:result[0].barTest, options:{ aspectRatio: 10/4, legend: false }   })			


		chartjs.start({elem:'bar', act:'createSimple', targetChart: allCharts.barSimple, 
			            data:result[1].totalRevenue, options:{ aspectRatio: 10/4, legend: false }   })		


		chartjs.start({elem:'line', act:'createMultiple', targetChart: allCharts.multipleLines, 
			            data:result[2].multipleLines, options:{ aspectRatio: 10/4, legend: false }   })


		chartjs.start({elem:'bubble', act:'createSimple', targetChart: allCharts.bubleTest, 
			            data:result[3].bubleTest, options:{ aspectRatio: 10/4, legend: false }       })

		chartjs.start({elem:'pie', act:'createSimple', targetChart: allCharts.pieTest, 
			            data:result[4].pieTest, options:{ aspectRatio: 10/4, legend: false } })


		tv.start({elem:'list', act:'createSimple', html:allCard.listTest , data: result[5].listTest })



		tv.start({elem:'barBig', act:'createSimple', html:allCard.horizontalBars,
		          data: result[6].horizontalBars 
		})

		tv.start({elem:'barSmall', act:'createSimple', html:allCard.horizontalSmall,
		           data: result[7].horizontalSmall 
		})
	})

setInterval(()=>{ 


	updateAllChart()


},5000)


}/*createAllChart*/

function updateAllChart(detail){console.log('########## updateAllChart')
		
	pageDB.load((result)=>{  console.log('########## updateSimple', result[1].totalRevenue  )  

		chartjs.start({ elem:'bar',    act:'updateSimple',    targetChart: allCharts.barTest,       data:result[0].barTest             })
		chartjs.start({ elem:'bar',    act:'updateSimple',    targetChart: allCharts.barSimple,     data:result[1].totalRevenue        })
		chartjs.start({ elem:'line',   act:'updateMultiple',  targetChart: allCharts.multipleLines, data:result[2].multipleLines       })
		chartjs.start({ elem:'bubble', act:'updateSimple',    targetChart: allCharts.bubleTest,     data:result[3].bubleTest           })
		chartjs.start({ elem:'pie',    act:'updateSimple',    targetChart: allCharts.pieTest,       data:result[4].pieTest             })

		tv.start({elem:'list',     act:'createSimple', html:allCard.listTest ,       data: result[5].listTest                    })
		tv.start({elem:'barBig',   act:'createSimple', html:allCard.horizontalBars,  data: result[6].horizontalBars              })
		tv.start({elem:'barSmall', act:'createSimple', html:allCard.horizontalSmall, data: result[7].horizontalSmall             })
	})



}






const data = {


		servicesStatus: {
		            
		            label: ['Attentionx', 'Schedule', 'Completed'],
		            color: ['red', 'gray', 'green'],
		            value: [10, 80, 10 ]

		},

}
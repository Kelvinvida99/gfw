const handler     = require('./tvDashboardHome-page-chart-handler')

const chartjs    = require('../../../../../components/chart/chartjs')
const tv         = require('../../../../../components/tv/tv')
const pageDB     = require('./tvDashboardHome-db')

/****************ELEMENTS*****************/
var HTMLwasSelected  = false
const allCharts   = {
         barTest:   		{ html:'', chart: '',  },
         barTest2:   		{ html:'', chart: '',  },

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
	allCharts.barTest2.html        = document.getElementById('barTest2')

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
		
	pageDB.load((result)=>{   console.log('########## GO TO CREATE ALL CHARTS pieTestX', result.pieTest )  

	//	console.log('########## create simple', result.barTest)  

		/////////////////////////////////////FIRST LINE

		chartjs.start({elem:'bar', act:'createOneValue', targetChart: allCharts.barTest, 
			            data:result.barTest, options:{ aspectRatio: 10/4, legend: false }   })			

		handler.bubbleTest(result.bubbleTest)
		chartjs.start({elem:'bubble', act:'createSimple', targetChart: allCharts.bubleTest, 
			            data:result.bubbleTest, options:{ aspectRatio: 10/4, legend: false }       })	

	   tv.start({elem:'list', act:'createSimple', html:allCard.listTest , data: result.listTest  })


		/////////////////////////////////////SECOND LINE
		//js error on this plart
		handler.totalRevenue(result.totalRevenue)
		chartjs.start({elem:'bar', act:'createSimple', targetChart: allCharts.barSimple, 
			            data:result.totalRevenue, options:{ aspectRatio: 10/4, legend: false }   })	

		chartjs.start({elem:'pie', act:'createSimple', targetChart: allCharts.pieTest, 
			            data:result.pieTest, options:{ aspectRatio: 10/4, legend: false } })		


		tv.start({elem:'barBig', act:'createSimple', html:allCard.horizontalBars,
		          data: result.horizontalBars  })



		/////////////////////////////////////THIRD LINE

		chartjs.start({elem:'line', act:'createMultiple', targetChart: allCharts.multipleLines, 
			            data:result.multipleLines, options:{ aspectRatio: 10/4, legend: false }   })

		handler.barTest2(result.barTest2)
		chartjs.start({elem:'bar', act:'createOneValue', targetChart: allCharts.barTest2, 
			            data:result.barTest2, options:{ aspectRatio: 10/4, legend: false }   })	


		tv.start({elem:'barBig', act:'createSimple', html:allCard.horizontalSmall,
		          data: result.horizontalSmall  })		


	})



}/*createAllChart*/

export function updateAllChart(detail){console.log('########## updateAllChart')
		
	pageDB.load((result)=>{ //console.log('########## updateAllChart', result)  

		chartjs.start({ elem:'bar',    act:'updateSimple',    targetChart: allCharts.barTest,       data:result.barTest             })
		
		handler.bubbleTest(result.bubbleTest)
		chartjs.start({ elem:'bubble', act:'updateSimple',    targetChart: allCharts.bubbleTest,     data:result.bubbleTest           })
		
		tv.start({elem:'list',     act:'createSimple', html:allCard.listTest ,       data: result.listTest                    })

		/////////////////////////////////////SECOND LINE

		chartjs.start({ elem:'bar',    act:'updateSimple',    targetChart: allCharts.barSimple,     data:result.totalRevenue        })
		chartjs.start({ elem:'pie',    act:'updateSimple',    targetChart: allCharts.pieTest,       data:result.pieTest             })
		tv.start     ({elem:'barBig',  act:'createSimple',    html:allCard.horizontalBars,          data: result.horizontalBars     })
	
		/////////////////////////////////////THIRD LINE

		chartjs.start({ elem:'line',   act:'updateMultiple',  targetChart: allCharts.multipleLines, data:result.multipleLines       })

		// tv.start({elem:'barSmall', act:'createSimple', html:allCard.horizontalSmall, data: result[7].horizontalSmall             })
	})



}






const data = {


		servicesStatus: {
		            
		            label: ['Attentionx', 'Schedule', 'Completed'],
		            color: ['red', 'gray', 'green'],
		            value: [10, 80, 10 ]

		},

}
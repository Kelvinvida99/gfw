
const chartjs    = require('../../../../../components/chart/chartjs')
const tv         = require('../../../../../components/tv/tv')


/****************ELEMENTS*****************/
var HTMLwasSelected  = false
const allCharts   = {
         totalRevenue:   { html:'', chart: '',  },
         deptRevenue:    { html:'', chart: '',  },
         splitRevenue:   { html:'', chart: '',  },
         servicesStatus: { html:'', chart: '',  },
         workLoad:       { html:'', chart: '',  },
}

const allCard = {
		tvcard_list_test: '',
		tvcard_bar_big:'',
		tvcard_bar_small:'',


}


function HTMLselect(detail){ //console.log('goku init>')
	
	HTMLwasSelected = true
	allCharts.totalRevenue.html    = document.getElementById('totalRevenue')
	allCharts.deptRevenue.html     = document.getElementById('deptRevenue')
	allCharts.splitRevenue.html    = document.getElementById('splitRevenue')
	allCharts.servicesStatus.html  = document.getElementById('servicesStatus')
	allCharts.workLoad.html        = document.getElementById('workLoad')

	allCard.tvcard_list_test       = document.getElementById('tvcard_list_test')
	allCard.tvcard_bar_big         = document.getElementById('tvcard_bar_big')
	allCard.tvcard_bar_small       = document.getElementById('tvcard_bar_small')



}/*init*/
/****************ELEMENTS*****************/



export function start(detail){  //console.log('TV page Chart >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	 obj[detail.act].start(detail)
}


const obj = {
   
      createAllChart:  { start: (detail)=>{  createAllChart(detail)	}},
      updateAllChart:  { start: (detail)=>{  updateAllChart(detail)	}},
}/**/


function createAllChart(detail){ //console.log('########## createAllChart')
		
		//Company revenue
		chartjs.start({elem:'bar', act:'createOneValue', targetChart: allCharts.totalRevenue, 
			            data:detail.data.createOneValue, options:{ aspectRatio: 10/4, legend: false }   })


		// //Dept revenue
		// chartjs.start({elem:'line', act:'createSimple', targetChart: allCharts.deptRevenue, 
		// 	            data:detail.data.deptRevenue, options:{ aspectRatio: 10/4, legend: false }    })


		//split revenue
		chartjs.start({elem:'line', act:'createMultiple', targetChart: allCharts.splitRevenue, 
			            data:detail.data.splitRevenue, options:{ aspectRatio: 10/4, legend: false }   })


		//split revenue
		chartjs.start({elem:'pie', act:'createSimple', targetChart: allCharts.servicesStatus, 
			            data:detail.data.servicesStatus, options:{ aspectRatio: 10/4, legend: false } })

		//split revenue
		chartjs.start({elem:'bubble', act:'createSimple', targetChart: allCharts.workLoad, 
			            data:detail.data.workLoad, options:{ aspectRatio: 10/4, legend: false }       })

		//////////
		/////////Others elements
		tv.start({elem:'list', act:'createSimple', html:allCard.tvcard_list_test,
		          data: [{ icon: 'person', title: 'Titleee', des: 'Dessss', num: '55', color: 'blue' },
		          		  { icon: 'person', title: 'Titleee', des: 'Dessss', num: '55', color: 'red' }, ]   
		})


		tv.start({elem:'barBig', act:'createSimple', html:allCard.tvcard_bar_big,
		          data: [{ title: 'Titleee1', num: '100%', per: '100', color: 'blue' },
		          		  { title: 'Titleee2', num: '80', per: '50', color: 'red'  }, ]   
		})

		tv.start({elem:'barSmall', act:'createSimple', html:allCard.tvcard_bar_small,
		          data: [{ title: 'Titleee1', num: '100%', per: '100', color: 'green', type: 'tvcard-bar-tiny' },
		          		  { title: 'Titleee2', num: '80', per: '50', color: 'purple'  }, ]   
		})


}/*createAllChart*/


function updateAllChart(detail){ //console.log('########## updateAllChart')
		
		chartjs.start({elem:'bar',    act:'updateSimple',   targetChart: allCharts.totalRevenue,    data:detail.data.totalRevenue    })
		chartjs.start({elem:'line',   act:'updateSimple',   targetChart: allCharts.deptRevenue,     data:detail.data.deptRevenue     })
		chartjs.start({elem:'line',   act:'updateMultiple', targetChart: allCharts.splitRevenue,    data:detail.data.splitRevenue    })
		chartjs.start({elem:'pie',    act:'updateSimple',   targetChart: allCharts.servicesStatus,  data:detail.data.servicesStatus  })
		chartjs.start({elem:'bubble', act:'updateSimple',   targetChart: allCharts.workLoad,        data:detail.data.workLoad        })
	

		tv.start({elem:'list', act:'createSimple', html:allCard.tvcard_list_test,
		          data: [{ icon: 'person', title: 'Titleee', des: 'Dessss', num: '100', color: 'green' },
		          		  { icon: 'person', title: 'Titleee', des: 'Dessss', num: '50', color: 'purple' }, ]   
		})

		tv.start({elem:'barBig', act:'upadteSimple', html:allCard.tvcard_bar_big,
		          data: [{ title: 'Titleee 2', num: '10%', per: '10', color: 'blue' },
		          		  { title: 'Titleee 2', num: '80%',   per: '80', color: 'red'  }, ]   
		})


		tv.start({elem:'barSmall', act:'upadteSimple', html:allCard.tvcard_bar_small,
		          data: [{ title: 'Titleee1', num: '50%', per: '50', color: 'green', type: 'tvcard-bar-tiny' },
		          		  { title: 'Titleee2', num: '10%', per: '10', color: 'purple'  }, ]   
		})


}


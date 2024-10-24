

import dashboardTvPage  from "./dashboardTv-page.html";

const page            = require('../../../../../components/page/page')
const chartjs         = require('../../../../../components/chart/chartjs')
const tvMonitor       = require('./dashboardTv-monitor')
const tvMonitorDB     = require('./dashboardTv-db')
const handler         = require('./dashboardTv-page-handler')
const pageChart       = require('./dashboardTv-page-chart')


//const dashboardTvStart   = require('./dashboardTv-start')

/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('goku init>')
	
	HTMLwasSelected = true

	//load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", dashboardTvPage)

   pageChart.start({act:'createAllChart', data: data})

   setTimeout(()=>{
   		 //pageChart.start({act:'updateAllChart', data: dataUpdate})
   },2000)   


}/*init*/

/****************ELEMENTS*****************/



export function start(detail){ //console.log('goku page >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	 obj[detail.act].start(detail)
}




const obj = {
   
      show:  { start: (detail)=>{   page.start(detail) }},
}/**/






const data = {

		createOneValue : [
		      {
		            label:'Dept a',
		            borderRadius: 0,
		            borderWidth:4,
		            color:'green',
		            value: [ 
			            	{ x: 'Nov',  y: 18 }, 
			               { x: 'Novx', y: 10 }, 
			               { x: 'Novx', y: 10 }, 
			               { x: 'Novx', y: 10 }, 
			               { x: 'Novx', y: 10 }, 
		            ]
		      },
		],



		

		totalRevenue : [
		      {
		            label:'Dept a',
		            borderRadius: 0,
		            borderWidth:2,
		            color:'blue',
		            value: [ { x: 'Nov', y: 5}, ]
		      },

		      {
		            label:'Dept b',
		            borderRadius: 0,
		            borderWidth:2,
		            color:'green',
		            value: [ { x: 'Aug', y: 50}, ]
		      },
		      {
		            label:'Dept c',
		            borderRadius: 0,
		            borderWidth:2,
		            color:'purple',
		            value: [ { x: 'Jul', y: 10},  ]
		      },
		],

		deptRevenue: [
			{
		            label:'Dept c',
		            color:'blue',
		            tension: 0,
		            borderWidth: 2,
		            value: [
		                      { x: 'Jul', y: 10},
		                      { x: 'Aug', y: 20},
		                      { x: 'Oct', y: 15},
		                      { x: 'Nov', y: 18},
		                  ]				
			}
		],

		splitRevenue: [
		      {
		            label:'Dept a',
		            color:'blue',
		            tension: 0,
		            borderWidth: 2,

		            value: [
		                      { x: 'Julxx', y: '10'},
		                      { x: 'Aug', y: '20'},
		                      { x: 'Oct', y: '15'},
		                      { x: 'Nov', y: '8'},
		                  ]
		      },
		      {
		            label:'Dept b',
		            color:'green',
		            tension:0 ,
		            borderWidth: 2,
		            value: [
		                      { x: 'Jul', y: '8'},
		                      { x: 'Aug', y: '7'},
		                      { x: 'Oct', y: '5'},
		                      { x: 'Nov', y: '5'},
		                  ]
		      },

		      {
		            label:'Dept c',
		            color:'purple',
		            tension: 0,
		            borderWidth: 2,
		            value: [
		                      { x: 'Jul', y: '20'},
		                      { x: 'Aug', y: '17'},
		                      { x: 'Oct', y: '25'},
		                      { x: 'Nov', y: '0'},
		                  ]
		      },

		],


		servicesStatus: {
		            
		            label: ['Attentionx', 'Schedule', 'Completed'],
		            color: ['red', 'gray', 'green'],
		            value: [10, 80, 10 ]

		},
		workLoad:[
				{
					label:'Dept a',
		         color:'purple',
		         value: [

						{ x:	1.55	, y:	9.32	, r:	6.38	},
						{ x:	21.33	, y:	11.67	, r:	1.23	},
						{ x:	26.63	, y:	7.42	, r:	9.26	},
						{ x:	7.16	, y:	11.81	, r:	10.25	},
						{ x:	10.18	, y:	6.24	, r:	10.11	},
						{ x:	6.55	, y:	23.91	, r:	11.81	},
						{ x:	27.18	, y:	21.22	, r:	7.07	},
						{ x:	20.75	, y:	5.26	, r:	4.77	},
						{ x:	28.04	, y:	5.10	, r:	4.35	},
						{ x:	11.47	, y:	3.43	, r:	9.05	},
						{ x:	5.30	, y:	22.41	, r:	8.91	},
						{ x:	2.26	, y:	18.82	, r:	5.82	},
						{ x:	23.45	, y:	14.55	, r:	3.44	},
						{ x:	21.25	, y:	19.31	, r:	1.42	},
						{ x:	20.33	, y:	17.80	, r:	7.60	},

		         ]

				}, 

				{
					label:'Dept a',
		         color:'blue',
		         value: [
						{ x:	14.10	, y:	1.17	, r:	2.36	},
						{ x:	1.39	, y:	21.45	, r:	9.92	},
						{ x:	1.35	, y:	10.73	, r:	8.24	},
						{ x:	20.33	, y:	6.89	, r:	11.64	},
						{ x:	29.10	, y:	1.63	, r:	4.15	},
						{ x:	29.84	, y:	18.41	, r:	6.28	},
						{ x:	12.85	, y:	15.18	, r:	9.29	},
						{ x:	1.89	, y:	23.96	, r:	8.00	},
						{ x:	23.40	, y:	23.48	, r:	9.53	},
						{ x:	23.88	, y:	21.38	, r:	5.52	},
						{ x:	11.23	, y:	5.48	, r:	6.19	},
						{ x:	19.39	, y:	11.50	, r:	6.66	},
						{ x:	13.49	, y:	21.73	, r:	8.54	},
						{ x:	10.84	, y:	8.37	, r:	1.41	},
						{ x:	8.46	, y:	15.16	, r:	10.89	},
		         ]

				},				


				{
					label:'Dept C',
		         color:'green',
		         value: [
						{ x:	2.81	, y:	1.50	, r:	2.80	},
						{ x:	14.85	, y:	15.24	, r:	5.37	},
						{ x:	22.89	, y:	1.36	, r:	11.42	},
						{ x:	2.39	, y:	18.32	, r:	5.21	},
						{ x:	17.40	, y:	18.93	, r:	8.99	},
						{ x:	29.47	, y:	14.47	, r:	11.25	},
						{ x:	18.62	, y:	10.20	, r:	1.86	},
						{ x:	15.37	, y:	11.94	, r:	4.38	},
						{ x:	17.72	, y:	19.98	, r:	5.64	},
						{ x:	5.71	, y:	21.26	, r:	5.85	},
						{ x:	26.18	, y:	11.91	, r:	9.19	},
						{ x:	7.54	, y:	23.99	, r:	8.42	},
						{ x:	10.17	, y:	15.15	, r:	9.36	},
						{ x:	29.81	, y:	7.79	, r:	6.77	},
						{ x:	12.72	, y:	10.32	, r:	9.90	},
		         ]

				}	

			
		]

		




}


const dataUpdate = {
		totalRevenue : [
		      {
		            label:'legend a',
		            borderRadius: 40,
		            color:'blue',

		            value: [
		                      { x: 'Jul', y: 1},
		                      { x: 'Aug', y: 5},
		                      { x: 'Oct', y: 8},
		                      { x: 'Nov', y: 3},
		                  ]
		      },


		],
		deptRevenue: [
			{
		            label:'legend a',
		            value: [
		                      { x: 'Jul', y: 8},
		                      { x: 'Aug', y: 15},
		                      { x: 'Oct', y: 20},
		                      { x: 'Nov', y: 10},
		                  ]				
			}
		],

		splitRevenue: [
		      {
		            label:'Dept a',
		            value: [
		                      { x: 'Jul', y: 10},
		                      { x: 'Aug', y: 20},
		                      { x: 'Oct', y: 15},
		                      { x: 'Nov', y: 18},
		                  ]
		      },
		      {
		            label:'Dept b',
		            value: [
		                      { x: 'Jul', y: 5},
		                      { x: 'Aug', y: 4},
		                      { x: 'Oct', y: 10},
		                      { x: 'Nov', y: 8},
		                  ]
		      },
		      {
		            label:'Dept c',
		            value: [
		                      { x: 'Jul', y: 20},
		                      { x: 'Aug', y: 0},
		                      { x: 'Oct', y: 1},
		                      { x: 'Nov', y: 8},
		                  ]
		      },


		],
		servicesStatus: {
            
            label: ['Attention', 'Schedule', 'Completed'],
            color: ['red', 'blue', 'green'],
            value: [30, 60, 10 ]

      },

		workLoad:[
				{
					label:'Dept a',
		         color:'purple',
		         value: [

						{ x:	17.88	, y:	14.22	, r:	4.79	},
						{ x:	21.15	, y:	13.17	, r:	5.27	},
						{ x:	9.41	, y:	7.33	, r:	10.64	},
						{ x:	28.41	, y:	5.03	, r:	4.50	},
						{ x:	27.48	, y:	12.69	, r:	4.59	},
						{ x:	16.00	, y:	23.92	, r:	7.06	},
						{ x:	21.59	, y:	10.38	, r:	5.73	},
						{ x:	2.30	, y:	10.68	, r:	10.31	},
						{ x:	2.44	, y:	14.95	, r:	8.10	},
						{ x:	11.81	, y:	7.45	, r:	8.81	},
						{ x:	27.11	, y:	8.89	, r:	8.59	},
						{ x:	14.91	, y:	2.11	, r:	3.26	},
						{ x:	10.68	, y:	22.51	, r:	3.61	},
						{ x:	27.14	, y:	21.76	, r:	6.72	},
						{ x:	27.26	, y:	22.30	, r:	8.04	},

		         ]

				}, 

				{
					label:'Dept a',
		         color:'blue',
		         value: [
						{ x:	21.52	, y:	18.55	, r:	10.39	},
						{ x:	22.76	, y:	10.82	, r:	11.84	},
						{ x:	27.22	, y:	2.82	, r:	1.17	},
						{ x:	21.86	, y:	2.77	, r:	4.28	},
						{ x:	10.01	, y:	11.00	, r:	2.77	},
						{ x:	8.83	, y:	8.30	, r:	7.27	},
						{ x:	9.89	, y:	3.02	, r:	7.70	},
						{ x:	25.04	, y:	23.75	, r:	6.48	},
						{ x:	11.01	, y:	14.41	, r:	4.87	},
						{ x:	5.91	, y:	2.56	, r:	8.87	},
						{ x:	18.57	, y:	23.85	, r:	9.07	},
						{ x:	17.21	, y:	22.56	, r:	11.92	},
						{ x:	4.84	, y:	11.35	, r:	10.60	},
						{ x:	23.62	, y:	22.17	, r:	10.96	},
						{ x:	4.65	, y:	21.82	, r:	3.91	},
		         ]

				},				


				{
					label:'Dept C',
		         color:'green',
		         value: [
						{ x:	2.81	, y:	1.50	, r:	2.80	},
						{ x:	14.85	, y:	15.24	, r:	5.37	},
						{ x:	22.89	, y:	1.36	, r:	11.42	},
						{ x:	2.39	, y:	18.32	, r:	5.21	},
						{ x:	17.40	, y:	18.93	, r:	8.99	},
						{ x:	29.47	, y:	14.47	, r:	11.25	},
						{ x:	18.62	, y:	10.20	, r:	1.86	},
						{ x:	15.37	, y:	11.94	, r:	4.38	},
						{ x:	17.72	, y:	19.98	, r:	5.64	},
						{ x:	5.71	, y:	21.26	, r:	5.85	},
						{ x:	26.18	, y:	11.91	, r:	9.19	},
						{ x:	7.54	, y:	23.99	, r:	8.42	},
						{ x:	10.17	, y:	15.15	, r:	9.36	},
						{ x:	29.81	, y:	7.79	, r:	6.77	},
						{ x:	12.72	, y:	10.32	, r:	9.90	},
		         ]

				}	

			
		]


}



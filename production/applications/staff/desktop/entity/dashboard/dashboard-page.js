const page   = require('../../../../../components/page/page')
const pageChart = require('./dashboard-page-chart')



import dashboardPage       from "./dashboard-page.html";

/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('dashboard init>')
	
	HTMLwasSelected = true

	//load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", dashboardPage)

   //dashboardPageRight.start(detail)   

   pageChart.start({act: 'createAllChart'})

    


}/*init*/

/****************ELEMENTS*****************/

export function start(detail){ //console.log('dashboard page >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	

	obj[detail.act].start(detail)
}

const obj = {
   
   show:           { start: (detail)=>{ page.start(detail)               }},
   searchbydate:   { start: (detail)=>{  pageChart.searchbydate()        }},
   searchbybutton: { start: (detail)=>{  pageChart.searchbybutton(detail)}}


}/**/
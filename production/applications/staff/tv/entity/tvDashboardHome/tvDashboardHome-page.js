

import tvDashboardHome  from "./tvDashboardHome-page.html";

const page            = require('../../../../../components/page/page')
const pageChart       = require('./tvDashboardHome-page-chart')

/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('goku init>')
	
	HTMLwasSelected = true

	//load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", tvDashboardHome)

   pageChart.start({act: 'createAllChart'})


}/*init*/

/****************ELEMENTS*****************/



export function start(detail){ // console.log('tvDashboardHome>', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	 obj[detail.act].start(detail)
}




const obj = {
   
      show:  { start: (detail)=>{ page.start(detail) }},
 
}/**/




export function update(detail){   console.log('tvDashboardHome>')
  
   //return if the page wasn't init yet
   if(!HTMLwasSelected) {return}
		
		pageChart.updateAllChart(detail)

}

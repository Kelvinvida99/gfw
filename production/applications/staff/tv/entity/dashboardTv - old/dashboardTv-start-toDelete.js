

import dashboardTvPage       from "./dashboardTv-page.html";

const page   = require('../../../../../components/page/page')



/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('goku init>')
	
	HTMLwasSelected = true

	//load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", dashboardTvPage)


}/*init*/

/****************ELEMENTS*****************/



export function start(detail){ //console.log('goku page >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	 obj[detail.act].start(detail)
}




const obj = {
   
      show:  { start: (detail)=>{  page.start(detail)     }},


}/**/



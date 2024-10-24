const page   = require('../../../../../components/page/page')
const shipperDt = require('./shipper-dt')

import shipperPage       from "./shipper-page.html";


/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('shipper init>')
	
	HTMLwasSelected = true

	//load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", shipperPage)

   shipperDt.start({"dest":"shipper", "elem":"dt", "act":"select", "entity":"shipper"})

}/*init*/

/****************ELEMENTS*****************/



export function start(detail){ //console.log('shipper page >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	 obj[detail.act].start(detail)
}




const obj = {
   
      show:  { start: (detail)=>{  page.start(detail)     }},


}/**/



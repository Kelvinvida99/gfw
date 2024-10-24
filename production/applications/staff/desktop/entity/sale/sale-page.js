const page   = require('../../../../../components/page/page')
const saleDt = require('./sale-dt')

import salePage       from "./sale-page.html";


/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('sale init>')
	
	HTMLwasSelected = true

	//load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", salePage)

   saleDt.start({"dest":"sale", "elem":"dt", "act":"select", "entity":"sale"})

}/*init*/

/****************ELEMENTS*****************/



export function start(detail){ //console.log('sale page >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	 obj[detail.act].start(detail)
}




const obj = {
   
      show:  { start: (detail)=>{  page.start(detail)     }},


}/**/



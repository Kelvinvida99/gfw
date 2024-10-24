const page   = require('../../../../../components/page/page')
const inventoryDt = require('./inventory-dt')

import inventoryPage       from "./inventory-page.html";


/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('inventory init>')
	
	HTMLwasSelected = true

	//load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", inventoryPage)

   inventoryDt.start({"dest":"inventory", "elem":"dt", "act":"select", "entity":"inventory"})

}/*init*/

/****************ELEMENTS*****************/



export function start(detail){ //console.log('inventory page >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	 obj[detail.act].start(detail)
}




const obj = {
   
      show:  { start: (detail)=>{  page.start(detail)     }},


}/**/



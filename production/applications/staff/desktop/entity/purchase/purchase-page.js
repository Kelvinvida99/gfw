const page       = require('../../../../../components/page/page')
const purchaseDt = require('./purchase-dt')

import purchasePage       from "./purchase-page.html";


/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('purchase init>')
	
	HTMLwasSelected = true

	//load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", purchasePage)

   purchaseDt.start({"dest":"purchase", "elem":"dt", "act":"select", "entity":"purchase"})

}/*init*/

/****************ELEMENTS*****************/



export function start(detail){ //console.log('purchase page >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	 obj[detail.act].start(detail)
}




const obj = {
   
      show:  { start: (detail)=>{  page.start(detail)     }},


}/**/



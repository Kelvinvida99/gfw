const page   = require('../../../../../components/page/page')
const item_unitDt = require('./item_unit-dt')

import item_unitPage       from "./item_unit-page.html";


/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('item_unit init>')
	
	HTMLwasSelected = true

	//load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", item_unitPage)

   item_unitDt.start({"dest":"item_unit", "elem":"dt", "act":"select", "entity":"item_unit"})

}/*init*/

/****************ELEMENTS*****************/



export function start(detail){ //console.log('item_unit page >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	 obj[detail.act].start(detail)
}




const obj = {
   
      show:  { start: (detail)=>{  page.start(detail)     }},


}/**/



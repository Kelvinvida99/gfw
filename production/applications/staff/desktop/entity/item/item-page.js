const page   = require('../../../../../components/page/page')
const itemDt = require('./item-dt')

import itemPage       from "./item-page.html";


/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('item init>')
	
	HTMLwasSelected = true

	//load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", itemPage)

   itemDt.start({"dest":"item", "elem":"dt", "act":"select", "entity":"item"})

}/*init*/

/****************ELEMENTS*****************/



export function start(detail){ //console.log('item page >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	 obj[detail.act].start(detail)
}




const obj = {
   
      show:  { start: (detail)=>{  page.start(detail)     }},


}/**/



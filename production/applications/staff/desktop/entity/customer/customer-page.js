const page   = require('../../../../../components/page/page')
const customerDt = require('./customer-dt')

import customerPage       from "./customer-page.html";


/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('customer init>')
	
	HTMLwasSelected = true

	//load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", customerPage)

   customerDt.start({"dest":"customer", "elem":"dt", "act":"select", "entity":"customer"})

}/*init*/

/****************ELEMENTS*****************/



export function start(detail){ //console.log('customer page >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	 obj[detail.act].start(detail)
}




const obj = {
   
      show:  { start: (detail)=>{  page.start(detail)     }},


}/**/



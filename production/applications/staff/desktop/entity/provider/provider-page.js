const page   = require('../../../../../components/page/page')
const providerDt = require('./provider-dt')

import providerPage       from "./provider-page.html";


/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('provider init>')
	
	HTMLwasSelected = true

	//load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", providerPage)

   providerDt.start({"dest":"provider", "elem":"dt", "act":"select", "entity":"provider"})

}/*init*/

/****************ELEMENTS*****************/



export function start(detail){ //console.log('provider page >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	 obj[detail.act].start(detail)
}




const obj = {
   
      show:  { start: (detail)=>{  page.start(detail)     }},


}/**/



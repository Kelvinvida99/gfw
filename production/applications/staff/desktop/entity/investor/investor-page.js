const page   = require('../../../../../components/page/page')
const investorDt = require('./investor-dt')

import investorPage       from "./investor-page.html";


/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('investor init>')
	
	HTMLwasSelected = true

	//load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", investorPage)

   investorDt.start({"dest":"investor", "elem":"dt", "act":"select", "entity":"investor"})

}/*init*/

/****************ELEMENTS*****************/



export function start(detail){ //console.log('investor page >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	 obj[detail.act].start(detail)
}




const obj = {
   
      show:  { start: (detail)=>{  page.start(detail)     }},
}
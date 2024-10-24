const page   = require('../../../../../components/page/page')
const investordepositDt = require('./investordeposit-dt')

import investordepositPage       from "./investordeposit-page.html";


/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('investordeposit init>')
	
	HTMLwasSelected = true

	//load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", investordepositPage)

   investordepositDt.start({"dest":"investordeposit", "elem":"dt", "act":"select", "entity":"investordeposit"})

}/*init*/

/****************ELEMENTS*****************/



export function start(detail){ 
   
  // console.log('investordeposit page >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	 obj[detail.act].start(detail)
}




const obj = {
   
      show:  { start: (detail)=>{  page.start(detail)     }},
}
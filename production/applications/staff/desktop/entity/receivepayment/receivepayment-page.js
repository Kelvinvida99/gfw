const page   = require('../../../../../components/page/page')
const receivepaymentDt = require('./receivepayment-dt')

import receivepaymentPage       from "./receivepayment-page.html";


/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('receivepayment init>')
	
	HTMLwasSelected = true

	//load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", receivepaymentPage)

   receivepaymentDt.start({"dest":"receivepayment", "elem":"dt", "act":"select", "entity":"receivepayment"})

}/*init*/

/****************ELEMENTS*****************/



export function start(detail){ 
   
  // console.log('receivepayment page >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	 obj[detail.act].start(detail)
}




const obj = {
   
      show:  { start: (detail)=>{  page.start(detail)     }},
}
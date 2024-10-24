const page          = require('../../../../../components/page/page')
const sentpaymentDt = require('./sentpayment-dt')

import sentpaymentPage       from "./sentpayment-page.html";


/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('sentpayment init>')
	
	HTMLwasSelected = true

	//load the page to the index
  const body = document.body
  body.insertAdjacentHTML("beforeend", sentpaymentPage)

  sentpaymentDt.start({"dest":"sentpayment", "elem":"dt", "act":"select", "entity":"sentpayment"})

}/*init*/

/****************ELEMENTS*****************/

export function start(detail){ 
   
  // console.log('sentpayment page >', detail)
  
  if(!HTMLwasSelected) {HTMLselect(detail)}
	
	obj[detail.act].start(detail)
}

const obj = {
   
  show:  { start: (detail)=>{  page.start(detail)     }},
}
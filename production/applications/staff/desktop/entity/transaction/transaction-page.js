const page          = require('../../../../../components/page/page')
const transactionDt = require('./transaction-dt')

import transactionPage       from "./transaction-page.html";

/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('transaction init>')
	
	HTMLwasSelected = true

	//load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", transactionPage)

   transactionDt.start({"dest":"transaction", "elem":"dt", "act":"select", "entity":"transaction"})

}/*init*/

/****************ELEMENTS*****************/

export function start(detail){ //console.log('transaction page >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	 obj[detail.act].start(detail)
}

const obj = {
   
   show:  { start: (detail)=>{  page.start(detail)     }},

}/**/
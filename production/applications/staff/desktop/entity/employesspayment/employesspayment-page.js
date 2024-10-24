


const page    = require('../../../../../components/page/page')
const employesspaymentDt = require('./employesspayment-dt')

import employesspaymentPage       from "./employesspayment-page.html";


/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('employesspayment init>')
	
	HTMLwasSelected = true

	//load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", employesspaymentPage)
   
   page.hide_page_element(detail);

   employesspaymentDt.start({"dest":"employesspayment", "elem":"dt", "act":"select", "entity":"employesspayment"})

}/*init*/

/****************ELEMENTS*****************/



export function start(detail){ //console.log('employesspayment page >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	 obj[detail.act].start(detail)
}




const obj = {
   
      show:  { start: (detail)=>{  page.start(detail)     }},


}/**/






const page    = require('../../../../../components/page/page')
const equitydepositDt = require('./equitydeposit-dt')

import equitydepositPage       from "./equitydeposit-page.html";


/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('equitydeposit init>')
	
	HTMLwasSelected = true

	//load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", equitydepositPage)
   
   page.hide_page_element(detail);

   equitydepositDt.start({"dest":"equitydeposit", "elem":"dt", "act":"select", "entity":"equitydeposit"})

}/*init*/

/****************ELEMENTS*****************/



export function start(detail){ //console.log('equitydeposit page >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	 obj[detail.act].start(detail)
}




const obj = {
   
      show:  { start: (detail)=>{  page.start(detail)     }},


}/**/



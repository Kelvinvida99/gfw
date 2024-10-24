


const page   = require('../../components/page/page')
const gokuDt = require('./goku-dt')

import gokuPage       from "./goku-page.html";


/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('goku init>')
	
	HTMLwasSelected = true

	//load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", gokuPage)

   gokuDt.start({"dest":"goku", "elem":"dt", "act":"select", "entity":"goku"})

}/*init*/

/****************ELEMENTS*****************/



export function start(detail){ //console.log('goku page >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	 obj[detail.act].start(detail)
}




const obj = {
   
      show:  { start: (detail)=>{  page.start(detail)     }},


}/**/



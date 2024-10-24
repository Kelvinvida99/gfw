const page   = require('../../../../../components/page/page')
const areasDt = require('./areas-dt')

import areasPage       from "./areas-page.html";


/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('areas init>')
	
	HTMLwasSelected = true

	//load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", areasPage)

   areasDt.start({"dest":"areas", "elem":"dt", "act":"select", "entity":"areas"})

}/*init*/

/****************ELEMENTS*****************/



export function start(detail){ //console.log('areas page >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	 obj[detail.act].start(detail)
}




const obj = {
   
      show:  { start: (detail)=>{  page.start(detail)     }},


}/**/



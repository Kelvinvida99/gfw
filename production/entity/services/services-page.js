


const page   = require('../../components/page/page')
const servicesDt = require('./services-dt')

import servicesPage       from "./services-page.html";


/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('services init>')
	
	HTMLwasSelected = true

	//load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", servicesPage)

   servicesDt.start({"dest":"services", "elem":"dt", "act":"select", "entity":"services"})

}/*init*/

/****************ELEMENTS*****************/



export function start(detail){ //console.log('services page >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	 obj[detail.act].start(detail)
}




const obj = {
   
      show:  { start: (detail)=>{  page.start(detail)     }},


}/**/



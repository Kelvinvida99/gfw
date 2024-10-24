const page   = require('../../../../../components/page/page')
const otherexpenseDt = require('./otherexpense-dt')

import otherexpensePage       from "./otherexpense-page.html";


/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('otherexpense init>')
	
	HTMLwasSelected = true

	//load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", otherexpensePage)

   otherexpenseDt.start({"dest":"otherexpense", "elem":"dt", "act":"select", "entity":"otherexpense"})

}/*init*/

/****************ELEMENTS*****************/



export function start(detail){ 
   
  // console.log('otherexpense page >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	 obj[detail.act].start(detail)
}




const obj = {
   
      show:  { start: (detail)=>{  page.start(detail)     }},
}
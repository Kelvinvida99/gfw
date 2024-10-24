const page   = require('../../../../../components/page/page')

import adminPage       from "./admin-page.html";

/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('admin init>')
	
	HTMLwasSelected = true

	//load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", adminPage)

   //adminPageRight.start(detail)   
    
}/*init*/

/****************ELEMENTS*****************/

export function start(detail){ //console.log('admin page >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	obj[detail.act].start(detail)
}

const obj = {
   
   show:  { start: (detail)=>{  
      page.start(detail)  
   }},

}/**/
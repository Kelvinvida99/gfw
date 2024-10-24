const page    = require('../../../../../components/page/page')
const usersDt = require('./users-dt')

import usersPage       from "./users-page.html";


/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('users init>')
	
	HTMLwasSelected = true

	//load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", usersPage)
   
   page.hide_page_element(detail);

   usersDt.start({"dest":"users", "elem":"dt", "act":"select", "entity":"users"})

}/*init*/

/****************ELEMENTS*****************/

export function start(detail){ //console.log('users page >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	obj[detail.act].start(detail)
}

const obj = {
   
   show:  { start: (detail)=>{  page.start(detail)     }},

}/**/
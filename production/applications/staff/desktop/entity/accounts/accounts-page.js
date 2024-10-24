const page       = require('../../../../../components/page/page')
const accountsDt = require('./accounts-dt')

import accountsPage       from "./accounts-page.html";

/****************ELEMENTS*****************/
var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('accounts init>')
	
	HTMLwasSelected = true

	//load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", accountsPage)

   accountsDt.start({"dest":"accounts", "elem":"dt", "act":"select", "entity":"accounts"})

}/*init*/

/****************ELEMENTS*****************/

export function start(detail){ //console.log('accounts page >', detail)
  
   if(!HTMLwasSelected) {HTMLselect(detail)}
	
	obj[detail.act].start(detail)
}

const obj = {
   
   show:  { start: (detail)=>{  page.start(detail)     }},

}/**/
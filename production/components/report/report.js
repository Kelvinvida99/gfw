
const reportDB      = require('./report-db')
const page          = require('../page/page')
const reportJump    = require('./report-jump')

import reportPage       from "./report-page.html";



/****************ELEMENTS*****************/
var iframe      

var HTMLwasSelected  = false

//insert the page  on the body
function HTMLselect(detail){ //console.log('purchase init>')
    

    //load the page to the index
   const body = document.body
   body.insertAdjacentHTML("beforeend", reportPage)

    iframe         = document.getElementById('reportIframe')

    console.log('purchase iframe>', iframe)

   HTMLwasSelected = true

}/*init*/

/****************ELEMENTS*****************/

export function start(detail){console.log('REPORT mai>', detail)
 
    if(!HTMLwasSelected) {HTMLselect(detail)}
   
    switch (detail.act){
        case 'remove':       remove(detail);      break;   
        case 'print':        print(detail);       break;   
        case 'jump':         reportJump.start(detail);        break;   
        case 'show':         show(detail);        break;   

    }    
}



export function show(detail, callback){   //console.log('show >', detail)
  
    if(!HTMLwasSelected) {HTMLselect(detail)}
    
    page.start({id:'report-page', act:'show'})

    const pageTarget = document.getElementById('report-page-right')
    pageTarget.innerHTML = '';
    
    if(callback != undefined){ callback() }
   

}


function jump(detail){   console.log('jump >', detail)




}



function remove(detail){  //console.log('remove >')

  const elem       = detail.ev.target
  const reportPage = elem.parentElement.parentElement

  reportPage.remove()

  // console.log('reportPage >', reportPage)
}




export function print(detail){  console.log('print >')

  const elem       = detail.ev.target
  const page       = elem.parentElement.parentElement
  const dataCont   = page.querySelector('.dataCont')


  iframe.contentWindow.document.open()
  iframe.contentWindow.document.write(dataCont.innerHTML)
  iframe.contentWindow.document.close()

  iframe.contentWindow.print();


}









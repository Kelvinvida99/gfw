

const bridge  = require('./back-control-bridge')
const handler = require('./back-control-handler')
const page   = require('../components/page/page')


var hashTemp  = [""]
var hash      = ''
var lastAdded = ''
var isEnable  =  false
var lastPageHidden = ''
var lastShowed     = ''

export function enable(){ // console.log( '################BACK CONTROL HAS BEEN ENABLED' )
   isEnable = true
   //window.location.hash.replace('#', '')

   handler.findPageOnUrl()

}

//windows hash location is change on app-start.js
// window.addEventListener("beforeunload", function (e) {

//     console.log( 'youre exiting ######################' ) //Gecko + Webkit, Safari, Chrome etc.
//    // window.location.hash = 'http://localhost/gosivefw/public/index.html#toExit'  

// })


window.addEventListener('hashchange', function(){ console.log( 'hashchange', isEnable )


  if( !isEnable ){ return  }

  //clean the hash
  hash = window.location.hash.replace('#', '')
  hash = hash.split('|')

  //if was a changed, and hash[0] is empty, or
  //hasTemnp is larger thatn hash
  //hide the last element on hashTemp
  if(hash.length < hashTemp.length || hash[0] === ""){ 
    
    bridge.hide( hashTemp[hashTemp.length-1], lastShowed, lastPageHidden )  
  }

  //update the hashTemp with the new hash
  hashTemp = hash

})/**/




export function hashAdd(detail){  //console.log( `hashAdd ***`, detail.toShow ) 

  
  if( !isEnable                      ){   return }
  //if( lastShowed ===  detail.toShow){   return }

  lastShowed =  detail.toShow 

  var hash = window.location.hash
  lastAdded = detail.toShow

  if( hash ==='' ){
    
    window.location.hash = `${detail.toShow}`;

  }else{

    hash += `|${detail.toShow}`
    window.location.hash = hash
  }




}/**/


export function hashSub(detail){   //console.log(`hashSub ***`,  detail.toHide)

  if( !isEnable ){   return }

  var hash       = window.location.hash
  lastAdded      = ''

  //control if the element isn't the first one
  if( hash.includes(`|${detail.toHide}`) ){ hash = hash.replace(`|${detail.toHide}`, '') }
  else                                    { hash = hash.replace(`${detail.toHide}`, '')  }

  window.location.hash = hash


  if(detail.toHide.startsWith("page-")){
    lastPageHidden = detail.toHide
  }
   



}/**/


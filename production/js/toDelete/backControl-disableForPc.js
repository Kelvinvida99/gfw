

const bridge = require('./backControl-bridge')


var hashTemp  = [""]
var hash      = ''
var lastAdded = ''



//windows hash location is change on app-start.js

window.addEventListener('hashchange', function() { //console.log(`hashchange>>>>>>>>>>>>>>>>>>>>>>>>1`)

  //clean the hash
  hash = window.location.hash.replace('#', '')
  hash = hash.split('|')


  //if was a changed, and hash[0] is empty, or
  //hasTemnp is larger thatn hash
  //hide the last element on hashTemp
  if(hash.length < hashTemp.length || hash[0] === ""){ 
    
    bridge.hide( hashTemp[hashTemp.length-1] )  
  }

  //update the hashTemp with the new hash
  hashTemp = hash

})/**/




export function hashAdd(detail){ //console.log(`hashAdd`, detail); 

  var hash = window.location.hash
  lastAdded = detail.toShow

  if( hash ==='' ){
    
    window.location.hash = `${detail.toShow}`;

  }else{

    hash += `|${detail.toShow}`
    window.location.hash = hash
  }


}/**/


export function hashSub(detail){   //console.log(`hashSub`, detail); 

  var hash  = window.location.hash
  lastAdded = ''

  //control if the element isn't the first one
  if( hash.includes(`|${detail.toHide}`) ){ hash = hash.replace(`|${detail.toHide}`, '') }
  else                                    { hash = hash.replace(`${detail.toHide}`, '')  }

  window.location.hash = hash
}/**/


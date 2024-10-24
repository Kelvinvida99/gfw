

const bridge = require('./backControl-bridge')

/****************ELEMENTS*****************/
var wasSelectHtml = false
function selectHTML(){ 
    wasSelectHtml = true
}
/****************ELEMENTS*****************/



export function start(detail){ //console.log('goku star>', detail)
  
  if(!wasSelectHtml) {selectHTML()}

  switch (detail.act){
      case 'hashAdd': hashAdd(detail);  break;
      case 'hashSub': hashSub(detail);  break;
  }
}



var hashTemp  = [""]
var hash      = ''
var lastAdded = ''

window.addEventListener('hashchange', function() { 

  //clean the hash
  hash = window.location.hash.replace('#', '')
  hash = hash.split('|')

  console.log(`hashTemp>`,  hashTemp)
  console.log(`hash>`,      hash)
  console.log(`lastAdded>`, lastAdded)

  // console.log(`hash[hash.length-1]>`, hash[hash.length-1])

  //decide if we have to show or hide
  if(hash.length > hashTemp.length || hashTemp[0] === ""){ 
      
      if(lastAdded === hash[hash.length-1]){
        console.log('was addedd')

      }else{
        console.log('FORWARDDDDDDDDDDDDDDDDDD button clicked')
        

        console.log('hash', hash)

        hash.pop()


        console.log('hash', hash)
        var newHash = ''
        hash.forEach((elem) => {
          if(newHash === ''){ newHash += elem     }
          else              { newHash += '|'+elem }
        })

         console.log('newHash', newHash)
         window.location.hash = newHash


      }
        //hashShow( hash[hash.length-1] )
        // window.location.hash = hashTemp
        // return

  }
  else{  hashHide( hashTemp[hashTemp.length-1] )  }

  
  //update the hashTemp with the new hash
  hashTemp = hash

})/**/




function hashShow(elem){ //console.log(`hashShowElem>`, elem); 


}/*hashShowElem*/

function hashHide(elem){ //console.log(`hashHideElem>`, elem); 

    bridge.hide(elem)

}/*hashShowElem*/







export function hashAdd(detail){ console.log(`hashAdd`, detail); 

  var hash = window.location.hash
  lastAdded = detail.toShow

  if( hash ==='' ){
    window.location.hash = `${detail.toShow}`;
  }else{
    hash += `|${detail.toShow}`
    window.location.hash = hash
  }

}/**/

export function hashSub(detail){   console.log(`hashSub`, detail); 

  var hash = window.location.hash
  lastAdded = '' 

  //control if the element isn't the first one
  if( hash.includes(`|${detail.toHide}`) ){ hash = hash.replace(`|${detail.toHide}`, '') }
  else                                    { hash = hash.replace(`${detail.toHide}`, '')  }

  window.location.hash = hash
}/**/


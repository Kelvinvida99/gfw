function hashAdd(toShow){ console.log(`hashAdd`); 

  var hash = window.location.hash

  if( hash ==='' ){
    window.location.hash = `${toShow}`;
  }else{
    hash += `|${toShow}`
    window.location.hash = hash
  }

}/**/

//remove element to the hash
function hashSub(toHide){   console.log(`hashSub`); 

  var hash = window.location.hash

  //control if the element isn't the first one
  if( hash.includes(`|${toHide}`) ){ hash = hash.replace(`|${toHide}`, '') }
  else                             { hash = hash.replace(`${toHide}`, '')  }

  window.location.hash = hash

}/**/



const generator             = require('./confirmation-generator')
const confirmationDefault   = require('./confirmation-default')


/****************ELEMENTS*****************/

var confirmation      
var scrimConfirmation 
var HTMLwasSelected = false


function HTMLselect(){ //console.log('HTMLselect')

 confirmation      = document.getElementById('confirmation')
 scrimConfirmation = document.getElementById('scrim_confirmation')
 HTMLwasSelected     = true

}
/****************ELEMENTS*****************/


export function start(detail){ //console.log('confirmation start >', detail)

  if(!HTMLwasSelected) {HTMLselect()}

    switch (detail.act){
        case 'show':          show(detail);          break; 
        case 'hide':          hide();                break; 
        case 'hideById':      hideById(detail);                break; 
        case 'showById':      showById(detail);                break; 

    }

}



export function show(detail){ //console.log('Confirmation show WWWWWW>', detail)

  var confirmationBody = ''

  //create html elements or generate one default
    switch (detail.html){
        case undefined:       confirmationBody = confirmationDefault.start(detail);       break; 
        default:              confirmationBody = detail.html ;
    }


  //don't add this before show the scrim, weird error
  //fill the confirmation
  confirmation.innerHTML = generator.start(confirmationBody)

  //show the element
  confirmation.classList.add('confirmation-show') 

  scrimConfirmation.classList.add('scrim-show')

}


export function showById(detail){ //console.log('Confirmation show WWWWWW>', detail)

   const targetConfirmation =   document.getElementById(detail.id)
  
  //show the element
  targetConfirmation.classList.add('confirmation-show') 

  scrimConfirmation.classList.add('scrim-show')
}




export function hide(){  //console.log('Confirmation hide> ')

  if(!HTMLwasSelected) {HTMLselect()}
    
  //if no cotain this class, the element is already hide
  if( !confirmation.classList.contains('confirmation-show') ) return

  confirmation.classList.add('confirmation-hide')
  scrimConfirmation.classList.add('scrim-hide')

  remove(()=>{

    confirmation.classList.remove('confirmation-hide')
    confirmation.classList.remove('confirmation-show')
    confirmation.classList.remove('confirmation-loading')

    scrimConfirmation.classList.remove('scrim-show')
    scrimConfirmation.classList.remove('scrim-hide')
  })

}/*hide*/


export function hideById(detail){  //console.log('Confirmation hide> ')

  const targetConfirmation =   document.getElementById(detail.id)

    
  //if no cotain this class, the element is already hide
  if( !targetConfirmation.classList.contains('confirmation-show') ) return

  targetConfirmation.classList.add('confirmation-hide')
  scrimConfirmation.classList.add('scrim-hide')

  remove(()=>{

    targetConfirmation.classList.remove('confirmation-hide')
    targetConfirmation.classList.remove('confirmation-show')
    targetConfirmation.classList.remove('confirmation-loading')

    scrimConfirmation.classList.remove('scrim-show')
    scrimConfirmation.classList.remove('scrim-hide')

  })

}/*hide*/

function remove(callback){
  setTimeout(()=>{
    callback()
  }, 300)
}



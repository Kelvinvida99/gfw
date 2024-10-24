
const {backdropGenerator} = require('./backdrop-generator')
const {backdropDefault}   = require('./backdrop-default')

const backControl     = require('../../js/back-control')

/****************ELEMENTS*****************/
var scrimBackdrop    
var backdrop 
var HTMLwasSelected = false


function HTMLselect(){ console.log('HTMLselect')

   backdrop      = document.getElementById('backdrop')
   scrimBackdrop = document.getElementById('scrim_backdrop')
   HTMLwasSelected = true
}
/****************ELEMENTS*****************/


export function start(detail){ //console.log('backdrop start >', detail)

    switch (detail.act){
        case 'show':          show(detail);         break; 
        case 'hide':          hide();               break; 
    }
}


function show(detail){   //console.log('show >', detail)
 
  if(!HTMLwasSelected) HTMLselect()

  var backdropBody = ''

  //create html elements or generate one default
    switch (detail.html){
        case undefined:       backdropBody = backdropDefault(detail);       break; 
        default:              backdropBody = detail.html ;
    }


  const hmlt = backdropGenerator(backdropBody)

  //don't add this before show the scrim, weird error
  backdrop.innerHTML  = hmlt;

  //show the element
  backdrop.classList.add('backdrop-show')

  scrimBackdrop.classList.add('scrim-show')

  //add to the url
  backControl.hashAdd({toShow:'backdrop'})

}/**/




function hide(){ //click  the close bottom

  if(!HTMLwasSelected) HTMLselect()

  backdrop.classList.add('backdrop-hide')
  scrimBackdrop.classList.add('scrim-hide')

  //remove to the url
  backControl.hashSub({toHide:'backdrop'})
  
	remove(()=>{

			backdrop.classList.remove('backdrop-hide')
			backdrop.classList.remove('backdrop-show')
      scrimBackdrop.classList.remove('scrim-hide')
      scrimBackdrop.classList.remove('scrim-show')
	})
}




function remove(callback){
	setTimeout(()=>{
		callback()
	}, 250)
}


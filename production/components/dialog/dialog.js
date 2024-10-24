
const backControl     = require('../../js/back-control')
const dialogDefault   = require('./dialog-default')
const dialogGenerator = require('./dialog-generator')

/****************ELEMENTS*****************/
var dialog      
var scrimDialog 
var HTMLwasSelected = false

function HTMLselect(){ //console.log('HTMLselect')

    dialog         = document.getElementById('dialog')
	scrimDialog    = document.getElementById('scrim_dialog')
	HTMLwasSelected  = true
}

/****************ELEMENTS*****************/


export function start(detail){// console.log('dialog start>', detail)

    switch (detail.act){
        case 'show':          show(detail);  break; 
        case 'hide':          hide();        break; 
    }
}



function show(detail){ //console.log('dialog show>', detail)
	
	if(!HTMLwasSelected) {HTMLselect()}

	var dialogBody = ''

	//create html elements or generate one default
    switch (detail.html){
        case undefined:       dialogBody = dialogDefault.start(detail);       break; 
        default:              dialogBody = detail.html ;
    }

 	//fill the menu
	dialog.innerHTML  = dialogGenerator.start(dialogBody);

	//show the element
	dialog.classList.add('dialog-show')

	//show the element
	scrimDialog.classList.add('scrim-show')

	//add to the url
	backControl.hashAdd({toShow:'dialog'})
}



function hide(){ //console.log('dialog hide>')

  if(!HTMLwasSelected) {HTMLselect()}

  dialog.classList.add('dialog-hide');
  scrimDialog.classList.add('scrim-hide')

  //remove to the url
  backControl.hashSub({toHide:'dialog'})


	remove(()=>{
		dialog.classList.remove('dialog-hide');
		dialog.classList.remove('dialog-show');

  		scrimDialog.classList.remove('scrim-show')
  		scrimDialog.classList.remove('scrim-hide')

		dialog.innerHTML = ''
	})

}


function remove(callback){
	setTimeout(()=>{
		callback()
	}, 300)
}


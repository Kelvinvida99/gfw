

const onboardGenerator = require('./onboard-generator')
const backControl     = require('../../js/back-control')



/****************ELEMENTS*****************/
var onboard      
var scrimOnboard
var HTMLwasSelected = false

function HTMLselect(){ //console.log('HTMLselect')

    onboard         = document.getElementById('onboard')
	scrimOnboard     = document.getElementById('scrim_board')
	HTMLwasSelected  = true
}

/****************ELEMENTS*****************/


export function start(detail){ console.log('OOOOOOOOOOOOOOOOOOOnboard>', detail)

    switch (detail.act){
        case 'show':          show(detail);  break; 
        case 'hide':          hide();        break; 
    }
}



function show(detail){ //console.log('dialog show>', detail)
	
	if(!HTMLwasSelected) {HTMLselect()}


 	//fill the menu
	onboard.innerHTML  = onboardGenerator.start(detail.html);

	//show the element
	onboard.classList.add('onboard-show')

	//show the element
	scrimOnboard.classList.add('scrim-show')

	//add to the url
	backControl.hashAdd({toShow:'onboard'})
}



function hide(){ //console.log('dialog hide>')

  if(!HTMLwasSelected) {HTMLselect()}

  onboard.classList.add('onboard-hide');
  scrimOnboard.classList.add('scrim-hide')

  //remove to the url
  backControl.hashSub({toHide:'onboard'})


	remove(()=>{
		onboard.classList.remove('onboard-hide');
		onboard.classList.remove('onboard-show');

  		scrimOnboard.classList.remove('scrim-show')
  		scrimOnboard.classList.remove('scrim-hide')

		onboard.innerHTML = ''
	})

}


function remove(callback){
	setTimeout(()=>{
		callback()
	}, 300)
}


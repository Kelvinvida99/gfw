
const snackGenerator = require ('./snack-generator')
const snackDefault   = require ('./snack-default')

/****************ELEMENTS*****************/
var  snack
var  controlHide   = true 
var  HTMLwasSelected = false

function HTMLselect(){ //console.log('HTMLselect')

   snack = document.getElementById('snack')
   HTMLwasSelected  = true
}

/****************ELEMENTS*****************/

export function start(detail){ //console.log('snack start >')

    switch (detail.act){
        case 'show':    show(detail);       break; 
        case 'hide':    hide();         break; 
    }
}


function show(detail){ //console.log('show')

	if(!HTMLwasSelected) {HTMLselect()}

	var snackBody = ''

	//create html elements or generate one default
    switch (detail.html){
        case undefined:       snackBody = snackDefault.start(detail);       break; 
        default:              snackBody = detail.html ;
    }

	const hmlt = snackGenerator.start(snackBody)

 	//fill the menu
	snack.innerHTML  = hmlt;
  	snack.classList.add('snack-show')
  	
  	controlHide = true 

	remove(()=>{
		if(controlHide){ hideAnimation() }
	})

}



function hide(){
	if(!HTMLwasSelected) {HTMLselect()}	
	hideAnimation()

}


function hideAnimation(){
	controlHide = false
	snack.classList.add('snack-hide')
	setTimeout(()=>{
		snack.classList.remove('snack-hide')
		snack.classList.remove('snack-show')
		snack.innerHTML = ''
	}, 300)
}


function remove(callback){
	setTimeout(()=>{
		callback()
	}, 5000)
}


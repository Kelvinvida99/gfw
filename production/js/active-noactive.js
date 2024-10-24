
const webSocket  = require('../js-network/web-socket')


var inactivityTimer
var inactivityCounter
var letsReload = false
var reloadTimer
var isEnable =  false


export function enable(){
   isEnable = true
}



window.onfocus = function(event){ 

   if(!isEnable){ return }console.log('Window active>')

	clearInterval(inactivityTimer)

	//does we need reload?
	if(letsReload){ location.reload() }	
}


//if we have been inactive for over 60 min, 
//the page will be realod once we get active
window.onblur = function(event) { 

   if(!isEnable){ return }console.log('Window No active>')

	inactivityCounter = 0
	inactivityTimer = setInterval(()=>{  //console.log('inactivityCounter', inactivityCounter)

		inactivityCounter = inactivityCounter + 10 //red red red this should be 1

		if( inactivityCounter > 60 ){  console.log('inactivityCounter PAGE WILL BE RELOADED')

			 clearInterval(inactivityTimer)
			 letsReload = true
			 webSocket.closeDefinitive()  
		}

	}, 1000)/*setInterval*/


}



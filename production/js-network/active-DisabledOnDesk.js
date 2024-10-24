
const webSocket  = require('./web-socket')

var letsReload = undefined


//realod the pages if we're inactive over 60seg
window.onfocus = function(event) { //console.log('Window gained focus<br />');

	clearInterval(inactivityTimer)
	if(letsReload){ location.reload() }
	letsReload = false

}


//THIS IS ONLY FOR MOBILE, FOR AVOID WS CONSUME THE BATTERY
//if we have been inactive for over 60 seg, the page will be realod once we get active
//
var inactivityTimer
window.onblur = function(event) { //console.log('Window inactive>');

	inactivityCounter = 0
	clearInterval(inactivityTimer)

	inactivityTimer = setInterval(()=>{ //console.log('inactivityCounter')

		inactivityCounter = inactivityCounter + 10

		if(inactivityCounter > 120){ //12seg for testing

			clearInterval(inactivityTimer)
			//webSocket.start({act:"closeIndirect"}) 
			webSocket.closeDefinitive() 
			letsReload = true

			console.log('inactive over 12seg, page will be reload')

		}

	}, 1000)/*setInterval*/


}

//alert()

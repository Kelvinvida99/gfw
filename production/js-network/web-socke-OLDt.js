

const avatar           = require('../components/avatar/avatar')
const monitorActivitty = require('../components/monitor/monitor-activity')
const settings         = require('../js-handler/settings')
const {wsOnmessage}    = require('./web-socket-onmessage')

export var ws = undefined




/****************ELEMENTS*****************/
//we have this just for start the timer one time
var HTMLwasSelected = false
var wsPort = ''

function HTMLselect(){ 

	wsPort = settings.getData().wsPort
	statusTimer()
	
	HTMLwasSelected  = true	
}

/****************ELEMENTS*****************/
 
export function init(){  //console.log( 'websocket> int' )
		
	//init the timer
	if(!HTMLwasSelected) HTMLselect()

	if(ws != undefined){  ws.close()  }

	setTimeout(()=>{	//avoid selection error with skull loaded

//		ws              = new WebSocket(`wss://demo.gosive.com:${wsPort}`)
		ws              = new WebSocket(`ws://localhost:8000`)

		ws.onopen       = function(ev){ onopen()        }
		ws.onmessage    = function(ev){ wsOnmessage(ev) } 

	




		//ws.onclose    = function(ev){ close();        }
		//ws.onerror    = function(ev){ close();        }		

   }, 4000)

}/*init*/

//sent the personal data from settings
function onopen(){// console.log( 'WS open' )

	const user =  JSON.stringify(  { act: "join", data: settings.getDataWs() } ) 

	ws.send(user)  
	avatar.up()    

}/**/


export function send(detail){  if(detail.act != "pong" && detail.act != "ping" ) console.log('ws send>', detail)

   if(ws != undefined){
      if(ws.readyState === 1){
		  if(detail.act != "pong" && detail.act != "ping" ) 
         ws.send( JSON.stringify( detail ) )      
      }
   } 
 }/**/

//this result = [{}]
export function entityUpdate(actServer, actClient, result, sendDetail ){


 console.log('entityUpdate resultWWW', result) 

   send({ act:  actServer, data: {act:  actClient, row: result, sendDetail:sendDetail }  })     

}/**/




//keep the websocket status up, or trying to reconnect
//clear the timer before start, to avoid errors
//send a ping to the client, on eacy msg fromt he server, 
//the avatar is shake
var timer = false
function statusTimer(){  //console.log( 'statusTimer>')
   
   clearInterval(timer)

   timer = setInterval(()=>{  //console.log('wsTimer>')
   
      if(ws.readyState === 1){  send({act: 'ping'}) }
      else{  
	      	avatar.down()
	      	init()
	      	monitorActivitty.lineCleanAll() 
     	}

  }, 5000)/*timer*/

}/**/



//This function close websocket and avoid the reconnection
//only used by active.js on mobile to save battery
export function closeDefinitive(){ 	//console.log( 'closeIndirect>' )
	 clearInterval(timer)
	 close()
}

//this reconize faster the websocket was close, more than the timer
export function close(){ // console.log( 'WS close>' )
	
	avatar.down()
	
	if(ws === undefined){ return } 
	ws.close() 
}







const avatar           = require('../components/avatar/avatar')
const monitorActivitty = require('../components/monitor/monitor-activity')
const settings         = require('../js-handler/settings')
const {wsOnmessage}    = require('./web-socket-onmessage')
const WebSocket = require('socket.io-client');

export var ws = undefined




/****************ELEMENTS*****************/
//we have this just for start the timer one time
var HTMLwasSelected = false
var wsPort = ''

// function HTMLselect(){ 

// 	//wsPort = settings.getData().wsPort
//  // statusTimer()
//  	init();
// 	HTMLwasSelected  = true	

// }
var wsPort = ''
/****************ELEMENTS*****************/
 
export function init(){  
		
	wsPort = settings.getData().wsPort
	console.log("prueba shell");


	setTimeout(() => {
		//ws = WebSocket(`wss://demo.gosive.com:${wsPort}`)
		ws = WebSocket(`wss://beestock.gosive.com:${wsPort}`)

		// ws = WebSocket('wss://demo.gosive.com:8000',{
		// 	secure:true,
		// 	reconnect: true,
		// 	rejectUnauthorized : false
		// 	});

		//  ws = WebSocket('wss://demo.gosive.com:8000', {
		// 	transports: ['websocket'], // Usa WebSockets para conexiones seguras
		// 	rejectUnauthorized: false, // Ignora la validación del certificado (solo para desarrollo)
		//   });
		//ws = WebSocket('wss://localhost:8000');

		ws.on('connect', () => {
			onopen();
		});

		ws.on('message', (ev) => {
			wsOnmessage(ev)
		});

		ws.on('disconnect', () => {
			avatar.down()
			monitorActivitty.lineCleanAll()
		});

	}, 4000)

	
		//ws.onclose    = function(ev){ close();        }
		//ws.onerror    = function(ev){ close();        }		
}/*init*/

//sent the personal data from settings
function onopen(){// console.log( 'WS open' )

	const user =  JSON.stringify(  { act: "join", data: settings.getDataWs() } ) 

	ws.emit('message', user);
	avatar.up()    

}/**/


export function send(detail){  


   if(ws != undefined){
      if(ws.connected ==true){
	
         ws.emit('message',JSON.stringify( detail ) )      
      }
   } 
 }/**/

//this result = [{}]
export function entityUpdate(actServer, actClient, result, sendDetail ){


	let row = []


	if (Array.isArray(result)) {
		row = result;
	} else {
		row.push(result)
	}

	
   send({ act:  actServer, data: {act:  actClient, row: row, sendDetail:sendDetail }  })     

}/**/




//keep the websocket status up, or trying to reconnect
//clear the timer before start, to avoid errors
//send a ping to the client, on eacy msg fromt he server, 
//the avatar is shake
// var timer = false
// function statusTimer(){  //console.log( 'statusTimer>')
   
//    clearInterval(timer)

//    timer = setInterval(()=>{  //console.log('wsTimer>')
   
//       if(ws.readyState === 1){  send({act: 'ping'}) }
//       else{  
// 	      	avatar.down()
// 	      	init()
// 	      	monitorActivitty.lineCleanAll() 
//      	}

//   }, 5000)/*timer*/

// }/**/



//This function close websocket and avoid the reconnection
//only used by active.js on mobile to save battery
export function closeDefinitive(){ 	//console.log( 'closeIndirect>' )
	close()
}

//this reconize faster the websocket was close, more than the timer
export function close(){ // console.log( 'WS close>' )
   
   avatar.down()
   
   if(ws === undefined){ return } 
   ws.close() 
}







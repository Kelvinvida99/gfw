
const {companies} = require('./socket-server-companies')



function join(data, ws, company){  // console.log('join>')
	
	//save user date on the websocket
	ws.user = data
	oneJoin(company, data, ws)

} /*join*/

//we send to all admins and gosiveAdmin the alert for new user
//even to the source one
function oneJoin(company, data, ws){ 
	console.log('oneJoin>>', data.name, data.id)

	if(data === undefined){
		console.log('Potenntial error > oneJoin > undefined')
		return
	}
	
	companies.forEach((company)=>{	
		//iterar sobre todos clientes conectados a socket io
		// para hacer referencia a todos los clientes se debe utilizar sockets.sockets
		company.server.sockets.sockets.forEach((client)=>{ 
			if(client.user != undefined){
				// 25/10/2023 marco molina se removio de la condicion: &&  ws != client
				if( (client.user.right === 'admin' || client.user.right === 'adminGosive')){ //
					client.emit('message',JSON.stringify({ act: 'monitor', data:{elem:'oneJoin', user:data} }))
				}				
			}else{console.log('EEEEEERRORRRR, UNDEFINED USER') }//#### print an error here
		})
	})
	

}/*joinNotifyRest*/

//is a admin or adminGosive
function joinAdmin(data, ws, company){ //  console.log('joinAdmin>')

	if(data.right === 'admin')       { joinAdminReplay(ws, company) }
	if(data.right === 'adminGosive') { joinAdminGosiveReplay(ws)    }	
}

//When an admin join, send all the users of the company
//to the user joined
function joinAdminReplay(ws, company){   //console.log('joinAdminReplay>')

	///clean users register
	var activeUsers = []

	company.server.sockets.sockets.forEach((client)=>{ 
		activeUsers.push(client.user)
	})	

	ws.emit('message',JSON.stringify( {act: 'monitor', data:{elem:'joinAdminReplay', user:activeUsers} } ))

}/*joinAdminReplay*/


function joinAdminDashboardTv(data, ws, company){  // console.log('joinAdminDashboardTv>')

	///clean users register
	var activeUsers = []

	company.server.sockets.sockets.forEach((client)=>{ 
		activeUsers.push(client.user)
	})	

	ws.emit('message',JSON.stringify( {act: 'dashboardTv', data:{elem:'joinAdminDashboardTvReplay', user:activeUsers} } ))

}/*joinAdminReplay*/


//When an Gosive admin join, send all the users of all the companies
//to the user joined
function joinAdminGosiveReplay(ws){  //console.log('joinAdminGosiveReplay>')

	///clean users register
	var activeUsers = []

	//send all the user from all the companies to gosive
	companies.forEach((company)=>{
		company.server.sockets.sockets.forEach((client)=>{
			activeUsers.push(client.user)
		})			
	})

	ws.emit('message',JSON.stringify({act: 'monitor', data:{elem:'joinAdminReplay', user:activeUsers}} ))

}/*updateGosive*/



//we send to all admins and gosiveAdmin the alert for new user
function leftOne(data){ console.log('leftOne>')

/*
companies.forEach((company)=>{
	company.server.clients.forEach((client)=>{
		console.log("----",client)
	})			
})*/


	if(data === undefined){
		//all the admis shoud be reconnect on this situation leftOneUnknow
		console.log('we found an potenntial error with clicent leftOne undefined')
		return
	}
	
	
	companies.forEach((company)=>{	
		company.server.sockets.sockets.forEach((client)=>{
			if( client.user.right === 'admin' || client.user.right === 'adminGosive'){
				client.emit('message',JSON.stringify( {act: 'monitor', data:{elem:'leftOne', user:data} } ))
			}
		})
	})

}/*joinNotifyRest*/





function activityUpdates(message, ws, company){ console.log('activityUpdates>')

	message.act = 'getActivityUpdates'

	company.server.sockets.sockets.forEach((client)=>{
		//only send data to the admin of the company
		// 25/10/2023 marco molina se removio de la condicion: &&  ws != client. 
		//para que el mensaje llegue a mismo cliente de web socket
		if(client.user.right === 'admin'){
			client.emit('message',JSON.stringify( {act: 'monitor', data:{elem:'activityUpdates', user:message} } ))
		}
	})

	//companies[0] only have gosive admins
	companies[0].server.sockets.sockets.forEach((client)=>{

		if(ws != client){
			client.emit('message',JSON.stringify( {act: 'monitor', data:{elem:'activityUpdates', user:message} } ))
		}
	})

}/*sendActivityUpdates*/




module.exports = {
	join:					join,
	oneJoin:				oneJoin,
	joinAdmin:				joinAdmin,
	joinAdminDashboardTv:	joinAdminDashboardTv,
	joinAdminReplay:		joinAdminReplay,
	joinAdminGosiveReplay:	joinAdminGosiveReplay,
	leftOne:				leftOne,
	activityUpdates:		activityUpdates,

}
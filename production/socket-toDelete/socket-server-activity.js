
const {companies} = require('./socket-server-companies')



function join(data, ws, company){  // console.log('join>')
	
	//save user date on the websocket
	ws.user = data
	oneJoin(company, data, ws)

} /*join*/

//we send to all admins and gosiveAdmin the alert for new user
//even to the source one
function oneJoin(company, data, ws){ console.log('oneJoin>>', data)

	if(data === undefined){
		console.log('Potenntial error > oneJoin > undefined')
		return
	}
	
	companies.forEach((company)=>{	
		company.server.clients.forEach((client)=>{
			if( (client.user.right === 'admin' || client.user.right === 'adminGosive') &&  ws != client ){ //
				 
				 client.send(JSON.stringify({ act: 'monitor', data:{elem:'oneJoin', user:data} }))
			}
		})
	})
	

}/*joinNotifyRest*/

//is a admin or adminGosive
function joinAdmin(data, ws, company){   console.log('joinAdmin>')

	if(data.right === 'admin')       { joinAdminReplay(ws, company) }
	if(data.right === 'adminGosive') { joinAdminGosiveReplay(ws)    }	
}

//When an admin join, send all the users of the company
//to the user joined
function joinAdminReplay(ws, company){   console.log('joinAdminReplay>')

	///clean users register
	var activeUsers = []

	company.server.clients.forEach((client)=>{ 
		activeUsers.push(client.user)
	})	

	ws.send( JSON.stringify( {act: 'monitor', data:{elem:'joinAdminReplay', user:activeUsers} } ))

}/*joinAdminReplay*/


//When an Gosive admin join, send all the users of all the companies
//to the user joined
function joinAdminGosiveReplay(ws){  //console.log('joinAdminGosiveReplay>')

	///clean users register
	var activeUsers = []

	//send all the user from all the companies to gosive
	companies.forEach((company)=>{
		company.server.clients.forEach((client)=>{
			activeUsers.push(client.user)
		})			
	})

	ws.send( JSON.stringify({act: 'monitor', data:{elem:'joinAdminReplay', user:activeUsers}} ))

}/*updateGosive*/



//we send to all admins and gosiveAdmin the alert for new user
function leftOne(data){ console.log('leftOne>')

	if(data === undefined){
		console.log('we found an potenntial error with clicent leftOne undefined')
		return
	}
	
	companies.forEach((company)=>{	
		company.server.clients.forEach((client)=>{
			if( client.user.right === 'admin' || client.user.right === 'adminGosive'){

				client.send( JSON.stringify( {act: 'monitor', data:{elem:'leftOne', user:data} } ))
			}
		})
	})
}/*joinNotifyRest*/





function activityUpdates(message, ws, company){ console.log('activityUpdates>')

	message.act = 'getActivityUpdates'

	company.server.clients.forEach((client)=>{
		//only send data to the admin of the company
		if(client.user.right === 'admin' && ws != client){
			client.send( JSON.stringify( {act: 'monitor', data:{elem:'activityUpdates', user:message} } ))
		}
	})

	//companies[0] only have gosive admins
	companies[0].server.clients.forEach((client)=>{

		if(ws != client){
			client.send( JSON.stringify( {act: 'monitor', data:{elem:'activityUpdates', user:message} } ))
		}
	})

}/*sendActivityUpdates*/








module.exports = { 
	join:join,
	oneJoin:oneJoin,
	joinAdmin: joinAdmin,
	leftOne:leftOne,
	activityUpdates:activityUpdates,
}




/*

			ARE THOSE FUNCTIONS ON USE????????????????
			//send user updates to all the  admins for each company
			function updateUser(company){ //console.log('updateUser>')

				///clean users register
				company.activeUsers = []

				//fill Active User will all the users active
				company.server.clients.forEach((client)=>{
					company.activeUsers.push(client.user)
				})

				const update = {act: "updateUser", company: company.name, activeUsers: company.activeUsers }

				company.server.clients.forEach((client)=>{
					if(client.user.right === 'admin') { //only send data to the admin of the company
					   client.send(JSON.stringify(update))
					}
				})
				
				updateUserGosive()

			}


			//When an admin join, send all the users of the company
			function joinNoitifyAdmin(company, data){  //console.log('joinNoitify>', data.right)

				///clean users register
				company.activeUsers = []

				//fill Active User will all the users active
				company.server.clients.forEach((client)=>{
					company.activeUsers.push(client.user)
				})

				const update = {act: "joinNoitify", company: company.name, activeUsers: company.activeUsers }

				company.server.clients.forEach((client)=>{
					if(client.user.right === 'admin') { //only send data to the admin of the company
					   client.send(JSON.stringify(update))
					}
				})

			}
			
*/



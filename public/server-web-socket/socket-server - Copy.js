const {companies} = require('./socket-server-companies')

companies.forEach((company)=>{
	company.server.on('connection', (ws)=>{

			ws.on('message', (message)=>{ message = JSON.parse(message)

				//console.log('message>', message.act)

				switch (message.act){
			    	 case 'join':                 join(message.data);                     break;
			    	 case 'command':              command(message.data);                  break;
			    	 case 'sendActivityUpdates':  sendActivityUpdates(message, company);  break;
			    	 case 'entityChange':         entityChange(message, company);  break;

				}
			})/*message*/



			function join(data){   console.log('join>', data.name)
				
				ws.user = data
				if(data.right === 'admin')       { joinAdminReplay(ws, company) }
				if(data.right === 'adminGosive') { joinAdminGosiveReplay(ws)        }
				joinOne(company, data)

			} /*join*/

			ws.on('close', (message)=>{   leftOne(ws.user)   }) /*close*/

	})/*company*/
})/*companies*/



function entityChange(message, company){ console.log('entityChange>')


	company.server.clients.forEach((client)=>{

			client.send(JSON.stringify(message))
		
	})


}/*sendActivityUpdates*/



//When an Gosive admin join, send all the users of all the companies
function joinAdminGosiveReplay(ws){  //console.log('joinAdminGosiveReplay>')

	///clean users register
	var activeUsers = []

	//send all the user from all the companies to gosive
	companies.forEach((company)=>{
		company.server.clients.forEach((client)=>{
			activeUsers.push(client.user)
		})			
	})

	ws.send( JSON.stringify({act: "joinReplay", user: activeUsers})  )
}/*updateGosive*/



//When an admin join, send all the users of the company
function joinAdminReplay(ws, company){  //console.log('joinAdminReplay>')

	///clean users register
	var activeUsers = []

	company.server.clients.forEach((client)=>{ 
		activeUsers.push(client.user)
	})	

	ws.send( JSON.stringify({act: "joinReplay", user: activeUsers})  )
}/*updateUser*/



//we send to all admins and gosiveAdmin the alert for new user
function joinOne(company, data){ //console.log('joinOne>')

	
	//notify to all the admin of the company for a new user
	company.server.clients.forEach((client)=>{
		
		if(client.user === undefined){
			console.log('we found an potenntial error with clicent user undefined')
			return
		}

		if( client.user.right === 'admin'){
            //we use the same joinReplay, this functin is wating for an array	
			client.send(JSON.stringify({act:'joinOne', user:data}))
		}
	})

	//notify to all the adminGosive  for a new user
	//companies[0] only have gosive admins
	companies[0].server.clients.forEach((client)=>{
		client.send(JSON.stringify({act:'joinOne', user:data}))
	})

}/*joinNotifyRest*/



//we send to all admins and gosiveAdmin the alert for new user
function leftOne(data){ console.log('leftOne>')

	if(data === undefined){
		console.log('we found an potenntial error with clicent leftOne undefined')
		return
	}
	
	companies.forEach((company)=>{	
		company.server.clients.forEach((client)=>{
			if( client.user.right === 'admin' || client.user.right === 'adminGosive'){
				client.send(JSON.stringify({act:'leftOne', user:data}))
			}
		})
	})
}/*joinNotifyRest*/



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

}/*updateUser*/

function sendActivityUpdates(message, company){ console.log('sendActivityUpdates>')

	message.act = 'getActivityUpdates'

	company.server.clients.forEach((client)=>{
		//only send data to the admin of the company
		if(client.user.right === 'admin'){
			client.send(JSON.stringify(message))
		}
	})

	//companies[0] only have gosive admins
	companies[0].server.clients.forEach((client)=>{
		client.send(JSON.stringify(message))
	})

}/*sendActivityUpdates*/


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

}/*updateUser*/



//action send to only one person
function command(data){ //console.log('commandx>', data.id, data.company)

	companies.forEach((company)=>{	
		company.server.clients.forEach((client)=>{ //console.log('command>', data)

			if( client.user.id === data.id &&  client.user.company == data.company){
				client.send(JSON.stringify({act:'command', data}))
			}
		})
	})
} /*join*/



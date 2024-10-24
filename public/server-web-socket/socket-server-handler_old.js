const {companies} = require('./socket-server-companies')


//send the activity change to all the users,
//don't sent to the source one
//When a entity has been added, updated or deleted
function entityUpdate(message, ws, company){  console.log('entityUpdate>', message.sendDetail.to) //message

	
	//to all staff

	if(message.sendDetail.to === 'allStaff'){

		company.server.clients.forEach((client)=>{ //console.log( client.user.name)
			if(client != ws && client.user.typeApp === 'staff'){ console.log('sending to >x', client.user.name)
				client.send(JSON.stringify({act:'entityUpdate', message}))
			}
		})
		
	}


	if(message.sendDetail.to === 'oneUser'){ console.log( 'Send to oneUser', message.sendDetail.id  )

		company.server.clients.forEach((client)=>{ 
			if( client != ws &&  client.user.id === message.sendDetail.id  ){ console.log('sending to ONE USER>x', client.user.name)
			    client.send(JSON.stringify({act: message.act, message}))
			}
		})
		
	}



}/*entityUpdate*/





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


function ping(ws){ //console.log('get ping>>'); 
	
	ws.send(JSON.stringify({act:'pong'}))  
}



module.exports = {
	entityUpdate:entityUpdate,
	command:command,
	ping:ping,

}
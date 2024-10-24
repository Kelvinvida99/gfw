const {companies} = require('./socket-server-companies')


//send the activity change to all the users,
//don't sent to the source one
//When a entity has been added, updated or deleted
function entityUpdate(message, ws, company){ console.log('entityUpdate>')

	company.server.clients.forEach((client)=>{
		if( client != ws ){
			client.send(JSON.stringify({act:'entityUpdate', message}))
		}
	})
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


module.exports = {
	entityUpdate:entityUpdate,
	command:command,

}
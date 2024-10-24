const { companies } = require('./socket-server-companies')
const activity 	 	= require('./socket-server-activity')
const handler 		= require('./socket-server-handler')
//const { Server } = require('socket.io');

companies.forEach((company) => {

	// Manejar eventos de conexión para cada servidor de Socket.IO
	company.server.on('connection', (ws) => {
		console.log("conectado pruebaaa") 

		ws.on('message', (message) => {
		
			message = JSON.parse(message)


			switch (message.act) {

				case 'join': 				 activity.join(message.data, ws, company); break;
				case 'joinAdmin': 			 activity.joinAdmin(message.data, ws, company); break;
				case 'joinAdminDashboardTv': activity.joinAdminDashboardTv(message.data, ws, company); break;
				case 'activityUpdates': 	 activity.activityUpdates(message, ws, company); break;
				case 'entityUpdate': 		 handler.entityUpdate(message.data, ws, company); break;
				case 'command':  			 handler.command(message.data); 
				break;
			//	case 'ping': handler.ping(ws); break;

			}/**/
		})/*message*/

		ws.on('close', (message) => {

			activity.leftOne(ws.user)
			//console.log(ws) 


		}) /*close*/


	});





})/*companies*/





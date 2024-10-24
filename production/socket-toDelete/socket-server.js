const {companies} = require('./socket-server-companies')
const activity   = require('./socket-server-activity')
const handler   = require('./socket-server-handler')

companies.forEach((company)=>{
	company.server.on('connection', (ws)=>{

			ws.on('message', (message)=>{  //console.log('ws', message)

				message = JSON.parse(message)

				switch (message.act){

			    	 case 'join':             activity.join(message.data, ws, company);        break;
			    	 case 'joinAdmin':        activity.joinAdmin(message.data, ws, company);   break;
			    	 case 'activityUpdates':  activity.activityUpdates(message, ws, company);      break;

			    	 case 'entityUpdate':     handler.entityUpdate(message.data, ws, company);         break;
			    	 case 'command':          handler.command(message.data);                  break;

				}/**/
			})/*message*/

			ws.on('close', (message)=>{  

				 activity.leftOne(ws.user)   

			}) /*close*/

	})/*company*/
})/*companies*/





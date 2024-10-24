const avatar           = require('../components/avatar/avatar')
const dtWebSocket      = require('../components/dt/dt-web-socket')
const monitor          = require('../components/monitor/monitor')
const monitorCommand   = require('../components/monitor/monitor-command')
//const userPreference   = require('../js-handler/user-preference')

//tv
const tvDashboardHomePage   = require('../applications/staff/tv/entity/tvDashboardHome/tvDashboardHome-page')


export function wsOnmessage(ev){ 


	const message = JSON.parse(ev);


	if(message.act != "pong" && message.act != "ping" ) 
		console.log('wsOnmessage>>>>xx88', message);

    // on each messanger from the server (including pong) rotate 
    avatar.up() 

	switch (message.act){
    	 case 'pong'         :  return;                                break;
    	 case 'monitor'      :  monitor.start(message.data);           break;
    	 case 'command'      :  monitorCommand.receiver(message);      break;
    	 //case 'entityUpdate' :  dtWebSocket.receiver(message.message); break;
    	 case 'entityUpdate' :  entityUpdate(message); break;

		//tv
    	case 'dashboardTv' :  dashboardTvMonitor.start(message.data); break;



	}
}




function entityUpdate(message){ console.log('Entityupdate##############', )

	//if we are on tv, just update the graphs and return, no table or fullcont
    var storeData = JSON.parse( localStorage.getItem('userPreference') )
	console.log('Entityupdate############## esteeeeee', storeData)
	if(storeData.deviceType === 'tv' ){
		tvDashboardHomePage.update(message)		
		return
	}

	

	console.log('Entityupdate##############', 'entity' )
	dtWebSocket.receiver(message.message)




}



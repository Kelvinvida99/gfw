

const staffMobile     = require ('./mobile/staff-mobile')
const staffDesktop    = require ('./desktop/staff-desktop')
const staffTvStart    = require ('./tv/staff-tv-start')



export function start(settingsData){   //console.log('staff@@@@@@@@@@@@@@@@  >',  settingsData.device.deviceType)


	if(settingsData.device.deviceType === 'desktop'){
 		staffDesktop.start(settingsData)
 		return
	}

	if(settingsData.device.deviceType === 'tv'){
 		staffTvStart.start(settingsData)
 		return
	}

	staffMobile.start(settingsData)


}/**/





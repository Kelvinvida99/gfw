const staff     = require ('./staff/staff')

export function start(settingsData){ //console.log('applications>', settingsData)


	switch (settingsData.typeApp) {
	  	case 'staff':    staff.start(settingsData);     break;
	}
}
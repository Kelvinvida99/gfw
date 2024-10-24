
const activeNoActive    = require('../../../js/active-noactive')
const appnav            = require ('../../../components/appnav/appnav')
const appnavGenerator   = require ('../../../components/appnav/appnav-generator')
const avatar            = require('../../../components/avatar/avatar')
const backControl       = require('../../../js/back-control')
const drawer              = require ('../../../components/drawer/drawer')
const online            = require('../../../js-network/online')
const page              = require ('../../../components/page/page')
const staffAppnav       = require('./staff-appnav')
const websocket         = require ('../../../js-network/web-socket')
const {mobileAdapter}   = require('./staff-mobile-adapter')

import avatarHtml from "./avatar.html";
import drawerHtml from "./drawer.html";
import fabHtml    from "./fab.html";






export function start(settingsData){ console.log('staff mobile>',)
	

	const body = document.body	

	//mobileView
	body.classList.add('body-mobile')

	// //Avatar
	body.insertAdjacentHTML("beforeend", avatarHtml)  
	avatar.generator('avatar', settingsData)

	//drawer
	body.insertAdjacentHTML("beforeend", drawerHtml)  
	drawer.start({act:'generator', data:settingsData})

		
	//fab
	body.insertAdjacentHTML("beforeend", fabHtml)  

	//generate the bottomnav
	mobileAdapter( settingsData )
	appnavGenerator.generator( settingsData, staffAppnav.bodyAdmin(), staffAppnav.appnav() )
	appnav.showLast()
	

	//amenidies
	websocket.init({act:"init"}) 
	backControl.enable()
	online.enable()
	//activeNoActive.enable()

}/**/




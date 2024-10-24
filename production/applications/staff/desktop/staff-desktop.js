const avatar              = require('../../../components/avatar/avatar')
const drawer              = require ('../../../components/drawer/drawer')
const leftnav             = require ('../../../components/leftnav/leftnav')
const leftnavGenrator     = require ('../../../components/leftnav/leftnav-generator')
const page                = require ('../../../components/page/page')
const websocket           = require ('../../../js-network/web-socket')
const backControl         = require ('../../../js/back-control')
const pageMap 			  = require('./staff-page-map')
const settings        = require('../../../js-handler/settings')

import avatarHtml from "./avatar.html";
import drawerHtml from "./drawer.html";
import fabHtml    from "./fab.html";
import appbar     from "./appbar.html";
import leftnavHtml from "./leftnav.html";




export function start(settingsData){  console.log('STAFF DESKTOP ##########################>', pageMap)
	
	//alert('xxxxx');
	const body = document.body	

	//fab 
	 body.insertAdjacentHTML("beforeend", appbar)  

	//Avatar
	body.insertAdjacentHTML("beforeend", avatarHtml)  
	avatar.generator('avatar', settingsData)

	//drawer
	body.insertAdjacentHTML("beforeend", drawerHtml)  
	drawer.start({act:'generator', data:settingsData})
	
	//leftnav
	
	//settingsData.leftnav = settingsRights //remove this 
    leftnavGenrator.insertLeftnav(leftnavHtml)
    leftnavGenrator.controlViewElements(settingsData.leftnav)

	//leftnavGenrator.generator( settingsData, leftnavHtml, leftnavArray )

	//pagecontrol
	settingsData.pageMap = pageMap //remove this 
	backControl.enable()


	//amenidies
	websocket.init({act:"init"}) 
}



const settingsRights = [
	    {entity: "purchase",  privilegeDB: "", privilegeFile: "", privilegeAgrmt: "" },
	    {entity: "sale",      privilegeDB: "readOnly", privilegeFile: "readWrite", privilegeAgrmt: "" },
	    {entity: "inventory", privilegeDB: "readOnly", privilegeFile: "readWrite", privilegeAgrmt: "" },
	    {entity: "customer",  privilegeDB: "readOnly", privilegeFile: "readWrite", privilegeAgrmt: "" },
	    {entity: "accounts",  privilegeDB: "readOnly", privilegeFile: "viewOnly",  privilegeAgrmt: "" },
	
]

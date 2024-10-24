import avatarHtml from "./avatar.html";
import leftnavTvHtml from "./leftnav-tv.html";
import fabHtml    from "./fab.html";
// import tvnav      from "./tvnav.html";
//import page1      from "./page1.html";


const avatar            = require('../../../components/avatar/avatar')
const backControl       = require('../../../js/back-control')
const activeNoActive    = require('../../../js/active-noactive')
const drawer            = require ('../../../components/drawer/drawer')
const online            = require('../../../js-network/online')
const page              = require ('../../../components/page/page')
const staffBottomnav    = require('./staff-bottomnav')
const websocket         = require ('../../../js-network/web-socket')
const leftnavTv         = require ('../../../components/leftnav/leftnav-tv')
const {mobileAdapter}   = require('./staff-mobile-adapter')

const fontIconGenerator = require ('../../../components/font/font-icon-generator')



export function start(settingsData){ console.log('staffApp  TVVVVVVVVVVV >',)
	
	const body = document.body	

	//mobileView
	body.classList.add('body-tv')

	
	body.setAttribute("data-detail", `{ "key": [{"dest":"staffTv", "elem":"typing" }] }`);




	//tvnav
	//body.insertAdjacentHTML("beforeend", tvnav)  
	
	// const tvnavElem = document.getElementById('tvnav-test')
	// tvnavElem.focus() 
	//tvnavElem.classList.add('a-shake')


	// //Avatar
	body.insertAdjacentHTML("beforeend", avatarHtml)  
	avatar.generator('avatar', settingsData)

	// //drawer
	// body.insertAdjacentHTML("beforeend", drawerHtml)  
	
	// //fab
	// body.insertAdjacentHTML("beforeend", fabHtml)  

	// mobileAdapter(settingsData)

	// //generate the bottomnav
	// bottomnavGenrator.generator(settingsData, staffBottomnav.bodyAdmin(), staffBottomnav.body())

	// page.showLastPage()

	// //amenidies
	// websocket.init({act:"init"}) 
	// backControl.enable()
	// online.enable()
	// activeNoActive.enable()


	body.insertAdjacentHTML("beforeend", leftnavTvHtml)  
	//body.insertAdjacentHTML("beforeend", page1)  

	//when the leftnav click the icon, the page will start
	leftnavTv.showLast()


	//amenidies
	websocket.init({act:"init"}) 

	

}/**/



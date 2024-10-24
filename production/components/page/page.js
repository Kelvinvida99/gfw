
const backControl    = require('../../js/back-control')
const click          = require('../../js/click')
const settings       = require('../../js-handler/settings')
const leftnav        = require('../leftnav/leftnav')


/****************ELEMENTS*****************/
var settingsData
var HTMLwasSelected  = false

function HTMLselect(detail){ //console.log('goku init>')
	
	HTMLwasSelected = true
    settingsData    = settings.getData()
}/*init*/
/****************ELEMENTS*****************/


export function start(detail){ // console.log('page start >', detail)

   if(!HTMLwasSelected) {HTMLselect(detail)}

    switch (detail.act){
        case 'show':    show(detail);       break; 
        case 'hide':    hide();         break; 
    }
}



function show(detail){   console.log('page show ######################> ', detail)

	const allPage    = document.getElementsByClassName("page_main");

	//search all page/page-right visible
	for (let i = 0; i < allPage.length; i++) { 
		//hide visible pages
	    if( allPage[i].classList.contains('dn') === false ){  //console.log('page visible', allPage[i].id )

	    	allPage[i].classList.add('dn')
	    	
	    	//right pages ar ingnore on the backcontrol
	    	let isNoRightPage = !allPage[i].id.includes("-right")

	    	if( isNoRightPage ){
				backControl.hashSub({ toHide:`page-${allPage[i].id}` })
	    	}
	    }
	}/**/

	//showById(detail)
	controlSubPageView(detail)


	//we control the leftnav from here too, when a menu bar is click 
	if(detail.leftnav != undefined && detail.leftnav != ''){
		leftnav.selectById(`${detail.leftnav}`)
	}/**/
		

}	



function controlSubPageView(detail){	console.log('page show ######################> ', detail )

	
	const idEntity     = detail.id.replace(/-page/g, '')
	const mapItem      = settingsData.pageMap[idEntity]	
	
	console.log('page show ######################> mapItem ', mapItem )

	const activePage   = mapItem.activePage	
	const mainPage     = mapItem.mainPage
	const parentPage   = mapItem.parentPage


	console.log('page show ######################> detail.from', settingsData.pageMap )

	//if there is an subpage actived, just show it
	if(detail.from === 'leftnav' ){	console.log('page show ######################> from leftnav', mapItem.activePage )

		let hasActivePage = mapItem.activePage != ''
		
		if( hasActivePage ){  //show active page if you uhave
			detail.id = `${activePage}-page`
			showById(detail)
			return
		}
		
		showById(detail) //just show the page
		return
	}/**/

	// console.log('page show ######################> mapItem',  mapItem)	 
	// console.log('page show ######################> parentPage',  parentPage)	 

	//user click the principal on menubar
	if( mainPage === true ){//console.log('page show ######################> MAIN PAGE')	
	    mapItem.activePage = ''
	}

	//user click the principal on menubar
	if( mainPage === false ){//console.log('page show ######################> NO MAIN PAGE')	
	    settingsData.pageMap[parentPage].activePage = idEntity

	}

	//when user click the main page/that is also on the subpage

	// console.log('page show ######################> No from the left', parent )
	// console.log('page show ######################> No from the left', idEntity )

	showById(detail)

	



}




function showById(detail){ console.log('showById> detail', detail )

	//show the dest page
	const elem      = document.getElementById(detail.id)
	elem.classList.remove('dn')

   //add to the url
   backControl.hashAdd({ toShow:`page-${detail.id}` })


	// //if exist a page right, show too
	const elemRight = document.getElementById(`${detail.id}-right`)
	if( elemRight != undefined ){
	    elemRight.classList.remove('dn')
	}



}

function hide(id){  //console.log('hide>')

	const elem = document.getElementById(`page-${id}`)
	elem.classList.add('dn')

	//remove to the url
    backControl.hashSub({ toHide:`page-${id}` })

}


export function hide_page_element(detail){ //console.log('nurses page >', detail)
   
	const data          = settings.getData()
	let previlegeSource = "";
	let privilegeDB     = "";
 
	//admins don't have previlege control
	if(data.right === 'admin' || data.right === 'adminGosive') {
		return
	}
		 
 
	if (data.device.deviceType === 'desktop') { previlegeSource = 'leftnav' }
	else                                      { previlegeSource = 'bottomnav' }
 
	data[previlegeSource].forEach((elem) => {
	   if (elem.entity === detail.dest) {
		  privilegeDB   = elem.privilegeDB
	   }
	})
 
	if( privilegeDB === 'readOnly'){
	   //si el usuario tiene permisos de solo lectura se oculta el boton de agregar nuevo record
	   const page = document.getElementById(detail.id);
	   const addbutton   = page.querySelector('.fab');
	   addbutton.classList.add('dn');
	}
 
 
 }
 






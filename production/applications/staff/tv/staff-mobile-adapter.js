
const staffBottomnav    = require('./staff-bottomnav')


/*
	An staff, could have entities on desktop diferent or not available on mobile
	here we adatap those entities and remove those ones not available on mobile
*/

export function mobileAdapter(settingsData){// console.log('mobileAdapter ####33333333333333333333333333333333333331>  ', settingsData.leftnav, settingsData.leftnav.length)
	
	const bottomMenu = staffBottomnav.bodyAdmin()

	var elemExistOnMobile = false
	//change names

	for(let i=0 ; i < settingsData.leftnav.length; i++){ //console.log('CHECKING', settingsData.leftnav[i].entity )

		//console.log('1>')
		switch(settingsData.leftnav[i].entity) {
		   case 'home': settingsData.leftnav[i].entity = 'homestaff' ; break;
		}

		//if the element don't exist on the bodyadmin menu, removed
		elemExistOnMobile = false

		bottomMenu.forEach((bodyAdmin)=>{ //find it
			if( bodyAdmin === settingsData.leftnav[i].entity ){ //console.log('Exist on mobile', settingsData.leftnav[i].entity )
				elemExistOnMobile = true
			} 
		})	

		if( elemExistOnMobile === false ){ ///remove
			settingsData.leftnav[i].entity = 'disabledOnMobile'
		}


	}/**/


}/**/


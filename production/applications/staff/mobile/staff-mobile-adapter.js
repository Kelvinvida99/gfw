
const staffBottomnav    = require('./staff-appnav')


/*
	An staff, could have entities on desktop diferent or not available on mobile
	here we adatap those entities and remove those ones not available on mobile
*/

export function mobileAdapter(settingsData){

	const bottomMenu = staffBottomnav.bodyAdmin()

	var elemExistOnMobile = false
	//change names

	for(let i=0 ; i < settingsData.leftnav.length; i++){ //console.log('CHECKING', settingsData.leftnav[i].entity )

		//same entity with diferent table and fullcont on mobile
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

		//ADD the disabled on mobile tag, to be ignore for the generator
		if( elemExistOnMobile === false ){ ///remove
			settingsData.leftnav[i].entity = 'disabledOnMobile'
		}


	}/**/

	 //console.log('mobileAdapter ####33333333333333333333333333333333333331>  ', settingsData.leftnav )

}/**/



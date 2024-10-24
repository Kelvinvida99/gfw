

					

export  function start( bottomnavAdmin, bottomnavBody ){ console.log('nav Generator> 2 ', )//data.bottomnav

	//insert leftnav menu	
	const bodyHtml = document.body	
	bodyHtml.insertAdjacentHTML("beforeend", `<div class="appnav " id="appnav"> </div>`) 


	var body = ``
	const appnav  = document.getElementById('appnav')

	for ( let i = 0; i < bottomnavAdmin.length; i++) {
		  body += bottomnavBody[bottomnavAdmin[i]]
	}

	body += `<span class="indicator"><div class="circle"></div></span>`

  	//fill the leftmenu
  	appnav.innerHTML = body




}/**/




export function generator(data, bottomnavAdmin, bottomnavBody ){ 

	//insert leftnav menu	
	const bodyHtml = document.body	
	bodyHtml.insertAdjacentHTML("beforeend", `<div class="appnav " id="appnav"> </div>`) 

	var body = ``
	const appnav  = document.getElementById('appnav')
	

	//print admin menu
  	if( data.right === 'admin' || data.right === 'adminGosive'  ) {
	 
		for (let i = 0; i < bottomnavAdmin.length; i++) {
			  body += bottomnavBody[bottomnavAdmin[i]]
		}

		body += `<span class="indicator"><div class="circle"></div></span>`

	  	//fill the leftmenu
	  	appnav.innerHTML = body
	  	return 
	}




	///print user menu
	for( let i=0; i < data.leftnav.length; i++){ //console.log( 'i', i, data.bottomnav[i] )
	  	   
	  	   let userHasEntityRights = data.leftnav[i].privilegeDB != 'none'

	  	   if( data.leftnav[i].entity != 'disabledOnMobile' && userHasEntityRights){
	  	   	   body += bottomnavBody[data.leftnav[i].entity]
	  	   }
	} 

	body += `<span class="indicator"><div class="circle"></div></span>`
  

    //fill the leftmenu
    appnav.innerHTML = body



}/**/

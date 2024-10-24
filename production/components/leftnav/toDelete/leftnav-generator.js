

const logo = `<div class="logo" 
					data-detail='{"click": [ 
					{"dest":"ripple" }, 
					{"dest":"drawer", "act":"show" }  ] }'  ></div>`


export function generator(data, leftnavBodyAdmin, leftnavBody){ 


	// console.log('leftnav Generator>x555555 ', leftnavBodyAdmin,  )
	// console.log('leftnav Generator>x555555 ', leftnavBody,  )
	//  console.log('leftnav Generator>x555555 ', data,  )

	 //data.right='user'///red red force de miguel

	//insert leftnav empy
	const bodyHtml = document.body	
	bodyHtml.insertAdjacentHTML("beforeend", '<div class="leftnav" id="leftnav" ></div>') 
  	
  	var body = ``
  	const leftnavHtml   = document.getElementById('leftnav')
	
  	//insert the logout
  	const logout = leftnavBody['logout']  	
	bodyHtml.insertAdjacentHTML("beforeend", logout )


	//if you're admin, generate the leftnav with all the components
  	if(data.right === 'admin' || data.right === 'adminGosive') {// console.log('is an admin')
	  
		for (let i=0; i < leftnavBodyAdmin.length; i++) {
			body += leftnavBody[leftnavBodyAdmin[i]]
		}

	  	//fill the leftmenu
	  	leftnavHtml.innerHTML = body
	  	//leftnavHtml.insertAdjacentHTML("beforeend", logo) 
	  	return 
	}/**/

	//console.log('NOT is an admin')
	 
	//Select the html elements
	for( let i=0; i < data.leftnav.length; i++ ){     //console.log( 'i', data.leftnav[i].entity) 	 	
		 
		 let userHasEntityRights = data.leftnav[i].privilegeDB != 'none'

		if( userHasEntityRights ){
		    body += leftnavBody[data.leftnav[i].entity]	 		 	
		}
	}/**/ 	  	
	

	// body += `<span class="indicator"><div class='circle'></div></span>`
	
  	//fill the leftmenu
  	leftnavHtml.innerHTML = body
  	leftnavHtml.insertAdjacentHTML("beforeend", logo) 

}/**/



			



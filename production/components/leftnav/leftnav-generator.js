

const logo = `<div class="logo" 
					data-detail='{"click": [ 
					{"dest":"ripple" }, 
					{"dest":"drawer", "act":"show" }  ] }'  ></div>`


//we add the leftnav complete, and later remove all the elements without access
export function insertLeftnav(leftnavHtml){ 
	
	const bodyHtml = document.body	
	bodyHtml.insertAdjacentHTML("beforeend", leftnavHtml) 


}/**/

//we add the leftnav complete, and later remove all the elements without access
export function controlViewElements(settingsRights){ 
	// console.log("controlViewElements",settingsRights)
	settingsRights.forEach((elem)=>{ //console.log('foreach', elem.privilegeDB)
		if( elem.privilegeDB === ""){
			let elemLeft = document.getElementById(`leftnav-${elem.entity}-page`)	
			elemLeft.classList.add('dn')
		}
	})


}/**/





/****************code no on usage*/



//those function aren't being used
//we add the leftnav complete, and later remove all the elements without access
export function generator(data, leftnavHtml, leftnavArray){ 

	// console.log('Rights', data.right)
	// console.log('Rights', data.leftnav)

	const bodyHtml = document.body	
	bodyHtml.insertAdjacentHTML("beforeend", leftnavHtml) 

  	//don't remove if the user is an admin
	if(data.right === 'admin' || data.right === 'adminGosive') { return }

	//find elements without right, to  remove 
	for (let i=0; i < leftnavArray.length; i++) { //console.log('i', leftnavArray[i])

		let userHasEntityRights = false
		
		for (let j=0; j < data.leftnav.length; j++) { 
			if( leftnavArray[i] === data.leftnav[j].entity){ 
				userHasEntityRights = true
			}
		}

		
		if(userHasEntityRights === false){console.log( 'no exist',  leftnavArray[i])
			const elemToRemove =  document.getElementById(`leftnav-${leftnavArray[i]}-page`)
			elemToRemove.remove()
		}

	}/*for*/


}/**/




export function generatorOld(data, leftnavBodyAdmin, leftnavBody){ 


	console.log('leftnav Generator>x555555 ', leftnavBodyAdmin,  )
	console.log('leftnav Generator>x555555 ', data.leftnav,  )

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
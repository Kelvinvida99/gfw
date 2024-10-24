
const tabObj   = require('./tabObj').inf

export function mov (ev){ 

	tabObj.appbarTop = parseInt(tabObj.appbar.style.top.replace('px', ''))

	if (tabObj.appbarTop <= 0 && tabObj.appbarTop > -28){ //tapbar = 56/2 → 28 
		tabObj.appbar.setAttribute("style", `top:0px`)
		tabObj.page.setAttribute("style", `top:56px;height:${(tabObj.screenHeight-56)}px `)
	

	}else{
		tabObj.appbar.setAttribute("style", `top:-56px`)
		tabObj.page.setAttribute("style", `top:0px;height:${(tabObj.screenHeight)}px `)
	}


	tabObj.addAnimation(ev)


}


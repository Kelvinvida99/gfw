const tabObj         = require('./tabObj').inf

export function mov(ev){  
	///ERROR VERTICAL MOVE HAVE BEEN DISABLED :)
	return

//console.log(tabObj.page)

	//was the appbar visible
	if(tabObj.distY < 0 && tabObj.distY >= -56 && tabObj.appbarTop === 0){ //up movement

		tabObj.appbar.style.top  = `${tabObj.distY}px`
		tabObj.page.style.top    = `${56+tabObj.distY}px`
		tabObj.page.style.height = `${(tabObj.distY*-1)+(tabObj.screenHeight-56)}px`
		return					   	
	}

	//was the appbar Hidde
	if(tabObj.distY >= 0 && tabObj.distY <= 56 && tabObj.appbarTop === -56){
		tabObj.appbar.style.top    =  `${-56+tabObj.distY}px`
		tabObj.page.style.top      =  `${tabObj.distY}px`
		tabObj.page.style.height   =  `${(tabObj.screenHeight)-(tabObj.distY)}px`
		return
	}
}

//weird, nothing works with set attribute :(


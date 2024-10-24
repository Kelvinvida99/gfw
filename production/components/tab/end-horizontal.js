
const tabObj   = require('./tabObj').inf
const tab      = require('./tab')

export function mov   (ev){ 

	// console.log('tabObj.tabLeft', tabObj.tabLeft)   

	tabObj.addAnimation(ev)

	const elem = ev.target

	if( Math.abs(tabObj.distX) > tabObj.screenWidth/5 ){
		
		if(tabObj.distX>0){ //right movement
			if(tabObj.tabLeft === 0){return}
				tabObj.tabLeft = tabObj.tabLeft + tabObj.screenWidth
				elem.parentElement.setAttribute("style", `left:${tabObj.tabLeft}px`)
				tabObj.indicator.setAttribute("style", `left:
					${(tabObj.tabLeft/tabObj.tabPage.childElementCount)*-1}px`) //move span
				tab.select(tabObj.indicator, (tabObj.tabLeft/tabObj.screenWidth)*-1)//select right tab
				return
				
		
		}else{       //left movement
			 if(tabObj.tabLeft === tabObj.tabLeftMax){return}
			
			 tabObj.tabLeft = tabObj.tabLeft+((tabObj.screenWidth)*-1)
			 elem.parentElement.setAttribute("style", `left:${tabObj.tabLeft}px`)
			tabObj.indicator.setAttribute("style", 
			 	`left:${(tabObj.tabLeft/tabObj.tabPage.childElementCount)*-1}px`) //move span
			 tab.select(tabObj.indicator, (tabObj.tabLeft/tabObj.screenWidth)*-1)//select right tab
			 return
		}
		
	}else{ //return to the origin, for short swipes
		elem.parentElement.setAttribute("style", `left:${tabObj.tabLeft}px`)
		tabObj.indicator.setAttribute("style", `left:
			${(tabObj.tabLeft/tabObj.tabPage.childElementCount)*-1}px`) //move span
		tab.select(tabObj.indicator, (tabObj.tabLeft/tabObj.screenWidth)*-1)//select right tab

		return
	}

}




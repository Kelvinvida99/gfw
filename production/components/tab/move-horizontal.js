const tabObj         = require('./tabObj').inf

export function mov(){


	if (tabObj.distX <= 0 ){ //left swipe
		
		if (tabObj.distX+tabObj.tabLeft < tabObj.tabLeftMax) { // deny - mov > tabLeftMax margin
			 tabObj.tabPage.setAttribute("style", `left:${(tabObj.tabLeftMax)}px`) 
			 tabObj.indicator.setAttribute("style", `left:
			 	${(tabObj.tabLeftMax/tabObj.tabPage.childElementCount)*-1}px`) //move span

		}else{
			 tabObj.tabPage.setAttribute("style", `left:${(tabObj.distX+tabObj.tabLeft)}px`)
			 tabObj.indicator.setAttribute("style",   `left:
			 	${((tabObj.distX+tabObj.tabLeft)/tabObj.tabPage.childElementCount)*-1}px`) //move span

		}

	}else{ //right swipe

		if (tabObj.distX+tabObj.tabLeft >= 0) { // deny + mov > 0 margin
			 tabObj.tabPage.setAttribute("style", `left:0px`) 
			 tabObj.indicator.setAttribute("style", `left:0px`) 

		}else{
			tabObj.tabPage.setAttribute("style", `left:${tabObj.distX+tabObj.tabLeft}px`)
			tabObj.indicator.setAttribute("style", `left:
				${(tabObj.distX+tabObj.tabLeft)/tabObj.tabPage.childElementCount*-1}px`)//move span
		}		

	}

}


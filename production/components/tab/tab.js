
const selector = require('../../js-handler/selector')
const tabObj   = require('./tabObj').inf

//when user click one tab
export function mov(ev){ console.log('tab move')
	//tabMovPage(ev)
    
	tabObj.initClick(ev)//initClick, get actual tabbar

	//find child postion to mov the page
	const position = Array.prototype.indexOf.call(tabObj.tabBar.children, ev.target)
	//move page
	//debugger
	tabObj.tabPage.setAttribute('style', `left:-${position*tabObj.screenWidth}px`)

	//move the Indicator
	const mov  = parseInt(ev.target.getBoundingClientRect().x)
	
	tabObj.indicator.setAttribute("style", `left: ${(tabObj.tabBar.offsetWidth/(tabObj.tabBar.childElementCount-1))*position}px`)	
	//tabInf.indicator.setAttribute("style", `left: ${(ev.target.offsetWidth)*position}px`)	

	//save the new position from tab, allow tab and touch work togethers. 
	tabObj.tabLeft = (position*tabObj.screenWidth*-1)
	select(ev.target, position)


}

//remove the select from all tab sibling
export function select(tabDiv, num){

	selector.siblingRemoveClass(tabDiv, 'select')
	var i = 0

	//select the right tab
	for (let item of tabDiv.parentElement.children) {
		if (i === num){
			item.classList.add('select')
			return
		}

		i++
	}	

}



export function moveToBeginning(fullCont){ //console.log('moveToBeginning##############->')
  
  const tabPage      = fullCont.querySelector('.tab-page')
  const pages        = fullCont.querySelectorAll('.tab-page .sub-page')
  const tabPageLocal = fullCont.querySelectorAll('.page .tab-page')
  const indicator    = fullCont.querySelectorAll('.tab .indicator')
  const div          = fullCont.querySelectorAll('.tab div') //tabs

  //set the all the pages on the top
  pages.forEach((item)=>{
    item.scrollTop = 0
  })

  div.forEach((item)=>{//Remove the select of all the tabs
    item.classList.remove('select')
  })

  tabPage.setAttribute("style", "left: 0px") //indicator 0
  div[0].classList.add('select')                     //show first tabs
  indicator[0].setAttribute("style", "left: 0px");   //indicator 0
  tabPageLocal[0].setAttribute("style", "left: 0px") //indicator 0




}

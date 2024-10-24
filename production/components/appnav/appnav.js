const selector = require('../../js-handler/selector')
const settings = require('../../js-handler/settings')


var indicator  
var HTMLwasSelected = false

function HTMLselect(){ //console.log('HTMLselect')

  const appnav  = document.getElementById('appnav')
  indicator = appnav.querySelector('.indicator')
  HTMLwasSelected = true
}


export function select (ev){ 

  if(!HTMLwasSelected) { HTMLselect() }

	const elem = ev.target
	if( elem.classList.contains('select') ){
		return
	}

	selector.siblingRemoveClass(elem, 'select')
	elem.classList.add('select')	

	//move the indicator
  const bounding = elem.getBoundingClientRect() //get element position
  indicator.style.left =`${bounding.left}px`


	lastSelected(elem.id)

}



export function selectById(id){ 

	const elem = document.getElementById(id)
	selector.siblingRemoveClass(elem, 'select')
	elem.classList.add('select')

}


export function selectFirst(){  //console.log('selectFirst')

	const appnav  = document.getElementById('appnav')
	if( appnav === null ) { return }
		
	const div = appnav.querySelectorAll('div')

	div[0].click()

}


export function clickById(id){  //console.log('clickById bottomnav')

	const elem = document.getElementById(id)
	if( elem === null ) { return }

	elem.click()

}



export function showLast(){// console.log('showLast')

	const storageData  = JSON.parse( localStorage.getItem('appnav'))
  const settingsData = settings.getData()


  //no previous data, just click the first
  if(storageData === null ){ //console.log('showLast NO PREVIOUS DATA>>>>')
      selectFirst()
      return
  }

  //is the same users, load the last page     
  if( storageData.userId === settingsData.id && storageData != null){  //console.log('showLastPage YESS PREVIOUS DATA>>>>')

		const elem = 	document.getElementById(storageData.elemId)
	
		if(elem != undefined){
			 elem.click()
			 return 
		} 
     
  }/**/


  selectFirst()

}


function lastSelected(elemId){

    const settingsData = settings.getData()

		localStorage.setItem('appnav', JSON.stringify({ elemId:elemId, userId: settingsData.id }))

}


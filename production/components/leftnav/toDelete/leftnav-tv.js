const selector = require('../../js-handler/selector')
const settings = require('../../js-handler/settings')


var indicator  
var HTMLwasSelected = false
var leftnavTv
var leftnavAllDiv
function HTMLselect(){ //console.log('HTMLselect') 

  leftnavTv       = document.getElementById('leftnavTv')
  leftnavAllDiv   = leftnavTv.querySelectorAll('div')

  HTMLwasSelected = true
}



export function start(detail){   //console.log('leftnav>', detail) 
      obj[detail.act].start(detail)
}/**/


const obj = {
      select:         { start: (detail)=>{  select(detail.ev)              }},
}/**/


export function expand (ev){  //console.log('expand leftnav')
	
 	const cont = ev.target.closest('.cont')
 	cont.classList.toggle('cont_expad')
	
}


export function select (ev){ 
	
  if(!HTMLwasSelected) { HTMLselect() }

	const elem = ev.target
	
	if( elem.classList.contains('select') ){
		return
	}
	
	 
	leftnavAllDiv.forEach((elemAll)=>{
		elemAll.classList.remove('select')
	})


	elem.classList.add('select')

	//move the indicator
  // const bounding = elem.getBoundingClientRect() //get element position
  // indicator.style.top =`${bounding.top}px`

	lastSelected(elem.id)
	
}



export function selectFirst(){  console.log('selectFirst', leftnavAllDiv[0])

	
	leftnavAllDiv[0].click()

}


export function showLast(){ //console.log('showLast')

	if(!HTMLwasSelected) { HTMLselect() }

  const storageData  = JSON.parse( localStorage.getItem('leftnavTv'))
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
		
  }/*if*/

  selectFirst()

}


function lastSelected(elemId){

    const settingsData = settings.getData()

		localStorage.setItem('leftnavTv', JSON.stringify({ elemId:elemId, userId: settingsData.id }))

}







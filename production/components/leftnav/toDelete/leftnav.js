const selector = require('../../js-handler/selector')
const settings = require('../../js-handler/settings')


var indicator  
var HTMLwasSelected = false
var leftnav
var leftnavAllDiv

function HTMLselect(){ //console.log('HTMLselect') 

  leftnav         = document.getElementById('leftnav')
  leftnavAllDiv   = leftnav.querySelectorAll('div')
  indicator       = leftnav.querySelector('.indicator')

  HTMLwasSelected = true
}



export function start(detail){   //console.log('leftnav>', detail) 

      obj[detail.act].start(detail)

}/**/


const obj = {
      select:         { start: (detail)=>{  select(detail.ev)              }},
      expand:         { start: (detail)=>{  expand(detail.ev)              }},

}/**/


export function expand (ev){  console.log('expand leftnav')
	
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

export function selectById(id){  //console.log('leftnav selectById') 

	const elem = document.getElementById(id)

	elem.classList.add('select')

}

export function clickById(id){  // console.log('clickById leftnav')

	const elem = document.getElementById(id)

	// console.log('clickById leftnav', elem)
	if( elem === null || elem === undefined ) {return}
	elem.click()
	
}

export function selectFirst(){  console.log('selectFirst')

	const leftnav  = document.getElementById('leftnav')

	if( leftnav === null ) { return }
	
	//find the first cont	
	const div       = leftnav.querySelectorAll('.cont')
	const firstCont = div[0].querySelectorAll('div')
	
	firstCont[0].click()

}


export function showLast(){ //console.log('showLast')

  const storageData  = JSON.parse( localStorage.getItem('leftnav'))
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
			 elem.closest('.cont').classList.add('cont_expad')
			 return 
		} 
		
  }/*if*/

  selectFirst()

}


function lastSelected(elemId){

    const settingsData = settings.getData()

		localStorage.setItem('leftnav', JSON.stringify({ elemId:elemId, userId: settingsData.id }))

}







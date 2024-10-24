const {changeSVG}        = require('../../js-handler/graphic')
const {siblingFindClass} = require('../../js-handler/selector')

export function generator(detail, data, autocompleteSelector){  //console.log('autocomplete generator>', data )

 	var options    = ''

 	if(data.length === 0){ 
 		autocompleteSelector.innerHTML = `<label>No result</label>`
 		return
 	}

    //data[0].avatar = 'css/img/pic/goku.png'
	//if the server send the avatar, prepar the countainer
	const hasAvatar = data[0].avatar != undefined
	if( hasAvatar ){ autocompleteSelector.classList.add('autocompleteSelector-withAvatar')    }
 	else           { autocompleteSelector.classList.remove('autocompleteSelector-withAvatar') }

 	data.forEach((elem)=>{

		if (!elem.hasOwnProperty('otherField')){//TEMPORAL,  HASTA K TODOS LOS QUERIES SE REGULEN K MANDEN EL CAMPO 'otherField'
			elem.otherField = '{}';
		}

 		options += `<label   data-detail='{"click": 
 			[{"dest":"autocomplete",  "act":"select", 
	 		  "entity":"${detail.entity}", 
	 		  "displayText":"${elem.displayText}", 
	 		  "id":"${elem.id}",
			  "otherField":${elem.otherField},
	 		  "parent":"${detail.parent}"
	 		   }] }' > `
	 	
	 	if(hasAvatar) { options += `<div style="background-image: url('${elem.avatar}');"></div>`  }

	 	options += `${elem.displayText} </label>`

 	})

 	//selector.innerHTML = options
 	autocompleteSelector.innerHTML = options 


}



export function fill(detail, autocompleteSelector){  //console.log('autocomplete fillMT #####>', detail)
	
	var parent      = ''
	var chips       = ''
	var ids         = []


	//vale
	if(detail.value.length === 0 )      { return }
	//[{id: null, displayText: null}] when is empty
	if(detail.valueFull[0].id === null ){ return }

	//find the input from html or from ID
	if(detail.html != undefined){
		parent    = detail.html
	
	}else{  parent = document.getElementById(detail.parent) }
	 

	const chipCont = parent.querySelector('.chip-cont')	 
	const input    = parent.querySelector('input')
	const otherField  = parent.querySelector('.otherField')

	//clean selector
	//autocompleteSelector.innerHTML = ''

	detail.valueFull.forEach((line)=>{
		   
		chips += chipGenerate(line.displayText, line.id)
		ids.push(line.id)
			//Other field - if exist, set the attricute and click the element
		if(otherField != undefined){
			otherField.setAttribute('otherField', JSON.stringify(line.otherField) )
			//otherField.click()
		}

	})

	chipCont.insertAdjacentHTML('beforeend', chips)
	parent.setAttribute('selected', JSON.stringify(ids))















}/**/


export function selecting(detail, autocompleteSelector){  //console.log('selecting>',  detail.ev.key  )
	
		const input         = detail.ev.target
		const childs        = autocompleteSelector.querySelectorAll('label')
		const childSelected = {elem: undefined, index: undefined}


		//select is empty, return
		if(childs.length === 0){ return }


		for(let i = 0; i < childs.length; i++ ){
			if( childs[i].classList.contains('selected') ){
				childSelected.elem  = childs[i]
				childSelected.index = i
			}
		}
		
		
		if( detail.ev.key === 'ArrowDown' ){
			down(childs, childSelected)
		}

		if( detail.ev.key === 'ArrowUp' ){
			up(childs, childSelected)
		}

		//keep cursro at the begining
		input.selectionStart = input.selectionEnd = 10000
}/**/



//control the down movement
function down(childs, childSelected){   //console.log('down>',  childSelected  )
	
		if(childSelected.elem === undefined){
			childs[0].classList.add('selected')
			return
		}

		childSelected.elem.classList.remove('selected')

 		//we have a next to select?
		if(childSelected.index + 1 < childs.length){
			childs[childSelected.index + 1].classList.add('selected')
			return
		}
}



//control the down movement
export function up(childs, childSelected){  // console.log('ArrowUp>',  childSelected  )
	
		if(childSelected.elem === undefined){
			childs[childs.length-1].classList.add('selected')
			return
		}

		childSelected.elem.classList.remove('selected')

 		//we have a next to select?
		if(childSelected.index - 1 >= 0){
			childs[childSelected.index - 1].classList.add('selected')
			return
		}
}


export function enter(detail, autocompleteSelector){  //console.log('enter>',  detail.ev.key  )

	const input         = detail.ev.target
	const childs        = autocompleteSelector.querySelectorAll('label')

	//select is empty, return
	if(childs.length === 0){ return }

	for(let i = 0; i < childs.length; i++ ){
		if( childs[i].classList.contains('selected') ){
			
			//just click it, select continue with the work
			childs[i].click()
		}
	}
}



export function select(detail, autocompleteSelector){ //console.log('!!!!!autocomplete selected>', detail)


	const parent      = document.getElementById(`${detail.parent}`)
	const input       = parent.querySelector('.elem')
	const chipCont    = parent.querySelector('.chip-cont')
	const chip        = chipGenerate(detail.displayText, detail.id)
	var   selected    = JSON.parse( parent.getAttribute('selected') )
	const otherField  = parent.querySelector('.otherField')
	
	//value was selecteed
	if( selected.includes(detail.id) ){ 
		//console.log('value already selected')
		return 
	}

	//input.value = detail.ev.target.textContent 
    selected.push(detail.id)
    parent.setAttribute('selected', JSON.stringify(selected) )

	//Other field - if exist, set the attricute and click the element
	if(otherField != undefined){
    	otherField.setAttribute('otherField', JSON.stringify(detail.otherField) )
		otherField.click()
	}


	chipCont.insertAdjacentHTML("beforeend", chip)   

	//clean selector
	autocompleteSelector.innerHTML = ''
	input.value = ''





}

function chipGenerate(displayText, id){
	return `<div class="chip" title='${displayText}'> 
			   <label>${displayText}</label> 
			   <span title='Remove' data-detail='{"click": [ {"dest":"autocomplete", "act":"remove", "id":"${id}"}] }' ></span> 
			</div>`
}

//remove the chip, and remove the id from the parent array
export function remove(detail, autocompleteSelector){  //console.log('autocomplete remove>', detail )
	
		const chip        = detail.ev.target.parentElement	
		const parent      = chip.parentElement.parentElement
		var selected      = JSON.parse( parent.getAttribute('selected') )
            selected      = removeFromArray(selected, detail.id)
		const otherField  = parent.querySelector('.otherField')

		if(otherField != undefined){ // if exist cleanUp
			parent.setAttribute('selected', JSON.stringify(selected) )
			parent.setAttribute('otherField', '{}' )
		}
	

		chip.remove()

}


function removeFromArray(arr, value){
  
  var index = arr.indexOf(value);
 
  if (index > -1) {
    arr.splice(index, 1);
  }
  
  return arr

}


export function clean(detail, autocompleteSelector){  //console.log('autocomplete clean @@@@@>', )
	
	var input 
	var parent 

	//find the input from html or from ID
	if(detail.html != undefined){
		parent    = detail.html
	
	}else{  parent = document.getElementById(detail.id) }


	// console.log('autocomplete clean @@@@@>', parent)

	const chipCont = parent.querySelector('.chip-cont')	 
	      input    = parent.querySelector('input')


	chipCont.innerHTML = ''

	if( autocompleteSelector != undefined ){
 	    autocompleteSelector.innerHTML = ''
	}


	//clean input value
	parent.setAttribute("selected", "[]")
    input.value   = ''

}





export function getValue(html){// console.log('autocomplete getValueComposed ', html )
	
	const selected     =  html.getAttribute('selected')
	const selectedObj  =  JSON.parse( selected ) 

	//console.log('autocomplete getValue  ', selected  )
	//console.log('autocomplete getValue J', JSON.parse( selected ) )

	return  selectedObj

}/**/



export function position(ev, autocompleteSelector){ //console.log('position ev', ev)

    var px=0; 
    var py=0; 
   // const ev = event.getEv()
    //in case of page reload, the ev is undefined, just return
    if  (ev === undefined || ev === "") {return}

    const elem     = ev.target

    const bounding = elem.getBoundingClientRect() //get element position

    //get X position → respect the edges of screem
    if ( bounding.left  + menu.offsetWidth > window.innerWidth ){
            px = bounding.left -  menu.offsetWidth  
    }else { px = bounding.left;}  


    //get Y position → respect the edges of screem
    if ( bounding.top +  menu.offsetHeight >  window.innerHeight ){
           py = bounding.top -  menu.offsetHeight  }
    else { py = bounding.top +  elem.offsetHeight  }

    autocompleteSelector.style.left = `${px}px`
    autocompleteSelector.style.top  = `${py}px`

}


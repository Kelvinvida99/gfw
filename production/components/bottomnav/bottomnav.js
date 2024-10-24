const selector = require('../../js-handler/selector')

export function select (ev){ //console.log('bottomnav>', ev.target)

	selector.siblingRemoveClass(ev.target, 'select')
	ev.target.classList.add('select')	
}

export function selectById(id){

	const elem = document.getElementById(id)
	selector.siblingRemoveClass(elem, 'select')
	elem.classList.add('select')
}


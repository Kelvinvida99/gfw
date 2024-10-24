

//find sibling after or before
export function siblingFindTag(elem, attribute){ 
	//console.log('on findSibling', attribute)
	const allSibling = elem.parentNode.children //get all the siblings	
	attribute = attribute.toUpperCase() 
	for (let item of allSibling) {
   		 if(item.tagName === attribute){
   		 		return item;
   		 }
	}	
	
}



export function siblingFindClass(elem, attribute){
	const allSibling = elem.parentNode.children //get all the siblings	
	for (let item of allSibling) {
  		if(item.classList.contains(attribute) && item != elem){
  			return item
  		} 
	}
}


export function siblingRemoveClass(elem, attribute){ 
	const allSibling = elem.parentNode.children //get all the siblings	
	for (let item of allSibling) {
		item.classList.remove(attribute)
	}
	return		
}




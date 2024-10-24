const dbRequest   = require('../../js-network/db-request')
const debounce    = require('../../js-handler/debounce')
const handler     = require('./autocomplete-handler')
const snack       = require('../snack/snack')
const {changeSVG} = require('../../js-handler/graphic')
const {siblingFindClass} = require('../../js-handler/selector')

/****************ELEMENTS*****************/
var autocompleteSelector = false
var scrimAutocomplete    = false
var HTMLwasSelected      = false
var acHtml = { selector:'', scrim:''}

function HTMLselect(){ 

 	autocompleteSelector = document.getElementById('autocompleteSelector')
 	scrimAutocomplete    = document.getElementById('scrim_autocomplete')
 	acHtml.selector      = document.getElementById('autocompleteSelector')
 	acHtml.scrim         = document.getElementById('autocompleteSelector')

 	HTMLwasSelected      = true
}/**/

/****************ELEMENTS*****************/



export function start(detail){ console.log('autocomplete', detail.act )
    
    if(!HTMLwasSelected) { HTMLselect(detail) }

    switch (detail.act){
        case 'typing':    typing(detail);                 break; 
        case 'click':     request(detail);                break; 
        case 'clean':     handler.clean(detail, autocompleteSelector);          break; 
        case 'remove':    handler.remove(detail, autocompleteSelector);          break; 
        case 'fill':      handler.fill(detail, autocompleteSelector);           break; 
        case 'hide':      hide(detail);                   break; 
        case 'getValue':  return handler.getValue(detail);break; 

        case 'select':    
        		handler.select(detail, autocompleteSelector);
        		hide();
        		break; 

    }  
}


function typing(detail){ //console.log('autocomplete typing>', detail.ev.key )
    
    switch (detail.ev.key){
        case 'ArrowUp':    handler.selecting(detail, autocompleteSelector);  break; 
        case 'ArrowDown':  handler.selecting(detail, autocompleteSelector);  break; 
        case 'Enter':      handler.enter(detail, autocompleteSelector);      break; 
        case 'ArrowRight': return;  				   break; 
        case 'ArrowLeft':  return;                     break; 

 
        default:  
        debounce.start(()=>{
        	request(detail)
        })
    }  
}



function request(detail){ console.log('autocomplete request>', )

	const input         = detail.ev.target
	const parent        = input.parentElement
	const value         = detail.ev.target.value
	const selectorChild = autocompleteSelector.querySelectorAll("label")


	if( cancelRequest(parent) ){ return  }

	detail.inf  = {
		entity: detail.entity,
		mainFilter: {
			fields: detail.mainFilter,
			values: []
		},
		andFilter:{
			fields: ['entity', 'id'],
			values: []			
		}
	}


	detail.mainFilter.forEach(()=>{
		detail.inf.mainFilter.values.push(value)
	})

	//we use acMoreData to add more values to the autocomplete field and data
	// detail.acMoreData = { fields:[], values: [] }
	if(detail.acMoreData != undefined){   

		detail.acMoreData.fields.forEach((value)=>{
			detail.inf.mainFilter.fields.push(value)
		})

		detail.acMoreData.values.forEach((value)=>{
			detail.inf.mainFilter.values.push(value)
		})

	}

	getFullcontData(detail)

	detail.inf.mainFilter = JSON.stringify( detail.inf.mainFilter  )
	detail.inf.andFilter  = JSON.stringify( detail.inf.andFilter   )
	

	//console.log('autocomplete acMoreData>', detail.inf )


 	searchDB(detail)
      .then((result)=>  { // console.log('result autocomplete>', result.data)

      	handler.generator(detail, result.data, autocompleteSelector )
      	show(detail)

      }).catch((error) => {   //console.log('autocomplete error', error)

     }) 

}


async function searchDB(detail){  //console.log('searchDB>', detail.inf)

   const result = await dbRequest.start(detail, 'server/php/sql/autocomplete.php' ) //do the insert

   if(result.status != "ok"){ throw ( result ) }

   return result
}


//From the Fullcont we get the entity and the id, 
//each fullcont should have 
//add entity to each fullcont data-entity="patients" and to wiki too
function getFullcontData(detail){  //console.log( 'getFullcontData ##########', detail.inf.andFilter  )

	const fullcontHTML          = detail.ev.target.closest('.fullcont') 
	
	//this autocomplete isn't in a fullcont
	if( fullcontHTML === null ){ return	}

	const fullcontHTML_entity   = fullcontHTML.getAttribute('data-entity')
	const fullcontHTML_dbid     = fullcontHTML.getAttribute('data-dbid')

	detail.inf.andFilter.values.push( fullcontHTML_entity, fullcontHTML_dbid )

	// console.log( 'getFullcontData ##########fullcontHTML', fullcontHTML      )
	// console.log( 'getFullcontData ##########fullcontHTML', fullcontHTML_entity   )
	// console.log( 'getFullcontData ##########fullcontHTML', fullcontHTML_dbid )

}/**/

function cancelRequest(parent){ //console.log( 'cancelRequest ?????????????????????' )

	const selected = JSON.parse( parent.getAttribute('selected') )
	const max      = parseInt( parent.getAttribute('max') )

	if( max > selected.length ){
		return false
	}

	snack.start({ act:'show', id:'autocompleteMax' })

	return true




}/**/

function cancelRequestOLD(input, selectorChild){ //console.log( 'cancelRequest', selectorChild.length )

	if( input.value === '' && selectorChild.length > 0   ){ //console.log( 'RETURN' )
		return true
	}

	if( input.value != '' && selectorChild.length === 0  ){ //console.log( 'RETURN' )
		return true
	}	

	return false

}


function hide(){
	autocompleteSelector.classList.remove('autocompleteSelector-show')
	scrimAutocomplete.classList.remove('scrim-show')
}

function show(detail){

	handler.position(detail.ev, autocompleteSelector)
	autocompleteSelector.classList.add('autocompleteSelector-show')
	scrimAutocomplete.classList.add('scrim-show')	


}
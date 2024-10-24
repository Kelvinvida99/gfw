
const {changeSVG} 	 = require('../../js-handler/graphic')

//select all thml components of the table and save on htmDt
export function HTMLselect(id, htmDt, organizeRow, tableDetail){  //console.log('dt selectHTML', htmDt)

		htmDt.entityDt     = document.getElementById(id)
		htmDt.dtHeader     = htmDt.entityDt.querySelector('table thead')
		htmDt.dtBody       = htmDt.entityDt.querySelector('table tbody')
		htmDt.footer       = htmDt.entityDt.querySelector('.footer')
		htmDt.searchInput  = htmDt.entityDt.querySelector('.header input')
		htmDt.filterCont   = htmDt.entityDt.querySelector('.filterCont')
		htmDt.searchFilter = htmDt.filterCont.querySelectorAll('input')	
		
		htmDt.organizeRow  = organizeRow	
		htmDt.filter       = tableDetail.filter	
		htmDt.tdDataDetail = tableDetail.tdDataDetail	
		htmDt.entity       = tableDetail.entity	
		htmDt.dest         = tableDetail.dest	

}/**/





export function checkboxAll(detail){ 
	
	const elem       = detail.ev.target
	const table      = elem.closest('TABLE')
	const status     = elem.checked
	const allCheck   = table.querySelectorAll('.checkAll')


	for (let i = 0; i < allCheck.length; i++) { //console.log('i', i)
		 
		 let input =  allCheck[i]
         
         //avoid error if the table is empty
         if(input != undefined){ 
	           input.checked  = status 
	           checkTr(input)
         }/*if*/
	}

}/*checkbox*/



export function checkboxAllOLD(detail){ //console.log('checkbox checkbox ')
	
	const elem       = detail.ev.target
	const table      = elem.closest('TABLE')
	const status     = elem.checked

	//find the first td[INPUT] → Check or uncheck
    for (let i = 0; i < table.rows.length; i++) {
         
         let input = table.rows[i].cells[0].getElementsByTagName('INPUT')[0]
         
         //avoid error if the table is empty
         if(input != undefined){ 
	           input.checked  = status 
	           checkTr(input)
         }/*if*/
	}/*for*/

}/*checkbox*/



//when the user press the checkbox on the table
export function checkboxTd(detail){ //console.log(' checkboxTd ')
	
	const input = detail.ev.target
	checkTr(input)
}



//fromt he input on td, check the tr
function checkTr(input){

	if( input.checked ){ input.parentElement.parentElement.classList.add('checked')    }
	else               { input.parentElement.parentElement.classList.remove('checked') }

}



//clear the search input
export function clear(detail){
	const  parent = detail.ev.target.parentElement
	const  elem  = parent.querySelector('INPUT')

	elem.value = ''
	elem.focus() //keep input focus
	parent.classList.remove('search-filled') 
}



//show hide the filter
export function filterShowHide(detail){ //console.log('dt> filtering')
	
	const elem        = detail.ev.target
	const dt          = elem.closest('.dt')
	const filterCont  = dt.querySelector('.filterCont')

	if (dt.classList.contains('dt-filtering')){
		 dt.classList.remove('dt-filtering')
		 changeSVG(elem, 'filter')
		 filterCont.classList.add('dn')

	}else{
		changeSVG(elem, 'filter-cancel')
		filterCont.classList.remove('dn')
		dt.classList.add('dt-filtering')
	}
}


//get Id off all tr checked
export function getTrChecked(htmlDt){ //console.log('getTrChecked XXXXXXXXXXXXXXXXXXX')

    const allTr = htmlDt.dtBody.querySelectorAll('tr')
    const ids   = []

      //get the tr id > goku-tableRow-2 > 2
      allTr.forEach((tr)=>{
         if( tr.firstElementChild.querySelector('input').checked ){

              let trID = tr.id.split('-')
              ids.push(`"${ trID[2] }"`)
         }
      })

    return ids

}/**/


export function searching(detail){

	const elem        = detail.ev.target
	const header      = elem.parentElement.parentElement

	if (header.classList.contains('searching')){
		header.classList.remove('searching')

	}else{
		header.classList.add('searching')
		header.querySelector('INPUT').focus()
	}
}



//Handle click the arrow on the th, down, up, and remove
export function th(detail){

	const elem = detail.ev.target
	if (elem.classList.contains('selected') ){
		elem.classList.remove('selected') 
		elem.classList.add('reverse') 
		return;
	}
	if (elem.classList.contains('reverse') ){
		elem.classList.remove('reverse') 
		return;
	}

	//remove select or rever from all the siblings
	const allSibling = elem.parentNode.children //get all the siblings	
	for (let item of allSibling) {
		item.classList.remove('reverse')
		item.classList.remove('selected') 	
	}

	elem.classList.add('selected') 
}


/*typing on the search bar, clear button*/
export function typing(detail){ console.log('typing>')
	const elem    = detail.ev.target
	const parent  = elem.parentElement

	setTimeout(()=>{
		//input empty or filled
		elem.value === '' ? 
		parent.classList.remove('search-filled') : 
		parent.classList.add('search-filled')

	},100)
}



/*show the TR indicator, this mean, that we shows what 
element are we viewing/editing
eachRowname = entity-tableRow-id > id="patients-tableRow-234"
*/

export function highlightTr(detail){ //console.log('highlightTr>', detail)
	
	//this happends when the update comes from websocket
	if(detail.ev === undefined || detail.dbid === undefined){ return }

	const tbody = detail.ev.target.closest('tbody')

	//this entity don't have a data table
 	if ( tbody === null ){ return }
	
	const tr    = detail.ev.target.closest('tr')
	const allTr = tbody.querySelectorAll('tr')

	allTr.forEach((elem)=>{
		elem.classList.remove('highlightTr')
	})

	tr.classList.add('highlightTr')

	// console.log('highlightTrtrtrtrtr>', `#${detail.dest}-tableRow-${detail.id}`)
	//console.log('highlightTrtrtrtrtr>', elem)

}

export function highlightTrClean(detail){ //console.log('highlightTr>', detail)
	
	const dt    = document.querySelector(`#${detail.dest}-dt`)

	//somens entities don't have data table
	if(dt === null){ return }
	const allTr = dt.querySelectorAll(`tr`)
	
	allTr.forEach((elem)=>{
		elem.classList.remove('highlightTr')
	})
}
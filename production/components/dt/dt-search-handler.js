

/*remove dt body and reset footer*/   
export function cleanDt(htmlDt){
	
	resetFooter(htmlDt.footer)
    htmlDt.dtBody.innerHTML = ''
}

/*control the search while user type on the search input*/
export function searchCancel(htmlDt){
	
		//if the leghnt is too short
		if( htmlDt.searchInput.value.length > 0 && htmlDt.searchInput.value.length < 3 ){
			//console.log(`CANCEL SEARCH is too short`); 
			return true
		}

		//if the lastValue is "" and the value is ""
		//if we have aprevious search, then we can search
		if( htmlDt.searchInput.getAttribute('data-lastValue') === "" &&
			htmlDt.searchInput.value === ''){
			//console.log(`CANCEL SEARCH both empty`); 
			return true
		}

		//avoid searc if last value is the same as value, 
		//remove other key press problems
		if( htmlDt.searchInput.getAttribute('data-lastValue') === 
			htmlDt.searchInput.value ){
			return true
		}	

		return false

}/**/

//whe the filter is hidden, we need relaod the table??
//return false if we need reload the table
export function filterShowHide(htmlDt){  console.log('filterShowHide', )

		const isHidden   = htmlDt.filterCont.classList.contains('dn')
		const wasCleaned = filterClean(htmlDt)


		if(isHidden && wasCleaned){ return false}

		return true
}/**/

//When we hide the filter, if there isn't value cleaned
//we don't need to reload the table
function filterClean(htmlDt){  //console.log('searchFilter>', htmlDt.searchFilter)

		//to control if the filter were cleaned up
		var wereCleaned = false

		htmlDt.searchFilter.forEach((elem)=>{
			
			let value = elem.value

			if(value != "") { 

				elem.value = ""
				wereCleaned = true 
			}
			
			elem.parentElement.classList.remove('textfield-filled')
		})

		return wereCleaned
}/**/

//return false if we can go to search, from a filter changed
export function filterSeachCancel( htmlDt ){  console.log('cancelFilter>')

		//to control if the filter were cleaned up
		var oneLong   = false
		var allEmpty  = true
		var lastValue = false
		
		htmlDt.searchFilter.forEach((elem)=>{

			let value = elem.value.length
			if( value > 0   ) { oneLong  = true }
			if( value != "" ) { allEmpty = false }
		    if( elem.getAttribute('data-lastValue') != "" ){ lastValue = true }
		})

		//one value > 0 > search
		if(oneLong){ return false }
		
		//all are empty, and we searched before the last value !="" > search
	    if(allEmpty && lastValue ){ return false }

		return true

}/**/



///////////////////////////footer
///////////////////////////footer
///////////////////////////footer

//keep the footer update, depend of the available rows for download
export function updateFooter( htmlDt, availableRowsWithFilter){ 

		
		availableRowsWithFilter = parseInt(availableRowsWithFilter)

		var numberShowed = htmlDt.dtBody.querySelectorAll('tr').length 		
		var numberToShow = availableRowsWithFilter - numberShowed 

		if( numberToShow <= 0 ) { 
			numberToShow = 0 
			htmlDt.footer.classList.add('footer-disabled')
		
		}else{ htmlDt.footer.classList.remove('footer-disabled') }

		htmlDt.footer.querySelector('label').innerHTML = `LOAD  MORE ${numberToShow}`

}/*updateFooter*/


///Footer actions
function resetFooter(footer){ 
		footer.setAttribute('data-limit', 0 )
		footer.querySelector('label').innerHTML = 'LOAD MORE'
}


export function increaseFooter(htmlDt){ 
		const actualLimit = parseInt( htmlDt.footer.getAttribute('data-limit') )	
		htmlDt.footer.setAttribute('data-limit', actualLimit + 10)
}


//verify that the loadMore button isn't disabled
export function isDisableFooter(detail){  //console.log('loadMoreVerify', detail)
	
		if(detail.ev.target.classList.contains('footer-disabled')){
		   return true
		}

		return false
}

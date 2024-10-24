const debounce        = require ('../../js-handler/debounce')
const dtDbGeneral     = require ('./dt-db-general')
const dtGenerator     = require ('./dt-generator')
const dtSearchHandler = require ('./dt-search-handler')
const inf             = require ('../../js-network/inf')



export function filter( detail, htmlDt ){  //console.log('filter>', )

      if( dtSearchHandler.filterSeachCancel( htmlDt ) ){ return  }/**/

      debounce.start(()=>{
            dtSearchHandler.cleanDt( htmlDt )
            select( detail, htmlDt, true )            
      })
}/**/

export function filterShowHide( detail, htmlDt ){  //console.log('filter>', )

      if( dtSearchHandler.filterShowHide(htmlDt) ){ return }

      dtSearchHandler.cleanDt( htmlDt )
      select( detail, htmlDt, true )
      
}/**/



//add new row to the table after insert one
export function loadMore( detail, htmlDt ){  //console.log('loadMore>')

      if( dtSearchHandler.isDisableFooter(detail) ){ return }

      dtSearchHandler.increaseFooter(htmlDt)
      select( detail, htmlDt, false )  
}/**/


//From key.js
export function searching(detail, htmlDt){ console.log('searchingxxxx>', )  

      detail.ev.target.classList.add('searching')

      if( dtSearchHandler.searchCancel(htmlDt) ){   
            detail.ev.target.classList.remove('searching')
            return  
      }

      debounce.start(()=>{
            dtSearchHandler.cleanDt(htmlDt)
            select( detail, htmlDt, true, ()=>{  
                  detail.ev.target.classList.remove('searching')  
                  //console.log('done iserting the dt>>>>>', detail.ev.target) 
            } ) 
                     
      })

}/**/



export function th(detail, htmlDt){ //console.log('th>')  
      
      dtSearchHandler.cleanDt(htmlDt)
      select( detail, htmlDt, false )      
}/**/



//Select the default elements to the table
export function select(detail, htmlDt, cleanTable, callback ){ // console.log('dt-search select EXTERNALLLLLLLL1>')  

            
    inf.toSelect(detail, htmlDt)

      // //Get the data from the server
      dtDbGeneral.select(detail, htmlDt, (result, availableRowsWithFilters, resultComplete)=>{  //console.log('dt result>', result)
           
            //fill the table
            const dataOrganized  = htmlDt.organizeRow(result)
            dtGenerator.addBody( dataOrganized, htmlDt, cleanTable )

            dtSearchHandler.updateFooter(htmlDt, availableRowsWithFilters)

            if( callback != undefined ){ callback(resultComplete) }

      })/*callback*/      

}/**/

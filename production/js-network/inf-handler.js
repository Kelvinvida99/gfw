const obj     = require('./inf-obj')




export function mtPrepareData(mt){  //console.log('MT PREPAREDATA ####>', JSON.parse( JSON.stringify(  mt.data ) ) )

    const dataSplited = {
           tableName: mt.tableName,
        dataToUpdate: [],
        dataToInsert: []
    }

    mt.data.forEach((line)=>{ //console.log('value', value)       

        mt.fields.forEach((elem)=>{   
            if(elem.type === "autocomplete"){ //console.log('value', line[elem.name],  elem.type) 
                line[elem.name] = acChangeDataOnMT(line[elem.name])  
            }
        })
        
        //id='' > go To insert
        if(line.id === ''){ 
               dataSplited.dataToInsert.push(line)
        }else{ dataSplited.dataToUpdate.push(line) }

    })

  // console.log('dataSplited>',  JSON.parse( JSON.stringify(dataSplited) ) )

    return dataSplited
}/**/


function acChangeDataOnMT(value){// console.log('dataElement>', value)
    
    var valueToInsert = ''
    if(value.length === 0){// console.log('IDS VACIOS')
        return '0' 
    }

    valueToInsert =  JSON.stringify(value)
    valueToInsert =  valueToInsert.replace('[', '');
    valueToInsert =  valueToInsert.replace(']', '');
    valueToInsert =  valueToInsert.replaceAll('"', '');

    // console.log('valueToInsertTTTTTTTTTTTTTT', valueToInsert, typeof valueToInsert )
    return valueToInsert
}


//This is only used on autocomplete on the form
export function acChangeDataOnForm(form){ //console.log('changeAutocompleteData>>',  )

    form.forEach((elem)=>{ 
       if(elem.type === 'autocomplete'){//console.log('changeAutocompleteData>>',  elem)
          
          //server is waiting for an cero on empty []
          if( elem.value.length === 0 ){ //console.log('changeAutocompleteData>>',  'is empty')
              elem.value = '0'
              return
          }/**/

         ///server is waiting 3, 4 not ["3", "4"]
         var value      =  JSON.stringify( elem.value )
             value      =  value.replace('[', '');
             value      =  value.replace(']', '');
             value      =  value.replaceAll('"', '');

             elem.value = value
       }/*if*/
    })

}/**/




//fill the main filter with search value
export function mainFilterFill(detail, htmlDt){  //console.log('mainFilterFill> ', htmlDt)  

    const mainFilter = { fields:[], values:[] }

    mainFilter.fields = htmlDt.filter.mainFilterFields
    
    ///get the search value, if it's <= 2 make = "", ignore the value
    var searchValue = htmlDt.searchInput.value
    if(searchValue.length < 3){ searchValue = ""}

    if(searchValue != "" || searchValue === ""){
        for(let i = 0; i < htmlDt.filter.mainFilterFields.length; i++ ){
             mainFilter.values.push(searchValue) 
        }        
    
    }else{//if the search is empy, add the default values
        mainFilter.values = htmlDt.filter.mainFilterValues
    }

    //fill the main filter
    obj.select.mainFilter = JSON.stringify(mainFilter)

    //add the objec to the details
    detail.inf = obj.select

    //detail dest, has the entity
    detail.inf.entity = detail.entity

    //console.log('####DATA INF', detail.inf)
    htmlDt.searchInput.setAttribute('data-lastValue', searchValue)

}/**/


//fill the main filter with search value
export function andFilterFill(detail, htmlDt){ //console.log('andFilterFill####')
    
    const andFilter   = { fields:[], values:[] }

    //if this emptity don't have andFilter in this entity just return
    if(htmlDt.filter.andFilterFields.length === 0 ){ 
       detail.inf.andFilter = JSON.stringify({ fields:[], values:[] })
        return 
    }


     htmlDt.searchFilter.forEach((elem)=>{
        if(elem.value != ""){ 
            andFilter.fields.push(elem.getAttribute('data-field'))
            andFilter.values.push(elem.value)
            elem.setAttribute('data-lastValue', elem.value)
        }    
    })

    //fill the filter
    detail.inf.andFilter = JSON.stringify(andFilter)       

}/**/





export function getLimit(detail, htmlDt ){

    detail.inf.limit1 = htmlDt.footer.getAttribute('data-limit')
}/**/


export function getThStatus(detail, htmlDt){   //console.log(`getThStatus`)


    const allTh    = htmlDt.dtHeader.querySelectorAll('tr th')

    var nothingFound = true

    allTh.forEach((th)=>{ //
       if( th.classList.contains('selected') ){
            detail.inf.sortDirection = "ASC"
            detail.inf.sortBy = th.getAttribute('data-sortBy')
            nothingFound = false
       }

       if( th.classList.contains('reverse') ){
            detail.inf.sortDirection = "DESC"
            detail.inf.sortBy = th.getAttribute('data-sortBy')
            nothingFound = false
        }
    })
    
    //By default all elements are showed the last edited first
    if(nothingFound){
        detail.inf.sortDirection = "DESC"
        detail.inf.sortBy = "id"        
    }

}/**/

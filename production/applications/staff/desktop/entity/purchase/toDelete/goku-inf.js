




//OBJECT TO SEND TO update.php
const toInsertObj = {
    entity:"goku",
    id:"",
    fields: [],
    values: [],
    "multiTables":[ ]
}



export function toInsert(detail, fullcontHTML){ //console.log('detail', detail)
     
    toInsertObj.fields = []
    toInsertObj.values = []

    detail.form.forEach((elem)=>{
        toInsertObj.fields.push( elem.name )   
        toInsertObj.values.push( elem.value)      
    })

    //convert the arrays in to strings
    toInsertObj.fields = JSON.stringify( toInsertObj.fields )
    toInsertObj.values = JSON.stringify( toInsertObj.values )

    return toInsertObj

}/**/

const updateObj = {
    entity:"goku",
    id:"",
    fields: [],
    values: [],
    "multiTables":[ ]
}

export function toUpdate(detail, fullcontHTML){ //console.log('detail', detail)
     
    updateObj.id = fullcontHTML.getAttribute('data-DBid')

    updateObj.fields = []
    updateObj.values = []

    detail.form.forEach((elem)=>{
        updateObj.fields.push( elem.name )   
        updateObj.values.push( elem.value)      
    })

    updateObj.fields = JSON.stringify(    updateObj.fields )
    updateObj.values = JSON.stringify(    updateObj.values )

    return updateObj
}/**/



const selectObj = {
    entity:"",
    sortBy:"id",
    sortDirection:"ASC",
    limit1:"0",
    limit2:"10",
    mainFilter: { fields:[], values:[] },
    andFilter:  { fields:[], values:[] }
}



export function toSelect(detail, htmlDt){  

    //add the select to the detail obj
    mainFilterFill(detail, htmlDt)
    andFilterFill (detail, htmlDt)
    getLimit      (detail, htmlDt)
    getThStatus   (detail, htmlDt)
    

}


//fill the main filter with search value
function mainFilterFill(detail, htmlDt){   

    const mainFilter = { fields:[], values:[] }

    mainFilter.fields = detail.filter.mainFilterFields
    
    ///get the search value, if it's <= 2 make = "", ignore the value
    var searchValue = htmlDt.searchInput.value
    if(searchValue.length < 3){ searchValue = ""}

    if(searchValue != "" || searchValue === ""){
        for(let i = 0; i < detail.filter.mainFilterFields.length; i++ ){
             mainFilter.values.push(searchValue) 
        }        
    
    }else{//if the search is empy, add the default values
        mainFilter.values = detail.filter.mainFilterValues
    }

    //fill the filter
    selectObj.mainFilter = JSON.stringify(mainFilter)

    detail.inf = selectObj
    detail.inf.entity = detail.entity

    // console.log('####DATA INF', detail.inf)

    htmlDt.searchInput.setAttribute('data-lastValue', searchValue)

}/**/


//fill the main filter with search value
function andFilterFill(detail, htmlDt){ //console.log('andFilterFill####')
    
    const andFilter   = { fields:[], values:[] }

    //if this emptity don't have andFilter in this entity just return
    if(detail.filter.andFilterFields.length === 0 ){ 
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



export function getThStatus(detail, htmlDt){   //console.log(`getThStatus`, htmlDt.dtHeader); 


    const allTh    = htmlDt.dtHeader.querySelectorAll('tr th')

    var nothingFound = true

    allTh.forEach((th)=>{
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

    if(nothingFound){
        detail.inf.sortDirection = "ASC"
        detail.inf.sortBy = "id"        
    }

}/**/



function getLimit(detail, htmlDt ){

    detail.inf.limit1 = htmlDt.footer.getAttribute('data-limit')
}



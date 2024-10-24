const obj = require('./inf-obj')




export function toInsert(detail, htmlFc){  //console.log('toInsert>>')
     
    obj.insert.fields = []
    obj.insert.values = []

    htmlFc.form.forEach((elem)=>{ //console.log(elem.value)

        obj.insert.fields.push( elem.name )   
        obj.insert.values.push( elem.value)      
    })

    obj.insert.fields = JSON.stringify( obj.insert.fields )
    obj.insert.values = JSON.stringify( obj.insert.values )

    obj.insert.entity = detail.entity

    detail.inf    = obj.insert

}/**/


export function toUpdate(detail, htmlFc){  console.log('toUpdate>>')
     
    obj.update.id = htmlFc.fullcontHTML.getAttribute('data-DBid')

    obj.update.fields = []
    obj.update.values = []

    htmlFc.form.forEach((elem)=>{ //console.log(elem.value)

        obj.update.fields.push( elem.name )   
        obj.update.values.push( elem.value)      
    })

    obj.update.fields = JSON.stringify( obj.update.fields )
    obj.update.values = JSON.stringify( obj.update.values )

    obj.update.entity = detail.entity

    if(htmlFc.multiTables != undefined){  console.log('WE HAVE MULTITABLES')
        
        htmlFc.multiTables.forEach((mt)=>{
            obj.update.multiTables.push({
                tableName:    mt.tableName,
                dataToUpdate: mtPrepareData(mt.data),
                dataToInsert: [],
                } 
            )
        })

     obj.update.multiTables = JSON.stringify( obj.update.multiTables )
   

         console.log('WE HAVE MULTITABLES', obj.update.multiTables)
    }

    detail.inf = obj.update
}/**/

//convert powerId: {id: 1, name: 'fire'} >  powerId: 1
//used by autocompleted
function mtPrepareData(data){ console.log('mtPrepareData>>', data)
 
    data.forEach((value)=>{
        Object.keys(value).forEach(key => {
            //console.log(key, value[key], typeof value[key] === 'object')
            if(key, value[key], typeof value[key] === 'object'){
                value[key] = value[key].id
            }
        })
    })

    //console.log('mtPrepareData>>', data)
    return data
}/**/



//don't return nothing, just modify the detail
export function toSelect(detail, htmlDt){ // console.log('toSelect>')

    //add the select object to the detail obj
    mainFilterFill(detail, htmlDt)
    andFilterFill (detail, htmlDt)
    getLimit      (detail, htmlDt)
    getThStatus   (detail, htmlDt)
    
}/**/


//fill the main filter with search value
function mainFilterFill(detail, htmlDt){  //console.log('mainFilterFill> ENTITY CHAGED')  

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
function andFilterFill(detail, htmlDt){ //console.log('andFilterFill####')
    
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
}/**/



export function toDelete(detail){

    const ids = []
    obj.deleteEntity.entity = detail.entity

    detail.dbid.forEach((elem)=>{
        ids.push( `${elem}` )
    })

    obj.deleteEntity.ids    =  JSON.stringify(ids)  

    detail.inf =  obj.deleteEntity


}
const obj     = require('./inf-obj')
const handler = require('./inf-handler')


export function toInsert(detail, htmlFc){  //console.log('toInsert>>')
     
    obj.insert.fields = []
    obj.insert.values = []
    obj.insert.multiTables = []

    handler.acChangeDataOnForm(htmlFc.form)
    
    htmlFc.form.forEach((elem)=>{ //console.log(elem.value)

        obj.insert.fields.push( elem.name )   
        obj.insert.values.push( elem.value)      
    })

    obj.insert.fields = JSON.stringify( obj.insert.fields )
    obj.insert.values = JSON.stringify( obj.insert.values )

    obj.insert.entity = htmlFc.entity

    ///MULTITABLES SECTION
    if(htmlFc.entityMT != undefined){  //console.log('WE HAVE MULTITABLES')
        
        htmlFc.entityMT.forEach((mt)=>{
            
            const mtDataPre =   handler.mtPrepareData(mt)
            
            obj.insert.multiTables.push(mtDataPre)

        })
    
        obj.insert.multiTables = JSON.stringify( obj.insert.multiTables )
    }

    detail.inf    = obj.insert

}/**/


export function toUpdate(detail, htmlFc){   //console.log('inff toUpdate>>>', JSON.parse( JSON.stringify(  htmlFc.entityMT[0].data[0].powerId ) ) )

     
    obj.update.id          = htmlFc.fullcontHTML.getAttribute('data-DBid')
    obj.update.fields      = []
    obj.update.values      = []
    obj.update.multiTables = []

    handler.acChangeDataOnForm(htmlFc.form)

    htmlFc.form.forEach((elem)=>{ //console.log(elem.value)

        obj.update.fields.push( elem.name )   
        obj.update.values.push( elem.value)   
    })

    obj.update.fields = JSON.stringify( obj.update.fields )
    obj.update.values = JSON.stringify( obj.update.values )

    obj.update.entity = htmlFc.entity


    ///MULTITABLES SECTION
    if(htmlFc.entityMT != undefined){  //console.log('WE HAVE MULTITABLES')
        
        htmlFc.entityMT.forEach((mt)=>{
                    
            obj.update.multiTables.push(   handler.mtPrepareData(mt) )
        })

        obj.update.multiTables = JSON.stringify( obj.update.multiTables )
    }/**/

    detail.inf = obj.update

}/**/



export function toDelete(detail){

    const ids = []
    obj.deleteEntity.entity = detail.entity

    detail.dbid.forEach((elem)=>{
        ids.push( `${elem}` )
    })

    obj.deleteEntity.ids =  JSON.stringify(ids)  

    detail.inf =  obj.deleteEntity
}


//don't return nothing, just modify the detail
export function toSelect(detail, htmlDt){  


    //add the select object to the detail obj
    handler.mainFilterFill(detail, htmlDt)
    handler.andFilterFill (detail, htmlDt)
    handler.getLimit      (detail, htmlDt)
    handler.getThStatus   (detail, htmlDt)

    // MIGUEL DON'T REMEMBER WHY THIS CODE WAS HERE
    //sort, diferent thatn from ID
    // if(htmlDt.sortBy != undefined){
    //     detail.inf.sortBy = htmlDt.sortBy
    // }

    // //sortDirection, than ascendent
    // if(htmlDt.sortDirection != undefined){
    //     detail.inf.sortDirection = htmlDt.sortDirection
    //}

   //console.log('toSelect>', detail.inf)

}/**/






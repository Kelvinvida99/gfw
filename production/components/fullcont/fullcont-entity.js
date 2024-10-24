
const dtGenerator          = require ('../dt/dt-generator')
const dtHandler            = require ('../dt/dt-handler')
const fullcont             = require ('./fullcont')
const fullcontDbGeneral    = require ('./fullcont-db-general')
const fullcontForm         = require ('./fullcont-form')
const fullcontHandler      = require ('./fullcont-handler')
const inf                  = require ('../../js-network/inf')
const websocket            = require ('../../js-network/web-socket')
const fullcontTab          = require ('./fullcont-form-handler-tab')
const snack                = require ('../snack/snack')
 


//click to add new one fabGeneral
export function prepareAdd(detail, htmlFc,callback){  console.log('prepareAdd',htmlFc)

    if( fullcontForm.wasEdited(  htmlFc ) ) { 
        htmlFc.editDialog()
        return false
    } 

    fullcontHandler.prepareAdd( detail, htmlFc) 

    if(callback != undefined){callback(htmlFc)}

    return true
}/**/


//click to add new one fab on the entity
export function addOne(detail, htmlFc, callback){ //console.log('addOne>')
  
    //get values from input to form //red posible you are doint this twice
    fullcontForm.getValues( htmlFc )

    //verify if all require are fill
    if( fullcontForm.checkRequired(htmlFc, true) ){ 
      return false
    }

    //get inf for the insert
    inf.toInsert(detail, htmlFc)

    // console.log('inftoInsert', detail.inf)
    fullcontDbGeneral.addOne(detail, htmlFc, (data, result)=>{ //console.log('addOne>', result)

        //callback(result.data[0], result) 

        htmlFc.dtCall('addRow', result.data)

        //result[0].entity = detail.dest
        data.dest   = detail.dest

        const sendDetail = { to:'allStaff', from:'staffDesktop', id:'' }
        websocket.entityUpdate("entityUpdate", 'addRow', data, sendDetail)   
    
        //return the callback if this exist
        if(callback != undefined){ callback(data, result) }
    })  

    return true

}/**/


export function selectOne(detail, htmlFc, callback){  console.log('selectOne>')
  
    if( fullcontForm.wasEdited( htmlFc ) ) {  
        htmlFc.editDialog()
        return false
    }/**/
 
    fullcontDbGeneral.selectOne(detail, htmlFc, (data, result)=>{
       
        //return the callback if this exist
        if(callback != undefined){ callback(data, result) }
    })  

    return true

}/**/

//esta funcion es utilizada por los web sockets para recibir un update discard change.
export function selectOneNoCheck(detail, htmlFc, callback){  
  
    fullcontDbGeneral.selectOne(detail, htmlFc, (data, result)=>{
       
        //return the callback if this exist
        if(callback != undefined){ callback(data, result) }
    })  

    return true

}/**/


export function update(detail, htmlFc, callback){   //console.log(`entityUpdate`, detail); 
  
    const change = {userId: '', input:[], mt:[]}

    if( !fullcontForm.wasEdited( htmlFc, change ) ) {  
         fullcontHandler.prepareView( htmlFc.form, detail)
         fullcontTab.clean(detail.ev.target)

         snack.start( {act:"show", id:"updateNo"} )
         return false
    } 

    if( fullcontForm.checkRequired(htmlFc, true) ){  return false }


    //get inf to do the dbReques
    inf.toUpdate(detail, htmlFc) //console.log('inf to update', detail.inf) 
   
    detail.inf.change = JSON.stringify(change)

    fullcontDbGeneral.update(detail, htmlFc, (data, result) => { //console.log('update>', result)
           
         //callback(result, result.data)    
        //update the row, if the entity has dt
        if(htmlFc.dtCall != undefined){ htmlFc.dtCall('updateRow', result.data) }

        //add the destination 
        data.dest   = detail.dest
        const sendDetail = { to:'allStaff', from:'staffDesktop', id:'' }
        websocket.entityUpdate("entityUpdate", 'updateRow', result.data, sendDetail)  

        //return the callback if this exist data
         if(callback != undefined){ callback(data, result) }
        
    })

    return true
    
}/**/

/**/   
export function hide(detail, htmlFc){  console.log('entity hide>', htmlFc)

    if( fullcontForm.wasEdited( htmlFc ) ) {  
        htmlFc.editDialog()
        return false
    }

    //if wasn't edited just clean and hide    
    fullcontForm.clean(htmlFc)
    fullcontForm.cleanFromValues( htmlFc )

    dtHandler.highlightTrClean(detail)

    //fullcont.start({act:'hide', id:`${htmlFc.entity}-fullcont`})
    fullcont.start({act:'hide', fullcontHTML: htmlFc.fullcontHTML,  id:`${htmlFc.dest}-fullcont` })

    return true
}/**/


export function cancelEdit(detail, htmlFc){// console.log('cancelEdit>')

    if( fullcontForm.wasEdited( htmlFc ) ) {  
        htmlFc.editDialog()
        return false
    }

    fullcontHandler.prepareView(htmlFc.form, detail)

    return true
}/**/


export function saveFromDialog(detail, htmlFc,callback){ //console.log('saveFromDialog>')
  
    if( htmlFc.fullcontHTML.classList.contains('mode-add') ) { 
        addOne(detail, htmlFc, callback)  
        return    false
    }

    update(detail, htmlFc,callback)

    return true
}/**/


export function deleteEntity(detail, htmlFc){ //console.log('deleteEntity>', )
       
    htmlFc.deleteDialog(detail)
}/**/



export function deleteFromDialog(detail, htmlFc){ console.log('deleteFromDialog>', detail)

    //get inf to do the dbReques
    inf.toDelete(detail)
    
    const sendDetail = { to:'allStaff', from:'staffDesktop', id:'' }
    websocket.entityUpdate("entityUpdate", 'deleteRow', detail, sendDetail)   

    fullcontDbGeneral.trDelete(detail, htmlFc, (result) => { //console.log('Delete result>',)

        dtGenerator.deleteRow( detail )
        fullcontHandler.controlAfterDelete( detail )           
    })
    

}/**/



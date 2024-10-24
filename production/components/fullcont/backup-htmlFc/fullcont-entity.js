
const dtGenerator          = require ('../dt/dt-generator')
const fullcont             = require ('./fullcont')
const fullcontDbGeneral    = require ('./fullcont-db-general')
const fullcontForm         = require ('./fullcont-form')
const fullcontHandler      = require ('./fullcont-handler')
const inf                  = require ('../../js-network/inf')
const websocket            = require ('../../js-network/web-socket')


//click to add new one fabGeneral
export function prepareAdd(detail, htmlFc){  //console.log('prepareAdd')

    if( fullcontForm.wasEdited( htmlFc.form, htmlFc.formCopy, htmlFc.entityMT ) ) { 
        
        htmlFc.editDialog()
        return
    } 

    fullcontHandler.prepareAdd( detail, htmlFc) 
}/**/


//click to add new one fab on the entity
export function addOne(detail, htmlFc){ //console.log('addOne>')
  
    //get values from input to form
    fullcontForm.getValues( htmlFc.form, htmlFc.entityMT )

    //verify if all require are fill
    if( fullcontForm.checkRequired(htmlFc, true) ){  return }

    //get inf for the insert
    inf.toInsert(detail, htmlFc)

    // console.log('inftoInsert', detail.inf)
    fullcontDbGeneral.addOne(detail, htmlFc, (result)=>{ //console.log('addOne>',)

        htmlFc.dtCall('addRow', result)

        result[0].entity = detail.dest

        websocket.entityUpdate("entityUpdate", 'addRow', result)   
    })  

}/**/


export function selectOne(detail, htmlFc){ //console.log('selectOne>')
  
    if( fullcontForm.wasEdited( htmlFc.form, htmlFc.formCopy, htmlFc.entityMT ) ) {  
        htmlFc.editDialog()
        return 
    }/**/

    fullcontDbGeneral.selectOne(detail, htmlFc)  
}/**/


export function update(detail, htmlFc){ //console.log('update ####>')
  
    if( !fullcontForm.wasEdited( htmlFc.form, htmlFc.formCopy, htmlFc.entityMT ) ) {  
         fullcontHandler.prepareView( htmlFc.form, detail)
         return
    } 

    //console.log('update ####>after wasEdited')
    if( fullcontForm.checkRequired(htmlFc, true) ){  return  }

    //get inf to do the dbReques
    inf.toUpdate(detail, htmlFc) //console.log('inf to update', detail.inf) 

    fullcontDbGeneral.update(detail, htmlFc, (result) => {// console.log('update>', )
           
        //update the row
        htmlFc.dtCall('updateRow', result)

        result[0].entity = detail.dest

        websocket.entityUpdate("entityUpdate", 'updateRow', result)  
    })
}


export function hide(detail, htmlFc){ console.log('hide>')

    if( fullcontForm.wasEdited( htmlFc.form, htmlFc.formCopy, htmlFc.entityMT ) ) {  
        htmlFc.editDialog()
        return 
    }

    //if wasn't edited just clean and hide    
    fullcontForm.clean(htmlFc.form, htmlFc.entityMT)
    fullcontForm.cleanFromValues(htmlFc.form, htmlFc.formCopy, htmlFc.entityMT)
    fullcont.start({act:'hide', id:'goku-fullcont'})

}/**/


export function cancelEdit(detail, htmlFc){// console.log('cancelEdit>')

    if( fullcontForm.wasEdited( htmlFc.form, htmlFc.formCopy, htmlFc.entityMT ) ) {  
        htmlFc.editDialog()
        return 
    }

    fullcontHandler.prepareView(htmlFc.form, detail)
}/**/



export function saveFromDialog(detail, htmlFc){ //console.log('saveFromDialog>')
  
    if( htmlFc.fullcontHTML.classList.contains('mode-add') ) { 
        addOne(detail, htmlFc)  
        return    
    }

    update(detail, htmlFc)
}/**/


export function deleteEntity(detail, htmlFc){ //console.log('deleteEntity>', )
       
       htmlFc.deleteDialog(detail)

}/**/



export function deleteFromDialog(detail, htmlFc){ //console.log('deleteFromDialog>',)

   //get inf to do the dbReques
    inf.toDelete(detail)
    
    websocket.entityUpdate("entityUpdate", 'deleteRow', detail)   

    fullcontDbGeneral.trDelete(detail, htmlFc, (result) => { 

            dtGenerator.deleteRow( detail )
            fullcontHandler.controlAfterDelete(detail)           
    })

}/**/



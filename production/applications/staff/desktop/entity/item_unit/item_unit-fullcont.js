import item_unitFullcont  from "./item_unit-fullcont.html";

const dialog          = require ('../../../../../components/dialog/dialog')
const fullcontEntity  = require ('../../../../../components/fullcont/fullcont-entity')
const fullcontHandler = require ('../../../../../components/fullcont/fullcont-handler')
const item_unitDt     = require('./item_unit-dt')
const item_unitMenu   = require('./item_unit-menu')
const {formCopy}      = require('./item_unit-fullcont-form') 
const {form}          = require('./item_unit-fullcont-form')
// const {item_unitMT}   = require('./item_unit-fullcont-multitable')
const item_unitMT   = undefined //no MT just add this like undefined

/****************ELEMENTS*****************/
var htmlFc          = {}
var HTMLwasSelected = false

function HTMLselect(detail){ 

	fullcontHandler.HTMLselect(

            'item_unit', //database table name****
            'item_unit', //dest entity on js
            'item_unit-fullcont', 
             item_unitFullcont, form, formCopy, item_unitMT, 
             editDialog, deleteDialog, dtCall, htmlFc)

	HTMLwasSelected   = true  

      // htmlFc.hasFiles = true
      // fullcontHandler.rightsControl(htmlFc)
}/**/


export function start(detail){  console.log('item_unit-dt 5>', detail)
  
      if(!HTMLwasSelected) { HTMLselect(detail) }
       
      obj[detail.act].start(detail)
}/**/


const obj = {

      addOne:           { start: (detail)=>{  addOne(detail, htmlFc)                                   }},
      cancelEdit:       { start: (detail)=>{  fullcontEntity.cancelEdit(detail, htmlFc)                }},
      deleteEntity:     { start: (detail)=>{  fullcontEntity.deleteEntity(detail, htmlFc)              }},
      deleteFromDialog: { start: (detail)=>{  deleteFromDialog(detail, htmlFc)                         }},
      discard:          { start: (detail)=>{  fullcontHandler.discard(detail, htmlFc)                  }},
      fullcontOptions:  { start: (detail)=>{  item_unitMenu.start(detail, 'htmlDt', htmlFc )                }},
      hide:             { start: (detail)=>{  fullcontEntity.hide(detail, htmlFc)                      }},
      prepareAdd:       { start: (detail)=>{  fullcontEntity.prepareAdd(detail, htmlFc)                }},
      prepareEdit:      { start: (detail)=>{  fullcontHandler.prepareEdit(detail, htmlFc)              }},
      saveFromDialog:   { start: (detail)=>{  fullcontEntity.saveFromDialog(detail, htmlFc)            }},
      selectOne:        { start: (detail)=>{  fullcontEntity.selectOne(detail, htmlFc)                 }},
      selectOneNoCheck: { start: (detail)=>{  fullcontEntity.selectOneNoCheck(detail, htmlFc)          }},
      update:           { start: (detail)=>{  fullcontEntity.update(detail, htmlFc)                    }},

}/**/



//function to send
function editDialog(){
		dialog.start({ act:"show", id:"saveChanges", entity:'item_unit' } )
}

function deleteDialog(detail){
		dialog.start({ act:"show",  dest:'item_unit', id:"deleteElem", entity:'item_unit', dbid: detail.dbid } )
}

function dtCall(act, result){ 
		item_unitDt.start({act:act, row: result})
}

function addOne(detail, htmlFc){

      fullcontEntity.addOne(detail, htmlFc) 
      setTimeout(()=>{
           // item_unitDt.start({"dest":"item_unit", "elem":"dt", "act":"select", "entity":"item_unit"})  
      },100)  
                   
}


function deleteFromDialog(detail, htmlFc){

      fullcontEntity.deleteFromDialog(detail, htmlFc) 
      setTimeout(()=>{
            item_unitDt.start({"dest":"item_unit", "elem":"dt", "act":"select", "entity":"item_unit"})  
      },900)  
                   
}

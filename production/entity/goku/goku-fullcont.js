
import gokuFullcont  from "./goku-fullcont.html";

const dialog          = require ('../../components/dialog/dialog')
const fullcontEntity  = require ('../../components/fullcont/fullcont-entity')
const fullcontHandler = require ('../../components/fullcont/fullcont-handler')
const gokuDt          = require('./goku-dt')
const gokuMenu        = require('./goku-menu')
const {formCopy}      = require('./goku-fullcont-form') 
const {form}          = require('./goku-fullcont-form')
const {gokuMT}        = require('./goku-fullcont-multitable')
//const gokuMT        = undefined //no MT just add this like undefined

/****************ELEMENTS*****************/
var htmlFc          = {}
var HTMLwasSelected = false

function HTMLselect(detail){ 

	fullcontHandler.HTMLselect(

            'goku', //database table name****
            'goku', //dest entity on js
            'goku-fullcont', 
             gokuFullcont, form, formCopy, gokuMT, 
             editDialog, deleteDialog, dtCall, htmlFc)

	HTMLwasSelected   = true  

      // htmlFc.hasFiles = true
      // fullcontHandler.rightsControl(htmlFc)
}/**/


export function start(detail){  console.log('goku-dt 5>', detail)
  
      if(!HTMLwasSelected) { HTMLselect(detail) }
       
      obj[detail.act].start(detail)
}/**/


const obj = {

      addOne:           { start: (detail)=>{  addOne(detail, htmlFc)                                   }},
      cancelEdit:       { start: (detail)=>{  fullcontEntity.cancelEdit(detail, htmlFc)                }},
      deleteEntity:     { start: (detail)=>{  fullcontEntity.deleteEntity(detail, htmlFc)              }},
      deleteFromDialog: { start: (detail)=>{  deleteFromDialog(detail, htmlFc)                         }},
      discard:          { start: (detail)=>{  fullcontHandler.discard(detail, htmlFc)                  }},
      fullcontOptions:  { start: (detail)=>{  gokuMenu.start(detail, 'htmlDt', htmlFc )                }},
      hide:             { start: (detail)=>{  fullcontEntity.hide(detail, htmlFc)                      }},
      prepareAdd:       { start: (detail)=>{  fullcontEntity.prepareAdd(detail, htmlFc)                }},
      prepareEdit:      { start: (detail)=>{  fullcontHandler.prepareEdit(detail, htmlFc)              }},
      saveFromDialog:   { start: (detail)=>{  fullcontEntity.saveFromDialog(detail, htmlFc)            }},
      selectOne:        { start: (detail)=>{  fullcontEntity.selectOne(detail, htmlFc)                 }},
      update:           { start: (detail)=>{  fullcontEntity.update(detail, htmlFc)                    }},

}/**/



//function to send
function editDialog(){
		dialog.start({ act:"show", id:"saveChanges", entity:'goku' } )
}

function deleteDialog(detail){
		dialog.start({ act:"show",  dest:'goku', id:"deleteElem", entity:'goku', dbid: detail.dbid } )
}

function dtCall(act, result){ 
		gokuDt.start({act:act, row: result})
}

function addOne(detail, htmlFc){

      fullcontEntity.addOne(detail, htmlFc) 
      setTimeout(()=>{
           // gokuDt.start({"dest":"goku", "elem":"dt", "act":"select", "entity":"goku"})  
      },100)  
                   
}


function deleteFromDialog(detail, htmlFc){

      fullcontEntity.deleteFromDialog(detail, htmlFc) 
      setTimeout(()=>{
            gokuDt.start({"dest":"goku", "elem":"dt", "act":"select", "entity":"goku"})  
      },900)  
                   
}

import areasFullcont  from "./areas-fullcont.html";

const dialog          = require ('../../../../../components/dialog/dialog')
const fullcontEntity  = require ('../../../../../components/fullcont/fullcont-entity')
const fullcontHandler = require ('../../../../../components/fullcont/fullcont-handler')
const areasDt     = require('./areas-dt')
const areasMenu   = require('./areas-menu')
const {formCopy}      = require('./areas-fullcont-form') 
const {form}          = require('./areas-fullcont-form')
// const {areasMT}   = require('./areas-fullcont-multitable')
const areasMT   = undefined //no MT just add this like undefined

/****************ELEMENTS*****************/
var htmlFc          = {}
var HTMLwasSelected = false

function HTMLselect(detail){ 

	fullcontHandler.HTMLselect(

            'areas', //database table name****
            'areas', //dest entity on js
            'areas-fullcont', 
             areasFullcont, form, formCopy, areasMT, 
             editDialog, deleteDialog, dtCall, htmlFc)

	HTMLwasSelected   = true  

      // htmlFc.hasFiles = true
      // fullcontHandler.rightsControl(htmlFc)
}/**/


export function start(detail){  console.log('areas-dt 5>', detail)
  
      if(!HTMLwasSelected) { HTMLselect(detail) }
       
      obj[detail.act].start(detail)
}/**/


const obj = {

      addOne:           { start: (detail)=>{  addOne(detail, htmlFc)                                   }},
      cancelEdit:       { start: (detail)=>{  fullcontEntity.cancelEdit(detail, htmlFc)                }},
      deleteEntity:     { start: (detail)=>{  fullcontEntity.deleteEntity(detail, htmlFc)              }},
      deleteFromDialog: { start: (detail)=>{  deleteFromDialog(detail, htmlFc)                         }},
      discard:          { start: (detail)=>{  fullcontHandler.discard(detail, htmlFc)                  }},
      fullcontOptions:  { start: (detail)=>{  areasMenu.start(detail, 'htmlDt', htmlFc )                }},
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
		dialog.start({ act:"show", id:"saveChanges", entity:'areas' } )
}

function deleteDialog(detail){
		dialog.start({ act:"show",  dest:'areas', id:"deleteElem", entity:'areas', dbid: detail.dbid } )
}

function dtCall(act, result){ 
		areasDt.start({act:act, row: result})
}

function addOne(detail, htmlFc){

      fullcontEntity.addOne(detail, htmlFc) 
      setTimeout(()=>{
           // areasDt.start({"dest":"areas", "elem":"dt", "act":"select", "entity":"areas"})  
      },100)  
                   
}


function deleteFromDialog(detail, htmlFc){

      fullcontEntity.deleteFromDialog(detail, htmlFc) 
      setTimeout(()=>{
            areasDt.start({"dest":"areas", "elem":"dt", "act":"select", "entity":"areas"})  
      },900)  
                   
}

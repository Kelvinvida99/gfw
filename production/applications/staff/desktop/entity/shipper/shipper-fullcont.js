import shipperFullcont  from "./shipper-fullcont.html";

const dialog          = require ('../../../../../components/dialog/dialog')
const fullcontEntity  = require ('../../../../../components/fullcont/fullcont-entity')
const fullcontHandler = require ('../../../../../components/fullcont/fullcont-handler')
const shipperDt     = require('./shipper-dt')
const shipperMenu   = require('./shipper-menu')
const {formCopy}      = require('./shipper-fullcont-form') 
const {form}          = require('./shipper-fullcont-form')
// const {shipperMT}   = require('./shipper-fullcont-multitable')
const shipperMT   = undefined //no MT just add this like undefined

/****************ELEMENTS*****************/
var htmlFc          = {}
var HTMLwasSelected = false

function HTMLselect(detail){ 

	fullcontHandler.HTMLselect(

            'shipper', //database table name****
            'shipper', //dest entity on js
            'shipper-fullcont', 
             shipperFullcont, form, formCopy, shipperMT, 
             editDialog, deleteDialog, dtCall, htmlFc)

	HTMLwasSelected   = true  

      // htmlFc.hasFiles = true
      // fullcontHandler.rightsControl(htmlFc)
}/**/


export function start(detail){  console.log('shipper-dt 5>', detail)
  
      if(!HTMLwasSelected) { HTMLselect(detail) }
       
      obj[detail.act].start(detail)
}/**/


const obj = {

      addOne:           { start: (detail)=>{  addOne(detail, htmlFc)                                   }},
      cancelEdit:       { start: (detail)=>{  fullcontEntity.cancelEdit(detail, htmlFc)                }},
      deleteEntity:     { start: (detail)=>{  fullcontEntity.deleteEntity(detail, htmlFc)              }},
      deleteFromDialog: { start: (detail)=>{  deleteFromDialog(detail, htmlFc)                         }},
      discard:          { start: (detail)=>{  fullcontHandler.discard(detail, htmlFc)                  }},
      fullcontOptions:  { start: (detail)=>{  shipperMenu.start(detail, 'htmlDt', htmlFc )                }},
      hide:             { start: (detail)=>{  fullcontEntity.hide(detail, htmlFc)                      }},
      prepareAdd:       { start: (detail)=>{  fullcontEntity.prepareAdd(detail, htmlFc)                }},
      prepareEdit:      { start: (detail)=>{  fullcontHandler.prepareEdit(detail, htmlFc)              }},
      saveFromDialog:   { start: (detail)=>{  fullcontEntity.saveFromDialog(detail, htmlFc)            }},
      selectOne:        { start: (detail)=>{  fullcontEntity.selectOne(detail, htmlFc)                 }},
      selectOneNoCheck:      { start: (detail)=>{  fullcontEntity.selectOneNoCheck(detail, htmlFc)     }},
      update:           { start: (detail)=>{  fullcontEntity.update(detail, htmlFc)                    }},

}/**/



//function to send
function editDialog(){
		dialog.start({ act:"show", id:"saveChanges", entity:'shipper' } )
}

function deleteDialog(detail){
		dialog.start({ act:"show",  dest:'shipper', id:"deleteElem", entity:'shipper', dbid: detail.dbid } )
}

function dtCall(act, result){ 
		shipperDt.start({act:act, row: result})
}

function addOne(detail, htmlFc){

      fullcontEntity.addOne(detail, htmlFc) 
      setTimeout(()=>{
           // shipperDt.start({"dest":"shipper", "elem":"dt", "act":"select", "entity":"shipper"})  
      },100)  
                   
}


function deleteFromDialog(detail, htmlFc){

      fullcontEntity.deleteFromDialog(detail, htmlFc) 
      setTimeout(()=>{
            shipperDt.start({"dest":"shipper", "elem":"dt", "act":"select", "entity":"shipper"})  
      },900)  
                   
}


import servicesFullcont  from "./services-fullcont.html";

const dialog          = require ('../../components/dialog/dialog')
const fullcontEntity  = require ('../../components/fullcont/fullcont-entity')
const fullcontHandler = require ('../../components/fullcont/fullcont-handler')
const servicesDt          = require('./services-dt')
const servicesMenu        = require('./services-menu')
const {formCopy}      = require('./services-fullcont-form') 
const {form}          = require('./services-fullcont-form')
const {servicesMT}        = require('./services-fullcont-multitable')
//const servicesMT        = undefined //no MT just add this like undefined

/****************ELEMENTS*****************/
var htmlFc          = {}
var HTMLwasSelected = false

function HTMLselect(detail){ 

	fullcontHandler.HTMLselect(

            'services', //database table name****
            'services', //dest entity on js
            'services-fullcont', 
             servicesFullcont, form, formCopy, servicesMT, 
             editDialog, deleteDialog, dtCall, htmlFc)

	HTMLwasSelected   = true  

      // htmlFc.hasFiles = true
      // fullcontHandler.rightsControl(htmlFc)
}/**/


export function start(detail){  console.log('services-dt 5>', detail)
  
      if(!HTMLwasSelected) { HTMLselect(detail) }
       
      obj[detail.act].start(detail)
}/**/


const obj = {

      addOne:           { start: (detail)=>{  addOne(detail, htmlFc)                                   }},
      cancelEdit:       { start: (detail)=>{  fullcontEntity.cancelEdit(detail, htmlFc)                }},
      deleteEntity:     { start: (detail)=>{  fullcontEntity.deleteEntity(detail, htmlFc)              }},
      deleteFromDialog: { start: (detail)=>{  deleteFromDialog(detail, htmlFc)                         }},
      discard:          { start: (detail)=>{  fullcontHandler.discard(detail, htmlFc)                  }},
      fullcontOptions:  { start: (detail)=>{  servicesMenu.start(detail, 'htmlDt', htmlFc )                }},
      hide:             { start: (detail)=>{  fullcontEntity.hide(detail, htmlFc)                      }},
      prepareAdd:       { start: (detail)=>{  fullcontEntity.prepareAdd(detail, htmlFc)                }},
      prepareEdit:      { start: (detail)=>{  fullcontHandler.prepareEdit(detail, htmlFc)              }},
      saveFromDialog:   { start: (detail)=>{  fullcontEntity.saveFromDialog(detail, htmlFc)            }},
      selectOne:        { start: (detail)=>{  fullcontEntity.selectOne(detail, htmlFc)                 }},
      update:           { start: (detail)=>{  fullcontEntity.update(detail, htmlFc)                    }},

}/**/



//function to send
function editDialog(){
		dialog.start({ act:"show", id:"saveChanges", entity:'services' } )
}

function deleteDialog(detail){
		dialog.start({ act:"show",  dest:'services', id:"deleteElem", entity:'services', dbid: detail.dbid } )
}

function dtCall(act, result){ 
		servicesDt.start({act:act, row: result})
}

function addOne(detail, htmlFc){

      fullcontEntity.addOne(detail, htmlFc) 
      setTimeout(()=>{
           // servicesDt.start({"dest":"services", "elem":"dt", "act":"select", "entity":"services"})  
      },100)  
                   
}


function deleteFromDialog(detail, htmlFc){

      fullcontEntity.deleteFromDialog(detail, htmlFc) 
      setTimeout(()=>{
            servicesDt.start({"dest":"services", "elem":"dt", "act":"select", "entity":"services"})  
      },900)  
                   
}

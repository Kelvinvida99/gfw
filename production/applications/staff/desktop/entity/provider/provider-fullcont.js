import providerFullcont  from "./provider-fullcont.html";

const dialog          = require ('../../../../../components/dialog/dialog')
const fullcontEntity  = require ('../../../../../components/fullcont/fullcont-entity')
const fullcontHandler = require ('../../../../../components/fullcont/fullcont-handler')
const providerDt     = require('./provider-dt')
const providerMenu   = require('./provider-menu')
const handler         = require('./provider-fullcont-handler')
const {formCopy}      = require('./provider-fullcont-form') 
const {form}          = require('./provider-fullcont-form')
// const {providerMT}   = require('./provider-fullcont-multitable')
const providerMT   = undefined //no MT just add this like undefined

/****************ELEMENTS*****************/
var htmlFc          = {}
var HTMLwasSelected = false

function HTMLselect(detail){ 

	fullcontHandler.HTMLselect(

            'provider', //database table name****
            'provider', //dest entity on js
            'provider-fullcont', 
             providerFullcont, form, formCopy, providerMT, 
             editDialog, deleteDialog, dtCall, htmlFc)

	HTMLwasSelected   = true  

      // htmlFc.hasFiles = true
      // fullcontHandler.rightsControl(htmlFc)
}/**/


export function start(detail){  console.log('provider-dt 5>', detail)
  
      if(!HTMLwasSelected) { HTMLselect(detail) }
       
      obj[detail.act].start(detail)
}/**/


const obj = {

      addOne:                 { start: (detail)=>{  addOne(detail, htmlFc)                                   }},
      cancelEdit:             { start: (detail)=>{  fullcontEntity.cancelEdit(detail, htmlFc)                }},
      deleteEntity:           { start: (detail)=>{  fullcontEntity.deleteEntity(detail, htmlFc)              }},
      deleteFromDialog:       { start: (detail)=>{  deleteFromDialog(detail, htmlFc)                         }},
      discard:                { start: (detail)=>{  fullcontHandler.discard(detail, htmlFc)                  }},
      fullcontOptions:        { start: (detail)=>{  providerMenu.start(detail, 'htmlDt', htmlFc )                }},
      hide:                   { start: (detail)=>{  fullcontEntity.hide(detail, htmlFc)                      }},
      prepareAdd:             { start: (detail)=>{  fullcontEntity.prepareAdd(detail, htmlFc)                }},
      prepareEdit:            { start: (detail)=>{  fullcontHandler.prepareEdit(detail, htmlFc)              }},
      saveFromDialog:         { start: (detail)=>{  fullcontEntity.saveFromDialog(detail, htmlFc)            }},
      selectOne:              { start: (detail)=>{  fullcontEntity.selectOne(detail, htmlFc)                 }},
      selectOneNoCheck:       { start: (detail)=>{  fullcontEntity.selectOneNoCheck(detail, htmlFc)          }},
      update:                 { start: (detail)=>{  fullcontEntity.update(detail, htmlFc)                    }},
      complete_bill_to_ship:  { start: (detail)=>{  handler.complete_bill_to_ship(htmlFc)                    }},

}/**/



//function to send
function editDialog(){
		dialog.start({ act:"show", id:"saveChanges", entity:'provider' } )
}

function deleteDialog(detail){
		dialog.start({ act:"show",  dest:'provider', id:"deleteElem", entity:'provider', dbid: detail.dbid } )
}

function dtCall(act, result){ 
		providerDt.start({act:act, row: result})
}

function addOne(detail, htmlFc){

      fullcontEntity.addOne(detail, htmlFc) 
      setTimeout(()=>{
           // providerDt.start({"dest":"provider", "elem":"dt", "act":"select", "entity":"provider"})  
      },100)  
                   
}


function deleteFromDialog(detail, htmlFc){

      fullcontEntity.deleteFromDialog(detail, htmlFc) 
      setTimeout(()=>{
            providerDt.start({"dest":"provider", "elem":"dt", "act":"select", "entity":"provider"})  
      },900)  
                   
}

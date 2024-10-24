import customerFullcont  from "./customer-fullcont.html";

const dialog          = require ('../../../../../components/dialog/dialog')
const fullcontEntity  = require ('../../../../../components/fullcont/fullcont-entity')
const fullcontHandler = require ('../../../../../components/fullcont/fullcont-handler')
const handler      = require('./customer-fullcont-handler')
const customerDt      = require('./customer-dt')
const customerMenu    = require('./customer-menu')
const {formCopy}      = require('./customer-fullcont-form') 
const {form}          = require('./customer-fullcont-form')
const customerMT      = undefined //no MT just add this like undefined
const customerJump    = require('./customer-jump')


/****************ELEMENTS*****************/
var htmlFc          = {}
var HTMLwasSelected = false

function HTMLselect(detail){ 

	fullcontHandler.HTMLselect(

            'customer', //database table name****
            'customer', //dest entity on js
            'customer-fullcont', 
             customerFullcont, form, formCopy, customerMT, 
             editDialog, deleteDialog, dtCall, htmlFc)

	HTMLwasSelected   = true  

      // htmlFc.hasFiles = true
      // fullcontHandler.rightsControl(htmlFc)
}/**/


export function start(detail){  console.log('customer-dt 5>', detail)
  
      if(!HTMLwasSelected) { HTMLselect(detail) }
       
      obj[detail.act].start(detail)
}/**/


const obj = {

      addOne:           { start: (detail)=>{  addOne(detail, htmlFc)                                   }},
      cancelEdit:       { start: (detail)=>{  fullcontEntity.cancelEdit(detail, htmlFc)                }},
      deleteEntity:     { start: (detail)=>{  fullcontEntity.deleteEntity(detail, htmlFc)              }},
      deleteFromDialog: { start: (detail)=>{  deleteFromDialog(detail, htmlFc)                         }},
      discard:          { start: (detail)=>{  fullcontHandler.discard(detail, htmlFc)                  }},
      fullcontOptions:  { start: (detail)=>{  customerMenu.start(detail, 'htmlDt', htmlFc )            }},
      hide:             { start: (detail)=>{  fullcontEntity.hide(detail, htmlFc)                      }},
      prepareAdd:       { start: (detail)=>{  fullcontEntity.prepareAdd(detail, htmlFc)                }},
      prepareEdit:      { start: (detail)=>{  fullcontHandler.prepareEdit(detail, htmlFc)              }},
      saveFromDialog:   { start: (detail)=>{  fullcontEntity.saveFromDialog(detail, htmlFc)            }},
      selectOne:        { start: (detail)=>{  fullcontEntity.selectOne(detail, htmlFc)                 }},
      selectOneNoCheck: { start: (detail)=>{  fullcontEntity.selectOneNoCheck(detail, htmlFc)          }},
      update:           { start: (detail)=>{  fullcontEntity.update(detail, htmlFc)                    }},
      addBillingToShipping:           { start: (detail)=>{  handler.addBillingToShipping(detail, htmlFc)                    }},
      jump:             { start: (detail)=>{  customerJump.start(detail, htmlFc)                    }},


}/**/



//function to send
function editDialog(){
	dialog.start({ act:"show", id:"saveChanges", entity:'customer' } )
}

function deleteDialog(detail){
	dialog.start({ act:"show",  dest:'customer', id:"deleteElem", entity:'customer', dbid: detail.dbid } )
}

function dtCall(act, result){ 
	customerDt.start({act:act, row: result})
}

function addOne(detail, htmlFc){

      fullcontEntity.addOne(detail, htmlFc) 
      setTimeout(()=>{
           // customerDt.start({"dest":"customer", "elem":"dt", "act":"select", "entity":"customer"})  
      },100)  
                   
}


function deleteFromDialog(detail, htmlFc){

      fullcontEntity.deleteFromDialog(detail, htmlFc) 
      setTimeout(()=>{
            customerDt.start({"dest":"customer", "elem":"dt", "act":"select", "entity":"customer"})  
      },900)  
                   
}

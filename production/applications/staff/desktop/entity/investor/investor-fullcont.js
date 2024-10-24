import investorFullcont  from "./investor-fullcont.html";

const dialog          = require ('../../../../../components/dialog/dialog')
const fullcontEntity  = require ('../../../../../components/fullcont/fullcont-entity')
const fullcontHandler = require ('../../../../../components/fullcont/fullcont-handler')
const investorDt      = require('./investor-dt')
const investorMenu    = require('./investor-menu')
const handler         = require('./investor-fullcont-handler')
const {formCopy}      = require('./investor-fullcont-form') 
const {form}          = require('./investor-fullcont-form')
// const {investorMT} = require('./investor-fullcont-multitable')
const investorMT      = undefined //no MT just add this like undefined



/****************ELEMENTS*****************/
var htmlFc          = {}
var HTMLwasSelected = false

function HTMLselect(detail){ 

	fullcontHandler.HTMLselect(

            'investor', //database table name****
            'investor', //dest entity on js
            'investor-fullcont', 
             investorFullcont, form, formCopy, investorMT, 
             editDialog, deleteDialog, dtCall, htmlFc)

	HTMLwasSelected   = true  

      // htmlFc.hasFiles = true
      // fullcontHandler.rightsControl(htmlFc)
}/**/


export function start(detail){  console.log('investor-dt 5>', detail)
  
      if(!HTMLwasSelected) { HTMLselect(detail) }
       
      obj[detail.act].start(detail)
}/**/


const obj = {

      addOne:           { start: (detail)=>{  addOne(detail, htmlFc)                                           }},
      cancelEdit:       { start: (detail)=>{  fullcontEntity.cancelEdit(detail, htmlFc)                        }},
      deleteEntity:     { start: (detail)=>{  fullcontEntity.deleteEntity(detail, htmlFc)                      }},
      deleteFromDialog: { start: (detail)=>{  deleteFromDialog(detail, htmlFc)                                 }},
      discard:          { start: (detail)=>{  fullcontHandler.discard(detail, htmlFc)                          }},
      fullcontOptions:  { start: (detail)=>{  investorMenu.start(detail, 'htmlDt', htmlFc )                    }},
      hide:             { start: (detail)=>{  fullcontEntity.hide(detail, htmlFc)                              }},
      prepareAdd:       { start: (detail)=>{  fullcontEntity.prepareAdd(detail, htmlFc,process_required_field) }},
      prepareEdit:      { start: (detail)=>{  fullcontHandler.prepareEdit(detail, htmlFc)                      }},
      saveFromDialog:   { start: (detail)=>{  fullcontEntity.saveFromDialog(detail, htmlFc)                    }},
      selectOne:        { start: (detail)=>{  fullcontEntity.selectOne(detail, htmlFc,process_required_field)  }},
      selectOneNoCheck: { start: (detail)=>{  fullcontEntity.selectOneNoCheck(detail, htmlFc)          }},
      update:           { start: (detail)=>{  fullcontEntity.update(detail, htmlFc,process_required_field)     }},
      required_field:   { start: (detail)=>{  handler.required_field(htmlFc)                                   }},
      checkUsername:    { start: (detail)=>{  handler.checkUsername(detail)                                         }},



}/**/



//function to send
function editDialog(){
		dialog.start({ act:"show", id:"saveChanges", entity:'investor' } )
}

function deleteDialog(detail){
		dialog.start({ act:"show",  dest:'investor', id:"deleteElem", entity:'investor', dbid: detail.dbid } )
}

function dtCall(act, result){ 
		investorDt.start({act:act, row: result})
}

function addOne(detail, htmlFc){

      fullcontEntity.addOne(detail, htmlFc,process_required_field) 
      setTimeout(()=>{
           // investorDt.start({"dest":"investor", "elem":"dt", "act":"select", "entity":"investor"})  
      },100)  
                   
}


function process_required_field() {
      handler.required_field(htmlFc) 
}


function deleteFromDialog(detail, htmlFc){

      fullcontEntity.deleteFromDialog(detail, htmlFc) 
      setTimeout(()=>{
            investorDt.start({"dest":"investor", "elem":"dt", "act":"select", "entity":"investor"})  
      },900)  
                   
}

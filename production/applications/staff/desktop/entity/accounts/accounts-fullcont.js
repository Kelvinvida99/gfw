import accountsFullcont  from "./accounts-fullcont.html";

const dialog          = require ('../../../../../components/dialog/dialog')
const fullcontEntity  = require ('../../../../../components/fullcont/fullcont-entity')
const fullcontHandler = require ('../../../../../components/fullcont/fullcont-handler')
const accountsDt      = require('./accounts-dt')
const accountsMenu    = require('./accounts-menu')
const {formCopy}      = require('./accounts-fullcont-form') 
const {form}          = require('./accounts-fullcont-form')
const handler         = require('./accounts-fullcont-handler')
const snack           = require('../../../../../components/snack/snack')
// const {accountsMT} = require('./accounts-fullcont-multitable')
const accountsMT      = undefined //no MT just add this like undefined

/****************ELEMENTS*****************/
var htmlFc          = {}
var HTMLwasSelected = false

function HTMLselect(detail){ 

	fullcontHandler.HTMLselect(

            'accounts', //database table name****
            'accounts', //dest entity on js
            'accounts-fullcont', 
             accountsFullcont, form, formCopy, accountsMT, 
             editDialog, deleteDialog, dtCall, htmlFc)

	HTMLwasSelected   = true  

      // htmlFc.hasFiles = true
      // fullcontHandler.rightsControl(htmlFc)
}/**/

export function start(detail){  console.log('accounts-dt 5>', detail)
  
      if(!HTMLwasSelected) { HTMLselect(detail) }
       
      obj[detail.act].start(detail)
}/**/

const obj = {

      addOne:           { start: (detail)=>{  addOne(detail, htmlFc)                                          }},
      cancelEdit:       { start: (detail)=>{  fullcontEntity.cancelEdit(detail, htmlFc)                       }},
      deleteEntity:     { start: (detail)=>{  fullcontEntity.deleteEntity(detail, htmlFc)                     }},
      deleteFromDialog: { start: (detail)=>{  deleteFromDialog(detail, htmlFc)                                }},
      discard:          { start: (detail)=>{  fullcontHandler.discard(detail, htmlFc)                         }},
      fullcontOptions:  { start: (detail)=>{  accountsMenu.start(detail, 'htmlDt', htmlFc )                   }},
      hide:             { start: (detail)=>{  fullcontEntity.hide(detail, htmlFc)                             }},
      prepareAdd:       { start: (detail)=>{  fullcontEntity.prepareAdd(detail, htmlFc)                       }},
      prepareEdit:      { start: (detail)=>{  fullcontHandler.prepareEdit(detail, htmlFc)                     }},
      saveFromDialog:   { start: (detail)=>{  handler.validate(detail, htmlFc)                                }},
      selectOne:        { start: (detail)=>{  fullcontEntity.selectOne(detail, htmlFc)                        }},
      selectOneNoCheck: { start: (detail)=>{  fullcontEntity.selectOneNoCheck(detail, htmlFc)                 }},
      update:           { start: (detail)=>{  handler.validate(detail, htmlFc)                                }},

}/**/

//function to send
function editDialog(){
	dialog.start({ act:"show", id:"saveChanges", entity:'accounts' } )
}

function deleteDialog(detail){
	dialog.start({ act:"show",  dest:'accounts', id:"deleteElem", entity:'accounts', dbid: detail.dbid } )
}

function dtCall(act, result){ 
	accountsDt.start({act:act, row: result})
}

function addOne(detail, htmlFc){

      fullcontEntity.addOne(detail, htmlFc) 
      setTimeout(()=>{
           // accountsDt.start({"dest":"accounts", "elem":"dt", "act":"select", "entity":"accounts"})  
      },100)  
                   
}

function deleteFromDialog(detail, htmlFc){
      if (parseInt(htmlFc.fullcontHTML.getAttribute('data-DBid')) > 99) {
            fullcontEntity.deleteFromDialog(detail, htmlFc) 
            setTimeout(()=>{
                  accountsDt.start({"dest":"accounts", "elem":"dt", "act":"select", "entity":"accounts"})  
            },900)  
      } else {
            snack.start({ act: 'show', id: 'accountidisless', });
      }                
}
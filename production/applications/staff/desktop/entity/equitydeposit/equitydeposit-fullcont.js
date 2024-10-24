import equitydepositFullcont  from "./equitydeposit-fullcont.html";

const dialog               = require ('../../../../../components/dialog/dialog')
const fullcontEntity       = require ('../../../../../components/fullcont/fullcont-entity')
const fullcontHandler      = require ('../../../../../components/fullcont/fullcont-handler')
const equitydepositDt   = require('./equitydeposit-dt')
const equitydepositMenu = require('./equitydeposit-menu')
const {formCopy}           = require('./equitydeposit-fullcont-form') 
const {form}               = require('./equitydeposit-fullcont-form')
const equitydepositMT   = undefined //no MT just add this like undefined
const timeDate        = require ('../../../../../js-handler/time-date')

/****************ELEMENTS*****************/
var htmlFc          = {}
var HTMLwasSelected = false

function HTMLselect(detail){ 

      fullcontHandler.HTMLselect(

            'equitydeposit', //database table name****
            'equitydeposit', //dest entity on js
            'equitydeposit-fullcont', 
             equitydepositFullcont, form, formCopy, equitydepositMT, 
             editDialog, deleteDialog, dtCall, htmlFc)

      HTMLwasSelected   = true  

      // htmlFc.hasFiles = true
      // fullcontHandler.rightsControl(htmlFc)
}/**/


export function start(detail){  console.log('equitydeposit-dt 5>', detail)
  
      if(!HTMLwasSelected) { HTMLselect(detail) }
       
      obj[detail.act].start(detail)
}/**/


const obj = {

      addOne:           { start: (detail)=>{  addOne(detail, htmlFc)                                   }},
      cancelEdit:       { start: (detail)=>{  fullcontEntity.cancelEdit(detail, htmlFc)                }},
      deleteEntity:     { start: (detail)=>{  fullcontEntity.deleteEntity(detail, htmlFc)              }},
      deleteFromDialog: { start: (detail)=>{  deleteFromDialog(detail, htmlFc)                         }},
      discard:          { start: (detail)=>{  fullcontHandler.discard(detail, htmlFc)                  }},
      hide:             { start: (detail)=>{  fullcontEntity.hide(detail, htmlFc)                      }},
      prepareAdd:       { start: (detail)=>{  fullcontEntity.prepareAdd(detail, htmlFc, setDefaultValue) }},
      prepareEdit:      { start: (detail)=>{  fullcontHandler.prepareEdit(detail, htmlFc)              }},
      saveFromDialog:   { start: (detail)=>{  fullcontEntity.saveFromDialog(detail, htmlFc)            }},
      selectOne:        { start: (detail)=>{  fullcontEntity.selectOne(detail, htmlFc)                 }},
      update:           { start: (detail)=>{  fullcontEntity.update(detail, htmlFc)                    }},
      selectOneNoCheck: { start: (detail)=>{  fullcontEntity.selectOneNoCheck(detail, htmlFc)          }},
      
}/**/



//function to send
function editDialog(){
      dialog.start({ act:"show", id:"saveChanges", entity:'equitydeposit' } )
}

function deleteDialog(detail){
      dialog.start({ act:"show",  dest:'equitydeposit', id:"deleteElem", entity:'equitydeposit', dbid: detail.dbid } )
}

function dtCall(act, result){ 
      equitydepositDt.start({act:act, row: result})
}

function addOne(detail, htmlFc){

      fullcontEntity.addOne(detail, htmlFc) 
      setTimeout(()=>{
           // equitydepositDt.start({"dest":"equitydeposit", "elem":"dt", "act":"select", "entity":"equitydeposit"})  
      },100)  
                   
}


function deleteFromDialog(detail, htmlFc){

      fullcontEntity.deleteFromDialog(detail, htmlFc) 
      setTimeout(()=>{
            equitydepositDt.start({"dest":"equitydeposit", "elem":"dt", "act":"select", "entity":"equitydeposit"})  
      },900)  
                   
}

function setDefaultValue(htmlFc){

      let equitydeposit_form_date  = htmlFc.fullcontHTML.querySelector('#equitydeposit_form_date input');
      equitydeposit_form_date.value = timeDate.convertDateToInput();
  
  
      htmlFc.formCopy.forEach(element => {
        if (element.name == "date") {
  
              element.value=equitydeposit_form_date.value;
        }
  
      });
  }
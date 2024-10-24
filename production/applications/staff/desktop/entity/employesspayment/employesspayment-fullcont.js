import employesspaymentFullcont  from "./employesspayment-fullcont.html";

const dialog               = require ('../../../../../components/dialog/dialog')
const fullcontEntity       = require ('../../../../../components/fullcont/fullcont-entity')
const fullcontHandler      = require ('../../../../../components/fullcont/fullcont-handler')
const employesspaymentDt   = require('./employesspayment-dt')
const employesspaymentMenu = require('./employesspayment-menu')
const {formCopy}           = require('./employesspayment-fullcont-form') 
const {form}               = require('./employesspayment-fullcont-form')
const employesspaymentMT   = undefined //no MT just add this like undefined
const timeDate        = require ('../../../../../js-handler/time-date')

/****************ELEMENTS*****************/
var htmlFc          = {}
var HTMLwasSelected = false

function HTMLselect(detail){ 

      fullcontHandler.HTMLselect(

            'employesspayment', //database table name****
            'employesspayment', //dest entity on js
            'employesspayment-fullcont', 
             employesspaymentFullcont, form, formCopy, employesspaymentMT, 
             editDialog, deleteDialog, dtCall, htmlFc)

      HTMLwasSelected   = true  

      // htmlFc.hasFiles = true
      // fullcontHandler.rightsControl(htmlFc)
}/**/


export function start(detail){  console.log('employesspayment-dt 5>', detail)
  
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
      dialog.start({ act:"show", id:"saveChanges", entity:'employesspayment' } )
}

function deleteDialog(detail){
      dialog.start({ act:"show",  dest:'employesspayment', id:"deleteElem", entity:'employesspayment', dbid: detail.dbid } )
}

function dtCall(act, result){ 
      employesspaymentDt.start({act:act, row: result})
}

function addOne(detail, htmlFc){

      fullcontEntity.addOne(detail, htmlFc) 
      setTimeout(()=>{
           // employesspaymentDt.start({"dest":"employesspayment", "elem":"dt", "act":"select", "entity":"employesspayment"})  
      },100)  
                   
}


function deleteFromDialog(detail, htmlFc){

      fullcontEntity.deleteFromDialog(detail, htmlFc) 
      setTimeout(()=>{
            employesspaymentDt.start({"dest":"employesspayment", "elem":"dt", "act":"select", "entity":"employesspayment"})  
      },900)  
                   
}

function setDefaultValue(htmlFc){

      let employesspayment_form_date  = htmlFc.fullcontHTML.querySelector('#employesspayment_form_date input');
      employesspayment_form_date.value = timeDate.convertDateToInput();
  
  
      htmlFc.formCopy.forEach(element => {
        if (element.name == "date") {
  
              element.value=employesspayment_form_date.value;
        }
  
      });
  }
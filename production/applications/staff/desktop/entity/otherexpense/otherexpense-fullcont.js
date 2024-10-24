import otherexpenseFullcont  from "./otherexpense-fullcont.html";

const dialog           = require ('../../../../../components/dialog/dialog')
const fullcontEntity   = require ('../../../../../components/fullcont/fullcont-entity')
const fullcontHandler  = require ('../../../../../components/fullcont/fullcont-handler')
const otherexpenseDt   = require('./otherexpense-dt')
const otherexpenseMenu = require('./otherexpense-menu')
const pdfHandler       = require ('./otherexpense-fullcont-pdf-handler')
const {formCopy}       = require('./otherexpense-fullcont-form') 
const {form}           = require('./otherexpense-fullcont-form')
// const {investorMT}  = require('./investor-fullcont-multitable')
const otherexpenseMT   = undefined //no MT just add this like undefined
const timeDate         = require ('../../../../../js-handler/time-date')

/****************ELEMENTS*****************/
var htmlFc          = {}
var HTMLwasSelected = false

function HTMLselect(detail){ 

	fullcontHandler.HTMLselect(

            'otherexpense', //database table name****
            'otherexpense', //dest entity on js
            'otherexpense-fullcont', 
             otherexpenseFullcont, form, formCopy, otherexpenseMT, 
             editDialog, deleteDialog, dtCall, htmlFc)

	HTMLwasSelected   = true  

      // htmlFc.hasFiles = true
      // fullcontHandler.rightsControl(htmlFc)
}/**/


export function start(detail){  console.log('otherexpense-dt 5>', detail)
  
      if(!HTMLwasSelected) { HTMLselect(detail) }
       
      obj[detail.act].start(detail)
}/**/


const obj = {

      addOne:           { start: (detail)=>{  addOne(detail, htmlFc)                                     }},
      cancelEdit:       { start: (detail)=>{  fullcontEntity.cancelEdit(detail, htmlFc)                  }},
      deleteEntity:     { start: (detail)=>{  fullcontEntity.deleteEntity(detail, htmlFc)                }},
      deleteFromDialog: { start: (detail)=>{  deleteFromDialog(detail, htmlFc)                           }},
      discard:          { start: (detail)=>{  fullcontHandler.discard(detail, htmlFc)                    }},
      fullcontOptions:  { start: (detail)=>{  otherexpenseMenu.start(detail, 'htmlDt', htmlFc )          }},
      hide:             { start: (detail)=>{  fullcontEntity.hide(detail, htmlFc)                        }},
      prepareAdd:       { start: (detail)=>{  fullcontEntity.prepareAdd(detail, htmlFc, setDefaultValue) }},
      prepareEdit:      { start: (detail)=>{  fullcontHandler.prepareEdit(detail, htmlFc)                }},
      reportPdf:        { start: (detail)=>{  pdfHandler.reportPdf(detail, htmlFc)                       }},
      saveFromDialog:   { start: (detail)=>{  fullcontEntity.saveFromDialog(detail, htmlFc)              }},
      selectOne:        { start: (detail)=>{  fullcontEntity.selectOne(detail, htmlFc)                   }},
      selectOneNoCheck: { start: (detail)=>{  fullcontEntity.selectOneNoCheck(detail, htmlFc)            }},
      update:           { start: (detail)=>{  fullcontEntity.update(detail, htmlFc)                      }},

}/**/



//function to send
function editDialog(){
		dialog.start({ act:"show", id:"saveChanges", entity:'otherexpense' } )
}

function deleteDialog(detail){
		dialog.start({ act:"show",  dest:'otherexpense', id:"deleteElem", entity:'otherexpense', dbid: detail.dbid } )
}

function dtCall(act, result){ 
		otherexpenseDt.start({act:act, row: result})
}

function addOne(detail, htmlFc){

      fullcontEntity.addOne(detail, htmlFc) 
      setTimeout(()=>{
           // investorDt.start({"dest":"investor", "elem":"dt", "act":"select", "entity":"investor"})  
      },100)  
                   
}

function deleteFromDialog(detail, htmlFc){

      fullcontEntity.deleteFromDialog(detail, htmlFc) 
      setTimeout(()=>{
            otherexpenseDt.start({"dest":"otherexpense", "elem":"dt", "act":"select", "entity":"otherexpense"})  
      },900)                     
}

//Function to set default values to fullcont fields when creating a record is pressed
function setDefaultValue(htmlFc){

      let date  = htmlFc.fullcontHTML.querySelector('#otherexpense_form_date input');
      date.value = timeDate.convertDateToInput();

      htmlFc.formCopy.forEach(element => {

            if (element.name == "date") {
                  element.value=date.value;
            }
      });
}
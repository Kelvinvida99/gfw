import sentpaymentFullcont  from "./sentpayment-fullcont.html";

const dialog           = require ('../../../../../components/dialog/dialog')
const fullcontEntity   = require ('../../../../../components/fullcont/fullcont-entity')
const fullcontHandler  = require ('../../../../../components/fullcont/fullcont-handler')
const sentpaymentDt    = require ('./sentpayment-dt')
const sentpaymentMenu  = require ('./sentpayment-menu')
const handler          = require ('./sentpayment-fullcont-handler')
const {formCopy}       = require ('./sentpayment-fullcont-form') 
const {form}           = require ('./sentpayment-fullcont-form')
const {sentpaymentMT}  = require ('./sentpayment-fullcont-multitable')
// const sentpaymentMT = undefined
const timeDate         = require ('../../../../../js-handler/time-date')

/****************ELEMENTS*****************/
var htmlFc          = {}
var HTMLwasSelected = false

function HTMLselect(detail){ 

	fullcontHandler.HTMLselect(

            'sentpayment', //database table name****
            'sentpayment', //dest entity on js
            'sentpayment-fullcont', 
             sentpaymentFullcont, form, formCopy, sentpaymentMT, 
             editDialog, deleteDialog, dtCall, htmlFc)

	HTMLwasSelected   = true  

      // htmlFc.hasFiles = true
      // fullcontHandler.rightsControl(htmlFc)
}/**/


export function start(detail){  //console.log('sentpayment-dt 5>', detail)
  
      if(!HTMLwasSelected) { HTMLselect(detail) }
       
      obj[detail.act].start(detail)
}/**/

const obj = {

      addOne:           { start: (detail)=>{  if (handler.verifyMultitable(detail,htmlFc)){addOne(detail, htmlFc)} }},
      cancelEdit:       { start: (detail)=>{  fullcontEntity.cancelEdit(detail, htmlFc)                 }},
      deleteEntity:     { start: (detail)=>{  fullcontEntity.deleteEntity(detail, htmlFc)               }},
      deleteFromDialog: { start: (detail)=>{  deleteFromDialog(detail, htmlFc)                          }},
      discard:          { start: (detail)=>{  fullcontHandler.discard(detail, htmlFc)                   }},
      fullcontOptions:  { start: (detail)=>{  sentpaymentMenu.start(detail, 'htmlDt', htmlFc )       }},
      hide:             { start: (detail)=>{  fullcontEntity.hide(detail, htmlFc)                       }},
      prepareAdd:       { start: (detail)=>{  fullcontEntity.prepareAdd(detail, htmlFc, setDefaultValue)}},
      prepareEdit:      { start: (detail)=>{  fullcontHandler.prepareEdit(detail, htmlFc)               }},
      saveFromDialog:   { start: (detail)=>{   if (handler.verifyMultitable(detail,htmlFc)){
                                                     fullcontEntity.saveFromDialog(detail, htmlFc) 
                                                }                                                       }},
      selectOne:        { start: (detail)=>{  fullcontEntity.selectOne(detail, htmlFc, handler.verifyCheckBox(htmlFc))                  }},
      selectOneNoCheck:      { start: (detail)=>{  fullcontEntity.selectOneNoCheck(detail, htmlFc)      }},
      update:           { start: (detail)=>{   if (handler.verifyMultitable(detail,htmlFc)){
                                                     fullcontEntity.update(detail, htmlFc) 
                                                }                                                       }},
      getAllInvoice:    { start: (detail)=>{  handler.getAllInvoice(detail, htmlFc)                     }},
      validated_press:  { start: (detail)=>{  handler.validated_press(detail, htmlFc)                   }},
      reportPdf:        { start: (detail)=>{  handler.reportPdf(detail, htmlFc)                         }},
      addAmount:        { start: (detail)=>{  handler.addAmount(detail, htmlFc)                         }},

}/**/

//function to send
function editDialog(){
	dialog.start({ act:"show", id:"saveChanges", entity:'sentpayment' } )
}

function deleteDialog(detail){
	dialog.start({ act:"show",  dest:'sentpayment', id:"deleteElem", entity:'sentpayment', dbid: detail.dbid } )
}

function dtCall(act, result){ 
	sentpaymentDt.start({act:act, row: result})
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
            sentpaymentDt.start({"dest":"sentpayment", "elem":"dt", "act":"select", "entity":"sentpayment"})  
      },900)                
}

//Function to set default values to fullcont fields when creating a record is pressed
function setDefaultValue(htmlFc){

      let sale_date  = htmlFc.fullcontHTML.querySelector('#sentpayment_form_date input');
      sale_date.value = timeDate.convertDateToInput();


      htmlFc.formCopy.forEach(element => {

            if (element.name == "date") {
                  element.value=sale_date.value;
            }
      });
}
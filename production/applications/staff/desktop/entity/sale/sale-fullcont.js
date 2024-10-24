import saleFullcont  from "./sale-fullcont.html";

const dialog          = require ('../../../../../components/dialog/dialog')
const fullcontEntity  = require ('../../../../../components/fullcont/fullcont-entity')
const fullcontHandler = require ('../../../../../components/fullcont/fullcont-handler')
const saleDt          = require('./sale-dt')
const saleMenu        = require('./sale-menu')
const handler         = require('./sale-fullcont-handler')
const {formCopy}      = require('./sale-fullcont-form') 
const {form}          = require('./sale-fullcont-form')
const {saleMT}        = require('./sale-fullcont-multitable')
const timeDate        = require ('../../../../../js-handler/time-date')
const settings        = require('../../../../../js-handler/settings')
const restriction     = require ('./sale-fullcont-restriction')
const notification    = require ('./sale-fullcont-notification')

/****************ELEMENTS*****************/
var htmlFc           = {}
var HTMLwasSelected  = false
var input_send_email = false

function HTMLselect(detail){ 

	fullcontHandler.HTMLselect(

            'sale', //database table name****
            'sale', //dest entity on js
            'sale-fullcont', 
             saleFullcont, form, formCopy, saleMT, 
             editDialog, deleteDialog, dtCall, htmlFc)

	HTMLwasSelected   = true  

      // htmlFc.hasFiles = true
      // fullcontHandler.rightsControl(htmlFc) 
}/**/


export function start(detail){  
//console.log('sale-dt 5>', detail)
  
      if(!HTMLwasSelected) { HTMLselect(detail) }
       
      obj[detail.act].start(detail)
}/**/


const obj = {

      addOne:                { start: (detail)=>{  addOne(detail, htmlFc)                                                                     }},
      addOnePrint:           { start: (detail)=>{  addOnePrint(detail, htmlFc);                                                               }},
      cancelEdit:            { start: (detail)=>{  fullcontEntity.cancelEdit(detail, htmlFc)                                                  }},
      deleteEntity:          { start: (detail)=>{  deleteEntity(detail,htmlFc);                                                               }},
      deleteFromDialog:      { start: (detail)=>{  deleteFromDialog(detail, htmlFc)                                                           }},
      discard:               { start: (detail)=>{  fullcontHandler.discard(detail, htmlFc)                                                    }},
      fullcontOptions:       { start: (detail)=>{  saleMenu.start(detail, 'htmlDt', htmlFc )                                                  }},
      hide:                  { start: (detail)=>{  fullcontEntity.hide(detail, htmlFc)                                                        }},
      prepareAdd:            { start: (detail)=>{  fullcontEntity.prepareAdd(detail, htmlFc, process)                                         }},
      prepareEdit:           { start: (detail)=>{  fullcontHandler.prepareEdit(detail, htmlFc)                                                }},
      saveFromDialog:        { start: (detail)=>{  saveFromDialog(detail)                                                                     }},
      selectOne:             { start: (detail)=>{  fullcontEntity.selectOne(detail, htmlFc, process_required_field_select_one)                }},
      selectOneNoCheck:      { start: (detail)=>{  fullcontEntity.selectOneNoCheck(detail, htmlFc)                                            }},
      update:                { start: (detail)=>{  update(detail);                                                                            }},
      updatePrint:           { start: (detail)=>{  updatePrint(detail);                                                                       }},
      otherFieldCustomer:    { start: (detail)=>{  handler.otherFieldCustomer(detail, htmlFc)                                                 }},
      otherFieldItem:        { start: (detail)=>{  handler.otherFieldItem(detail, htmlFc)                                                     }},
      calculate_values:      { start: (detail)=>{  handler.calculate_values(detail, htmlFc)                                                   }},
      calculateGrandTotal:   { start: (detail)=>{  calculateGrandTotal();                                                                     }},
      required_field:        { start: (detail)=>{  handler.required_field(htmlFc)                                                             }},
      pdfMenuFullcont:       { start: (detail)=>{  handler.pdfMenuFullcont("print")                                                           }},
      pdfFullcontPackSlip:   { start: (detail)=>{  handler.pdfFullcontPackSlip(detail, htmlFc)                                                }},
      addOneFromDialog:      { start: (detail)=>{  fullcontEntity.addOne(detail, htmlFc,process_required_field)                               }},
      addOnePrintFromDialog: { start: (detail)=>{  fullcontEntity.addOne(detail, htmlFc,process_required_field_print)                         }},
      updateFromDialog:      { start: (detail)=>{  updateFromDialog(detail);                                                                  }},
      updatePrintFromDialog: { start: (detail)=>{  updatePrintFromDialog(detail);                                                             }},
      shippingnow:           { start: (detail)=>{  handler.shippingnow(htmlFc)                                                                }},
      insertshippingdatetime:{ start: (detail)=>{  handler.insertshippingdatetime(htmlFc)                                                     }},
      showcost:              { start: (detail)=>{  handler.showcost(htmlFc)                                                                   }},
      verifyQtyItem:         { start: (detail)=>{  handler.verifyQtyItem(htmlFc)                                                              }},
      calculatepaymentdue:   { start: (detail)=>{  handler.calculatepaymentdue(htmlFc)                                                        }},
      calculate_values_p_vs_lost: { start: (detail)=>{  handler.calculate_values_p_vs_lost(detail, htmlFc)       }},
      beforeAutocomplete:  { start: (detail)=>{  handler.beforeAutocomplete(detail,htmlFc)                           }},
      otherFieldItemLost:  { start: (detail)=>{  handler.otherFieldItemLost(detail,htmlFc)                 }},
}/**/

//function to send
function editDialog(){
		dialog.start({ act:"show", id:"saveChanges", entity:'sale' } )
}

function deleteDialog(detail){
		dialog.start({ act:"show",  dest:'sale', id:"deleteElem", entity:'sale', dbid: detail.dbid } )
}

function dtCall(act, result){ 
		saleDt.start({act:act, row: result})
}


async function addOne(detail, htmlFc) {
      input_send_email = htmlFc.fullcontHTML.querySelector('#sale_form_send_email input').checked;
      if (!await handler.validated(detail, htmlFc, "add")) {
            fullcontEntity.addOne(detail, htmlFc, process_required_field)

            
      }


}

async function addOnePrint(detail, htmlFc) {
      if (!await handler.validated(detail, htmlFc, "addPrint")) {
         fullcontEntity.addOne(detail, htmlFc, process_required_field_print);
      }   
      
}


function deleteFromDialog(detail, htmlFc){

      fullcontEntity.deleteFromDialog(detail, htmlFc) 
      setTimeout(()=>{
            saleDt.start({"dest":"sale", "elem":"dt", "act":"select", "entity":"sale"})  
      },900)  
                   
}

//Function to set default values to fullcont fields when creating a record is pressed
function setDefaultValue(htmlFc){


      let sale_date  = htmlFc.fullcontHTML.querySelector('#sale_form_sale_date input');
      sale_date.value = timeDate.convertDateToInput();

      //console.log( settings.getData());

      let sale_statement  = htmlFc.fullcontHTML.querySelector('#sale_form_sale_statement textarea');
      sale_statement.value = settings.getData().sale_statement

      let sale_footer  = htmlFc.fullcontHTML.querySelector('#sale_form_sale_footer textarea');
      sale_footer.value = settings.getData().sale_footer

      let sale_shipping_status =  htmlFc.fullcontHTML.querySelector('#sale_form_shipping_status select');
      sale_shipping_status.value = 'preparing';

      let day_default = '30';
      let sale_form_terms =  htmlFc.fullcontHTML.querySelector('#sale_form_terms select');
      sale_form_terms.value = day_default;

      let due_date  = htmlFc.fullcontHTML.querySelector('#sale_form_due_date input');
      due_date.value = timeDate.convertDateToInput( new Date().setDate(new Date().getDate()+parseInt(day_default)));

      let sale_showcost =  htmlFc.fullcontHTML.querySelector('#showcost');
      sale_showcost.checked = false;



      htmlFc.formCopy.forEach(element => {

            if (element.name == "sale_date") {
                  element.value=sale_date.value;
            }

            if (element.name == "due_date") {
                  element.value=due_date.value;
            }

            if (element.name == "sale_statement") {
                  element.value=sale_statement.value;
            }
            
            if (element.name == "sale_footer") {
                  element.value=sale_footer.value;
            }

            if (element.name == "shipping_status") {
                  element.value=sale_shipping_status.value;
            }

            if (element.name == "terms") {
                  element.value=sale_form_terms.value;
            }
      });
}

function process_required_field(data= undefined, result) {
      handler.required_field(htmlFc) 
      if (data !=undefined) {
            restriction.evaluation(htmlFc,  result.restriction)
            notification.start( data, result, htmlFc ) 
            
            if (input_send_email) {
                  handler.pdfMenuFullcont("sendemail");    
            }
      }

                       


}


function process_required_field_saveFromDialog(data= undefined, result) {
      handler.required_field(htmlFc) 
      if (data !=undefined) {
            restriction.evaluation(htmlFc,  result.restriction)
            notification.start( data, result, htmlFc ) 
            
            handler.pdfMenuFullcont("print_sendmail");
      }


                  
}

function process_required_field_update(data= undefined, result) {
      handler.required_field(htmlFc) 
      if (data !=undefined) {
            restriction.evaluation(htmlFc,  result.restriction)
            notification.start( data, result, htmlFc ) 
            handler.dtgenerator(result,htmlFc);
            
            if (input_send_email) {
                  handler.pdfMenuFullcont("sendemail");
            }
      
      }

}

function process_required_field_select_one(data, result) {
      handler.required_field(htmlFc) 
      handler.fill_InventoryStock(data) 
      restriction.evaluation(htmlFc,  result.restriction)
      notification.start( data, result, htmlFc )
      handler.dtgenerator(result,htmlFc);
      handler.getemailTraking(result);

      let sale_showcost =  htmlFc.fullcontHTML.querySelector('#showcost');
      sale_showcost.checked = false;

      let event = new Event('change');
      sale_showcost.dispatchEvent(event);

      handler.notifytab(htmlFc);


}

function process_required_field_print(data, result, htmlFc) {

      handler.required_field(htmlFc) 
      restriction.evaluation(htmlFc,  result.restriction)
      notification.start( data, result, htmlFc )
      
      handler.dtgenerator(result,htmlFc); 
      handler.pdfMenuFullcont("print_sendmail");
}



function process() {
      setDefaultValue(htmlFc);
      process_required_field();
      handler.cleandtfullcont(htmlFc);
}




async function saveFromDialog(detail) {
      input_send_email = htmlFc.fullcontHTML.querySelector('#sale_form_send_email input').checked;

      setTimeout(async  () => {
            if (!await handler.validated(detail, htmlFc,
                  (htmlFc.fullcontHTML.classList.contains('mode-add') == true ? "add" : "update"))) {
                  let mode = htmlFc.fullcontHTML.classList.contains('mode-add') == true ? "add" : "update"; 
                  fullcontEntity.saveFromDialog(detail, htmlFc, mode=="add" ? process_required_field_saveFromDialog : process_required_field_update)
            }
      }, 500)

}


async function update(detail) {
      input_send_email = htmlFc.fullcontHTML.querySelector('#sale_form_send_email input').checked;

      if (!await handler.validated(detail,htmlFc,"update")){
            fullcontEntity.update(detail, htmlFc, process_required_field_update)

      }     
      
}

async function updatePrint(detail) {
      if (!await handler.validated(detail, htmlFc, "updatePrint")) {
         fullcontEntity.update(detail, htmlFc, process_required_field_print);
      }   
      
}

function calculateGrandTotal() {
      setTimeout(()=>{ handler.calculateGrandTotal(htmlFc)},900);  
      
}

function updateFromDialog(detail) {
      input_send_email = htmlFc.fullcontHTML.querySelector('#sale_form_send_email input').checked;
      fullcontEntity.update(detail, htmlFc, process_required_field_update)

}

function updatePrintFromDialog(detail) {
      fullcontEntity.update(detail, htmlFc, process_required_field_print)
}

async function deleteEntity(detail,htmlFc) {

      if (await handler.processpayment(htmlFc,"update",detail.dbid.join(','))) {
            return true;
      }else{
            fullcontEntity.deleteEntity(detail, htmlFc)
      }

}

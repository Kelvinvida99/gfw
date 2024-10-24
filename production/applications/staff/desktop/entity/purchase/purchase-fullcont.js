import purchaseFullcont  from "./purchase-fullcont.html";

const dialog              = require ('../../../../../components/dialog/dialog')
const dialogP             = require ('./purchase-dialog')
const fullcontEntity      = require ('../../../../../components/fullcont/fullcont-entity')
const fullcontHandler     = require ('../../../../../components/fullcont/fullcont-handler')
const purchaseDt          = require('./purchase-dt')
const purchaseMenu        = require('./purchase-menu')
const handler             = require('./purchase-fullcont-handler')
const jumperHandler       = require('./purchase-fullcont-jumper-handler')
const dateHandler         = require('./purchase-fullcont-date-handler')
const pdfHandler          = require('./purchase-fullcont-pdf-handler')
const emailHandler        = require('./purchase-fullcont-email-handler')
const labelHandler        = require('./purchase-fullcont-label-handler')
const calculateHandler    = require('./purchase-fullcont-calculate-handler')
const otherfieldHandler   = require('./purchase-fullcont-otherfield-handler')
const defaultvalueHandler = require('./purchase-fullcont-defaultvalue-handler')
const cautionHandler      = require('./purchase-fullcont-caution-handler')
const {formCopy}          = require('./purchase-fullcont-form') 
const {form}              = require('./purchase-fullcont-form')
const {purchaseMT}        = require('./purchase-fullcont-multitable')
const timeDate            = require ('../../../../../js-handler/time-date')
const settings            = require('../../../../../js-handler/settings')
const restriction         = require ('./purchase-fullcont-restriction')
const notification        = require ('./purchase-fullcont-notification')

// const purchaseMT   = undefined //no MT just add this like undefined

/****************ELEMENTS*****************/
var htmlFc          = {}
var HTMLwasSelected = false

function HTMLselect(detail){ 

	fullcontHandler.HTMLselect(

            'purchase', //database table name****
            'purchase', //dest entity on js
            'purchase-fullcont', 
             purchaseFullcont, form, formCopy, purchaseMT, 
             editDialog, deleteDialog, dtCall, htmlFc)

	HTMLwasSelected   = true  

      // htmlFc.hasFiles = true
      // fullcontHandler.rightsControl(htmlFc)
}/**/


export function start(detail){  //console.log('purchase-dt 5>', purchaseMT)
  
      if(!HTMLwasSelected) { HTMLselect(detail) }
       
      obj[detail.act].start(detail)
}/**/

const obj = {

      addBillingDate:   { start: (detail)=>{  dateHandler.addBillingDate(detail, htmlFc)            }},
      addOne:           { start: (detail)=>{  addOne(detail, htmlFc)                                }},
      calculate_values_p_vs_investment:  { start: (detail)=>{  calculateHandler.calculate_values_p_vs_investment(detail, htmlFc) }},
      calculate_values_p_vs_item:        { start: (detail)=>{  calculateHandler.calculate_values_p_vs_item(detail, htmlFc)       }},
      calculateGrandTotal: { start: (detail)=>{  calculateHandler.calculateGrandTotal(htmlFc)                        }},
      cancelEdit:          { start: (detail)=>{  fullcontEntity.cancelEdit(detail, htmlFc)                           }},
      changeBilleOn:       { start: (detail)=>{  handler.changeBilleOn();                                            }},
      checkOtherCostItem:  { start: (detail)=>{  calculateHandler.checkOtherCostItem(detail, htmlFc)                 }},
      cogsPercent:         { start: (detail)=>{  handler.cogsPercent(detail, htmlFc)                                 }},
      creationCaution:     { start: (detail)=>{  cautionHandler.creationCaution(detail, htmlFc)                      }},
      deleteEntity:        { start: (detail)=>{  fullcontEntity.deleteEntity(detail, htmlFc)                         }},
      deleteFromDialog:    { start: (detail)=>{  deleteFromDialog(detail, htmlFc)                                    }},
      disableopcion:       { start: (detail)=>{  handler.disableopcion(detail);                                      }},
      discard:             { start: (detail)=>{  fullcontHandler.discard(detail, htmlFc)                             }},
      fullcontOptions:     { start: (detail)=>{  purchaseMenu.start(detail, 'htmlDt', htmlFc )                       }},
      goToQtyField:        { start: (detail)=>{  handler.goToQtyField(detail, htmlFc)                                }},
      hide:                { start: (detail)=>{  fullcontEntity.hide(detail, htmlFc)                                 }},
      insertDateExpenses:  { start: (detail)=>{  dateHandler.insertDateExpenses(detail, htmlFc)                      }},
      insertDeliveredDate: { start: (detail)=>{  dateHandler.insertDeliveredDate(detail, htmlFc)                     }},
      jumperToSale:        { start: (detail)=>{  jumperHandler.jumperToSale(detail, htmlFc)                          }},
      jumperToSendPayment: { start: (detail)=>{  jumperHandler.jumperToSendPayment(detail, htmlFc)                   }},
      labelgenerator:      { start: (detail)=>{  labelHandler.labelgenerator(detail);                                }},
      noDecimal:           { start: (detail)=>{  calculateHandler.noDecimal(detail, htmlFc)                          }},
      otherFieldInvestor:  { start: (detail)=>{  otherfieldHandler.otherFieldInvestor(detail, htmlFc)                }},
      otherFieldItem:      { start: (detail)=>{  otherfieldHandler.otherFieldItem(detail, htmlFc)                    }},
      otherFieldProvider:  { start: (detail)=>{  otherfieldHandler.otherFieldProvider(detail, htmlFc)                }},
      prepareAdd:          { start: (detail)=>{  fullcontEntity.prepareAdd(detail, htmlFc, defaultvalueHandler.setDefaultValue, process) }},
      prepareEdit:         { start: (detail)=>{  fullcontHandler.prepareEdit(detail, htmlFc)                         }},
      printlabel:          { start: (detail)=>{  labelHandler.printlabel();                                          }},
      printlabeldt:        { start: (detail)=>{  labelHandler.printlabeldt(detail);                                  }},
      purchasePrintPdf:    { start: (detail)=>{  pdfHandler.purchasePrintPdf(detail, htmlFc)                         }},
      purchaseSendEmail:   { start: (detail)=>{  emailHandler.purchaseSendEmail(detail, htmlFc)                      }},
      purchaseTrackingMail:{ start: (detail)=>{  emailHandler.purchaseTrackingMail(detail, htmlFc)                   }},
      removeItem:          { start: (detail)=>{  restriction.removeItem(htmlFc)                                      }},
      restirctionClick:    { start: (detail)=>{  restriction.restirctionClick(detail, htmlFc)                        }},
      saveFromDialog:      { start: (detail)=>{  cautionHandler.verifyPayment(detail, htmlFc)                        }},
      selectOne:           { start: (detail)=>{  selectOne(detail, htmlFc)                                           }},
      selectOneNoCheck:    { start: (detail)=>{  fullcontEntity.selectOneNoCheck(detail, htmlFc)                     }},
      sellingPrice:        { start: (detail)=>{  calculateHandler.sellingPrice(detail, htmlFc)                       }},
      updateCaution:       { start: (detail)=>{  cautionHandler.verifyPayment(detail, htmlFc)                        }},
      verifyDate:          { start: (detail)=>{  dateHandler.verifyDate(detail, htmlFc)                              }},
}/**/


function selectOne(detail, htmlFc) {

    fullcontEntity.selectOne(detail, htmlFc, (data, result)=>{  //console.log('result purchase', result.restriction)
        handler.dtgenerator(result,htmlFc);
        handler.itemWithSale(result,htmlFc);
        handler.verifyPayment(htmlFc,htmlFc.fullcontHTML.getAttribute("data-dbid"))
        //   handler.notifytab(htmlFc); // se deshabilito esta funcion


        //restriction.evaluation(htmlFc, result.restriction)
        //notification.start( data, result, htmlFc )

    }) 
}/**/

function process() {
    handler.cleandtfullcont(htmlFc);
}

//function to send
function editDialog(){
		dialog.start({ act:"show", id:"saveChanges", entity:'purchase' } )
}

function deleteDialog(detail){
		dialog.start({ act:"show",  dest:'purchase', id:"deleteElem", entity:'purchase', dbid: detail.dbid } )
}

function dtCall(act, result){ 
		purchaseDt.start({act:act, row: result})
}

function addOne(detail, htmlFc){
    // console.log(htmlFc)
      fullcontEntity.addOne(detail, htmlFc) 
      setTimeout(()=>{
           // purchaseDt.start({"dest":"purchase", "elem":"dt", "act":"select", "entity":"purchase"})  
      },100)                
}

function deleteFromDialog(detail, htmlFc){

      fullcontEntity.deleteFromDialog(detail, htmlFc) 
      setTimeout(()=>{
            purchaseDt.start({"dest":"purchase", "elem":"dt", "act":"select", "entity":"purchase"})  
      },900)                   
}
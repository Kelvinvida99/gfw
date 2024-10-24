
import companyFullcont       from "./company-fullcont.html";

const dialog          = require ('../../../../../components/dialog/dialog')
const fullcontEntity  = require ('../../../../../components/fullcont/fullcont-entity')
const fullcontHandler = require ('../../../../../components/fullcont/fullcont-handler')

const {formCopy}      = require('./company-fullcont-form') 
const {form}          = require('./company-fullcont-form')
const settings        = require('../../../../../js-handler/settings')
// const {companyMT}      = require('./company-fullcont-multitable')

//const companyMT        = undefined //no MT just add this like undefined

/****************ELEMENTS*****************/
var htmlFc          = {}
var HTMLwasSelected = false

function HTMLselect(detail){ 

	fullcontHandler.HTMLselect(
            'company','company', 'company-fullcont', 
            companyFullcont, form, formCopy, undefined, 
            editDialog, deleteDialog, undefined, htmlFc)

	HTMLwasSelected   = true             
}/**/




export function start(detail){  console.log('company-fullcont >', detail)
  
      if(!HTMLwasSelected) { HTMLselect(detail) }
       
      obj[detail.act].start(detail)
}/**/


const obj = {

      addOne:           { start: (detail)=>{  fullcontEntity.addOne(detail, htmlFc)                    }},
      cancelEdit:       { start: (detail)=>{  fullcontEntity.cancelEdit(detail, htmlFc)                }},
      deleteEntity:     { start: (detail)=>{  fullcontEntity.deleteEntity(detail, htmlFc)              }},
      deleteFromDialog: { start: (detail)=>{  fullcontEntity.deleteFromDialog(detail, htmlFc)          }},
      discard:          { start: (detail)=>{  fullcontHandler.discard(detail, htmlFc)                  }},
      hide:             { start: (detail)=>{  fullcontEntity.hide(detail, htmlFc)                      }},
      prepareEdit:      { start: (detail)=>{  fullcontHandler.prepareEdit(detail, htmlFc)              }},
      saveFromDialog:   { start: (detail)=>{  fullcontEntity.saveFromDialog(detail, htmlFc)            }},
      selectOne:        { start: (detail)=>{  

            detail.dbid = '1' 
            fullcontEntity.selectOne(detail, htmlFc)                 

      }},
      update:           { start: (detail)=>{  
            detail.dbid = '1'
            detail.entity ='company'//this is used by files
            fullcontEntity.update(detail, htmlFc)                    
      }},
    

      //red we can delete this
      show  :           { start: (detail)=>{ 

            htmlFc.fullcontHTML.classList.add('fullcont-show')
                          }},    
      

      //fullcontOptions:  { start: (detail)=>{  companyMenu.start(detail, 'htmlDt', htmlFc )                }},

}/**/






//function to send
function editDialog(){
		dialog.start({ act:"show", id:"saveChanges", entity:'company' } )
}

function deleteDialog(detail){
		dialog.start({ act:"show", id:"deleteElem", entity:'company', dbid: detail.dbid } )
}

// function dtCall(act, result){ 
// 		companyDt.start({act:act, row: result})
// }



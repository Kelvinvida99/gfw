
import userFullcont       from "./users-fullcont.html";

const dialog          = require ('../../components/dialog/dialog')
const fullcontEntity  = require ('../../components/fullcont/fullcont-entity')
const fullcontHandler = require ('../../components/fullcont/fullcont-handler')
const {formCopy}      = require('./users-fullcont-form') 
const {form}          = require('./users-fullcont-form')


//const userMT        = undefined //no MT just add this like undefined

/****************ELEMENTS*****************/
var htmlFc          = {}
var HTMLwasSelected = false

function HTMLselect(detail){ 

		fullcontHandler.HTMLselect(
                  'user', 'users-fullcont', 
                   userFullcont, form, formCopy, undefined, editDialog, deleteDialog, undefined, htmlFc)

		HTMLwasSelected   = true  

}/**/


export function start(detail){  console.log('user-fullcont>', detail)
  
      if(!HTMLwasSelected) { HTMLselect(detail) }

      console.log('user-fullcont after init>')
      return
       
      obj[detail.act].start(detail)
}/**/


const obj = {

      cancelEdit:       { start: (detail)=>{  fullcontEntity.cancelEdit(detail, htmlFc)                }},
      deleteEntity:     { start: (detail)=>{  fullcontEntity.deleteEntity(detail, htmlFc)              }},
      deleteFromDialog: { start: (detail)=>{  fullcontEntity.deleteFromDialog(detail, htmlFc)          }},
      discard:          { start: (detail)=>{  fullcontHandler.discard(detail, htmlFc)                  }},
      hide:             { start: (detail)=>{  fullcontEntity.hide(detail, htmlFc)                      }},
      prepareAdd:       { start: (detail)=>{  fullcontEntity.prepareAdd(detail, htmlFc)                }},
      prepareEdit:      { start: (detail)=>{  fullcontHandler.prepareEdit(detail, htmlFc)              }},
      saveFromDialog:   { start: (detail)=>{  fullcontEntity.saveFromDialog(detail, htmlFc)            }},
      selectOne:        { start: (detail)=>{  fullcontEntity.selectOne(detail, htmlFc)                 }},
      update:           { start: (detail)=>{  fullcontEntity.update(detail, htmlFc)                    }},

}/**/






//function to send
function editDialog(){
		dialog.start({ act:"show", id:"saveChanges", entity:'user' } )
}

function deleteDialog(detail){
		dialog.start({ act:"show", id:"deleteElem", entity:'user', dbid: detail.dbid } )
}





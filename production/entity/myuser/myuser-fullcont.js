
import myuserFullcont from "./myuser-fullcont.html";

const dialog          = require ('../../components/dialog/dialog')
const fullcontEntity  = require ('../../components/fullcont/fullcont-entity')
const fullcontHandler = require ('../../components/fullcont/fullcont-handler')
const myuserMenu      = require('./myuser-menu')
const {formCopy}      = require('./myuser-fullcont-form') 
const {form}          = require('./myuser-fullcont-form')
const settings        = require('../../js-handler/settings')
// const {myuserMT}      = require('./myuser-fullcont-multitable')
//const myuserMT        = undefined //no MT just add this like undefined

/****************ELEMENTS*****************/
var htmlFc          = {}
var HTMLwasSelected = false

function HTMLselect(detail){ 

	fullcontHandler.HTMLselect(
            'users', 
            'myuser', 
            'myuser-fullcont', 
            myuserFullcont, form, formCopy, undefined, 
            editDialog, deleteDialog, undefined, htmlFc)

      htmlFc.update     = 'server/php/sql/updateMyUser.php'
      htmlFc.selectOne  = 'server/php/sql/selectMyUser.php'

	HTMLwasSelected   = true  

      //set the avatar on the fullcont
      const avatar =  htmlFc.fullcontHTML.querySelector('.avatar-large')
      const data   = settings.getData()
     
      if(data.avatar != ''){
           avatar.style.backgroundImage = `url('${data.avatar}')` 
      }

}/**/


export function start(detail){  console.log('myuser-dt 5>', detail)
  
      if(!HTMLwasSelected) { HTMLselect(detail) }
       
      obj[detail.act].start(detail)
}/**/


const obj = {

      cancelEdit:       { start: (detail)=>{  fullcontEntity.cancelEdit(detail, htmlFc)                }},
      discard:          { start: (detail)=>{  fullcontHandler.discard(detail, htmlFc)                  }},
      hide:             { start: (detail)=>{  fullcontEntity.hide(detail, htmlFc)                      }},
      prepareEdit:      { start: (detail)=>{  fullcontHandler.prepareEdit(detail, htmlFc)              }},
      saveFromDialog:   { start: (detail)=>{  fullcontEntity.saveFromDialog(detail, htmlFc)            }},
      selectOne:        { start: (detail)=>{  selectOne(detail, htmlFc)                                }},
      update:           { start: (detail)=>{  fullcontEntity.update(detail, htmlFc)                    }},
}/**/


function selectOne(detail, htmlFc){  // console.log(`toSelect one`, detail); 

      const data = settings.getData()
      detail.dbid = data.id
      fullcontEntity.selectOne(detail, htmlFc)
}


function editDialog(){
		dialog.start({ act:"show", id:"saveChanges", entity:'myuser' } )
}

function deleteDialog(detail){
		dialog.start({ act:"show", id:"deleteElem", entity:'myuser', dbid: detail.dbid } )
}




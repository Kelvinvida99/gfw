import usersFullcont  from "./users-fullcont.html";

const dialog                = require ('../../../../../components/dialog/dialog')
const fullcont              = require ('../../../../../components/fullcont/fullcont')
const fullcontEntity        = require ('../../../../../components/fullcont/fullcont-entity')
const fullcontForm          = require ('../../../../../components/fullcont/fullcont-form')
const fullcontHandler       = require ('../../../../../components/fullcont/fullcont-handler')
const monitorCommand        = require ('../../../../../components/monitor/monitor-command')
const usersCheck            = require('./users-check')
const usersDt               = require('./users-dt')
const usersMenu             = require('./users-menu')
const userDialog            = require('./user-dialog')
const textfieldMultiselect  = require ('../../../../../components/textfield/textfield-multiselect')
const {formCopy}            = require('./users-fullcont-form') 
const {form}                = require('./users-fullcont-form')
const {usersMT}             = require('./users-fullcont-multitable')
const {usersMTdefaultValue} = require('./users-fullcont-multitable')
const settings              = require ('../../../../../js-handler/settings')
const checkbox              = require('../../../../../components/selector/checkbox')

/****************ELEMENTS*****************/
var htmlFc          = {}
var HTMLwasSelected = false

function HTMLselect(detail){ 

		fullcontHandler.HTMLselect(
                  'users', 
                  'users', 
                  'users-fullcont', 
                   usersFullcont, form, formCopy, usersMT, 
                   editDialog, deleteDialog, dtCall, htmlFc)

            htmlFc.addOne = 'server/php/sql/insertUsers.php'
            htmlFc.update = 'server/php/sql/updateUsers.php'

            //console.log('htmlFc', htmlFc)
		HTMLwasSelected   = true  

            // fullcontHandler.rightsControl(htmlFc)
           

}/**/


export function start(detail){  //console.log('users-dt 5>', detail.act)
  
      if(!HTMLwasSelected) { HTMLselect(detail) }
       
      obj[detail.act].start(detail)
}/**/


const obj = {


      addOne:           { start: (detail)=>{  addOne(detail, htmlFc)                                      }},
      cancelEdit:       { start: (detail)=>{  fullcontEntity.cancelEdit(detail, htmlFc)                   }},
      checkUsername:    { start: (detail)=>{  usersCheck.start(detail)                                    }},
      deleteEntity:     { start: (detail)=>{  fullcontEntity.deleteEntity(detail, htmlFc)                 }},
      deleteFromDialog: { start: (detail)=>{  fullcontEntity.deleteFromDialog(detail, htmlFc)             }},
      discard:          { start: (detail)=>{  fullcontHandler.discard(detail, htmlFc)                     }},
      hide:             { start: (detail)=>{  hide(detail, htmlFc)                                        }},
      hideShowPrivilege:{ start: (detail)=>{  hideShowPrivilege({type: detail.ev.target.value})           }},
      prepareAdd:       { start: (detail)=>{  prepareAdd(detail)                                          }},
      prepareEdit:      { start: (detail)=>{  fullcontHandler.prepareEdit(detail, htmlFc)                 }},
      saveFromDialog:   { start: (detail)=>{  fullcontEntity.saveFromDialog(detail, htmlFc)               }},
      selectOne:        { start: (detail)=>{  fullcontEntity.selectOne(detail, htmlFc,hideShowPrivilege)  }},
      selectOneNoCheck: { start: (detail)=>{  fullcontEntity.selectOneNoCheck(detail, htmlFc)             }},
      update:           { start: (detail)=>{  update(detail, htmlFc)                                      }},

}/**/

function hide(detail, htmlFc){
      
      fullcontForm.wasEdited(htmlFc)

      var isAllDeny     = true
      var wasEditedForm = JSON.stringify(form)  != JSON.stringify(formCopy)

      //check if all the entity control are like deny
      usersMT[0].data.forEach((line)=>{
            if(line.privilegeDB != 'none'){ isAllDeny = false }
      })   
      
      //if all is deny, and no data on form, is because don't exist changes
      if( isAllDeny && wasEditedForm === false){

            fullcontForm.clean(htmlFc)
            fullcontForm.cleanFromValues( htmlFc )
            fullcontEntity.hide(detail, htmlFc)
            return
      }  

      //alert the users
      fullcontEntity.hide(detail, htmlFc)
}

function addOne(detail, htmlFc){
      
      const existErrors = checkRightErrors(detail, htmlFc)    

      if(existErrors){ return}

      fullcontEntity.addOne(detail, htmlFc)  
}

//avoid add user without permits
function checkRightErrors(detail, htmlFc){
      
      fullcontForm.wasEdited(htmlFc)

      var privilege     = textfieldMultiselect.getFromHtml(htmlFc.form[0].html)
      var isAllDeny     = true


      //check if all the entity control are like deny
      usersMT[0].data.forEach((line)=>{console.log('', line.privilegeDB)
            if(line.privilegeDB != 'none'){ isAllDeny = false }
      })   

      //If all is deny, but we found changes, alert the users, userhas all deny
      if( isAllDeny  && privilege != 'admin' ){ //console.log('####### isAllDeny')
            userDialog.start({id:'hellow', act:'show'})
            return true
      }  

      return false
}

function update(detail, htmlFc){

      const existErrors = checkRightErrors(detail, htmlFc)    

      if(existErrors){ return}
            

      fullcontEntity.update(detail, htmlFc, (result)=>{  //console.log('after the update', result)

           monitorCommand.sendBefore({command:"logOthersOut", company:result.company , id: result.id  })

      })
}

function prepareAdd(detail){

      fullcontEntity.prepareAdd(detail, htmlFc) 

     //[0] users_vs_permissions
      usersMT[0].add()

      //show the multitable, incase that was hidden
      const mt    = htmlFc.fullcontHTML.querySelector('.multitable')
      mt.classList.remove('dn') 

} 

//function to send
function editDialog(){
	dialog.start({ act:"show", id:"saveChanges", entity:'users' } )
}

function deleteDialog(detail){
	dialog.start({ act:"show", dest:'users', id:"deleteElem", entity:'users', dbid: detail.dbid } )
}

function dtCall(act, result){ 
	usersDt.start({act:act, row: result})
}

//Para acultar el multitable de los permisos solo cuando el usuario es admin, es un usuario normal pues debe mostrarse
function hideShowPrivilege(data) {

      let users_form_users_vs_permissions  = document.getElementById('users_form_users_vs_permissions')//elemento select
    
      if (data.type == 'admin') {
            users_form_users_vs_permissions.closest('.multitable').classList.add('dn');
      }else{
            users_form_users_vs_permissions.closest('.multitable').classList.remove('dn');
      }
}
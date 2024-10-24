
const dbRequest          = require ('../../../../../js-network/db-request')
const dialog             = require('../../../../../components/dialog/dialog')
const textfieldHandler   = require ('../../../../../components/textfield/textfield-handler')
const textfieldPassword  = require ('../../../../../components/textfield/textfield-password')
const textfieldValidator = require('../../../../../components/textfield/textfield-validator')
const equitydepositSnack         = require('./equitydeposit-snack')


export const start = (detail) => { console.log('change password', detail)



    const dialogHtml = document.getElementById('dialog')
    const textfield  = dialogHtml.querySelector('.textfield')
    const input      = textfield.querySelector('input')

    const isComplete = textfield.classList.contains('textfield-completed')
    
    if( !isComplete ){ 
        textfieldHandler.error(textfield)
        return 
    }

    detail.inf = { id: detail.dbid, newPassword: input.value }

    // console.log('Go to update the password', input.value)
    // console.log('Go to update the password', detail)
    // console.log(' detail.inf',  detail.inf)

    dialog.start({ act:'hide' })


    return changeDB(detail)
      .then((result)=>  { 

        console.log('change password result>', result)
        equitydepositSnack.start({act:'show', id:'passwordUpdated'})

      }).catch((error) => { //console.log('Settings load notification', error)

        equitydepositSnack.start({act:'show', id:'passwordUpdateError'})
         //loading.notify('settingsError', error.msg )   
     }) 


}/**/



async function changeDB(detail){  //console.log('downloadSettings>')

   const result = await dbRequest.start(detail, 'server/php/sql/changeOtherUserPass.php' ) //do the insert

   if(result.status != "ok"){ throw ( result ) }

   return result
}



export const autoGenPassword = (detail) => { console.log('autoGenPassword ', detail)
    
    const dialogHtml = document.getElementById('dialog')
    const textfield  = dialogHtml.querySelector('.textfield')
    const input      = textfield.querySelector('input')
    
    input.value = textfieldPassword.autoGenerate()

    textfield.classList.remove('textfield-error')
    textfield.classList.add('textfield-completed')

console.log('autoGenPassword ', textfieldPassword.autoGenerate() )

}/**/

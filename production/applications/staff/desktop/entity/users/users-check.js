const textfieldValidator = require('../../../../../components/textfield/textfield-validator')
const dbRequest          = require('../../../../../js-network/db-request')

export const start = (detail) => {

    const input  = detail.ev.target
    var   value  = input.value
    const parent = input.parentElement
   
    value        = textfieldValidator.onlyLetters(value) 
    input.value  = value

    if(value.length > 10 ){
        textfieldValidator.incomplete(detail.ev, 'Max 12 characters' )
        return
    }

    if(value.length < 5 ){
        textfieldValidator.incomplete(detail.ev, 'Min 5 characters' )
        return
    }

    textfieldValidator.completed(detail.ev, 'Good' )
    //load(detail, value)

    //check if the user is available on the db
    load(detail, value)

}/**/

const load = (detail, value) => {  //console.log('load check user name>')
   
    return loadDB(detail, value)
      .then((result)=>  { 

        console.log('settings result>', result.data[0])
        
        if( result.data[0].available === 'true'){
                textfieldValidator.completed(detail.ev, 'Good' )
        
        }else{  textfieldValidator.incomplete(detail.ev, 'User unavailable' )  }


      }).catch((error) => {  

         console.log('Error checking username', error)
  
     }) 
      
}/**/


async function loadDB(detail, value){  console.log('load check user name DBBBBB>')
   

    detail.inf = { username:value }

    ///yeison/php/settings.php
   //const result = await dbRequest.start(detail, 'php/settings.php' ) //do the insert
   const result = await dbRequest.start(detail, 'server/php/sql/checkUsername.php' ) //do the insert

   if(result.status != "ok"){ throw ( result ) }

   return result
}


const textfieldValidator = require('../../../../../components/textfield/textfield-validator')
const dbRequest          = require('../../../../../js-network/db-request')


export function required_field(htmlFc) {  //console.log('updateCsutomerField -> ', htmlFc)


  let input_allow = htmlFc.fullcontHTML.querySelector('#investor_form_allow_phone_app input');

  if (input_allow.checked) {

    set_required(htmlFc, true);


  } else {
    set_required(htmlFc, false);
  }

}

function set_required(htmlFc, value) {

  htmlFc.form.forEach((element, index) => {

    if (element.name == "username") {
      element.required = value;
      htmlFc.formCopy[index].required=value;
    }

    if (element.name == "__password") {
      element.required = value;
      htmlFc.formCopy[index].required=value;

    }


  });


}



export const checkUsername = (detail) => {

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


const load = (detail, value) => {  
   
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



async function loadDB(detail, value){  
   

    detail.inf = { username:value }



    ///yeison/php/settings.php
   //const result = await dbRequest.start(detail, 'php/settings.php' ) //do the insert
   const result = await dbRequest.start(detail, 'server/php/sql/checkUsernameInvestor.php' ) //do the insert

   if(result.status != "ok"){ throw ( result ) }

   return result
}






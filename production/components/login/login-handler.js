
const textfieldHandler       = require('../textfield/textfield-handler')
const loginError             = require('./login-error')



export function HTMLselect(htmlLg){ //console.log('Login HTMLselect EXTERNAL')

     htmlLg.login      = document.getElementById('login')
     htmlLg.scrim      = document.getElementById('scrim_login')

     htmlLg.loginLabel = htmlLg.login.querySelector('.des')

     ///remove the document and add confirmation
     htmlLg.username   = document.getElementById('login_form_username')
     htmlLg.password   = document.getElementById('login_form_password')

}/**/


export function inputsErrors(htmlLg){ //console.log('inputsErrors EXTERNAL')
    
    const usernameValue = htmlLg.username.querySelector('input').value
    const passwordValue = htmlLg.password.querySelector('input').value
    var control = false

    if(usernameValue === ''){
        textfieldHandler.error(htmlLg.username)
        control = true

    }else{ textfieldHandler.errorClean(htmlLg.username) }

    if(passwordValue === ''){
        textfieldHandler.error(htmlLg.password)
        control = true

    }else{ textfieldHandler.errorClean(htmlLg.password) }


    return control

}/**/



export function showMsg(detail, htmlLg){  
    //console.log(`showMSG EXTERNAL`, loginError.start('MySqlError')); 

     htmlLg.loginLabel.innerHTML = loginError.start(detail.val)
     htmlLg.loginLabel.classList.add('a-shake')
     htmlLg.loginLabel.classList.add('c-error')

    
     removeLong(()=>{
          htmlLg.loginLabel.classList.remove('a-shake')
          htmlLg.loginLabel.classList.remove('c-error')
     }) 
}





export function clean(htmlLg){

     htmlLg.loginLabel.innerHTML = ''
     htmlLg.password.value = ''
     textfieldHandler.clean( htmlLg.password )
 
}



export function getInf(htmlLg){

     return {  
                dest: 'fromLogin', 
                inf: {
                     username: htmlLg.username.querySelector('input').value,
                     password: htmlLg.password.querySelector('input').value        
               }
          }
 
}


export function hide(htmlLg){  //console.log('login hidexxx> ')

    htmlLg.scrim.classList.remove('scrim-show')
    htmlLg.login.classList.add('login-hide');

      remove(()=>{
        htmlLg.login.classList.remove('login-hide');
        htmlLg.login.classList.remove('login-show');
      })

}/*hide*/


function remove(callback){
  setTimeout(()=>{
    callback()
  }, 200)
}


function removeLong(callback){
  setTimeout(()=>{
    callback()
  }, 500)
}



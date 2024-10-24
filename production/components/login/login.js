

const click            = require('../../js/click')
const dbRequest        = require ('../../js-network/db-request')
const loginDB          = require('./login-db')
const loginHandler     = require('./login-handler')
const snack            = require('../snack/snack')
const loading          = require ('../loading/loading')
const fullcontHandler  = require('../fullcont/fullcont-handler')

/****************ELEMENTS*****************/
var htmlLg          = {}
var HTMLwasSelected = false

function HTMLselect(){ 
   
    loginHandler.HTMLselect(htmlLg)
    HTMLwasSelected     = true
}
/****************ELEMENTS*****************/


export function start(detail, detailPrev){  // console.log('login start >', detail)
  
   if(!HTMLwasSelected) {HTMLselect()}
 
        switch (detail.act){
            case 'show':          show(detail, detailPrev);  break; 
            case 'hide':          loginHandler.hide(htmlLg); break; 
            // case 'logMeOut':      loginDB.logMeOut(detail);  break;
            case 'logMeOut':      logMeOut(detail);          break; 
            case 'verify':        verify();                  break; 
            case 'verifyFromKey': verifyFromKey(detail);     break; 
        }
}/**/


function logMeOut(detail){ 

        const x = fullcontHandler.closeBeforeExit()
        console.log('log me out', 'xxxxxxxxxxxxxxxxx')

        if( x === true ){  console.log('DONT EXIT ')
            return
        }

        loginDB.logMeOut(detail)
       // console.log('GO TO EXIT')
}

function show(detail, detailPrev){ console.log('login show xx>', detail, detailPrev)
  
  //in case, is open
  loading.hide()

  //show the element/scrim
  htmlLg.login.classList.add('login-show') 
  htmlLg.scrim.classList.add('scrim-show')

  //load error, msg
  loginHandler.showMsg(detail, htmlLg)


  //if the detailPrev.dest is fromLogin, is becasue was called from login, 
  //don't overwrite the original db-request detail
  //if(detailPrev.dest != undefined ){  
  
  if(detailPrev.dest != 'fromLogin' ){  
     localStorage.setItem('detailPrev', JSON.stringify(detailPrev))
  }

  //don't focus on phone, could be uncomfortable
  if( window.screen.width > 1200 ){
      htmlLg.username.querySelector('input').focus()
  }

}/*show*/




function verify(){ //console.log('login verify >')
  
  if( loginHandler.inputsErrors(htmlLg) ){ return }
      
  verifyDB()
  .then((result) =>{ 

      
        loginHandler.hide(htmlLg)

        //send to click the previous details, before the auth error
        click.start( JSON.parse( localStorage.getItem('detailPrev') ) )

        //clean the label/input
        loginHandler.clean(htmlLg)

        snack.start({ act:'show', id:'loginOk' })

        return

  }).catch((error) =>{  console.log('error loginx', error)

        snack.start({ act:'show', id:'loginError' })
    }) 

}/*verify*/



async function verifyDB(){ 

   const detail = loginHandler.getInf(htmlLg)

   const result = await dbRequest.start(detail, 'server/php/auth/tryAuth.php') //do the insert
 
   if(result.status != "ok"){ throw ( result ) }

   return result
}


//Login > Enter Press > move to password > move to submitted
function verifyFromKey(detail){ //console.log('login verify >')

    const inputId = detail.ev.target.parentElement.id
    
    if(detail.ev.key === 'Enter'){

       if( inputId === 'login_form_username'){
           htmlLg.password.querySelector('input').focus()
       }
       
       if( inputId === 'login_form_password'){
          verify()
       }

    }/**/
}/*show*/



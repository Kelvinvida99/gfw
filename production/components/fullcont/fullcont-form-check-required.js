
const handler      = require ('./fullcont-form-check-required-handler')
const multitable   = require ('../multitable/multitable')
const fullcontTab  = require ('./fullcont-form-handler-tab')
const snack        = require ('../snack/snack')


//add or remove input/tab errors on form
//tabNotify = true, make the notification
export function formCheck(form, tabNotify){ //console.log('formCheck', tabNotify)
    
  var existError = false

  form.forEach((elem)=>{ 
        if(elemDetection(elem, tabNotify)){ 
            existError = true 
        }
  })/*foreach*/ 


  return existError
}



export function multitableCheck(entityMT, tabNotify){ //console.log('multitableCheck>', entityMT)
 
 try{

      if(entityMT === undefined){ return }
      

      var existError = false

      entityMT.forEach((mt)=>{ 

          const lines = mt.html.querySelectorAll('.line')
          const atLeastOneRequired = lines.length === 0 && mt.oneRequired

          if(atLeastOneRequired){
             multitable.start({act:'addError', mt:mt })
             fullcontTab.notify( mt.html ) 
             snack.start({act:'show', id:'atLeastOne'})
             existError = true
             return
          
          }else{ multitable.start({act:'removeError', mt:mt })  }
          
          lines.forEach((line)=>{  
              mt.fields.forEach((elem)=>{ //console.log('elem', elem.name)
                  elem.html =  line.querySelector(`.${elem.name}`)

                   if( elemDetection(elem, tabNotify) ){ existError = true }

              })
          })
      })

      return existError

  } catch(error){ console.log('error multitableCheck', error)  }


}


function elemDetection(elem, tabNotify){ //console.log('############>', elem.type)

    var existError = false 

    switch (elem.type){
           case 'textfield':               
                if( handler.textfieldCheck(elem, tabNotify) )   { existError = true } break;

           case 'autocomplete': 
                if( handler.autocompleteCheck(elem, tabNotify)) { existError = true } break;
            
           case 'textfieldValidator': 
                if( handler.textValidatorCheck(elem, tabNotify)){ existError = true } break;

           case 'checkbox':  
                if( handler.checkboxCheck(elem, tabNotify))     { existError = true } break;

           case 'multiselect': 
                 if( handler.multiselectCheck(elem, tabNotify)) { existError = true } break;

           case 'radio': //radio//slider
                 if( handler.radioCheck(elem, tabNotify))       { existError = true } break;

           case 'signature': 
                 if( handler.signatureCheck(elem, tabNotify))   { existError = true } break;

           case 'map':
                 if( handler.mapCheck(elem, tabNotify))         { existError = true } break;   

    }/*swtich*/

    return existError

}/**/















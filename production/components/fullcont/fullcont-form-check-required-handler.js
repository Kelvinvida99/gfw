
const autocomplete           = require ('../textfield/autocomplete')
const autocompleteHandler    = require ('../textfield/autocomplete-handler')
const checkbox               = require ('../selector/checkbox')
const fullcontTab            = require ('./fullcont-form-handler-tab')
const map                    = require ('../map/map')
const radio                  = require ('../selector/radio')
const signature              = require ('../../components/signature/signature')
const snack                  = require ('../snack/snack')
const textfieldHandler       = require ('../../components/textfield/textfield-handler')
const textfieldMultiselect   = require ('../textfield/textfield-multiselect')


export function textfieldCheck(elem, tabNotify){ //console.log('textfieldCheck> HANDLER')

  var existError = false

    if( elem.html.querySelector('.elem').value === ''  &&  elem.required === true){ 

        existError = true
        textfieldHandler.error(elem.html)
        
        showNotification(tabNotify, elem)
    }

    if( elem.html.querySelector('.elem').value != ''  &&  elem.required === true){
        textfieldHandler.errorClean(elem.html)
    }

    return existError
}/**/



export function autocompleteCheck(elem, tabNotify){ //console.log('autocompleteCheck #####>')

    var existError = false
    
    const selected = elem.html.getAttribute('selected')

    if( selected === "[]"  &&  elem.required === true ){ 

        existError = true
        textfieldHandler.error(elem.html)

        showNotification(tabNotify, elem)
    
    }else{ textfieldHandler.errorClean(elem.html) }

    return existError
}/**/


export function textValidatorCheck(elem, tabNotify){

  var existError = false
    
  if( (elem.html.querySelector('input').value === ''  &&  elem.required === true) ||
       elem.html.classList.contains('textfield-error')  ){ 

       existError = true

       textfieldHandler.error(elem.html)
       showNotification(tabNotify, elem)
  }
 

    return existError
}/**/


export function checkboxCheck(elem, tabNotify){ //console.log('checkboxCheck>')

  var existError = false
    
  if( elem.html.querySelector('input').checked  === false  && elem.required === true){

      existError = true
     
      checkbox.error(elem.html)
      showNotification(tabNotify, elem)
  }

  if( elem.html.querySelector('input').checked  === true  && elem.required === true){
       checkbox.errorClean(elem.html)
  }

    return existError
}/**/



export function multiselectCheck(elem, tabNotify){ //console.log('multiselectCheck>')

  var existError = false
    
  if( elem.html.querySelector('select').value  === ''  && elem.required === true){ 

      existError = true
      
      textfieldMultiselect.error( elem.html)
      showNotification(tabNotify, elem)

  }else{ textfieldMultiselect.errorClean( elem.html);  }   

    return existError
}/**/



export function radioCheck(elem, tabNotify){ //console.log('radioCheck>')

  var existError = false

  if( radio.getValue(elem.html)  === ''  && elem.required === true){ 
    
    existError = true
    radio.error(elem.html)

    showNotification(tabNotify, elem)

  }else{ radio.errorClean(elem.html)  }    


    return existError
}/**/

export function signatureCheck(elem, tabNotify){ //console.log('signatureCheck>')

  var existError = false

  let isEmptyResult =  signature.isEmpty( elem.id )

  //console.log('SIGNATURE VALUE', isEmptyResult)
  //if we have error
  if( isEmptyResult.result === true && elem.required === true  ){ 

    existError = true

    //notify html error
    signature.addError(elem.id)
    showNotification(tabNotify, elem)

      if( isEmptyResult.tooShort === true ){ snack.start( { act:"show", id:"signatureShort"  } )
      }else                                { snack.start( { act:"show", id:"signatureEmpty"  } ) }

  //if we don't have error
  }else {   signature.removeError(elem.id)  }    


  return existError
}/**/



export function mapCheck(elem, tabNotify){ //console.log('mapCheck>')

  var existError = false
    
  // console.log('check require on map>', map.getValue(elem.id) )
   if( map.getValue(elem.id)  === ''  && elem.required === true ){ existError = true
          
        map.addError(elem.id)      
        showNotification(tabNotify, elem)
  
  //if we don't have error
  }else {  map.removeError(elem.id)   }

    return existError
}/**/




function showNotification(tabNotify, elem){ //console.log('showNotification>', tabNotify)
    
    if( tabNotify === true ){ 
        fullcontTab.notify(elem.html) 
    } 

    snack.start( { act:"show", id:"inputErrors"  } )
}

























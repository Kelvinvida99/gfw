
const fullcontCheckRequired  = require ('./fullcont-form-check-required')
const fullcontHandler        = require ('./fullcont-handler')
const fullcontTab            = require ('./fullcont-form-handler-tab')
const handler                = require('./fullcont-form-handler')
const multitable             = require ('../multitable/multitable')
const snack                  = require ('../snack/snack')


//prepare the fullcont to be filled with the data get it from the server
export function prepareAfterInsert(detail, htmlFc, result){ //console.log('prepareAfterInsert----------------NEW---------->')

    //clean fullcont 
    clean(htmlFc.form, htmlFc.entityMT)
    //console.log('--------------->clean')
    
    //load data to form
    cleanFromValues(htmlFc.form, htmlFc.formCopy, htmlFc.entityMT)
    //console.log('--------------->cleanFromValues')

    //load data to form
    loadResultToForm(htmlFc.form, htmlFc.formCopy, htmlFc.entityMT,  result) 
    //console.log('--------------->loadResultToForm')

    //fill the fullcont
    fill(htmlFc.form, htmlFc.entityMT)
    //console.log('--------------->fill')

    //show view page
    fullcontHandler.prepareView(htmlFc.form, detail)
    //console.log('--------------->cleanFromValues')

}/**/



//add to form the values from the inputs 
export function getValues(form, entityMT){ //console.log('getValues>',)

  form.forEach((elem)=>{
            elem.value = handler.getValues(elem)
  })/**/  
 
  multitable.start({ act:'getValues', entityMT:entityMT })
}/**/



//fill the html elemnt with the form value
export function fill(form, entityMT){ //console.log('fill>')
  
  form.forEach((elem)=>{
            handler.fill(elem)
  })/*foreach*/

  multitable.start({act:'generator', entityMT:entityMT })
}/**/



//clean the html elements
export function clean(form, entityMT){ //console.log('clean>')

  form.forEach((elem)=>{
            fullcontTab.clean(elem.html)
            handler.clean(elem)
  })/**/

  multitable.start({act:'clean', entityMT:entityMT })
}/**/



export function cleanFromValues(form, formCopy, entityMT){ //console.log('cleanFromValuesx>' )

  for(let i=0 ; i < form.length ; i++){  //console.log('form>', form[i].name )
     
      formCopy[i].value = ''
      form[i].value     = '' 

      if(form[i].type === 'signature'){
         formCopy[i].value = []
         form[i].value     = []    
      }

      if(form[i].type === 'autocomplete'){
         formCopy[i].value = {id: null, displayText: null}
         form[i].value     = {id: null, displayText: null}       
      }

  }/**/

  multitable.start({act:'cleanFromValues', entityMT:entityMT })

}/**/



//load the data from  the server to form/formCopy variable
export function loadResultToForm(form, formCopy, entityMT, result){ //console.log('loadResultToForm>',)

  for(let i=0 ; i < form.length ; i++){
      
      form[i].value     = result.data[0][form[i].name]    
      formCopy[i].value = result.data[0][form[i].name]      
     
      if( form[i].type === 'autocomplete' ){
          form[i].value     = JSON.parse( result.data[0][form[i].name] )  
          formCopy[i].value = JSON.parse( result.data[0][form[i].name] )
      }
  }   

  multitable.start({act:'loadResultToForm', entityMT: entityMT, resultMT: result.multiTables })

}/************************/




export function checkRequired(htmlFc, tabNotify){ //console.log('check require>')

  var existError = false

  fullcontTab.clean(htmlFc.form[0].html)
 
  if( fullcontCheckRequired.formCheck(htmlFc.form, tabNotify) )            {  existError = true }
  if( fullcontCheckRequired.multitableCheck(htmlFc.entityMT, tabNotify) )  {  existError = true }

  return existError
}/**/




export function wasEdited(form, formCopy, entityMT){  

  var control   = false

  getValues(form, entityMT)

   // console.log('wasEdited> form', form)
   // console.log('wasEdited> formCopy',formCopy)

  for(let i=0 ; i < form.length ; i++){ //console.log('>>')
 
      if(formCopy[i].value.toString() != form[i].value.toString()  && formCopy[i].type != 'map') { 
          // console.log('wasEdited>form')
          // console.log('autocomplete>', formCopy[i].value.toString() , form[i].value.toString() )
          control = true 
          
      }

      if(form[i].type === 'autocomplete'){ //console.log('autocomplete>', form[i].value , formCopy[i].value )
          if( form[i].value.id  != formCopy[i].value.id  ){ //console.log('wasEdited>autocomplete')
              control = true 
          }
      }
  }/*for*/

  if( multitable.start({act:'wasEdited', entityMT:entityMT }) ){ //console.log('wasEdited>mt')
      control = true  
  }

  return control

}/*wasEdited*/




function remove(callback){
  setTimeout(()=>{
    callback()
  }, 500)
}




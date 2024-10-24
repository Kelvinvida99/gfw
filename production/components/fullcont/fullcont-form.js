
const fullcontCheckRequired  = require ('./fullcont-form-check-required')
const fullcontHandler        = require ('./fullcont-handler')
const fullcontTab            = require ('./fullcont-form-handler-tab')
const handler                = require('./fullcont-form-handler')
const multitable             = require ('../multitable/multitable')
const snack                  = require ('../snack/snack')
const dtHandler              = require ('../dt/dt-handler')
const settings               = require('../../js-handler/settings')

/*********************************YEISON INTEGRATION*/
const filePrint             = require ('../file/file-print-handler')



//prepare the fullcont to be filled with the data get it from the server
export function prepareAfterInsert(detail, htmlFc, result){ //console.log('prepareAfterInsert----------------NEW---------->')

    try{

        //clean fullcont 
        clean(htmlFc)
        //console.log('--------------->clean')
        
        //load data to form
        cleanFromValues( htmlFc )
        //console.log('--------------->cleanFromValues')

        //load data to form
        loadResultToForm( htmlFc,  result) 
        // console.log('--------------->loadResultToForm')

        //fill the fullcont
        fill(htmlFc.form, htmlFc.entityMT)
        // console.log('--------------->fill')

        //printing entity Files
        filePrint.printFile(detail, result, htmlFc)
        //console.log('--------------->printFile')

        //show view page
        fullcontHandler.prepareView(htmlFc.form, detail)
         //console.log('--------------->prepareView')

        dtHandler.highlightTr(detail)

    }catch(error){ console.log('prepareAfterInsert error', error)}


}/**/



//add to form the values from the inputs 
export function getValues( htmlFc ){ //console.log('getValues>',)

  htmlFc.form.forEach((elem)=>{ //console.log(elem.name, handler.getValues(elem))
       elem.value = handler.getValues(elem)
  })/**/  

  //console.log('getValueForm', htmlFc.form)//lightg

 
  multitable.start({ act:'getValues', entityMT: htmlFc.entityMT })
  
}/**/


//fill the html elemnt with the form value
export function fill(form, entityMT){ //console.log('fill>')
  
  form.forEach((elem)=>{
        handler.fill(elem)
  })/*foreach*/

  //console.log('fill>after form')

  multitable.start({act:'generator', entityMT:entityMT })
}/**/



//clean the html elements
export function clean( htmlFc ){ //console.log('clean>', htmlFc)

  htmlFc.form.forEach((elem)=>{

        fullcontTab.clean(elem.html)
        handler.clean(elem)
        //console.log('clean>########', elem)
  })/**/
  handler.cleanRestriction(htmlFc)

  multitable.start({act:'clean', entityMT: htmlFc.entityMT })
}/**/



export function cleanFromValues( htmlFc ){ //console.log('cleanFromValuesx>', htmlFc )

    for(let i=0 ; i < htmlFc.form.length ; i++){  //console.log('form>', form[i].name )
       
        htmlFc.formCopy[i].value = ''
        htmlFc.form[i].value     = '' 

        if(htmlFc.form[i].type === 'signature'){
           htmlFc.formCopy[i].value = []
           htmlFc.form[i].value     = []    
        }

        if(htmlFc.form[i].type === 'autocomplete'){
           htmlFc.formCopy[i].value = []
           htmlFc.form[i].value     = []       
        }

        if(htmlFc.form[i].date ){
          htmlFc.formCopy[i].value = '0000-00-00'
          htmlFc.form[i].value     = '0000-00-00'           
        }
         if(htmlFc.form[i].time ){
          htmlFc.formCopy[i].value = '00:00'
          htmlFc.form[i].value     = '00:00'           
        }

    }/**/

    multitable.start({act:'cleanFromValues', entityMT: htmlFc.entityMT })

}/**/



//load the data from  the server to form/formCopy variable
export function loadResultToForm( htmlFc, result){ //console.log('loadResultToForm>')

      for(let i=0 ; i < htmlFc.form.length ; i++){
          
          htmlFc.form[i].value     = result.data[0][htmlFc.form[i].name]    
          htmlFc.formCopy[i].value = result.data[0][htmlFc.form[i].name]      
         
          if( htmlFc.form[i].type === 'autocomplete' ){ //console.log('loadResultToForm>is an autocomplete>')

              const valueFull = JSON.parse(result.data[0][htmlFc.form[i].name]) 
              const value     = acExtractIds( valueFull ) 

              htmlFc.form[i].value         = value
              htmlFc.formCopy[i].value     = value
              htmlFc.form[i].valueFull     = JSON.parse(JSON.stringify(valueFull)) 
              htmlFc.formCopy[i].valueFull = JSON.parse(JSON.stringify(valueFull))
          }
      }  


      multitable.start({act:'loadResultToForm', entityMT: htmlFc.entityMT, resultMT: result.multiTables })

     // console.log('htmlFc.entityMT#####>', htmlFc.entityMT )

}/************************/


function acExtractIds(valueFull){ //console.log('acExtractIds>', valueFull )
     
      const ids = []
      
      //[{id: null, displayText: null}] when is empty
      if(valueFull[0].id === null){// console.log('IDS VACIOS')
          return []
      }
      
      valueFull.forEach((value)=>{ ids.push(value.id)  })
      return ids
}/**/


export function checkRequired(htmlFc, tabNotify){ //console.log('check require>')

    var existError = false

    fullcontTab.clean(htmlFc.form[0].html)
   
    if( fullcontCheckRequired.formCheck(htmlFc.form, tabNotify) )            {  existError = true }
    if( fullcontCheckRequired.multitableCheck(htmlFc.entityMT, tabNotify) )  {  existError = true }

    return existError
}/**/


export function wasEdited(htmlFc, change){  console.log('wasEdited> change', )


  var control         = false
  const settingsData  = settings.getData()
 
  ///control only the update
  var controlChange   = false
  if(change != undefined){ 
     controlChange = true 
     change.userId = settingsData.id
  }
  

  getValues( htmlFc )

  //  console.log('after get values')
  //  console.log('wasEdited> form', htmlFc.form)
  //  console.log('wasEdited> formCopy', htmlFc.formCopy)

  for(let i=0 ; i < htmlFc.form.length ; i++){  //console.log('>>', htmlFc.form[i].name.value  )
      if(htmlFc.formCopy[i].value.toString() != htmlFc.form[i].value.toString()  && htmlFc.formCopy[i].type != 'map') { 

          control = true  
          if(controlChange){ 
             change.input.push ({ elemId: htmlFc.form[i].id, from: htmlFc.form[i].value, to:htmlFc.formCopy[i].value  })
          }

         // changeControl
          // console.log('wasEdited>form',     htmlFc.form[i].id,     htmlFc.form[i].value )
          // console.log('wasEdited>Copy',     htmlFc.formCopy[i].id, htmlFc.formCopy[i].value )
      }

  }/*for*/

  //console.log('after the form to MT') //mt is hasndle the change, 
  if( multitable.start({act:'wasEdited', entityMT: htmlFc.entityMT, change: change }) ){ 
      control = true  
      //console.log('wasEdited>mt')
  }

 
  return control

}/*wasEdited*/




function remove(callback){
  setTimeout(()=>{
    callback()
  }, 500)
}


/*"nurses":"13",
wasEdited>multitable [{"id":"7","department":{"id":"13","displayText":"LPN-Nursing-Ped"},"rate":"0","action_date":"2020-10-15","rate_type":"Hourly","tax_type":"M1099","action":"In"}]
wasEdited>multitable [{"id":"7","department":{"id":"13","displayText":"LPN-Nursing-Ped"},"rate_type":"Hourly","tax_type":"M1099","rate":0,"action":"In","action_date":"2020-10-15","notes":""}]
*/


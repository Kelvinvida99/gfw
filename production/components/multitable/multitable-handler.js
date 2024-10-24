
const formHandler         = require('../fullcont/fullcont-form-handler')
const multitableSnack     = require('./multitable-snack')

//const autocompleteHandler = require('../textfield/autocomplete-handler')




export function clean(detail){ //console.log('mt clean>')
  
    if( detail.entityMT === undefined){ return }
        
    detail.entityMT.forEach((mt)=>{
        mt.html.innerHTML =''
        mt.html.classList.remove('multitable-error')
    })    
    
  
  
}/*clean*/

export function cleanFromValues(detail){  //console.log('cleanFromValues', detail)
  
        if( detail.entityMT === undefined ){ return }/**/

        detail.entityMT.forEach((mt)=>{ //console.log('multiTables clean>', mt)
          mt.data     = []
          mt.dataCopy = []
        })

        //console.log('cleanFromValues', JSON.parse( JSON.stringify(   detail.entityMT[0].data  ) ))
   
}/*clean*/

//load the data to the right multitable
export function loadResultToForm(detail){  
  
  console.log( 'loadResultToForm', detail.resultMT )

  const cancelLoad = detail.resultMT === undefined || detail.entityMT === undefined
  
  if( cancelLoad ){ return }

  //server return  [{id: null, name: null}] when the mt is empy
  // we need to clean that to []
  detail.resultMT.forEach((mtResult)=>{ 
        if( mtResult.data[0].id === null){
            mtResult.data = []
        }
  }) 

  
  detail.resultMT.forEach((mtResult)=>{ 
      detail.entityMT.forEach((mt)=>{  //console.log('data.multiTables>', mtResult.data )
          
            if(mt.tableName === mtResult.tableName){
                  mt.data      = JSON.parse(JSON.stringify(mtResult.data)) 
                  mt.dataCopy  = JSON.parse(JSON.stringify(mtResult.data)) 
            }
      })
  }) 

}/*clean*/



// on this funciton we figure out if we have chamge we alson estore the chagnes
export function wasEdited(detail){ //console.log('MULTITABLE WAS EDITED>', detail )
 
  
    if( detail.entityMT === undefined ){ return }

    var control         = false
    var controlChange   = false
    if(detail.change != undefined){ controlChange = true }

    detail.entityMT.forEach((mt)=>{   // console.log('MULTITABLE WAS EDITED>', mt )
        
        if( JSON.stringify(mt.dataCopy) != JSON.stringify(mt.data) ){ 
             
            if(controlChange){     
                detail.change.mt.push({ id: mt.id, from: mt.dataCopy, to:mt.data } )
            }    
            
            //changeCheck(detail, mt)       
            control     = true             
        }
        
    })

    return control

}/*clean*/

/*
wasEdited>multitable dataaaaa [{"id":"273","compliance":"100 COVID-19 VACCINE","compliance_date":"0000-00-00","expiration_date":"0000-00-00","status":""},{"id":"273","compliance":"","compliance_date":"0000-00-00","expiration_date":"0000-00-00","status":""}]


*/


export function getValues(detail){ //console.log('MULTITABLE GET VALUES>>>>', detail)
  
    if( detail.entityMT === undefined){ return }   

    detail.entityMT.forEach((mt)=>{   // console.log('MULTITABLE GET VALUES', JSON.parse( JSON.stringify(  mt.data ) ))

        const lines            = mt.html.querySelectorAll('.line')
        const newData          = []

        //get all the lines
        lines.forEach((line)=>{ //console.log('line ID', line.getAttribute('lineId'))

            const lineId       = line.getAttribute('lineId')
            const defaultValue = {} 
           
            //if lineId is '', this will be an insert, otherwise, an update
            defaultValue.id = lineId 
          
            //explore each input on the line, base on the fields
            mt.fields.forEach((elem)=>{   
                    
                    elem.html =  line.querySelector(`.${elem.name}`)
                    defaultValue[elem.name] = JSON.parse( JSON.stringify( formHandler.getValues(elem) ) ) 
            })
              
            newData.push( JSON.parse( JSON.stringify( defaultValue ) ) )
        })
        
        mt.data = JSON.parse( JSON.stringify(newData) )

        // console.log('MULTITABLE GET VALUES data ', JSON.parse( JSON.stringify(  mt.data ) ))
        // console.log('MULTITABLE GET VALUES newData', JSON.parse( JSON.stringify(  newData ) ))
    })/**/

}/*clean*/


//Create the html and fill with the data
export function generator(detail){ 
  
  console.log('MULTITABLE GENERATOR>')

  if( detail.entityMT === undefined){ return }   

  //create the new elements html
  detail.entityMT.forEach((mt)=>{ //console.log('MULTITABLE GENERATOR mt>', mt)
     
        mt.html.innerHTML = ''
     
        mt.data.forEach((line)=>{ // console.log('MULTITABLE line>', line)
            mt.html.innerHTML += mt.generator(line)
        })/*foreach*/     
  })/*foreach*/
      

   //fill the new elements html
  detail.entityMT.forEach((mt)=>{
        mt.data.forEach((data)=>{   // console.log('data before', JSON.parse( JSON.stringify(  data  ) ))

            const line = mt.html.querySelector(`.line-${data.id}`)
            mt.fields.forEach((elem)=>{  
                
                const isAutocomplete =  elem.type === "autocomplete"

                elem.html  = line.querySelector(`.${elem.name}`)
                elem.value = data[elem.name]

                if( isAutocomplete ){ acConvertDataToFill(elem)  }

                formHandler.fill(elem)

                if( isAutocomplete ){
                        data[elem.name] =   JSON.parse( JSON.stringify(  acConvertFullToId(data[elem.name])  ) )
                }
                


                  //console.log('data after', JSON.parse( JSON.stringify(  data  ) ))
            })
        })

        mt.dataCopy = JSON.parse( JSON.stringify(mt.data) )

  })/*foreach*/    
  

}/*clean*/

/*  MORE DETAILS ABOUT MT and autocomplete
    The server returns [{id: 1, displayText: 'hellow'}] on ac values, 
    or [{id: null, displayText: null}] when is empty, 
    our systems only process values on ac as ["1", "55"]
    1. we convert the data to create the auto complete with value, valueFull acConvertDataToFill()
    2. Once we have been create the html element we remove the the valueFull from data element
       and just use the values ["1", "55"], we remove this too from data and dataCopy    */


function acConvertDataToFill(elem){ //console.log('@@@@@@@@@@convertData to AC>', elem)
     
    const ids = []
  
//alert(elem.value)
    //convert to object
    if(typeof(elem.value) == "string"){
      elem.valueFull =  JSON.parse( elem.value )
    }
    else{
      elem.valueFull =  elem.value
    }
    
      
      if(elem.valueFull[0].id === null){// console.log('IDS VACIOS')
            
            elem.value     = []  
            elem.valueFull = []   
            return
      }

      elem.valueFull.forEach((value)=>{ ids.push(value.id)  })
      elem.value = ids
}/**/


//remove the value from [{id:'5', displayText: 'cinco'}] > ['5']
//onve we create the html element we discart the full value an only works with the ids
function acConvertFullToId(dataElem){ // console.log('dataElement>', dataElem)
    ////console.log("DATA ELEMET:::::",dataElem)

    //THE IF BELOW ARE FOR CONSIUDERING WHEN THE AUTOCOMPLETE SENDS AN OBJECT FROM MYSQL QUERY OR JUST SEND A STRING, SO WE HAVE TO CONSIDER BOTH
      if(typeof(dataElem) == "string"){
        var value = JSON.parse( dataElem )
      }
      else{
        var value = dataElem
      }


   
    const ids   = []

    if(value[0].id === null){// console.log('IDS VACIOS')
            return [] 
    }

    value.forEach((value)=>{ ids.push(value.id)  })

    return ids
}





export function addError(detail){ //console.log('addError>', detail)
    
    const cont   =  detail.mt.html

    cont.classList.add('multitable-error')
    cont.classList.add('a-shake')
    
    remove(()=>{ cont.classList.remove('a-shake') })

}/**/


export function removeError(detail){ //console.log('removeError>', detail)
    
    const cont   =  detail.mt.html
    cont.classList.remove('multitable-error')
}/**/


function removeIdForAddedLine(lineId, defaultValue){
      
      if( lineId != '' ){  
        
        defaultValue.id =  parseInt(lineId)        
      
      }else{  delete defaultValue.id  }     
}


export function removeLine(detail){ //console.log('MULTITABLE REMOVE>')
  
      const parentLine = detail.ev.target.parentElement
      parentLine.classList.add('multitable-deleteLine')
      multitableSnack.start({act:'show', id:'noRemoved'})

      removeLong(()=>{ parentLine.remove() })    
}/**/


function remove(callback){
  setTimeout(()=>{
    callback()
  }, 800)
}


function removeLong(callback){
  setTimeout(()=>{  callback()  }, 900)
}



//Create the html and fill with the data
export function generator_insert(detail){ 
  
  console.log('MULTITABLE GENERATOR>')

  if( detail.entityMT === undefined){ return }   

  //create the new elements html
  detail.entityMT.forEach((mt)=>{ //console.log('MULTITABLE GENERATOR mt>', mt)
     
        mt.html.innerHTML = ''
     
        mt.data.forEach((line)=>{ // console.log('MULTITABLE line>', line)
            mt.html.innerHTML += mt.generator(line)
        })/*foreach*/     
  })/*foreach*/
      
  let cont = 0;
   //fill the new elements html
  detail.entityMT.forEach((mt)=>{
        mt.data.forEach((data)=>{   // console.log('data before', JSON.parse( JSON.stringify(  data  ) ))

            const line = mt.html.querySelectorAll(`.line`)
            mt.fields.forEach((elem)=>{  
                
                const isAutocomplete =  elem.type === "autocomplete"

                elem.html  = line[cont].querySelector(`.${elem.name}`)
                elem.value = data[elem.name]

                if( isAutocomplete ){ acConvertDataToFill(elem)  }

                formHandler.fill(elem)

                if( isAutocomplete ){
                        data[elem.name] =   JSON.parse( JSON.stringify(  acConvertFullToId(data[elem.name])  ) )
                }
                

                  //console.log('data after', JSON.parse( JSON.stringify(  data  ) ))
            })
            cont++;
        })

        mt.dataCopy = JSON.parse( JSON.stringify(mt.data) )

  })/*foreach*/    
  

}/*clean*/




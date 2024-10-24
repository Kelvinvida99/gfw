
const autocompleteHandler    = require ('../textfield/autocomplete-handler')
const checkbox               = require ('../selector/checkbox')
const map                    = require ('../map/map')
const radio                  = require ('../selector/radio')
const signature              = require ('../../components/signature/signature')
const textfieldHandler       = require ('../../components/textfield/textfield-handler')
const textfieldMultiselect   = require ('../textfield/textfield-multiselect')



export function getValues(elem){  //console.log('getValues type>', elem.type, elem.name)
      
       return getValuesObj[elem.type].start(elem)

} //getValues


const getValuesObj = {
   
      autocomplete:      { start: (elem)=>{ return autocompleteHandler.getValue(elem.html);        }},
      checkbox:          { start: (elem)=>{ return checkbox.getValue(elem.html);                   }},
      map:               { start: (elem)=>{ return map.getValue(elem.id);                          }},
      multiselect:       { start: (elem)=>{ return textfieldMultiselect.getFromHtml(elem.html);    }},
      radio:             { start: (elem)=>{ return radio.getValue(elem.html);                      }},
      signature:         { start: (elem)=>{ return signature.getValue(elem.id);                    }},
      textfield:         { start: (elem)=>{ return textfieldHandler.getValue(elem);                }},
      textfieldValidator:{ start: (elem)=>{ return textfieldHandler.getValue(elem);                }},
}


export function fill(elem){ // console.log('getValues type>', elem.type)
      
       return fillObj[elem.type].start(elem)

} //getValues

const fillObj = {
   
      autocomplete:      { start: (elem)=>{  autocompleteHandler.fill(elem);                }},
      checkbox:          { start: (elem)=>{  checkbox.fill(elem.html, elem.value);          }},
      map:               { start: (elem)=>{  map.loadLocation(elem);                        }},
      multiselect:       { start: (elem)=>{  textfieldMultiselect.createChoose(elem);       }},
      radio:             { start: (elem)=>{  radio.fill(elem.html, elem.value);             }},
      signature:         { start: (elem)=>{  signature.fill(elem.id, elem.value);           }},
      textfield:         { start: (elem)=>{  textfieldHandler.fill(elem.html, elem.value);  }},
      textfieldValidator:{ start: (elem)=>{  textfieldHandler.fill(elem.html, elem.value);  }},
}



export function clean(elem){  //console.log('getValues type>', elem.type)
      
       return cleanObj[elem.type].start(elem)

} //getValues

const cleanObj = {
   
      autocomplete:      { start: (elem)=>{  autocompleteHandler.clean({html:elem.html});      }},
      checkbox:          { start: (elem)=>{  checkbox.clean(elem.html);                        }},
      map:               { start: (elem)=>{  map.clean(elem.id);                               }},
      multiselect:       { start: (elem)=>{  textfieldMultiselect.createChoose(elem);          }},
      radio:             { start: (elem)=>{  radio.clean(elem.html);                           }},
      signature:         { start: (elem)=>{  signature.start({act:'cleanOnline', id:elem.id}); }},
      textfield:         { start: (elem)=>{  textfieldHandler.clean(elem.html);                }},
      textfieldValidator:{ start: (elem)=>{  textfieldHandler.clean(elem.html);                }},
      multiselect:       { start: (elem)=>{  textfieldMultiselect.createClean( elem);          }},

}

export function cleanRestriction(htmlFc){  //console.log('getValues 888888888888888888888888888>', htmlFc)
      
  htmlFc.form.forEach((elem)=>{
      elem.html.classList.remove('textfield-restriction')
        //console.log('clean>########', elem)
  })/**/       

  if(htmlFc.entityMT != undefined){
      htmlFc.entityMT.forEach((elem)=>{
          elem.html.classList.remove('multitable-restriction')
            //console.log('clean>########', elem)
      })/**/      
  }

} //getValues


























const autocompleteHandler    = require ('../textfield/autocomplete-handler')
const checkbox               = require ('../selector/checkbox')
const map                    = require ('../map/map')
const radio                  = require ('../selector/radio')
const signature              = require ('../../components/signature/signature')
const textfieldHandler       = require ('../../components/textfield/textfield-handler')
const textfieldMultiselect   = require ('../textfield/textfield-multiselect')



export function getValues(elem){  //console.log('getValues type>', elem.type)

    switch (elem.type){
          case 'autocomplete':         return autocompleteHandler.getValue(elem.html); break;
          case 'checkbox':             return checkbox.getValue(elem.html);                    break;
          case 'map':                  return map.getValue(elem.id);                           break;
          case 'multiselect':          return textfieldMultiselect.getFromHtml(elem.html);     break;
          case 'radio':                return radio.getValue(elem.html);                       break;
          case 'signature':            return signature.getValue(elem.id);                     break;
          case 'textfield':            return textfieldHandler.getValue(elem);                 break;
          case 'textfield-validator':  return textfieldHandler.getValue(elem);                 break;
          default: return '';
    }/*switch*/

} //getValues


export function fill(elem){// console.log('fillHANDKER>')
  
      switch (elem.type){
             case 'autocomplete':        autocompleteHandler.fill(elem);               break;
             case 'checkbox':            checkbox.fill(elem.html, elem.value);         break;
             case 'map':                 map.loadLocation(elem);                       break;
             case 'multiselect':         textfieldMultiselect.createChoose(elem);      break;            
             case 'radio':               radio.fill(elem.html, elem.value);            break;
             case 'signature':           signature.fill(elem.id, elem.value);          break;
             case 'textfield':           textfieldHandler.fill(elem.html, elem.value); break;
             case 'textfield-validator': textfieldHandler.fill(elem.html, elem.value); break;
        
        }/*switchh*/
}/*fill*/


export function clean(elem){ //console.log('clean NEW>')

    switch (elem.type){
           case 'autocomplete':        autocompleteHandler.clear({html:elem.html});      break;
           case 'checkbox':            checkbox.clean(elem.html);                        break;    
           case 'map':                 map.clean(elem.id);                               break;
           case 'radio':               radio.clean(elem.html);                           break;
           case 'signature':           signature.start({act:'cleanOnline', id:elem.id}); break;
           case 'textfield' :          textfieldHandler.clean(elem.html);                break;
           case 'textfield-validator': textfieldHandler.clean(elem.html);                break;
           case 'multiselect':         textfieldMultiselect.createClean( elem);          break;
    }/*switch*/
}/*clean*/































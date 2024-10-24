
const handler     = require('./multitable-handler')

export function start(detail){  //console.log('gmt>', detail)
         
      return obj[detail.act].start(detail)
}/**/


const obj = {

      addError:        { start: (detail)=>{ return handler.addError(detail)        }},
      clean:           { start: (detail)=>{ return handler.clean(detail)           }},
      cleanFromValues: { start: (detail)=>{ return handler.cleanFromValues(detail) }},
      cleanNull:       { start: (detail)=>{ return handler.cleanNull(detail)       }},
      generator:       { start: (detail)=>{ return handler.generator(detail)       }},
      generator_insert:{ start: (detail)=>{ return handler.generator_insert(detail)  }},
      getValues:       { start: (detail)=>{ return handler.getValues(detail)       }},
      loadResultToForm:{ start: (detail)=>{ return handler.loadResultToForm(detail)}},
      removeError:     { start: (detail)=>{ return handler.removeError(detail)     }},
      removeLine:      { start: (detail)=>{ return handler.removeLine(detail)      }},
      wasEdited:       { start: (detail)=>{ return handler.wasEdited(detail)       }},
      
}


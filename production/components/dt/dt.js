
const dtHandler = require('./dt-handler')

export function start(detail){  //console.log('goku-dt 5>', detail)
         
      obj[detail.act].start(detail)

}/**/


const obj = {
   
        checkboxAll:    { start: (detail)=>{  dtHandler.checkboxAll(detail)     }},
        checkboxTd:     { start: (detail)=>{  dtHandler.checkboxTd(detail)      }},
        clear:          { start: (detail)=>{  dtHandler.clear(detail)           }},
        filterShowHide: { start: (detail)=>{  dtHandler.filterShowHide(detail)  }},
        searching:      { start: (detail)=>{  dtHandler.searching(detail)       }},
        th:             { start: (detail)=>{  dtHandler.th(detail)              }},
        typing:         { start: (detail)=>{  dtHandler.typing(detail)          }},
}


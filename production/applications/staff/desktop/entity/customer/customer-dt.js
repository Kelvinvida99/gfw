const dtGenerator   = require ('../../../../../components/dt/dt-generator')
const dtHandler     = require ('../../../../../components/dt/dt-handler')
const dtSearch      = require ('../../../../../components/dt/dt-search')
const customerMenu  = require('./customer-menu')
const {organizeRow} = require('./customer-dt-handler')
const {tableDetail} = require('./customer-dt-handler')


/****************ELEMENTS*****************/
var htmlDt = {}
var HTMLwasSelected = false

function HTMLselect(){ 

      dtHandler.HTMLselect('customer-dt', htmlDt, organizeRow, tableDetail)
      HTMLwasSelected  = true

      // htmlDt.sortBy = 'date_edited'
      // htmlDt.sortDirection = "DESC"
            
}/**/
/****************ELEMENTS*****************/



export function start(detail){  //console.log('customer-dt 5>', detail)
  
      if(!HTMLwasSelected) { HTMLselect() }
       
      obj[detail.act].start(detail)

}/**/



const obj = {
   
      //From fullcont connection    
      addRow:         { start: (detail)=>{  dtGenerator.addRow( detail, htmlDt  )     }},
      tableOptions:   { start: (detail)=>{  customerMenu.start(detail, htmlDt, 'htmlFc')  }},
      trMenu:         { start: (detail)=>{  customerMenu.start(detail, htmlDt, 'htmlFc')  }},
      updateRow:      { start: (detail)=>{  dtGenerator.updateRow(detail, htmlDt)     }},

      //data table
      filter:         { start: (detail)=>{  dtSearch.filter(detail, htmlDt )          }},
      filterShowHide: { start: (detail)=>{  dtSearch.filterShowHide(detail, htmlDt )  }},
      loadMore:       { start: (detail)=>{  dtSearch.loadMore(detail, htmlDt )        }},
      searching:      { start: (detail)=>{  dtSearch.searching(detail, htmlDt )       }},
      select:         { start: (detail)=>{  dtSearch.select(detail, htmlDt, true )    }},
      th:             { start: (detail)=>{  dtSearch.th(detail, htmlDt )              }},
      trPrint:        { start: (detail)=>{  trPrint(detail)                           }},

}/**/



function trPrint (detail){ console.log(' trPrint>')   }


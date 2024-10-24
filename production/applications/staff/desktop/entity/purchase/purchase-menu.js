const menu        = require('../../../../../components/menu/menu')
const dtHandler   = require('../../../../../components/dt/dt-handler')


export function start( detail, htmlDt, htmlFc ){  //console.log('Menu Type 2 -> ', detail)

  const menuElem = menuBody[detail.id]

  for(let i=0; i< menuElem.length; i++){
        menuElem[i].start(detail, htmlDt, htmlFc)
  }  

  detail.html = menuElem

  detail.act = 'show'
  menu.start(detail)

}


const menuBody = {

  trMenu: [

      { text: '', 
        svg:'eye', 
        class:``,
        dataDetail:``,
        
        start: function(detail){  
          this.text   = 'View/Edit'        //language.start('inProgress')     
          this.dataDetail = `data-detail='{
                          "click": [
                              {"dest":"ripple" },
                              {"dest":"menu", "act":"hide"}, 
                              { "dest":"purchase", "elem":"fullcont", "id":"purchase-fullcont", "act":"selectOne",  "entity":"purchase", "dbid": ${detail.dbid} }
           ]}'`

        }
      },   

      { text: '', 
        svg:'report', 
        class:``, //same name as the title test

        dataDetail: '',

        start: function(detail){  
          this.text   = 'Purchase Report'        //language.start('inProgress')
          this.dataDetail = `data-detail='{
                          "click": [
                              {"dest":"ripple" },
                              {"dest":"menu", "act":"hide"}, 
                              {"dest":"purchase", "elem":"report", "reportType":"reportOne", "entity":"purchase", "dbid":"${detail.dbid}", "source":"dt" } 

        ]}'`
        
        }

      },
      
      { text: '', 
        svg:'print', 
        class:``, //same name as the title test

        dataDetail: '',

        start: function(detail){  
          this.text   = 'Print Order'        //language.start('inProgress')
          this.dataDetail = `data-detail='{
                          "click": [
                              {"dest":"ripple" },
                              {"dest":"menu", "act":"hide"}, 
                              {"dest":"purchase", "elem":"fullcont", "id":"purchase-fullcont", "act":"purchasePrintPdf", "id":"${detail.dbid}"} 

        ]}'`
        
        }

      },


          
      { text: '', 
        svg:'barcode', 
        class:``, //same name as the title test
        dataDetail:``,

        start: function(detail, htmlDt, htmlFc){  

              //if exist one check
                  this.class  = ``
                  this.text   = `Print Label`                 
                  this.dataDetail = `data-detail='{
                                    "click": [
                                        {"dest":"ripple" },
                                        {"dest":"menu", "act":"hide"},
                                        {"dest":"purchase", "elem":"fullcont", "id":"purchase-fullcont", "act":"printlabeldt", "dbid":"${detail.dbid}"}  ]}'`             
            }/**/
      },

     {text:'line', start: function(){}}, //////////////line

      { text: '', 
        svg:'delete', 
        class:``,
        dataDetail:`data-detail='{
                          "click": [
                              {"dest":"ripple" },
                              {"dest":"menu", "act":"hide"}
        ]}'`,
        
        start: function(detail){  

          this.text   = 'Delete'        //language.start('inProgress')     
          this.dataDetail = `data-detail='{
                            "click": [
                              {"dest":"ripple" },
                              {"dest":"menu", "act":"hide"}, 
                              {"dest":"purchase", "elem":"fullcont", "act":"deleteEntity", "entity":"purchase", "dbid":["${detail.dbid}"] } 
           ]}'`

        }
      },
   ],


  tableOptions: [
     
      { text: '', 
        svg:'person', 
        class:``, //same name as the title test

        dataDetail:`data-detail='{
                          "click": [
                              {"dest":"ripple" },
                              {"dest":"menu", "act":"hide"},
                              {"dest":"purchase", "elem":"dialog", "id":"hellow", "act":"show"}
        ]}'`,


        start: function(){  
          this.text   = 'Show Dialog'        //language.start('inProgress')     
        }
      },

     {text:'line', start: function(){}}, //////////////line

      { text: '', 
        svg:'delete', 
        class:``,
        dataDetail:``,
        


            start: function(detail, htmlDt){  //console.log('startXXXXXXXXXXXXX')

              const ids = dtHandler.getTrChecked(htmlDt)

              //if exist one check
              if( ids.length > 0 ){
                  this.class  = ``
                  this.text   = `Delete All (${ids.length})`                 
                  this.dataDetail = `data-detail='{
                                    "click": [
                                        {"dest":"ripple" },
                                        {"dest":"menu", "act":"hide"},
                                        {"dest":"purchase", "elem":"fullcont", "act":"deleteEntity", "entity":"purchase",  "dbid":[${ids}]} ]}'`             
              }else{ 
                   this.class = `disabled`
                   this.text  = `Delete All`
                   this.dataDetail =''
              }/*if*/

              // console.log('startXXXXXXXXXXXXX', ids)


            }/**/
      },
  ],


  fullcontOptions: [

      { text: '', 
        svg:'edit', 
        class:``, //same name as the title test
        dataDetail:``,

        start: function(detail, htmlDt, htmlFc){  
                this.text   = `Edit`                 
                this.dataDetail = `data-detail='{
                                   "click": [
                                      {"dest":"ripple" },
                                      {"dest":"menu", "act":"hide"},
                                      {"dest":"purchase", "elem":"fullcont",  "id":"purchase-fullcont", "act":"prepareEdit" }  ]}'`             
            }/**/
      },

      { text: '', 
        svg:'print', 
        class:``, //same name as the title test
        dataDetail:``,

        start: function(detail, htmlDt, htmlFc){  

              //if exist one check
                  this.class  = ``
                  this.text   = `Print Order`                 
                  this.dataDetail = `data-detail='{
                                     "click": [
                                        {"dest":"ripple" },
                                        {"dest":"menu", "act":"hide"},
                                        {"dest":"purchase", "elem":"fullcont", "id":"purchase-fullcont", "act":"purchasePrintPdf", "id":""} ]}'`             
            }/**/
      },

        
      { text: '', 
        svg:'print', 
        class:``, //same name as the title test
        dataDetail:``,

        start: function(detail, htmlDt, htmlFc){  

              //if exist one check
                  this.class  = ``
                  this.text   = `Print Label`                 
                  this.dataDetail = `data-detail='{
                                    "click": [
                                        {"dest":"ripple" },
                                        {"dest":"menu", "act":"hide"},
                                        {"dest":"purchase", "elem":"fullcont", "act":"printlabel"} ]}'`             
            }/**/
      },


      { text: '', 
        svg:'report', 
        class:``, //same name as the title test
        dataDetail:``,

        start: function(detail, htmlDt, htmlFc){  

              //if exist one check
                  this.class  = ``
                  this.text   = `Purchase Report`                 
                  this.dataDetail = `data-detail='{
                                     "click": [
                                        {"dest":"ripple" },
                                        {"dest":"menu", "act":"hide"},
                                        {"dest":"purchase", "elem":"report", "reportType":"reportOne", "source":"fullcont"} ]}'`             
            }/**/
      },

     {text:'line', start: function(){}}, //////////////line
     
      { text: '', 
        svg:'delete', 
        class:``, //same name as the title test

        dataDetail:``,

          start: function(detail, htmlDt, htmlFc){  

            const dbid = htmlFc.fullcontHTML.getAttribute('data-dbid')

              //if exist one check
                  this.class  = ``
                  this.text   = `Delete `                 
                  this.dataDetail = `data-detail='{
                                    "click": [
                                        {"dest":"ripple" },
                                        {"dest":"menu", "act":"hide"},
                                        {"dest":"purchase", "elem":"fullcont", "act":"deleteEntity", "entity":"purchase",  "dbid":[${dbid}]} ]}'`             
              
            }/**/
      },


  ],

}/*menuBody*/



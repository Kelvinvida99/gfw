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
                              { "dest":"transaction", "elem":"fullcont", "id":"transaction-fullcont", "act":"selectOne",  "entity":"transaction", "dbid": ${detail.dbid} }
           ]}'`

        }
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
                              {"dest":"transaction", "elem":"fullcont", "act":"deleteEntity", "entity":"transaction", "dbid":["${detail.dbid}"] } 
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
                              {"dest":"customer", "elem":"dialog", "id":"hellow", "act":"show"}
        ]}'`,


        start: function(){  
          this.text   = 'Show Dialog'        //language.start('inProgress')     
        }
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
                                      {"dest":"transaction", "elem":"fullcont",  "id":"transaction-fullcont", "act":"prepareEdit" }  ]}'`             
            }/**/
      },

      { text: '', 
        svg:'print', 
        class:``, //same name as the title test
        dataDetail:``,

        start: function(detail, htmlDt, htmlFc){  

              //if exist one check
                  this.class  = ``
                  this.text   = `Print`                 
                  this.dataDetail = `data-detail='{
                                     "click": [
                                        {"dest":"ripple" },
                                        {"dest":"menu", "act":"hide"},
                                        {"dest":"transaction", "elem":"dt", "act":"trPrint"} ]}'`             
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
                                        {"dest":"transaction", "elem":"fullcont", "act":"deleteEntity", "entity":"transaction",  "dbid":[${dbid}]} ]}'`             
              
            }/**/
      },
  ],

}
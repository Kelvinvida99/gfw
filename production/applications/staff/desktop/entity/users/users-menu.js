const menu        = require('../../../../../components/menu/menu')
const dtHandler   = require('../../../../../components/dt/dt-handler')

export function start( detail, htmlDt, htmlFc ){  console.log('Users Menu Type 2 -> ', detail)

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
          this.text   = 'View/Edit'            
          this.dataDetail = `data-detail='{
                          "click": [
                              {"dest":"ripple" },
                              {"dest":"menu", "act":"hide"}, 
                              { "dest":"users", "elem":"fullcont", "id":"users-fullcont", "act":"selectOne",  "entity":"users", "dbid": ${detail.dbid} }
           ]}'`

        }
      },   

      { text: '', 
        svg:'key', 
        class:``, //same name as the title test

        dataDetail: '',

        start: function(detail){  
          this.text       = 'Chage Password'       
          this.dataDetail = `data-detail='{
                          "click": [
                              {"dest":"ripple" },
                              {"dest":"menu", "act":"hide"}, 
                              {"dest":"users", "elem":"dialog", 
                                "id":"chagePassword", 
                                "act":"show", 
                                "entity":"users", 
                                "dbid":"${detail.dbid}" 
                              } 

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

          this.text       = 'Delete'        //language.start('inProgress')     
          this.dataDetail = `data-detail='{
                            "click": [
                              {"dest":"ripple" },
                              {"dest":"menu", "act":"hide"}, 
                              {"dest":"users", 
                                "elem":"fullcont", 
                                "act":"deleteEntity", 
                                "entity":"users", 
                                "dbid":["${detail.dbid}"] 
                              } 
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
                              {"dest":"users", "elem":"dialog", "id":"hellow", "act":"show"}
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
                  this.class      = ``
                  this.text       = `Delete All (${ids.length})`                 
                  this.dataDetail = `data-detail='{
                                    "click": [
                                        {"dest":"ripple" },
                                        {"dest":"menu", "act":"hide"},
                                        {"dest":"users", 
                                          "elem":"fullcont", 
                                          "act":"deleteEntity", 
                                          "entity":"users",  
                                          "dbid":[${ids}]
                                        } 
                                    ]}'`             
              }else{ 
                   this.class      = `disabled`
                   this.text       = `Delete All`
                   this.dataDetail =''
              }/*if*/

            }/**/
      },
  ],

  fullcontOptions: [

      { text: '', 
        svg:'edit', 
        class:``, //same name as the title test
        dataDetail:``,

        start: function(detail, htmlDt, htmlFc){  
                this.text       = `Edit`                 
                this.dataDetail = `data-detail='{
                                   "click": [
                                      {"dest":"ripple" },
                                      {"dest":"menu", "act":"hide"},
                                      {"dest":"users", "elem":"fullcont",  "id":"users-fullcont", "act":"prepareEdit" }  ]}'`             
            }/**/
      },

      { text: '', 
        svg:'print', 
        class:``, //same name as the title test
        dataDetail:``,

        start: function(detail, htmlDt, htmlFc){  

              //if exist one check
                  this.class      = ``
                  this.text       = `Print`                 
                  this.dataDetail = `data-detail='{
                                     "click": [
                                        {"dest":"ripple" },
                                        {"dest":"menu", "act":"hide"},
                                        {"dest":"users", "elem":"dt", "act":"trPrint"} ]}'`             
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
                  this.class      = ``
                  this.text       = `Delete `                 
                  this.dataDetail = `data-detail='{
                                    "click": [
                                        {"dest":"ripple" },
                                        {"dest":"menu", "act":"hide"},
                                        {"dest":"users", 
                                          "elem":"fullcont", 
                                          "act":"deleteEntity", 
                                          "entity":"users",  
                                          "dbid":[${dbid}]
                                        } 
                                    ]}'`             
              
            }/**/
      },
  ],
}/*menuBody*/
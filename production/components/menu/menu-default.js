
const menu = require('../../components/menu/menu')


export function menuDefault( detail ){ // console.log('Menu Type -> ', detail)

  const menuElem = menuBody[detail.id]

  menuElem.forEach((elem)=>{
      elem.start()
  })

  detail.html = menuElem

}





const menuBody = {



  avatarOptions: [
     
      { text: '', 
        svg:'refresh', 
        class:`test 2`, //same name as the title test

        dataDetail:`data-detail='{
                          "click": [
                              {"dest":"ripple" },
                              {"dest":"menu", "act":"hide"}, 
                              {"dest":"reload"}
        ]}'`,

        start: function(){  
          this.text   = 'Reload'        //language.start('inProgress')     
        }
      },

      {text:'line', start: function(){ } }, //////////////line

      { text: '', 
        svg:'power', 
        class:``,
        dataDetail:`data-detail='{
                          "click": [
                              {"dest":"ripple" },
                              {"dest":"menu", "act":"hide"}, 
                              {"dest":"login", "act":"logMeOut"} ]}'`,
        
        start: function(){  
          this.text   = 'Log Me Out'        //language.start('inProgress')     
        }
        
      },
      
  ],



  hellow: [
     
      { text: '', 
        svg:'person', 
        class:`hellow 2`, //same name as the title test

        dataDetail:`data-detail='{
                          "click": [
                              {"dest":"ripple" },
                              {"dest":"menu", "act":"hide"}, 
        ]}'`,

        start: function(){  
          this.text   = 'Reload'        //language.start('inProgress')     
        }
      },

      {text:'line', start: function(){ } }, //////////////line

      { text: 'hellow 2', 
        svg:'person', 
        class:``,
        dataDetail:`data-detail='{
                          "click": [
                              {"dest":"ripple" },
                              {"dest":"menu", "act":"hide"} ]}'`,
        
        start: function(){  
          this.text   = 'hellow 2'        //language.start('inProgress')     
        }
        
      },
      
  ],





}



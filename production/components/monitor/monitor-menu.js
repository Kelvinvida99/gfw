
const menu = require('../menu/menu')

export function start( detail ){  console.log('Menu Type -> ', detail)
  const menuElem = menuBody[detail.id]


  for(let i=0; i< menuElem.length; i++){
        menuElem[i].start(detail)
  }  

  detail.html = menuElem
  menu.start(detail)

}


const menuBody = {

	userOption: [
     
      { text: '', 
        svg:'restart', 
        class:``, //same name as the title test
        dataDetail:``,

        start: function(detail){  
          this.text       = 'Restart'        //language.start('inProgress')   
          this.dataDetail = `data-detail='{  "click": [
                              {"dest":"ripple" },
                              {"dest":"menu", "act":"hide"},
                              {"dest":"monitor", "elem":"sendBefore", 
                               "command":"restart", "company":"${detail.company}", "id":"${detail.idUser}"    }   
                               ]}'`
        }
      },

      { text: '', 
        svg:'power', 
        class:``, //same name as the title test
        dataDetail:``,

        start: function(detail){  
          this.text       = 'Logout'        //language.start('inProgress')   
          this.dataDetail = `data-detail='{  "click": [
                              {"dest":"ripple" },
                              {"dest":"menu", "act":"hide"},
                              {"dest":"monitor", "elem":"sendBefore", 
                               "command":"logOthersOut", "company":"${detail.company}", "id":"${detail.idUser}"    }   
                               ]}'`
        }
      },


      { text: '', 
        svg:'unlock', 
        class:``, //same name as the title test
        dataDetail:``,

        start: function(detail){  
          this.text       = 'Unlock'        //language.start('inProgress')   
          this.dataDetail = `data-detail='{  "click": [
                              {"dest":"ripple" },
                              {"dest":"menu", "act":"hide"},
                              {"dest":"monitor", "elem":"sendBefore", 
                               "command":"unlockOrLockUsers",  "status":"true", "company":"${detail.company}", "id":"${detail.idUser}" }]}'`
        }
      },

      {text:'line', start: function(){}}, //////////////line

      { text: '', 
        svg:'block', 
        class:``, //same name as the title test
        dataDetail:``,

        start: function(detail){  
          this.text       = 'Block'        //language.start('inProgress')   
          this.dataDetail = `data-detail='{  "click": [
                              {"dest":"ripple" },
                              {"dest":"menu", "act":"hide"},
                              {"dest":"monitor", "elem":"sendBefore", 
                               "command":"unlockOrLockUsers",  "status":"false", "company":"${detail.company}", "id":"${detail.idUser}" }]}'`
        }
      },




	],
}



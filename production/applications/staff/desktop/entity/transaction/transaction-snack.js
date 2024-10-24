const snack = require('../../../../../components/snack/snack')

export function start( detail ){ //console.log('snack Type -> ', detail)
 
  snackBody[detail.id].start(detail.addTitle)

  detail.html = snackBody[detail.id]
  snack.start(detail)

}

const snackBody = {

	hellow: { 
        title: '', 
        btn: 'Undo',
        class:``,

          dataDetail:`data-detail='{
                          "click": [
                              {"dest":"ripple" },
                              {"dest":"snack", "act":"hide"}
          ]}'`,


        start: function(){  
          this.title   = 'Single line messanger Single line messanger Single line messanger Single line messanger'     
          this.btn     = 'Undo'
        }
      },

  errorDownDtGoku: { 
        title: '', 
        large: false, 
        btn: '',
        class:``,
        dataDetail:``,

        start: function(addTitle){  
          this.title   = 'Error downloading customer data from the server'    
          this.btn     = ''    
         
          //we use this for get variable test
          if(addTitle != undefined){
            this.title += `  ${addTitle}`
          }
        }
  },

}
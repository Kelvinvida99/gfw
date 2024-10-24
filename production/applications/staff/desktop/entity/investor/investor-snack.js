
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
          this.title   = 'Single line messanger Single line messanger Single line messanger Single line messanger'        //language.start('inProgress')     
          this.btn     = 'Undo'        //language.start('inProgress')     

        }
      },


  errorDownDtGoku: { 
        title: '', 
        large: false, 
        btn: '',
        class:``,
        dataDetail:``,

        start: function(addTitle){  
          this.title   = 'Error downloading investor data from the server'        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
         
          //we use this for get variable test
          if(addTitle != undefined){
            this.title += `  ${addTitle}`
          }
        }
  },


}





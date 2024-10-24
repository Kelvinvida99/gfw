
const snack = require('../../../../../components/snack/snack')

export function start( detail ){ //console.log('snack Type -> ', detail)
 
  snackBody[detail.id].start(detail.addTitle)

  detail.html = snackBody[detail.id]
  snack.start(detail)

}

const snackBody = {

	passwordUpdated: { 
        title: '', 
        btn: '',
        class:``,
        dataDetail:``,


        start: function(){  
          this.title   = 'The password has been updated'        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     

        }
      },


  passwordUpdateError: { 
        title: '', 
        btn: '',
        class:``,
        dataDetail:``,


        start: function(){  
          this.title   = 'An error happend updating the password'        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     

        }
      },



}





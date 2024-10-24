const snack = require('../../../../../components/snack/snack')

export function start( detail ){ //console.log('snack Type -> ', detail)
 
  snackBody[detail.id].start(detail)

  detail.html = snackBody[detail.id]
  snack.start(detail)

}

const snackBody = {

  fromisgreater: { 
        title: '', 
        large: false, 
        btn: '',
        class:``,
        dataDetail:``,

        start: function(detail){  
          this.title   = 'the initial date is greater than the final date'      //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },



}
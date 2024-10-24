
const snack = require('../../../../../components/snack/snack')

export function start( detail ){ //console.log('snack Type -> ', detail)
  snackBody[detail.id].start(detail.addTitle)

  detail.html = snackBody[detail.id]
  snack.start(detail)

}

const snackBody = {

	noAction: { 
        title: '', 
        btn: '',
        class:``,

          dataDetail:`data-detail='{
                          "click": [
                              {"dest":"ripple" },
                              {"dest":"snack", "act":"hide"}
          ]}'`,


        start: function(){  
          this.title   = 'No Action'        //language.start('inProgress')     
        }
      },

}
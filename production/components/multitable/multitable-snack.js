
const snack = require('../snack/snack')

export function start( detail ){ //console.log('snack Type -> ', detail)
 
  snackBody[detail.id].start(detail.addTitle)

  detail.html = snackBody[detail.id]
  snack.start(detail)

}

const snackBody = {

  noRemoved: { 
        title:'No removed until you press update'  , 
        btn: '',
        class:``,
        dataDetail:``,
        start: function(){}
      },


}





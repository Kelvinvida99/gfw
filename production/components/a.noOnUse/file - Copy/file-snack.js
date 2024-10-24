
const snack = require('../../components/snack/snack')

export function start( detail ){ //console.log('snack Type -> ', detail) 
 
  snackBody[detail.id].start(detail.addTitle)

  detail.html = snackBody[detail.id]
  detail.html.title = detail.title;
  detail.act = "show"
  snack.start(detail)

}

const snackBody = {

	general: { 
        title: '', 
        btn: '',
        class:``,

          dataDetail:`data-detail='{
                          "click": [
                              {"dest":"ripple" },
                              {"dest":"snack", "act":"hide"}
          ]}'`,

        start: function(){  

        }
      }

}





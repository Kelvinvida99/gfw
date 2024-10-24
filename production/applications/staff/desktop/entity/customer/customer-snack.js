
const snack = require('../../../../../components/snack/snack')

export function start( detail ){ //console.log('snack Type -> ', detail)
 
  snackBody[detail.id].start(detail.addTitle)

  detail.html = snackBody[detail.id]
  snack.start(detail)

}

const snackBody = {

	sendReportError: { 
        title: '', 
        btn: '',
        class:``,

          dataDetail:`data-detail='{
                          "click": [
                              {"dest":"ripple" },
                              {"dest":"snack", "act":"hide"}
          ]}'`,


        start: function(){  
          this.title   = 'The client does not have an associated email address to be able to send the report by email'        //language.start('inProgress')     
        }
      },

  sendNoDueInvoice: { 
        title: '', 
        btn: '',
        class:``,

          dataDetail:`data-detail='{
                          "click": [
                              {"dest":"ripple" },
                              {"dest":"snack", "act":"hide"}
          ]}'`,


        start: function(){  
          this.title   = 'No due invoices found'        //language.start('inProgress')     
        }
      },


  sendReport: { 
        title: '', 
        btn: '',
        class:``,

          dataDetail:`data-detail='{
                          "click": [
                              {"dest":"ripple" },
                              {"dest":"snack", "act":"hide"}
          ]}'`,


        start: function(){  
          this.title   = "Report successfully sent to the client's email"        //language.start('inProgress')     
        }
      },


}
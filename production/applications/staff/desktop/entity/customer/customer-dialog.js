const dialog    = require ('../../../../../components/dialog/dialog')

export function start( detail ){ console.log('dialog GOKU detail', detail)

	dialogBody[detail.id].start(detail) 
	
	detail.html =  dialogBody[detail.id]
	dialog.start(detail)


}


const dialogBody = {


	hellow: { 
		title:  '',
		des: '',
		bodyHtml:`

				

		`,

		primary: {
			text:'',
			class:'button primary',
	        
		},

		secondary: {
			text:'',
			class:'button secondary  button-plain',
	        dataDetail:`data-detail='{ "click": [ {"dest":"ripple" },  {"dest":"dialog", "act":"hide"} ]}'`,
		},    

		tertiary: {
			text:'',
			class:'button secondary  button-plain',
	        dataDetail:`data-detail='{ "click": [ {"dest":"ripple" },  {"dest":"dialog", "act":"hide"} ]}'`,
		},  
     

		start: function(detail){
			console.log("FUNCTION, ",detail)
			this.title     = 'Send Report'
			this.des       = 'Do you want to send the report?'
			this.primary.text   = 'Send'
			this.secondary.text = 'Cancel'						
			this.tertiary.text = ''				
			this.primary.dataDetail = `data-detail='{
                          "click": [
                              {"dest":"ripple" },
                              {"dest":"dialog", "act":"hide"}, 
                              {"dest":"customer", "elem":"report", "reportType":"accountReceivable", "entity":"customer", "dbid":"${detail.dbid}", "source":"send" } 

        ]}'`				
		}

	},
	
}




const dialog    = require ('../../../../../components/dialog/dialog')

export function start( detail ){ console.log('dialog sale detail', detail)

	dialogBody[detail.id].start(detail) 
	
	detail.html =  dialogBody[detail.id]
	dialog.start(detail)
}


const dialogBody = {

	saleSellingPrice: { 
		title:  '',
		des: '',
		bodyHtml:'',

		primary: {
			text:'',
			class:'button primary',
	        dataDetail:'',
		},

		secondary: {
			text:'Return',
			class:'button secondary  button-plain',
	        dataDetail:'',
		},    

		tertiary: {
			text:'',
			class:'button secondary  button-plain',
	        dataDetail:'',
		},      

		start: function(detail){
			this.title     			  = 'Warning'
			this.des       		      = 'The selling price on the items below is lower than expected.<br> Do you still want to continue?\n' + detail.items
			this.primary.dataDetail   = `data-detail='{
	                       				 "click": [ {"dest":"ripple" }, {"dest":"dialog", "act":"hide"},
	                                     {"dest":"sale", "elem":"fullcont",  "id":"sale-fullcont", "act":"${detail.actDialog}", "entity":"sale"} ]}'`
			this.secondary.dataDetail = `data-detail='{
	                        			 "click": [ {"dest":"ripple" }, {"dest":"dialog", "act":"hide"} ]}'`
			this.primary.text         = detail.mode
								
		}

	},
}
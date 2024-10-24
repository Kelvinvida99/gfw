const dialog    = require ('../../../../../components/dialog/dialog')

export function start( detail ){ console.log('dialog purchase detail', detail)

	dialogBody[detail.id].start(detail) 
	
	detail.html =  dialogBody[detail.id]
	dialog.start(detail)
}


const dialogBody = {


	purchaseSellingPrice: { 
		title:  '',
		des: '',
		bodyHtml:'',

		primary: {
			text:'Update',
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
			this.title     = 'WARNING'
			//this.des       = 'You want to save the data knowing that one of the selling prices of your item is less than the unit price'
			this.des         = 'Selling price on item is lower than purchased price. Do you want to save?'
			this.primary.dataDetail   = `data-detail='{
	                       				 "click": [ {"dest":"ripple" }, {"dest":"dialog", "act":"hide"},
	                                     {"dest":"purchase", "elem":"fullcont",  "id":"purchase-fullcont", "act":"saveFromDialog", "entity":"purchase"} ]}'`
			this.secondary.dataDetail   = `data-detail='{
	                        			 "click": [ {"dest":"ripple" }, {"dest":"dialog", "act":"hide"} ]}'`					
		}

	},

	purchaseSellingPricePrint: { 
		title:  '',
		des: '',
		bodyHtml:'',

		primary: {
			text:'Update Print',
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
			this.title     = 'WARNING'
			this.des       = 'You want to save the data knowing that one of the selling prices of your item is less than the unit price'
		
	        this.primary.dataDetail   = `data-detail='{
	                       				 "click": [ {"dest":"ripple" }, {"dest":"dialog", "act":"hide"},
	                                     {"dest":"purchase", "elem":"fullcont", "id":"purchase-fullcont", "act":"purchasePrintPdf", "id":""} ]}'`
			this.secondary.dataDetail   = `data-detail='{
	                        			 "click": [ {"dest":"ripple" }, {"dest":"dialog", "act":"hide"} ]}'`					
		}

	},

	purchaseCreateSellingPrice: { 
		title:  '',
		des: '',
		bodyHtml:'',

		primary: {
			text:'Save',
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
			this.title     = 'WARNING'
			this.des       = 'You want to save the data knowing that one of the selling prices of your item is less than the unit price'
			this.primary.dataDetail   = `data-detail='{
	                       				 "click": [ {"dest":"ripple" }, {"dest":"dialog", "act":"hide"},
	                                     {"dest":"purchase", "elem":"fullcont",  "id":"purchase-fullcont", "act":"addOne", "entity":"purchase" } ]}'`
			this.secondary.dataDetail   = `data-detail='{
	                        			 "click": [ {"dest":"ripple" }, {"dest":"dialog", "act":"hide"} ]}'`					
		}

	},

	purchaseprintlabel: { 
		title:  '',
		des: '',
		bodyHtml:'',

		primary: {
			text:'Print',
			class:'button primary',
	        dataDetail:'',
		},

		secondary: {
			text:'Cancel',
			class:'button secondary  button-plain',
	        dataDetail:'',
		},    

		tertiary: {
			text:'',
			class:'button secondary  button-plain',
	        dataDetail:'',
		},      

		start: function(detail){
			this.title     				= 'Labels to print'
			this.des       				= ''
			this.primary.dataDetail     = `data-detail='{
	                       				  "click": [ {"dest":"ripple" }, 
	                                      {"dest":"purchase", "elem":"fullcont",  "id":"purchase-fullcont", "act":"labelgenerator", "entity":"purchase", "dbid":"${detail.dbid}"} ]}'`
			this.secondary.dataDetail   = `data-detail='{
	                        			 "click": [ {"dest":"ripple" }, {"dest":"dialog", "act":"hide"} ]}'`
			this.bodyHtml       		=  detail.opcion

		}

	},


	purchaseItemQtySold: { 
		title:  '',
		des: '',
		bodyHtml:'',

		primary: {
			text:'Accept',
			class:'button primary',
	        dataDetail:'',
		},

		secondary: {
			text:'Cancel',
			class:'button secondary  button-plain',
	        dataDetail:'',
		},    

		tertiary: {
			text:'',
			class:'button secondary  button-plain',
	        dataDetail:'',
		},      

		start: function(detail){
			this.title     = 'Info'
			//this.des       = 'You want to save the data knowing that one of the selling prices of your item is less than the unit price'
			this.des         = detail.info
			this.primary.dataDetail   = `data-detail='{
	                       				 "click": [ {"dest":"ripple" }, {"dest":"dialog", "act":"hide"} ]}'`
			this.secondary.dataDetail   = `data-detail='{
	                        			 "click": [ {"dest":"ripple" }, {"dest":"dialog", "act":"hide"} ]}'`					
		}

	},
}
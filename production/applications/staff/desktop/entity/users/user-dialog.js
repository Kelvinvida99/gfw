
const dialog    = require ('../../../../../components/dialog/dialog')

export function start( detail ){  console.log('dialog USER detail', detail)

	dialogBody[detail.id].start() 
	
	detail.html =  dialogBody[detail.id]
	dialog.start(detail)


}


const dialogBody = {


	hellow: { 
		title:  '',
		des: ``,
		bodyHtml:``,

		primary: {
			text:'',
			class:'button primary',
	        dataDetail:`data-detail='{
	                        "click": [
	                            {"dest":"ripple" },
	                            {"dest":"dialog", "act":"hide"} ]}'`,
		},

		secondary: {
			text:'',
			class:'button secondary  button-plain',
	        dataDetail:`data-detail='{ "click": [ {"dest":"ripple" },  {"dest":"dialog", "act":"hide"} ]}'`,
		},    

		tertiary: {
			text:'',
			class:'button secondary  button-plain',
	        dataDetail:`data-detail='{  "click": [ {"dest":"ripple" },  {"dest":"dialog", "act":"hide"} ]}'`,
		},      

		start: function(){
			this.title     = 'Warning'
			this.des       = 'Allow access at least to one entity for no admin users.  At the moment all are as "DENY" '
			this.primary.text   = 'Ok'
			this.secondary.text = ''						
			this.tertiary.text  = ''						
		}

	},
	
}



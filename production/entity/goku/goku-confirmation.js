const confirmation = require ('../../components/confirmation/confirmation')

export function start( detail){ 
	 
	 label[detail.id].start()
	
	 detail.html= label[detail.id]	
	 confirmation.start(detail)

}



const label = {

	hellow: { 
		illus:  'illustrations/login.svg',
		rotation: false,
		title:  '',
		des:    ``,
		code:   ``,
		num:    ``,
		helper: '',
		
		button: '', 
		class:'button button-large',//same name as the title loading

        dataDetail:`data-detail='{
                        "click": [
                            {"dest":"ripple" },
                            {"dest":"dialog", "act":"hide"},
                            {"dest":"confirmation",  "act":"hide"}

        ]}'`,

		// dataClick:`data-click='ripple goku'`,
		// dataDetail:`data-detail='{"elem":"confirmation", "id":"hellow", "act":"hide"}'`,

		start: function(){ 
			this.title   =    'Data'  
			this.des     =    `The last time that you were connected to the server is bigger than 24hr.`	
			this.code    =    'codex'	
			this.num     =    'numx'	
			this.helper  =    'helperx'	
			this.button     =    'OK'
		}	
	},	

}



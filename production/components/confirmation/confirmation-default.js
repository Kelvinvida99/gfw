
export function start( detail ){// console.log('confirmation  default', detail)
	 
	 bodyHtml[detail.id].start(detail)
	 return bodyHtml[detail.id]	
}

const bodyHtml = {

	hellow: { 
		illus:  'css/applications/nurse/illustration/punch-in.svg',
		illusClass: 'rotation',
		title:  'hellow',
		des:    `hellow`,
		code:   `hellow`,
		num:    `hellow`,
		helper: 'hellow',
		button: 'hellow', 
		dataDetail:'',

		start: function(inf){ 
			this.title   =    'hellow'  
	        this.dataDetail   =`data-detail='{
	                        			 "click": [{"dest":"confirmation", "act":"hide"}  ]}'`
		}	
	},	



	loading: { 
		illus:  'illustrations/login.svg',
		illusClass: 'rotation',
		title:  '',
		des:    ``,
		code:   ``,
		num:    ``,
		helper: '',
		button: '', 
		buttonClass:'',//same name as the title loading

		start: function(inf){ 
			this.title   =    'Loading'  
		}	
	},	

}



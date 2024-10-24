
const dialog    = require ('../dialog/dialog')

export function start( detail ){ //console.log('dialog MONITOR detail', detail)

	dialogBody[detail.id].start() 
	
	detail.html =  dialogBody[detail.id]
	dialog.start(detail)


}


const dialogBody = {

	restart: { 
		title:  '',
		des: '',

		primary: {
			text:'',
			class:'button primary',
	        dataDetail:`data-detail='{
	                        "click": [
	                            {"dest":"ripple" },
	                            {"dest":"reload" }

	        ]}'`,
		},      //contenct

		secondary: { text:'', class:'', dataDetail:``,  },   
		tertiary:  { text:'', class:'',  dataDetail:``, },   
		
		start: function(){
			this.title     = 'Restart it!'
			this.des       = 'You have force to restart, probably to fix any potential problem'
			this.primary.text   = 'Ok'						
		}

	},

	// logOthersOut: { 
	// 	title:  '',
	// 	des: '',

	// 	primary: {
	// 		text:'',
	// 		class:'button primary',
	//         dataDetail:`data-detail='{
	//                         "click": [
	//                             {"dest":"ripple" },
	//                             {"dest":"reload" }

	//         ]}'`,
	// 	},      //contenct

	// 	secondary: { text:'', class:'', dataDetail:``,  },   
	// 	tertiary:  { text:'', class:'',  dataDetail:``, },   
		
	// 	start: function(){
	// 		this.title     = 'Loggout'
	// 		this.des       = 'You have force to logout, maybe to fix any potential problem'
	// 		this.primary.text   = 'Ok'						
	// 	}

	// },
	
}




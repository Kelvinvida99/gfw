

export function start( detail ){ //console.log('dialog default', detail)

	dialogBody[detail.id].start(detail) 	
	return   dialogBody[detail.id]
}


const dialogBody = {

	deleteElem: { 
	    title:  '', 
	    des:    ``,
		primary:   { text:'Cancel',       class:'button ',             dataDetail:``, }, //contenct
		secondary: { text:`Delete forever!`	, class:'button  button-flat', dataDetail:``, }, //contenct
		tertiary:  { text:'',             class:'',                    dataDetail:``, },  //contenct
		start: function(detail){
			this.title                = `Do you want delete this ${detail.entity}?`
			this.des            	  = `All the information and files asociated will be deleted`
	        this.primary.dataDetail   = `data-detail='{
	                        			 "click": [ {"dest":"ripple" }, {"dest":"dialog", "act":"hide"} ]}'`	
			this.secondary.dataDetail  =`data-detail='{
	                       				 "click": [ {"dest":"ripple" }, {"dest":"dialog", "act":"hide"},
	                                     {"dest":"${detail.dest}", "elem":"fullcont",   "act":"deleteFromDialog",   "entity":"${detail.entity}", "dbid":[${detail.dbid}] } ]}'`
		}/**/
	},

////////////////////////////////////////////////fullcont
	saveChanges: { 
		title:  '',
		des:    `Your changes will be lost if you don't save them`,
		primary:   { text:'Save', class:'button primary', dataDetail:``, },      //contenct
		secondary: { text:`Cancel`	, class:'button secondary  button-plain', dataDetail:``, },      //contenct
		tertiary:  { text:'Discart',   class:'button secondary  button-plain', dataDetail:``,   },      //contenct
		start: function(detail){
			this.title                  = `Do you want save the changes made to the ${detail.entity}?`
			this.primary.dataDetail     =  `data-detail='{
	                       				 "click": [ {"dest":"ripple" }, {"dest":"dialog", "act":"hide"},
	                                     {"dest":"${detail.entity}", "elem":"fullcont",  "id":"${detail.entity}-fullcont", "act":"saveFromDialog"} ]}'`
	        this.secondary.dataDetail   =`data-detail='{
	                        			 "click": [ {"dest":"ripple" }, {"dest":"dialog", "act":"hide"} ]}'`	        
	        this.tertiary.dataDetail    =`data-detail='{
	                        			 "click": [ {"dest":"ripple" }, {"dest":"dialog", "act":"hide"},
	                                     {"dest":"${detail.entity}", "elem":"fullcont", "id":"${detail.entity}-fullcont", "act":"discard"} ]}'`

		}
	},

	saveChangesStepper: { 
		title:  '',
		des:  `Your changes will be lost if you don't save them`,
		primary:   { text:'Savexx',  class:'button primary', dataDetail:` `, },      //contenct
		secondary: { text:`Discart`, class:'button secondary  button-plain',  dataDetail:``, },      //contenct
		tertiary:  { text:'Cancel',  class:'button secondary  button-plain', dataDetail:``, },      //contenct
		start: function(detail){
			this.title                 = `Do you want save the changes made to the ${detail.entity}?`
			this.primary.dataDetail    =  `data-detail='{
	                       				 "click": [ {"dest":"ripple" }, {"dest":"dialog", "act":"hide"},
	                                     {"dest":"${detail.entity}", "elem":"fullcontStepper",  "id":"${detail.entity}-fullcont-withStepper", "act":"saveFromDialog"} ]}'`
	        this.secondary.dataDetail   =`data-detail='{
	                        			 "click": [ {"dest":"ripple" }, {"dest":"dialog", "act":"hide"},
	                                     {"dest":"${detail.entity}", "elem":"fullcontStepper", "id":"${detail.entity}-fullcont-withStepper", "act":"discard"} ]}'`      
	        this.tertiary.dataDetail   =`data-detail='{
	                        			 "click": [ {"dest":"ripple" }, {"dest":"dialog", "act":"hide"}  ]}'`
		}
	},

////////////////////////////////////////////////entity

	entityUpdated: { 
	    title:  '', 
	    des:    ``,
		primary:   { text:'Get Changes', class:'button ',             dataDetail:``, }, //contenct
		secondary: { text:`Ignore`	,    class:'button  button-flat', dataDetail:``, }, //contenct
		tertiary:  { text:'',            class:'',                    dataDetail:``, },  //contenct
 
		start: function(detail){
			this.title                 = `Update recived!`
			this.des            	   = `This element has been updated for anotehr user while you're editing! <br>
										  If you ignored it, the other user changes will be lose`							 
			this.primary.dataDetail    = `data-detail='{
	                       				 "click": [ {"dest":"ripple" }, {"dest":"dialog", "act":"hide"},
	                                     {"dest":"${detail.dest}", "elem":"fullcont", "id":"${detail.dest}-fullcont",  
	                                      "act":"selectOneNoCheck", "entity":"${detail.dest}", "dbid":[${detail.dbid}] } ]}'`
	        this.secondary.dataDetail  = `data-detail='{"click": [ {"dest":"ripple" }, {"dest":"dialog", "act":"hide"} ]}'`	
		}/**/
	},

	entityDeleted: { 
	    title:  '', 
	    des:    ``,
		primary:   { text:'Ok', class:'button ', dataDetail:``, }, //contenct
		secondary: { text:``,   class:'',        dataDetail:``, }, //contenct
		tertiary:  { text:'',   class:'',        dataDetail:``, },  //contenct
		start: function(detail){
			this.title                = `Entity Deleted`
			this.des            	  = `This entity has been deleted by another user`
			this.primary.dataDetail   = `data-detail='{ "click": [ 
										 {"dest":"ripple" }, 
										 {"dest":"dialog",   "act":"hide" },
										 {"dest":"fullcont", "act":"hide", "id":"${detail.entity}-fullcont" } ]}'`
		}/**/
	},

	entityDeleted2: { 
	    title:  '', 
	    des:    ``,
		primary:   { text:'Ok', class:'button ', dataDetail:``, }, //contenct
		secondary: { text:``,   class:'',        dataDetail:``, }, //contenct
		tertiary:  { text:'',   class:'',        dataDetail:``, },  //contenct
		start: function(detail){
			this.title                = `Entity Deleted`
			this.des            	  = `This entity has been deleted by another user.
										 Please check your Websocket`
			this.primary.dataDetail   = `data-detail='{ "click": [ 
										 {"dest":"ripple" }, 
										 {"dest":"dialog",   "act":"hide" } ]}'`
		}/**/
	},


	detaultTest: { 
		title:  '',
		des:    ``,
		primary:   { text:'Hide', class:'button primary',                 dataDetail:``, },      //contenct
		secondary: { text:`Hide`, class:'button secondary  button-plain', dataDetail:``, },      //contenct
		tertiary:  { text:'',     class:'button secondary  button-plain', dataDetail:``, },      //contenct
		start: function(detail){
			this.title                = `Diago Default Text?`
			this.des                  = `Your changes will be lost if you don't save them`,
			this.primary.dataDetail   =  `data-detail='{
	                       				 "click": [ {"dest":"ripple" }, {"dest":"dialog", "act":"hide"} ]}'`
	        this.secondary.dataDetail =`data-detail='{
	                        			 "click": [ {"dest":"ripple" }, {"dest":"dialog", "act":"hide"}  ]}'`
	        this.tertiary.dataDetail  =`data-detail='{
	                        			 "click": [ {"dest":"ripple" }, {"dest":"dialog", "act":"hide"}  ]}'`
		}
	},
	
}




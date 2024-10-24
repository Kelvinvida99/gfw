
/*
form is where we have all the details for all the inputs
for the entity  forms
each entity has their own form
*/
export const form   =  [

	{	
		name: "name", 
		value:'', 		
		id:'areas_form_name',
		html:'',
		type:'textfield',
		required: true,  
	},
	{	
		name: "bay", 
		value:'', 		
		id:'areas_form_bay',
		html:'',
		type:'textfield',
		required: false,  
	},
	{	
		name: "level", 
		value:'', 		
		id:'areas_form_level',
		html:'',
		type:'textfield',
		required: false,  
	},
	{	
		name: "space", 
		value:'', 		
		id:'areas_form_space',
		html:'',
		type:'textfield',
		required: false,  
	},
	{	
		name: "notes", 
		value:'', 		
		id:'areas_form_notes',
		html:'',
		type:'textfield',
		required: false,  
	}
]



//we use this for check changes on form	
export const formCopy = JSON.parse(JSON.stringify(form)) 


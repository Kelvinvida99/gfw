
/*
form is where we have all the details for all the inputs
for the entity  forms
each entity has their own form
*/
export const form   =  [
	{	
		name: "code", 
		value:'', 		
		id:'item_form_code',
		html:'',
		type:'textfield',
		required: false, 
	},

	{	
		name: "name", 
		value:'', 		
		id:'item_form_name',
		html:'',
		type:'textfield',
		required: true,  
	},
	{	
		name: "brand", 
		value:'', 		
		id:'item_form_brand',
		html:'',
		type:'textfield',
		required: false,   
	},

	{	
		name: "origin_country", 
		value:'', 		
		id:'item_form_origin_country',
		html:'',
		type:'textfield',
		required: false,  
	},
	{	
		name: "shelf_life", 
		value:'', 		
		id:'item_form_shelf_life',
		html:'',
		type:'textfield',
		required: false, 
	},
	{	
		name: "temperature", 
		value:'', 		
		id:'item_form_temperature',
		html:'',
		type:'multiselect',
		options :[{value:'room temperature', text:'Room temperature'}, {value:'refrigeration', text:'Refrigeration'},
				  {value:'freezing', text:'Freezing'}], 
		required: false, 
	},

	{	
		name: "notes", 
		value:'', 		
		id:'item_form_notes',
		html:'',
		type:'textfield',
		required: false,  
	}
]



//we use this for check changes on form	
export const formCopy = JSON.parse(JSON.stringify(form)) 


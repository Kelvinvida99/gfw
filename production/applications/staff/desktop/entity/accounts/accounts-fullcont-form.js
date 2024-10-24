
/*
form is where we have all the details for all the inputs
for the entity  forms
each entity has their own form
*/
export const form   =  [

	{	
		name: "name", 
		value:'', 		
		id:'accounts_form_name',
		html:'',
		type:'textfield',
		required: true,  
	},
	{	
		name: "type", 
		value:'', 		
		id:'accounts_form_type',
		html:'',
		type:'multiselect',
		options :["asset", "liabilitie", "equity", "revenue", "expense", "expense-COGS" ,"bank" ],
		required: true,  
	},
	{	
		name: "code", 
		value:'', 		
		id:'accounts_form_code',
		html:'',
		type:'textfield',
		required: false,  
	},
	{	
		name: "description", 
		value:'', 		
		id:'accounts_form_description',
		html:'',
		type:'textfield',
		required: false,  
	},
	// {	
	// 	name: "registered_date", 
	// 	value:'0000-00-00',
	// 	date: true, 		
	// 	id:'accounts_form_date',
	// 	html:'',
	// 	type:'textfield',
	// 	required: false,  
	// },
]



//we use this for check changes on form	
export const formCopy = JSON.parse(JSON.stringify(form)) 


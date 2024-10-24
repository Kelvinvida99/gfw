/*
form is where we have all the details for all the inputs
for the entity  forms
each entity has their own form
*/
export const form   =  [
	// {	
	// 	name: "code", 
	// 	value:'', 		
	// 	id:'sentpayment_form_code',
	// 	html:'',
	// 	type:'textfield',
	// 	required: false, 
	// }, 
	{	
		name: "provider_id", 
		value:[], 	//just the id	
		valueFull:'',
		id:'sentpayment_form_provider_id',
		html:'',
		type:'autocomplete',
		required: true,  
	},
	{	
		name: "date", 
		value:'0000-00-00',
		date: true, 		
		id:'sentpayment_form_date',
		html:'',
		type:'textfield',
		required: true,  
	},
	{	
		name: "accounts_id", 
		value:[], 	//just the id	
		valueFull:'',
		id:'sentpayment_form_accounts_id',
		html:'',
		type:'autocomplete',
		required: true,  
	},
	{	
		name: "amount", 
		value:'', 		
		id:'sentpayment_form_amount',
		html:'',
		type:'textfield',
		required: true, 
	},
	{	
		name: "reference_number", 
		value:'', 		
		id:'sentpayment_form_reference',
		html:'',
		type:'textfield',
		required: false, 
	},
	{	
		name: "notes", 
		value:'', 		
		id:'sentpayment_form_notes',
		html:'',
		type:'textfield',
		required: false, 
	},
]

//we use this for check changes on form	
export const formCopy = JSON.parse(JSON.stringify(form))
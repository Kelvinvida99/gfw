
/*
form is where we have all the details for all the inputs
for the entity  forms
each entity has their own form
*/
export const form   =  [
	{	
		name: "code", 
		value:'', 		
		id:'otherexpense_form_code',
		html:'',
		type:'textfield',
		required: false, 
	}, 
	{	
		name: "provider_id", 
		value:[], 	//just the id	
		valueFull:'',
		id:'otherexpense_form_provider_id',
		html:'',
		type:'autocomplete',
		required: false,  
	},
	{	
		name: "date", 
		value:'0000-00-00',
		date: true, 		
		id:'otherexpense_form_date',
		html:'',
		type:'textfield',
		required: true,  
	},
	{	
		name: "accounts_bank_id", 
		value:[], 	//just the id	
		valueFull:'',
		id:'otherexpense_form_accounts_bank_id',
		html:'',
		type:'autocomplete',
		required: true,  
	},
	{	
		name: "accounts_expense_id", 
		value:[], 	//just the id	
		valueFull:'',
		id:'otherexpense_form_accounts_expense_id',
		html:'',
		type:'autocomplete',
		required: true,  
	},
	{	
		name: "amount", 
		value:'', 		
		id:'otherexpense_form_amount',
		html:'',
		type:'textfield',
		required: true, 
	},
	{	
		name: "reference_number", 
		value:'', 		
		id:'otherexpenses_form_reference_number',
		html:'',
		type:'textfield',
		required: false, 
	},
	{	
		name: "notes", 
		value:'', 		
		id:'otherexpenses_form_notes',
		html:'',
		type:'textfield',
		required: false, 
	},
]



//we use this for check changes on form	
export const formCopy = JSON.parse(JSON.stringify(form)) 



/*
form is where we have all the details for all the inputs
for the entity  forms
each entity has their own form
*/
export const form   =  [

	{	
		name: "code", 
		value:'', 		
		id:'employesspayment_form_code',
		html:'',
		type:'textfield',
		required: false,  
	},
	{	
		name: "account_id", 
		value:[],
		valueFull:'', 		
		id:'employesspayment_form_account_id',
		html:'',
		type:'autocomplete',
		required: true,  
	},
	{	
		name: "employee", 
		value:[],
		valueFull:'', 		
		id:'employesspayment_form_employeer',
		html:'',
		type:'autocomplete',
		required: true,  
	},
	{	
		name: "amount", 
		value:'', 		
		id:'employesspayment_form_amount',
		html:'',
		type:'textfield',
		required: true,  
	},
	{	
		name: "date", 
		value:'0000-00-00',
		date: true,	
		id:'employesspayment_form_date',
		html:'',
		type:'textfield',
		required: false,  
	},
	{	
		name: "reference_number", 
		value:'', 		
		id:'employesspayment_form_reference_number',
		html:'',
		type:'textfield',
		required: false,  
	}, 
	{	
		name: "notes", 
		value:'', 		
		id:'employesspayment_form_notes',
		html:'',
		type:'textfield',
		required: false,  
	}

]

//we use this for check changes on form	
export const formCopy = JSON.parse(JSON.stringify(form)) 
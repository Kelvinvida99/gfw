
/*
form is where we have all the details for all the inputs
for the entity  forms
each entity has their own form
*/
export const form   =  [
	{	
		name: "code", 
		value:'', 		
		id:'investordeposit_form_code',
		html:'',
		type:'textfield',
		required: false, 
	}, 
	{	
		name: "investor_id", 
		value:[], 	//just the id	
		valueFull:'',
		id:'investordeposit_form_investor_id',
		html:'',
		type:'autocomplete',
		required: true,  
	},
	{	
		name: "status", 
		value:'', 		
		id:'investordeposit_form_status',
		html:'',
		type:'multiselect',
		options :[{value:'Pending', text:'Pending'}, {value:'Received', text:'Received'}], 
		required: false, 
	},
	{	
		name: "date", 
		value:'0000-00-00',
		date: true, 		
		id:'investordeposit_form_sale_date',
		html:'',
		type:'textfield',
		required: true,  
	},
	{	
		name: "accounts_id", 
		value:[], 	//just the id	
		valueFull:'',
		id:'investordeposit_form_accounts_id',
		html:'',
		type:'autocomplete',
		required: true,  
	},
	{	
		name: "amount", 
		value:'', 		
		id:'investordeposit_form_amount',
		html:'',
		type:'textfield',
		required: false, 
	}, 
	{	
		name: "type", 
		value:'', 		
		id:'investordeposit_form_type',
		html:'',
		type:'multiselect',
		options :[{value:'Equity', text:'Equity'}, 
				  {value:'Investment', text:'Investment'}], 
		required: false, 
	},
]



//we use this for check changes on form	
export const formCopy = JSON.parse(JSON.stringify(form)) 


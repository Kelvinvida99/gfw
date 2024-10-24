
/*
form is where we have all the details for all the inputs
for the entity  forms
each entity has their own form
*/
export const form   =  [
 
	{	
		name: "code", 
		value:'', 		
		id:'purchase_form_code',
		html:'',
		type:'textfield',
		required: false,  
	},
	{	
		name: "provider_id", 
		value:[],
		valueFull:'', 		
		id:'purchase_form_provider_id',
		html:'',
		type:'autocomplete',
		required: true,  
	},
	// {	
	// 	name: "fill_bill_date", 
	// 	value:'',
	// 	id:'purchase_fill_bill_date',
	// 	html:'',
	// 	type:'checkbox',
	// 	required: false,  
	// },
	{	
		name: "shipping", 
		value:'', 		
		id:'purchase_form_shipping',
		html:'',
		type:'multiselect',
		options :["ordered", "shipped", "delivered"],
		required: false,  
	},
	{	
		name: "check_mail", 
		value:'',
		id:'purchase_send_email',
		html:'',
		type:'checkbox',
		required: false,  
	},
	{	
		name: "reference_number", 
		value:'', 		
		id:'purchase_form_reference_number',
		html:'',
		type:'textfield',
		required: false,  
	},
	{	
		name: "provider_email", 
		value:'',
		id:'purchase_form_email',
		html:'',
		type:'textfield',
		required: false,  
	},

	// /*{	
	// 	name: "price", 
	// 	value:'',
	// 	id:'purchase_form_price',
	// 	html:'',
	// 	type:'textfield',
	// 	required: false,  
	// },*/
	
	

	{	
		name: "purchase_date", 
		value:'0000-00-00',
		date: true,		
		id:'purchase_form_date',
		html:'',
		type:'textfield',
		required: false,  
	},
	{	
		name: "due_date", 
		value:'0000-00-00',
		date: true,	
		id:'purchase_form_due_date',
		html:'',
		type:'textfield',
		required: false,  
	},
	{	
		name: "bill_date", 
		value:'0000-00-00',
		date: true,	
		id:'purchase_form_bill_date',
		html:'',
		type:'textfield',
		required: false,  
	},
	// {	
	// 	name: "creation_date", 
	// 	value:'0000-00-00',
	// 	date: true,	
	// 	id:'purchase_form_creation_date',
	// 	html:'',
	// 	type:'textfield',
	// 	required: false,  
	// },
	{	
		name: "delivered_date", 
		value:'0000-00-00',
		date: true,	
		id:'purchase_form_delivered_date',
		html:'',
		type:'textfield',
		required: false,  
	},
	// {	
	// 	name: "fill_bill_date", 
	// 	value:'',
	// 	id:'purchase_fill_bill_date',
	// 	html:'',
	// 	type:'checkbox',
	// 	required: false,  
	// },
	
	// /*{	
	// 	name: "investment", 
	// 	value:'', 		
	// 	id:'purchase_form_investment',
	// 	html:'',
	// 	type:'multiselect',
	// 	options :["no investor", "comming soon", "available", "close"],
	// 	required: false,  
	// },
	// {	
	// 	name: "revenue", 
	// 	value:'', 		
	// 	id:'purchase_form_revenue',
	// 	html:'',
	// 	type:'textfield',
	// 	required: false,  
	// },
	// {	
	// 	name: "status", 
	// 	value:'', 		
	// 	id:'purchase_form_status',
	// 	html:'',
	// 	type:'multiselect',
	// 	options :["release money", "money invested"],
	// 	required: false,  
	// },
	// {	
	// 	name: "earning", 
	// 	value:'', 		
	// 	id:'purchase_form_earning',
	// 	html:'',
	// 	type:'textfield',
	// 	required: false,  
	// },
	// {	
	// 	name: "min_amount", 
	// 	value:'', 		
	// 	id:'purchase_form_min_amount',
	// 	html:'',
	// 	type:'textfield',
	// 	required: false,  
	// },*/
	{	
		name: "general_total_expenses", 
		value:'', 		
		id:'purchase_general_total_expenses',
		html:'',
		type:'textfield',
		required: false,  
	},
	{	
		name: "general_total_price", 
		value:'', 		
		id:'purchase_general_total_price',
		html:'',
		type:'textfield',
		required: false,  
	},
	{	
		name: "general_total_selling_price", 
		value:'', 		
		id:'purchase_general_total_selling_price',
		html:'',
		type:'textfield',
		required: false,  
	},
	{	
		name: "notes", 
		value:'', 		
		id:'purchase_form_notes',
		html:'',
		type:'textfield',
		required: false,  
	},
	
	{	
		name: "purchase_statement", 
		value:'', 		
		id:'purchase_form_purchase_statement',
		html:'',
		type:'textfield',
		required: false,  
	},
	{	
		name: "purchase_footer", 
		value:'', 		
		id:'purchase_form_purchase_footer',
		html:'',
		type:'textfield',
		required: false,  
	},
]



//we use this for check changes on form	
export const formCopy = JSON.parse(JSON.stringify(form)) 


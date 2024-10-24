
/*
form is where we have all the details for all the inputs
for the entity  forms
each entity has their own form
*/
export const form   =  [
	{	
	   name: "code", 
	   value:'', 		
	   id:'investor_form_code',
	   html:'',
	   type:'textfield',
	   required: false, 
    },
	{	
	 	name: "name", 
		value:'', 		
		id:'investor_form_name',
		html:'',
		type:'textfield',
		required: true, 
	},
	 {	
		name: "contact", 
		value:'', 		
		id:'investor_form_contact',
		html:'',
		type:'textfield',
		required: false, 
	}, 
	{	
		name: "__tax_id", 
		value:'', 		
		id:'investor_form_tax_id',
		html:'',
		type:'textfield',
		required: false, 
	},
	{	
		name: "address", 
		value:'', 
		id:'investor_form_address',
		html:'',
		type:'textfield',
		required: false,  
	},

	{	
		name: "city", 
		value:'', 
		id:'investor_form_city',
		html:'',
		type:'textfield',
		required: false,  
	},

	{	
		name: "state", 
		value:'', 
		id:'investor_form_state',
		html:'',
		type:'textfield',
		required: false,  
	},

	{	
		name: "zip", 
		value:'', 
		id:'investor_form_zip',
		html:'',
		type:'textfield',
		required: false,  
	},

	{	
		name: "allow_phone_app", 
		value:'', 		
		id:'investor_form_allow_phone_app',
		html:'',
		type:'checkbox',
		required: false, 
	},
	{	
		name: "username", 
		value:'', 
		id:'investor_form_username',
		html:'',
		type:'textfield',
		required: false,  
	},

	{	
		name: "__password", 
		value:'', 		
		id:'investor_form___password',
		html:'',
		type:'textfield',
		required: false, 
	},
]



//we use this for check changes on form	
export const formCopy = JSON.parse(JSON.stringify(form)) 


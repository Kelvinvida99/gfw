
/*
form is where we have all the details for all the inputs
for the entity  forms
each entity has their own form
*/
export const form   =  [
	{	
	   name: "code", 
	   value:'', 		
	   id:'shipper_form_code',
	   html:'',
	   type:'textfield',
	   required: false, 
   },
	{	
	 	name: "name", 
		value:'', 		
		id:'shipper_form_name',
		html:'',
		type:'textfield',
		required: false, 
	},
	 {	
		name: "email", 
		value:'', 		
		id:'shipper_form_email',
		html:'',
		type:'textfield',
		required: false, 
	}, 
	{	
		name: "phone", 
		value:'', 		
		id:'shipper_form_phone',
		html:'',
		type:'textfield',
		required: false, 
	},


	{	
		name: "bg", 
		value:'', 
		id:'shipper_form_bg',
		html:'',
		type:'textfield',
		required: false,  
	},
 	{	
		name: "type", 
		value:'', 		
		id:'shipper_form_type',
		html:'',
		type:'textfield',
		required: false, 
	},
	{	
		name: "tax_id", 
		value:'', 		
		id:'shipper_form_tax',
		html:'',
		type:'textfield',
		required: false, 
	},
	{	
		name: "pay_stub_msg", 
		value:'', 		
		id:'shipper_form_pay',
		html:'',
		type:'textfield',
		required: false, 
	},


	{	
		name: "app_language", 
		value:'', 
		id:'shipper_form_app_language',
		html:'',
		type:'textfield',
		required: false,  
	},
	{		
		name: "languages", 
		value:'', 
		id:'shipper_form_languages',
		html:'',
		type:'textfield',
		required: false,  
	},
	{	
		name: "allow_phone_app", 
		value:'', 		
		id:'shipper_form_allow_phone_app',
		html:'',
		type:'textfield',
		required: false, 
	},
	{	
		name: "sex", 
		value:'', 
		id:'shipper_form_sex',
		html:'',
		type:'radio',
		required: false,  
	},



	{	
		name: "address", 
		value:'', 		
		id:'shipper_form_address',
		html:'',
		type:'textfield',
		required: false, 
	}, 
	{	
		name: "city", 
		value:'', 		
		id:'shipper_form_city',
		html:'',
		type:'textfield',
		required: false, 
	}, 
	{	
		name: "state", 
		value:'', 		
		id:'shipper_form_state',
		html:'',
		type:'textfield',
		required: false, 
	}, 
	{	
		name: "zip", 
		value:'', 		
		id:'shipper_form_zip',
		html:'',
		type:'textfield',
		required: false, 
	}, 

	 

	{	
		name: "description", 
		value:'', 
		id:'shipper_form_description',
		html:'',
		type:'textfield',
		required: false,  
	},
]



//we use this for check changes on form	
export const formCopy = JSON.parse(JSON.stringify(form)) 


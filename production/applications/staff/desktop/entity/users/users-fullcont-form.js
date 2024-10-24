/*
form is where we have all the details for all the inputs
for the entity  forms
each entity has their own form
*/

const {states} = require ('../../../../../js-handler/library/states') 

export const form   =  [
	{	//orange, don't move this from here, used by user-fullcont>hide function
		name: "privilege", 
		value:'', 		
		id:'users_form_privilege',
		html:'',
		type:'multiselect',
		options :["user", "admin", ], 
		required: true, 
	}, 

	{	
		name: "code", 
		value:'', 		
		id:'users_form_code',
		html:'',
		type:'textfield',
		required: false,  
	},
	{	
		name: "__name", 
		value:'', 		
		id:'users_form___name',
		html:'',
		type:'textfield',
		required: false,  
	}, 
	{	
		name: "last_name", 
		value:'', 		
		id:'users_form_last_name',
		html:'',
		type:'textfield',
		required: false,  
	}, 
	{	
		name: "dob", 
		value:'0000-00-00',
		date: true,		
		id:'users_form_dob',
		html:'',
		type:'textfield',
		required: false, 
	},
	

	{	
		name: "email", 
		value:'', 		
		id:'users_form_email',
		html:'',
		type:'textfield',
		required: false, 
	}, 
	{	
		name: "phone", 
		value:'', 		
		id:'users_form_phone',
		html:'',
		type:'textfield',
		required: false, 
	},


	{	
		name: "address", 
		value:'', 		
		id:'users_form_address',
		html:'',
		type:'textfield',
		required: false, 
	}, 
	{	
		name: "apt", 
		value:'', 		
		id:'users_form_apt',
		html:'',
		type:'textfield',
		required: false, 
	}, 
	{	
		name: "city", 
		value:'', 		
		id:'users_form_city',
		html:'',
		type:'textfield',
		required: false, 
	}, 
	{	
		name: "state", 
		value:'', 		
		id:'users_form_state',
		html:'',
		type:'multiselect',
		options: states,
		required: false, 
	}, 
	{	
		name: "zip", 
		value:'', 		
		id:'users_form_zip',
		html:'',
		type:'textfield',
		required: false, 
	}, 

	{	
	 	name: "username", 
		value:'', 		
		id:'users_form_username',
		html:'',
		type:'textfieldValidator',
		required: true, 
	}, 
	{	
	 	name: "__password", 
		value:'', 		
		id:'users_form_password',
		html:'',
		type:'textfieldValidator',
		required: false, 
	}, 	
	{	
		name: "active", 
		value:'', 		
		id:'users_form_active',
		html:'',
		type:'checkbox',
		required: false, 
	}, 		

]

//we use this for check changes on form	
export const formCopy = JSON.parse(JSON.stringify(form)) 
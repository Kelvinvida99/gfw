
/*
form is where we have all the details for all the inputs
for the entity  forms
each entity has their own form
*/
const {states} = require ('../../../../../js-handler/library/states') 

export const form   =  [
	 
//info
	{	
	 	name: "name", 
		value:'', 		
		id:'customer_form_name',
		html:'',
		type:'textfield',
		required: true, 
	},
	{	
		name: "contact", 
		value: '', 
		id:'customer_form_contact',
		html:'',
		type:'textfield',
		required: false,  
	},
	{	
		name: "email", 
		value:'', 		
		id:'customer_form_email',
		html:'',
		type:'textfield',
		required: false, 
	}, 
	{	
		name: "phone", 
		value:'', 		
		id:'customer_form_phone',
		html:'',
		type:'textfield',
		required: false, 
	},

	{	
		name: "other_phone", 
		value:'', 		
		id:'customer_form_phone_two',
		html:'',
		type:'textfield',
		required: false, 
	},

	{	
		name: "fax", 
		value:'', 		
		id:'customer_form_fax',
		html:'',
		type:'textfield',
		required: false, 
	},
//bill
	{	
		name: "bill_to_address", 
		value:'', 		
		id:'customer_form_bill_to_address',
		html:'',
		type:'textfield',
		required: false, 
	}, 
	{	
		name: "bill_to_apt", 
		value:'', 		
		id:'customer_form_bill_to_apt',
		html:'',
		type:'textfield',
		required: false, 
	}, 
	{	
		name: "bill_to_city", 
		value:'', 		
		id:'customer_form_bill_to_city',
		html:'',
		type:'textfield',
		required: false, 
	}, 
	{	
		name: "bill_to_state", 
		value:'', 		
		id:'customer_form_bill_to_state',
		html:'',
		type:'multiselect',
		options: states,
		required: false, 
	}, 
	{	
		name: "bill_to_zip", 
		value:'', 		
		id:'customer_form_bill_to_zip',
		html:'',
		type:'textfield',
		required: false, 
	}, 
// ship
	{	
		name: "ship_to_address", 
		value:'', 		
		id:'customer_form_ship_to_address',
		html:'',
		type:'textfield',
		required: false, 
	}, 
	{	
		name: "ship_to_apt", 
		value:'', 		
		id:'customer_form_ship_to_apt',
		html:'',
		type:'textfield',
		required: false, 
	}, 
	{	
		name: "ship_to_city", 
		value:'', 		
		id:'customer_form_ship_to_city',
		html:'',
		type:'textfield',
		required: false, 
	},
	{
		name: "ship_to_state", 
		value:'', 		
		id:'customer_form_ship_to_state',
		html:'',
		type:'multiselect',
		options: states,
		required: false, 
	},
	{	
		name: "ship_to_zip", 
		value:'', 		
		id:'customer_form_ship_to_zip',
		html:'',
		type:'textfield',
		required: false, 
	},

	{	
		name: "check_shipping_address", 
		value:'', 		
		id:'customer_form_check_shipping_address',
		html:'',
		type:'checkbox',
		required: false, 
	},
	
	{	
		name: "description", 
		value:'', 
		id:'customer_form_description',
		html:'',
		type:'textfield',
		required: false,  
	},
	{	
		name: "credit_hold", 
		value:'', 		
		id:'customer_form_credit_hold',
		html:'',
		type:'checkbox',
		required: false, 
	},

]

console.log(form)

//we use this for check changes on form	
export const formCopy = JSON.parse(JSON.stringify(form)) 


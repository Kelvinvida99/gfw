
/*
form is where we have all the details for all the inputs
for the entity  forms
each entity has their own form
*/
const {states} = require ('../../../../../js-handler/library/states') 

export const form   =  [
	{	
		name: "code", 
		value:'', 		
		id:'provider_form_code',
		html:'',
		type:'textfield',
		required: false, 
	 },
	{	
	 	name: "name", 
		value:'', 		
		id:'provider_form_name',
		html:'',
		type:'textfield',
		required: true, 
	},
	{	
		name: "contact", 
		value:'', 		
		id:'provider_form_contact',
		html:'',
		type:'textfield',
		required: false, 
	}, 
	{	
		name: "type", 
		value:'', 		
		id:'provider_form_type',
		html:'',
		type:'multiselect',
		options :[{value:'Inventory', text:'Inventory'}, {value:'Freight', text:'Freight'},
				  {value:'Service', text:'Service'}], 
		required: false, 
	},
	{	
		name: "phone", 
		value:'', 		
		id:'provider_form_phone',
		html:'',
		type:'textfield',
		required: false, 
	},
	{	
		name: "phone2", 
		value:'', 		
		id:'provider_form_phone2',
		html:'',
		type:'textfield',
		required: false, 
	},
	{	
		name: "fax", 
		value:'', 		
		id:'provider_form_fax',
		html:'',
		type:'textfield',
		required: false, 
	},
	{	
		name: "email", 
		value:'', 		
		id:'provider_form_email',
		html:'',
		type:'textfield',
		required: false, 
	}, 
	{	
		name: "bill_to_address", 
		value:'', 
		id:'provider_form_bill_to_address',
		html:'',
		type:'textfield',
		required: false,  
	},
	{	
		name: "bill_to_apt", 
		value:'', 
		id:'provider_form_bill_to_apt',
		html:'',
		type:'textfield',
		required: false,  
	},
	{	
		name: "bill_to_city", 
		value:'', 		
		id:'provider_form_bill_to_city',
		html:'',
		type:'textfield',
		required: false, 
	}, 
	{   name: "bill_to_state", 
	    value:'', 		
	    id:'provider_form_bill_to_state',
	    html:'',
	    type:'multiselect',
	    options : states, 
	    required: false, 
	},
	{	
		name: "bill_to_zip", 
		value:'', 		
		id:'provider_form_bill_to_zip',
		html:'',
		type:'textfield',
		required: false, 
	}, 
	{	
		name: "ship_to_address", 
		value:'', 
		id:'provider_form_ship_to_address',
		html:'',
		type:'textfield',
		required: false,  
	},
	{	
		name: "ship_to_apt", 
		value:'', 
		id:'provider_form_ship_to_apt',
		html:'',
		type:'textfield',
		required: false,  
	},
	{	
		name: "ship_to_city", 
		value:'', 		
		id:'provider_form_ship_to_city',
		html:'',
		type:'textfield',
		required: false, 
	}, 
	{  name: "ship_to_state", 
	   value:'', 		
	   id:'provider_form_ship_to_state',
	   html:'',
	   type:'multiselect',
	   options : states, 
	   required: false, 
	},
	{	
		name: "ship_to_zip", 
		value:'', 		
		id:'provider_form_ship_to_zip',
		html:'',
		type:'textfield',
		required: false, 
	}, 
	{	
		name: "notes", 
		value:'', 
		id:'provider_form_notes',
		html:'',
		type:'textfield',
		required: false,  
	},
]



//we use this for check changes on form	
export const formCopy = JSON.parse(JSON.stringify(form)) 

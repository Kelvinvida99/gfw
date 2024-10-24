

const {states} = require ('../../../../../js-handler/library/states')

export const form   =  [

	// company info

	 {  name: "company_name", 
		value:'', 		
		id:'company_form_company_name',
		html:'',
		type:'textfield',
		required: false,   }, 	

	 {	name: "phone", 
		value:'', 		
		id:'company_form_phone',
		html:'',
		type:'textfield',
		required: false, }, 	

	 {	name: "phone2", 
		value:'', 		
		id:'company_form_phone2',
		html:'',
		type:'textfield',
		required: false, }, 
		
	{	name: "contact", 
		value:'', 		
		id:'company_form_contact',
		html:'',
		type:'textfield',
		required: false, }, 

	 {	name: "fax", 
		value:'', 		
		id:'company_form_fax',
		html:'',
		type:'textfield',
		required: false, }, 

	 {	name: "email", 
		value:'', 		
		id:'company_form_email',
		html:'',
		type:'textfield',
		required: false, }, 	

	// bill

	{	name: "bill_to_address", 
		value:'', 		
		id:'company_form_bill_to_address',
		html:'',
		type:'textfield',
		required: false,            }, 

	{	name: "bill_to_apt", 
		value:'', 		
		id:'company_form_bill_to_apt',
		html:'',
		type:'textfield',
		required: false,            }, 	

	 {	name: "bill_to_city", 
		value:'', 		
		id:'company_form_bill_to_city',
		html:'',
		type:'textfield',
		required: false,            }, 

	 {  name: "bill_to_state", 
		value:'', 		
		id:'company_form_bill_to_state',
		html:'',
		type:'multiselect',
		options : states, 
		required: false,           },

	 {	name: "bill_to_zip", 
		value:'', 		
		id:'company_form_bill_to_zip',
		html:'',
		type:'textfield',
		required: false,            }, 

	// ship

	{	name: "ship_to_address", 
		value:'', 		
		id:'company_form_ship_to_address',
		html:'',
		type:'textfield',
		required: false,            }, 

	{	name: "ship_to_apt", 
		value:'', 		
		id:'company_form_ship_to_apt',
		html:'',
		type:'textfield',
		required: false,            }, 	

	 {	name: "ship_to_city", 
		value:'', 		
		id:'company_form_ship_to_city',
		html:'',
		type:'textfield',
		required: false,            }, 

	 {  name: "ship_to_state", 
		value:'', 		
		id:'company_form_ship_to_state',
		html:'',
		type:'multiselect',
		options : states, 
		required: false,           },

	 {	name: "ship_to_zip", 
		value:'', 		
		id:'company_form_ship_to_zip',
		html:'',
		type:'textfield',
		required: false,            }, 

	// statements

	{	name: "purchase_statement", 
		value:'', 		
		id:'company_form_purchase_statement',
		html:'',
		type:'textfield',
		required: false,            }, 
	
	{	name: "purchase_footer", 
		value:'', 		
		id:'company_form_purchase_footer',
		html:'',
		type:'textfield',
		required: false,            }, 

	{	name: "sale_statement", 
		value:'', 		
		id:'company_form_sale_statement',
		html:'',
		type:'textfield',
		required: false,            }, 
	
	{	name: "sale_footer", 
		value:'', 		
		id:'company_form_sale_footer',
		html:'',
		type:'textfield',
		required: false,            }, 

	{	name: "good_bye_msg", 
		value:'', 		
		id:'company_form_good_bye_msg',
		html:'',
		type:'textfield',
		required: false,            }, 

	// shelft life
		
	{	name: "default_shelf_life", 
		value:'', 		
		id:'company_form_default_shelf_life',
		html:'',
		type:'textfield',
		required: false,            }, 

	
	{	name: "alert_shelf_life", 
		value:'', 		
		id:'company_form_alert_shelf_life',
		html:'',
		type:'textfield',
		required: false,            }, 

	// purchase

	{	name: "allow_to_sell_from_ordered", 
		value:'', 		
		id:'company_form_allow_to_sell_from_ordered',
		html:'',
		type:'checkbox',
		required: false,            }, 

	{	name: "allow_to_sell_from_shipped", 
		value:'', 		
		id:'company_form_allow_to_sell_from_shipped',
		html:'',
		type:'checkbox',
		required: false,            }, 
	
	{	name: "grace_period", 
		value:'', 		
		id:'company_form_grace_period',
		html:'',
		type:'textfield',
		required: false,            }, 
	
	{	name: "twilio_service_number", 
		value:'', 		
		id:'company_form_twilio_service_number',
		html:'',
		type:'textfield',
		required: false,            
	}, 
	{	name: "twilio_service_token", 
		value:'', 		
		id:'company_form_twilio_service_token',
		html:'',
		type:'textfield',
		required: false,            
	}, 
	{	name: "twilio_service_uid", 
		value:'', 		
		id:'company_form_twilio_service_uid',
		html:'',
		type:'textfield',
		required: false,            
	}, 
	{	name: "twilio_service_is_active", 
		value:'', 		
		id:'company_form__send_sms_service',
		html:'',
		type:'checkbox',
		required: false,            
	}, 
]



//we use this for check changes on form	
export const formCopy = JSON.parse(JSON.stringify(form)) 


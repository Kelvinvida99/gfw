

export const form   =  [

	 {	
		name: "name", 
		value:'', 		
		id:'goku_form_stepper_name',
		html:'',
		type:'textfield',
		required: true,  
		pageIndex: 1
	}, 	
	

	 {	
		name: "gender", 
		value:'', 		
		id:'goku_form_stepper_gender',
		html:'',
		type:'radio',
		required: false, 
		pageIndex: 1
	}, 	

	 {	
		name: "getAlerts", 
		value:'', 
		id:'goku_form_stepper_getAlerts',
		html:'',
		type:'checkbox',
		required: false, 
		pageIndex: 1
	}, 	


	 {	
		name: "car", 
		value:'', 		
		id:'goku_form_stepper_car',
		html:'',
		type:'multiselect',
		options :["Saab", "Opel", "audi", "toyota", "mercedes"], 
		required: false,
		pageIndex: 1
	}, 

	 {	
		name: "email", 
		value:'', 		
		id:'goku_form_stepper_email',
		html:'',
		type:'textfield-validator',
		required: false,  
		pageIndex: 1
	}, 	

	 {	
		name: "signature", 
		value:[], //don't forget this on signature	
		id:'goku_form_stepper_signatureTest',
		html:'',
		type:'signature',
		title: 'Default title',
		required: false,
		pageIndex: 1

	 }, 

	 {	
		name: "map", 
		value:'', 
		id:'goku_form_stepper_map',
		html:'',
		type:'map',
		title: 'Map title',
		pin: 'pin',
		required: false,
		pageIndex: 1
	  }, 
		
]
	

//we use this for check changes on form	
export const formCopy = JSON.parse(JSON.stringify(form)) 
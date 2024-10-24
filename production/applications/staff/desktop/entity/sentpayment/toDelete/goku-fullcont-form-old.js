
/*

form is where we have all the details for all the inputs
for the entity  forms
each entity has their own form
*/
export const form   =  [

	 {	
		name: "name", 
		value:'', 		
		id:'goku_form_name',
		html:'',
		type:'textfield',
		required: true,  }, 	

	 {	
		name: "last", 
		value:'', 		
		id:'goku_form_last',
		html:'',
		type:'textfield',
		required: false, }, 	

	 {	
		name: "gender", 
		value:'', 		
		id:'goku_form_gender',
		html:'',
		type:'radio',
		required: true, }, 	

	 {	
		name: "getAlerts", 
		value:'', 		
		id:'goku_form_getAlerts',
		html:'',
		type:'checkbox',
		required: false, }, 	


	 {	
		name: "car", 
		value:'', 		
		id:'goku_form_car',
		html:'',
		type:'multiselect',
		options :["Saab", "Opel", "audi", "toyota", "mercedes"], 
		required: false, }, 

	 {	
		name: "email", 
		value:'', 		
		id:'goku_form_email',
		html:'',
		type:'textfield-validator',
		required: false,  }, 	

	 {	
		name: "signature", 
		value:[], //don't forget this on signature	
		id:'goku_form_signatureTest',
		html:'',
		type:'signature',
		title: 'Default title',
		required: false,  }, 

	 {	
		name: "map", 
		value:'', 
		id:'goku_form_map',
		html:'',
		type:'map',
		title: 'Map title',
		pin: 'pin',
		required: true,  }, 


]

//we use this for check changes on form	
export const formCopy = JSON.parse(JSON.stringify(form)) 


/*
form is where we have all the details for all the inputs
for the entity  forms
each entity has their own form
*/
export const form   =  [

	 {	
		name: "name", 
		value:'', 		
		id:'services_form_name',
		html:'',
		type:'textfield',
		required: true,  
	}, 	
	
	{	
	 	name: "last_name", 
		value:'', 		
		id:'services_form_last_name',
		html:'',
		type:'textfieldValidator',
		required: false, 
	}, 	

	 {	
		name: "gender", 
		value:'', 		
		id:'services_form_gender',
		html:'',
		type:'radio',
		required: false, 
	}, 	

	 {	
		name: "getAlert", 
		value:'', 		
		id:'services_form_getAlert',
		html:'',
		type:'checkbox',
		required: false, 
	}, 	


	{	
		name: "car", 
		value:'', 		
		id:'services_form_car',
		html:'',
		type:'multiselect',
		options :["Saab", "Opel", "audi", "toyota", "mercedes"], 
		required: true, 
	},
	
	{	
		name: "department", 
		value:[], 
		valueFull:'',
		id:'services_form_department',
		html:'',
		type:'autocomplete',
		required: false,  
	},

	{	
		name: "signature", 
		value:[], //don't forget this on signature	
		id:'services_form_signature', //should be the same thatn in signature-pads
		html:'',
		type:'signature',
		edit: true, //this signatrue can be edited
		required: false, 
	}, 

	{	
		name: "geo", 
		value:'', 
		id:'services_form_geo',
		html:'',
		type:'map',
		title: 'Map title',
		pin: 'pin',
		required: false,  
	}, 


]



//we use this for check changes on form	
export const formCopy = JSON.parse(JSON.stringify(form)) 


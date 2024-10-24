
/*
form is where we have all the details for all the inputs
for the entity  forms
each entity has their own form
*/
export const form   =  [

	 {	
		name: "name", 
		value:'', 		
		id:'users_form_name',
		html:'',
		type:'textfield',
		required: true,  
	}, 	
	
	{	
	 	name: "password", 
		value:'', 		
		id:'users_form_username',
		html:'',
		type:'textfieldValidator',
		required: true, 
	}, 	




]



//we use this for check changes on form	
export const formCopy = JSON.parse(JSON.stringify(form)) 


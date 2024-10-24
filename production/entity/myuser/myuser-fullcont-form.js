
/*
form is where we have all the details for all the inputs
for the entity  forms
each entity has their own form
*/
export const form   =  [

	 {	
		name: "__name", 
		id:'myuser_form___name',
		value:'',
		html:'',
		type:'textfield',
		required: false,  
	}, 	
	//  {	
	// 	name: "active", 
	// 	id:'myuser_form_active',
	// 	value:'',
	// 	html:'',
	// 	type:'checkbox',
	// 	required: false, 
	// }, 		



	{	
	 	name: "username", 
		id:'myuser_form_username',
		value:'',
		html:'',
		type:'textfieldValidator',
		required: true, 
	}, 	


	{	
	 	name: "__password", 
		id:'myuser_form_password',
		value:'',
		html:'',
		type:'textfieldValidator',
		required: false, 
	},

	{	
	   name: "__oldPassword", 
	   id:'myuser_form_oldPassword',
	   value:'',
	   html:'',
	   type:'textfield',
	   required: true, 
   }




]



//we use this for check changes on form	
export const formCopy = JSON.parse(JSON.stringify(form)) 


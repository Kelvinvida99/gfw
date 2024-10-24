const generator      = require('./users-fullcont-multitable-generator')
const settingsEntity = require('../../../../../js-handler/settings-entities')

export function start(detail){  //console.log('gmt>', detail)
         
      obj[detail.act].start(detail)
}/**/

const obj = {
   
      add: { start: (detail)=>{ add(detail) }},
}

//add line
function add(detail){ //console.log('MULTITABLE ADD>', detail)
	usersMT.forEach((mt)=>{
		if(mt.tableName === detail.tableName){
			mt.add()
		}/*if*/
	}) 
}

export const usersMT = [

	{
		tableName: "users_vs_permissions", 
		value:'', 
		id:'users_form_users_vs_permissions',
		html:'',
		data:     [],
		dataCopy: [],
		oneRequired: true,
		fields: [

			{
			  name:      'entity', 
			  type:      'textfield',
			  html:      '',
			  required:  true,  
			},
			{
			  name:      'privilegeDB', 
			  type:      'multiselect',
			  html:      '',
			  //options :  ["none", "readOnly", "readWrite",],
			  options :[{value:'none', text:'Deny'}, {value:'readOnly', text:'Read Only'}, {value:'readWrite', text:'Read and Write'}], 
			  required:  false,  
			},

			{
			  name:      'privilegeFile', 
			  type:      'multiselect',
			  html:      '',
			 // options :  ["none", "readOnly", "readWrite",],
			  options :[{value:'none', text:'Deny'}, {value:'readOnly', text:'Read Only'}, {value:'readWrite', text:'Read and Write'}], 
			  required:  false,  
			},

			{
				name:      'privilegeAgrmt', 
				type:      'multiselect',
				html:      '',
			   // options :  ["none", "readOnly", "readWrite",],
				options :[{value:'none', text:'Deny'}, {value:'readOnly', text:'Read Only'}, {value:'readWrite', text:'Read and Write'}], 
				required:  false,  
			},

		],

		generator: function(line){ 
			return generator.users_vs_permissions(line.id) 
		},

		addOLD: function(){ 
		     const newLine = generator.users_vs_permissions('')
		     this.html.insertAdjacentHTML("beforeend", newLine) 
		}, 

		add: function(){ 

			const entitiesAdmin = settingsEntity.staff()
			var newLine         = ''

			for (let  i = 0; i <  entitiesAdmin.length ; i++) {

				//console.log('settings-entities', entitiesAdmin[i] )
				 newLine += generator.users_vs_permissions('', entitiesAdmin[i])
			}


		     this.html.innerHTML = newLine  
		}, 		
	},
]

export const usersMTdefaultValue = `
[{"id":"","entity":"departments","privilegeDB":"none","privilegeFile":"none","notes":""},
{"id":"","entity":"patients","privilegeDB":"none","privilegeFile":"none","notes":""},
{"id":"","entity":"nurses","privilegeDB":"none","privilegeFile":"none","notes":""},
{"id":"","entity":"services","privilegeDB":"none","privilegeFile":"none","notes":""}]`;
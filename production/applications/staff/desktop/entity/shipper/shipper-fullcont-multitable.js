const generator = require('./shipper-fullcont-multitable-generator')



export function start(detail){  console.log('gmt>', detail)
         
      obj[detail.act].start(detail)
}/**/


const obj = {
   
      add: { start: (detail)=>{ add(detail) }},
}

//add line
function add(detail){ console.log('MULTITABLE ADD>', detail)
	gokuMT.forEach((mt)=>{
		if(mt.tableName === detail.tableName){
			mt.add()
		}/*if*/
	}) 
}

export const gokuMT = [

	{
		tableName: "goku_vs_powers", 
		value:'', 
		id:'shipper_form_shipper_vs_powers',
		html:'',
		data:     [],
		dataCopy: [],
		oneRequired: false,
		fields: [ //the order elements should be the same on the server goku.php

			{ name:      'au__goku_vs_powers_vs_power', 
			  type:      'autocomplete',
			  html:      '',
			  required:  false,  },	

			{ name:      'powerValue', 
			  type:      'textfield',
			  html:      '',
			  required:  false, },

			  
		],
		generator: function(line){ 
			return generator.goku_vs_powers(line.id) 
		},

		add: function(){ 
			const newLine = generator.goku_vs_powers('')
			this.html.insertAdjacentHTML("beforeend", newLine) 
		} 
	},
	
	{
		tableName: "goku_vs_countries", 
		value:'', 
		id:'shipper_form_shipper_vs_countries',
		html:'',
		data:     [],
		dataCopy: [],
		oneRequired: false,
		fields: [
			{
			  name:      'name', 
			  type:      'textfield',
			  html:      '',
			  required:  true,  
			},
			{
			  name:      'dateVisited', 
			  type:      'textfieldValidator',
			  html:      '',
			  required:  true,  
			},
			{
			  name:      'tropical', 
			  type:      'checkbox',
			  html:      '',
			  required:  false,  
			},
			{
			  name:      'continent', 
			  type:      'radio',
			  html:      '',
			  required:  false,  
			},
			{
			  name:      'race', 
			  type:      'multiselect',
			  html:      '',
			  options :  ["latino", "prieto", "rubio",],
			  required:  false,  
			},
		],

		generator: function(line){ 
			return generator.goku_vs_countries(line.id) 
		},

		add: function(){ 
			const newLine = generator.goku_vs_countries('')
			this.html.insertAdjacentHTML("beforeend", newLine) 
		} 
	},

]


/*
wasEdited>multitable data [

{"id":"114","powerId":["2","39","1","38","3"],"powerValue":"pv1-2*XXXX"},
{"id":"115","powerId":["5","4"],"powerValue":"pv3-4*XXX"},
{"id":"118","powerId":["1","3","2"],"powerValue":"pv1-2 NEWXXX12"},{"id":"119","powerId":["3","1","4"],"powerValue":"pv3-4 NEWXXXXX34"}]


wasEdited>multitable dataCopy [

{"id":"114","powerId":"[{\"id\": \"2\", \"displayText\": \"fire2\"},{\"id\": \"39\", \"displayText\": \"hellow \"},
{\"id\": \"1\", \"displayText\": \"Fire1\"},{\"id\": \"38\", \"displayText\": \"asdf\"},
{\"id\": \"3\", \"displayText\": \"ice3\"}]",

"powerValue":"pv1-2*XXXX"},{"id":"115","powerId":"[{\"id\": \"5\", \"displayText\": \"tierra5\"},{\"id\": \"4\", \"displayText\": \"madera4\"}]","powerValue":"pv3-4*XXX"},{"id":"118","powerId":"[{\"id\": \"1\", \"displayText\": \"Fire1\"},{\"id\": \"3\", \"displayText\": \"ice3\"},{\"id\": \"2\", \"displayText\": \"fire2\"}]","powerValue":"pv1-2 NEWXXX12"},{"id":"119","powerId":"[{\"id\": \"3\", \"displayText\": \"ice3\"},{\"id\": \"1\", \"displayText\": \"Fire1\"},{\"id\": \"4\", \"displayText\": \"madera4\"}]","powerValue":"pv3-4 NEWXXXXX34"}]


*/
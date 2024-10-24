const generator = require('./sale-fullcont-multitable-generator')
const timeDate         = require ('../../../../../js-handler/time-date')

export function start(detail){  //console.log('gmt>', detail)
         
      obj[detail.act].start(detail)
}/**/


const obj = {
   
      add: { start: (detail)=>{ add(detail) }},
}

//add line
function add(detail){ 
	//console.log('MULTITABLE ADD>', detail)
	saleMT.forEach((mt)=>{
		//	console.log('MULTITABLE ADD>', mt)

		if(mt.tableName === detail.tableName){
			//se agrego propiedad de tab para validar si se esta creando el la linea por medio del boton tab
			//si es asi pues solo has un focus
			if (detail.tab == undefined) {
				mt.add()
			}else{
				mt.add(detail.tab)
			}
		}/*if*/
	}) 
}

export const saleMT = [

	{
		tableName: "sale_vs_item", 
		value:'', 
		id:'sale_form_sale_vs_item',
		html:'',
		data:     [],
		dataCopy: [],
		oneRequired: false,
		fields: [
			{
				name:      'purchase_vs_itemId', 
				type:      'autocomplete',
				html:      '',
				required:  true,  
			},
			{
				name:      'selling_type', 
				type:      'textfield',
				html:      '',
				required:  false,  
			},
			
			{
			  name:      'qty', 
			  type:      'textfield',
			  html:      '',
			  required:  true, 
			   
			},
			{
				name:      'item_unit_cost', 
				type:      'textfield',
				html:      '',
				required:  false,  
			},
			{
			  name:      'price', 
			  type:      'textfield',
			  html:      '',
			  required:  true,  
			},
			{
				name:      'total', 
				type:      'textfield',
				html:      '',
				required:  true,  
			},
		],

		generator: function(line){ 
			return generator.sale_vs_item(line.id) 
		},

		add: function(tab = false){ 
			const newLine = generator.sale_vs_item('')
			//console.log("newline", newLine);
			this.html.insertAdjacentHTML("beforeend", newLine) 

			//console.log("targetInput %%%%%%%%%%%%%%%%%%%%%%", targetInput);


			//select the last input
			const allLines    = this.html.querySelectorAll('.purchase_vs_itemId')
			const lastLine    = allLines[allLines.length - 1]
			const targetInput = lastLine.querySelector('input')
			
			targetInput.focus()
			if (!tab) {
				targetInput.click()
			}

		}
	},
	{
		tableName: "sale_vs_return", 
		value:'', 
		id:'sale_form_sale_vs_return',
		html:'',
		data:     [],
		dataCopy: [],
		oneRequired: false,
		fields: [
			{
				name:      'sale_vs_itemId', 
				type:      'autocomplete',
				html:      '',
				required:  true,  
			},

			{ 
				name:      'lost_qty', 
				type:      'textfield',
				html:      '',
				required:  true,  
			},

			{
				name:      'lost_price', 
				type:      'textfield',
				html:      '',
				required:  true,  
			},
	

			{ 
				name:      "date", 
				value:     '0000-00-00', 
				date:      true,	
				html:	 	 '',
				type:		 'textfield',
				required:  true,  
			}, 


			{ 
				name:      'notes', 
				type:      'textfield',
				html:      '',
				required:  false,  
			},

		],

		generator: function(line){ 
			return generator.sale_vs_return(line.id) 
		},

		add: function(){ 
			const newLine = generator.sale_vs_return('')
			this.html.insertAdjacentHTML("beforeend", newLine) 
			
			const allLines    = this.html.querySelectorAll('.line')
			const lastLine    = allLines[allLines.length - 1]

			const input_item  = lastLine.querySelector('.sale_vs_itemId') 
			const targetInput = input_item.querySelector('input')
			targetInput.focus()
			targetInput.click()


			console.log("targetInput %%%%%%%%%%%%%%%%%%%%%%", targetInput);
			const input_date  = lastLine.querySelector('.date input');
			input_date.value  = timeDate.convertDateToInput();

		} 
	}

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
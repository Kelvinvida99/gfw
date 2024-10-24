const generator = require('./purchase-fullcont-multitable-generator')

export function start(detail){  //console.log('gmt>', detail)
         
      obj[detail.act].start(detail)
}/**/


const obj = {
   
      add: { start: (detail)=>{ add(detail) }},
}

//add line
function add(detail){ //console.log('MULTITABLE ADD>', detail)
	purchaseMT.forEach((mt)=>{
		console.log(mt)
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

export const purchaseMT = [

	{
		tableName: "purchase_vs_item", 
		value:'', 
		id:'purchase_form_purchase_vs_item',
		html:'',
		data:     [],
		dataCopy: [],
		oneRequired: false,
		fields: [
			{ name:      'item_id', 
			  type:      'autocomplete',
			  html:      '',
			  required:  true,  },

			{ name:      'type_selling', 
			  type:      'autocomplete',
			  html:      '',
			  required:  true,  },

			{ name:      'qty', 
			  type:      'textfield',
			  html:      '',
			  required:  false,  },

			{ name:      'unit_price', 
			  type:      'textfield',
			  html:      '',
			  required:  false,  },

			{ name:      'selling_price', 
			  type:      'textfield',
			  html:      '',
			  required:  true,  },

			{ name:      'total_price', 
			  type:      'textfield',
			  html:      '',
			  required:  true,  },

			{ name:      'cogs_row_amount', 
			  type:      'textfield',
			  html:      '',
			  required:  false,  },

		],

		generator: function(line){ 
			return generator.purchase_vs_item(line.id) 
		},

		add: function(tab = false){ 
			const newLine = generator.purchase_vs_item('')
			this.html.insertAdjacentHTML("beforeend", newLine) 

			const allLines    = this.html.querySelectorAll('.item_id')
			const lastLine    = allLines[allLines.length - 1]
			const targetInput = lastLine.querySelector('input')

			targetInput.focus()
			if (!tab) {
				targetInput.click()
			}

			//console.log("targetInput %%%%%%%%%%%%%%%%%%%%%%", targetInput);

		} 
	},

	{
		tableName: "purchase_vs_investment", 
		value:'', 
		id:'purchase_form_purchase_vs_investment',
		html:'',
		data:     [],
		dataCopy: [],
		oneRequired: false,
		fields: [
			{ name:      'investorId', 
			  type:      'autocomplete',
			  html:      '',
			  required:  false,  },

			{ name:      'invested_amount', 
			  type:      'textfield',
			  html:      '',
			  required:  false,  },

			{ name:      'revenue', 
			  type:      'textfield',
			  html:      '',
			  required:  false,  },

			{ name:      'revenue_amount', 
			  type:      'textfield',
			  html:      '',
			  required:  false,  },

			{ name:      'status', 
			  type:      'multiselect',
			  html:      '',
			  options :  ["requested", "waiting on deposit", "approved", "rejected", "paid to Investor"],
			  required:  false,  },
		],

		generator: function(line){ 
			return generator.purchase_vs_investment(line.id) 
		},

		add: function(){ 
			const newLine = generator.purchase_vs_investment('')
			this.html.insertAdjacentHTML("beforeend", newLine) 



		} 
	},

	{
		tableName: "purchase_vs_expenses", 
		value:'', 
		id:'purchase_form_purchase_vs_expenses',
		html:'',
		data:     [],
		dataCopy: [],
		oneRequired: false,
		fields: [
			{ name:      'provider_id', 
			  type:      'autocomplete',
			  html:      '',
			  required:  true,  },

			{ name:      'expenses_account_id', 
			  type:      'autocomplete',
			  html:      '',
			  required:  true,  },

			{ name:      'date', 
			  type:      'textfield',
			  html:      '',
			  required:  true,  },

			{ name:      'amount', 
			  type:      'textfield',
			  html:      '',
			  required:  true,  },

			// { name:      'other_cost', 
			//   type:      'checkbox',
			//   html:      '',
			//   required:  false,  },
		],

		generator: function(line){ 
			return generator.purchase_vs_expenses(line.id) 
		},

		add: function(){ 
			const newLine = generator.purchase_vs_expenses('')
			this.html.insertAdjacentHTML("beforeend", newLine) 

			const allLines    = this.html.querySelectorAll('.provider_id')
			const lastLine    = allLines[allLines.length - 1]
			const targetInput = lastLine.querySelector('input')
			targetInput.focus()
			targetInput.click()
			//console.log("targetInput %%%%%%%%%%%%%%%%%%%%%%", targetInput);

		} 
	},

	{
		tableName: "purchase_tracking_mail", 
		value:'', 
		id:'purchase_form_tracking_mail',
		html:'',
		data:     [],
		dataCopy: [],
		oneRequired: false,
		fields: [
			{ name:      'email', 
			  type:      'textfield',
			  html:      '',
			  required:  true,  },

			{ name:      'mail_date', 
			  type:      'textfield',
			  html:      '',
			  required:  true,  },

			{ name:      'mail_time', 
			  type:      'textfield',
			  html:      '',
			  required:  true,  },

			{ name:      'providerId', 
			  type:      'autocomplete',
			  html:      '',
			  required:  true,  },

		],

		generator: function(line){ 
			return generator.purchase_tracking(line.id) 
		},

		add: function(){ 
			const newLine = generator.purchase_tracking('')
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
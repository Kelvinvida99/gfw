const generator = require('./receivepayment-fullcont-multitable-generator')
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
	receivepaymentMT.forEach((mt)=>{
		//	console.log('MULTITABLE ADD>', mt)

		if(mt.tableName === detail.tableName){
			mt.add()
		}/*if*/
	}) 
}

export const receivepaymentMT = [

	{
		tableName: "payment_vs_sale", 
		value:'', 
		id:'receivepayment_form_payment_vs_sale',
		html:'',
		data:     [],
		dataCopy: [],
		oneRequired: false,
		fields: [
			{
				name:      'sale_id', 
				type:      'autocomplete',
				html:      '',
				required:  true,  
			},
			{
				name:      'po_total_amount', 
				type:      'textfield',
				html:      '',
				required:  true,  
			},
			{
				name:      'due_amount', 
				type:      'textfield',
				html:      '',
				required:  true,  
			},
			{
				name:      'sent_amount', 
				type:      'textfield',
				html:      '',
				required:  true,  
			},
		],

		generator: function(line){ 
			return generator.payment_vs_sale(line.id) 
		},

		add: function(){ 
			const newLine = generator.payment_vs_sale('')
			//console.log("newline", newLine);
			this.html.insertAdjacentHTML("beforeend", newLine) 
		} 
	},


	{
		tableName: "receivepayment_vs_credit", 
		value:'', 
		id:'receivepayment_form_receivepayment_vs_credit',
		html:'',
		data:     [],
		dataCopy: [],
		oneRequired: false,
		fields: [
			{
				name:      'saleId', 
				type:      'autocomplete',
				html:      '',
				required:  true,  
			},

			{
				name:      'amount', 
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
			return generator.receivepayment_vs_credit(line.id) 
		},

		add: function(){ 
			const newLine = generator.receivepayment_vs_credit('')
			this.html.insertAdjacentHTML("beforeend", newLine) 
			
			const allLines    = this.html.querySelectorAll('.line')
			const lastLine    = allLines[allLines.length - 1]

			const input_item  = lastLine.querySelector('.saleId') 
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
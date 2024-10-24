const generator = require('./sentpayment-fullcont-multitable-generator')

export function start(detail){  //console.log('gmt>', detail)
         
      obj[detail.act].start(detail)
}/**/

const obj = {
   
      add: { start: (detail)=>{ add(detail) }},
}

//add line
function add(detail){ 
	//console.log('MULTITABLE ADD>', detail)
	sentpaymentMT.forEach((mt)=>{
		//	console.log('MULTITABLE ADD>', mt)

		if(mt.tableName === detail.tableName){
			mt.add()
		}/*if*/
	}) 
}

export const sentpaymentMT = [

	{
		tableName: "payment_vs_po_or_services", 
		value:'', 
		id:'sentpayment_form_payment_vs_po_or_services',
		html:'',
		data:     [],
		dataCopy: [],
		oneRequired: false,
		fields: [
			{
				name:      'expense_id', 
				type:      'autocomplete',
				html:      '',
				required:  true,  
			},

			{
				name:      'expense_type', 
				type:      'textfield',
				html:      '',
				required:  true,  
			},

			{
				name:      'total_amount', 
				type:      'textfield',
				html:      '',
				required:  false,  
			},

			{
				name:      'due_amount', 
				type:      'textfield',
				html:      '',
				required:  false,  
			},

			{
				name:      'sent_amount', 
				type:      'textfield',
				html:      '',
				required:  true,  
			},
		],

		generator: function(line){ 
			return generator.payment_vs_po_or_services(line.id) 
		},

		add: function(){ 
			const newLine = generator.payment_vs_po_or_services('')
			console.log("newline", newLine);
			this.html.insertAdjacentHTML("beforeend", newLine) 
		} 
	},
]
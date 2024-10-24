//we use this id for create unic name for multiselect
//only used for the ac selection
var radioUnicId = 0;

export function payment_vs_po_or_services(id) {

  radioUnicId++;
  return `

	<div class="line line-${id} " lineId="${id}"   id="sentpayment_form_mt_${radioUnicId}"> 

	   <div class="row">

	   <div class="c16">

				<div class="checkbox checkbox-mini " id="add_amount"> 
			    <input type="checkbox" class="elem" data-detail='{"click":[{"dest":"ripple" },
                            {"dest":"sentpayment", "elem":"fullcont",  "id":"sentpayment-fullcont", "act":"addAmount" , "line":"${radioUnicId}"}]}'> 
			    <label>ADD</label>
			  </div><!-- checkbox -->  

			</div><!-- c25 --> 
	 
			<div class="c16">

				<div class="textfield textfield-autocomplete textfield-autocomplete-mini textfield-autocomplete-disabled expense_id" id="sentpayment_form_purchaseid_mt_${radioUnicId}" selected = '[]'  max = '1'>

					<input autocomplete="off"  class= 'elem' type="text" 
						data-detail='{
						"key": [   {"dest":"textfield",    "act":"typing" }, 
									{"dest":"autocomplete", "act":"typing",  "entity": "purchase", "mainFilter": ["code"], "parent": "sentpayment_form_purchaseid_mt_${radioUnicId}"   }],
						"click": [ {"dest":"autocomplete", "act":"click",   "entity": "purchase", "mainFilter": ["code"], "parent": "sentpayment_form_purchaseid_mt_${radioUnicId}"   }]
						}' readonly>
						
					<div class="chip-cont"></div>
					<div class="dn otherField" data-detail='{}' ></div>
					

				</div> <!-- textfield --> 

			</div><!-- c25 --> 

			<div class="c16">

				<div class="textfield textfield-mini textfield-disabled expense_type"  >

					<input autocomplete="off"  class= 'elem' type="text" 
					data-detail='{"key":   [ {"dest":"textfield", "act":"typing"  }] }' readonly>
					
				</div><!-- textfield -->  

			</div><!-- c25 --> 

			<div class="c16">

				<div class="textfield textfield-cash textfield-mini textfield-disabled total_amount"  >

					<input autocomplete="off"  class= 'elem' type="number" 
					data-detail='{"key":   [ {"dest":"textfield", "act":"typing"  }] }' readonly>
					
				</div><!-- textfield -->  

			</div><!-- c25 --> 

			<div class="c16">

				<div class="textfield textfield-cash textfield-mini textfield-disabled due_amount"  >

					<input autocomplete="off"  class= 'elem' type="number" 
					data-detail='{"key":   [ {"dest":"textfield", "act":"typing"  }] }' readonly>

				</div><!-- textfield -->  

			</div><!-- c25 --> 

			
			<div class="c16">

				<div class="textfield textfield-cash textfield-mini sent_amount"  >

					<input autocomplete="off"  class= 'elem' type="number" 
					data-detail='{"key":   [ {"dest":"textfield", "act":"typing"  }] }' >

				</div><!-- textfield -->  

			</div><!-- c25 --> 

	  </div><!-- row -->

	</div><!-- line -->  
	`;
}

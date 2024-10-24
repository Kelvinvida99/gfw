//we use this id for create unic name for multiselect
//only used for the ac selection
var radioUnicId = 0

export function payment_vs_sale(id){

	radioUnicId++
	return `

	<div class="line line-${id} " lineId="${id}" id="receivepayment_form_mt_${radioUnicId}">   

	    <div class="row">
	 	

	<div class="c50">




 <div class="row">
 				<div class="c20">

					<div class="checkbox checkbox-mini " id="add_amount"> 
					<input type="checkbox" class="elem" data-detail='{"click":[{"dest":"ripple" },
								{"dest":"receivepayment", "elem":"fullcont",  "id":"receivepayment-fullcont", "act":"addAmount" , "line":"${radioUnicId}"}]}'> 
					<label>ADD</label>
				</div><!-- checkbox -->  

				</div><!-- c25 --> 
		
				<div class="c75">

					<div class="textfield  textfield-autocomplete textfield-autocomplete-mini textfield-autocomplete-disabled sale_id" id="receivepayment_form_saleid_mt_${radioUnicId}" selected = '[]'  max = '1'>

						<input autocomplete="off"  class= 'elem' type="text" 
							data-detail='{
							"key": [   {"dest":"textfield",    "act":"typing" }, 
										{"dest":"autocomplete", "act":"typing",  "entity": "sale", "mainFilter": ["code"], "parent": "receivepayment_form_saleid_mt_${radioUnicId}"   }],
							"click": [ {"dest":"autocomplete", "act":"click",   "entity": "sale", "mainFilter": ["code"], "parent": "receivepayment_form_saleid_mt_${radioUnicId}"   }]
							}' readonly>
							
						<div class="chip-cont"></div>
						<!-- otherField is used for autocomplete other fields, different than id and displayText -->  
						<div class="dn otherField" data-detail='{}' ></div>

					</div> <!-- textfield --> 

				</div><!-- c25 --> 
	</div><!-- row --> 





	</div><!-- c75 --> 



<div class="c50">
	   

 <div class="row">
			<div class="c33">

				<div class="textfield textfield-cash  textfield-mini textfield-disabled po_total_amount "  >

					<input autocomplete="off"  class= 'elem' type="text"  placeholder="Po Total Amoun" 
					data-detail='{"key":   [ {"dest":"textfield", "act":"typing"  }] }' readonly>

				</div><!-- textfield -->  

			</div><!-- c25 --> 

			<div class="c33">

				<div class="textfield textfield-cash  textfield-mini textfield-disabled due_amount"  >

					<input autocomplete="off"  class= 'elem' type="text" placeholder="Due Amount" 
					data-detail='{"key":   [ {"dest":"textfield", "act":"typing"  }] }' readonly>

				</div><!-- textfield -->  

			</div><!-- c25 --> 

			
			<div class="c33">

				<div class="textfield textfield-cash  textfield-mini sent_amount"  >

					<input autocomplete="off"  class= 'elem' type="text"  placeholder="Sent Amount" 
					data-detail='{"key":   [ {"dest":"textfield", "act":"typing"  } ,
											 {"dest":"receivepayment", "elem":"fullcont",  "act":"verifyvalue","id_item_ac":"${radioUnicId}"} ] }' >

				</div><!-- textfield -->  

			</div><!-- c25 --> 
	</div><!-- row --> 




</div><!-- c25 --> 



	    </div><!-- row -->

	</div><!-- line -->  
	`

}



var saleInvoices = 0
export function receivepayment_vs_credit(id){
	saleInvoices++
	return `

	<div class="line line-${id} " lineId="${id}" id="receivepayment_form_credit_mt_${saleInvoices}"> 

    	<div class="removeLine" data-detail='{"click": [  {"dest":"ripple"}, {"dest":"multitable", "act":"removeLine" }  ] }'>
   		</div>  

		<div class="row">

			<div style="width:  40%;" >
				<div class="row">

					<div class="c100">
						<div class="textfield textfield-desk textfield-autocomplete textfield-autocomplete-mini saleId" id="receivepayment_form_saleId_${saleInvoices}" selected = '[]'  max = '1' >

								<input class= 'elem' type="text" placeholder="" data-detail='{
									"key": [   
									{"dest":"textfield",    "act":"typing" }, 
									{"dest":"receivepayment", "act":"beforeAutocomplete", "elem":"fullcont",  "entity": "receivepayment_vs_credit", "mainFilter": ["sale.id","sale.code"], "parent": "receivepayment_form_saleId_${saleInvoices}"   }],
									"click": [ 
									{"dest":"receivepayment", "act":"beforeAutocomplete", "elem":"fullcont",   "entity": "receivepayment_vs_credit", "mainFilter": ["sale.id","sale.code"], "parent": "receivepayment_form_saleId_${saleInvoices}"   }]
								}' >

								<div class="chip-cont"> </div>
								<div class="dn otherField" data-detail='{"click": [ {"dest":"receivepayment", "elem":"fullcont",  "act":"otherFieldCredit" } ] }' ></div> 

							</div><!-- textfield -->
					</div>

	          	</div>
			</div>

			<div style="width:  57%;" >
				<div class="row">
					
					<div class="c25">
							<div class="textfield textfield-cash textfield-mini  amount"  >

								<input autocomplete="off"  class= 'elem' type="text" placeholder="price"   step="1" min="0"
								data-detail='{"key":   [ {"dest":"textfield", "act":"typing"  }] }' >

							</div><!-- textfield -->  
					</div><!-- c16 -->
					

					<div class="c25">
						<div class="textfield textfield-date  textfield-desk  textfield-mini date"  >
							<input autocomplete="off"  class= 'elem' type="date"   value = '' 
									data-detail='{"click": [ {"dest":"textfield", "act":"focused"  }], 
													"key": [ {"dest":"textfield", "act":"typing"  }, 
												{"dest":"textfield", "act":"validator", "validator": "date"  }],
													"change": [{"dest":"textfield", "act":"validator", "validator": "date"  }] }'  >

							<div class="indicador"></div>
							<div class="label">Date</div> 
						</div><!-- textfield -->  
					</div>



					<div class="c50">
						<div class="textfield textfield-mini notes" >

							<input autocomplete="off" placeholder="" class= 'elem' type="text"
													data-detail='{ "key":   [ {"dest":"textfield","act":"typing"  }] }' >

						</div><!-- textfield -->
					</div>
				</div>
			</div>
	          	
		</div><!-- row -->

    	<div class="restriction"   data-detail='{"click": [{ "dest":"textfield", "act":"restriction"  }] }' ></div>

	</div><!-- line -->  
	`

}
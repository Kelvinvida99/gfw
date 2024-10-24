//we use this id for create unic name for multiselect
//only used for the ac selection

var itemId = 0
export function purchase_vs_item(id){
	itemId++
	return `

	<div class="line line-${id} " lineId="${id}" id="purchase_form_item_mt_${itemId}"> 

    	<div class="removeLine" data-detail='{"click": [  {"dest":"ripple"}, {"dest":"multitable", "act":"removeLine" }  ] }'>
   		</div>  

		<div class="multitable-grid-purchase">

			<div class="multitable-flex-purchase">
				<div class="row">
					<div class="c66">
						<div class="textfield textfield-desk textfield-autocomplete textfield-autocomplete-mini item_id" id="purchase_form_item_${itemId}" selected = '[]'  max = '1' 
							data-detail='{"click": [  {"dest":"ripple" }, {"dest":"purchase", "elem":"fullcont",  "id":"purchase-fullcont", "act":"restirctionClick" } ] }'>

							<input class= 'elem' type="text" placeholder="" data-detail='{
								"key": [   
								{"dest":"textfield",    "act":"typing" }, 
								{"dest":"autocomplete", "act":"typing",  "entity": "item", "mainFilter": ["name","item.code"], "parent": "purchase_form_item_${itemId}"   }],
								"click": [ 
								{"dest":"autocomplete", "act":"click",   "entity": "item", "mainFilter": ["name","item.code"], "parent": "purchase_form_item_${itemId}"   }]
							}' >

							<div class="chip-cont"> </div>
							<div class="dn otherField" data-detail='{"click": [ {"dest":"purchase", "elem":"fullcont",  "act":"otherFieldItem" ,"id_ac":"${itemId}" } ] }' ></div> 

						</div><!-- textfield -->
					</div>

					<div class="c33">
						<div class="textfield textfield-desk textfield-autocomplete textfield-autocomplete-mini type_selling" id="purchase_form_item_selling_${itemId}" selected = '[]'  max = '1'>

							<input class= 'elem' type="text" placeholder="" data-detail='{
								"key": [   
								{"dest":"textfield",    "act":"typing" }, 
								{"dest":"autocomplete", "act":"typing",  "entity": "item_unit", "mainFilter": ["name"], "parent": "purchase_form_item_selling_${itemId}"   }],
								"click": [ 
								{"dest":"autocomplete", "act":"click",   "entity": "item_unit", "mainFilter": ["name"], "parent": "purchase_form_item_selling_${itemId}"   }]
							}' >

							<div class="chip-cont"> </div>
							<div class="dn otherField" data-detail='{"click": [ {"dest":"purchase", "elem":"fullcont",  "act":"goToQtyField" ,"id_ac":"${itemId}" } ] }' ></div> 

						</div><!-- textfield -->
					</div>
				</div>
	       	</div>

			<div class="multitable-flex-purchase">


	          	<div class="mx-5">
	                <div class="textfield textfield-mini qty" id="purchase_form_item_qty_${itemId}">

	                    <input name="enteros" step="1" min="0" id="enteros" autocomplete="off" placeholder="" class= 'elem' type="number" data-detail='{ "key":   
	                    [ 
	                    	{"dest":"textfield","act":"typing"  }, 
	                    	{"dest":"purchase", "elem":"fullcont",  "act":"calculate_values_p_vs_item" ,"id_item_ac":"${itemId}", 
	                    	"input":"qty" },
	                    	{"dest":"purchase", "elem":"fullcont",  "act":"calculateGrandTotal"},
	                    	{"dest":"purchase", "elem":"fullcont",  "act":"noDecimal", "id_item_ac":"${itemId}"}
	                    ] }' >

	                </div><!-- textfield -->
	          	</div>

		     	<div class="mx-5">
	                <div class="textfield textfield-cash textfield-mini unit_price" >

	                    <input autocomplete="off" placeholder=""  class= 'elem' type="number" data-detail='{ "key":   
	                    [ 
	                    	{"dest":"textfield","act":"typing"  },
	                    	{"dest":"purchase", "elem":"fullcont",  "act":"calculate_values_p_vs_item" ,"id_item_ac":"${itemId}", 
	                    	"input":"unit_price" },
	                    	{"dest":"purchase", "elem":"fullcont",  "act":"sellingPrice" ,"id_item_ac":"${itemId}", 
	                    	"input":"unit_price"},
	                    	{"dest":"purchase", "elem":"fullcont",  "act":"calculateGrandTotal"}
	                    ] }' >

	                </div><!-- textfield -->
	          	</div>

	          	<div class="mx-5">
	                <div class="textfield textfield-cash textfield-mini total_price" >

	                    <input autocomplete="off" placeholder="" class= 'elem' type="number" data-detail='
	                    { "key": [ 
	                    	{"dest":"textfield","act":"typing"  },
	                    	{"dest":"purchase", "elem":"fullcont",  "act":"calculate_values_p_vs_item" ,"id_item_ac":"${itemId}", 
	                    	"input":"total_price" },
	                    	
	                    	{"dest":"purchase", "elem":"fullcont",  "act":"calculateGrandTotal"}
	                    ]}'>

	                </div><!-- textfield -->
	          	</div>


	          	<div class="mx-5">
	                <div class="textfield textfield-cash textfield-mini selling_price" >

	                    <input autocomplete="off" placeholder="" class= 'elem' type="number" data-detail='{ "key":   
	                    [ 
	                    	{"dest":"textfield","act":"typing"  },
	                    	{"dest":"purchase", "elem":"fullcont",  "act":"sellingPrice" ,"id_item_ac":"${itemId}", 
	                    	"input":"selling_price"},
	                    	{"dest":"purchase", "elem":"fullcont",  "act":"calculateGrandTotal"}
	                    ] }' >

	                </div><!-- textfield -->
		        </div> 

				<div class="mx-5">
					<div class="textfield textfield-mini cogs_row_amount" >

						<input autocomplete="off" placeholder="" class= 'elem' type="number" 
						data-detail='{ "key":     [{"dest":"textfield","act":"typing"  }],
									   "keyDown": [{"dest":"purchase", "elem":"key",  "act":"add_line_item"}] }' >

					</div><!-- textfield -->
				</div> 

			</div>
			


		</div><!-- row -->
    <div class="restriction"   data-detail='{"click": [{ "dest":"textfield", "act":"restriction"  }] }' ></div>

	</div><!-- line -->  
	`

}

var investmentId = 0
export function purchase_vs_investment(id){
	investmentId++
	return `

	<div class="line line-${id} " lineId="${id}" id="purchase_form_investment_mt_${investmentId}"> 

    	<div class="removeLine" data-detail='{"click": [  {"dest":"ripple"}, {"dest":"multitable", "act":"removeLine" }  ] }'>
   		</div>  

		<div class="row">
		     	<div class="c20">
	                <div class="textfield textfield-desk textfield-autocomplete textfield-autocomplete-mini investorId" id="purchase_form_investor_${investmentId}" selected = '[]'  max = '1'>

	                    <input autocomplete="off" placeholder="" class= 'elem' type="text" data-detail='{
	                    	"key": [   
	                    	{"dest":"textfield",    "act":"typing" }, 
	                    	{"dest":"autocomplete", "act":"typing",  "entity": "investor", "mainFilter": ["name"], "parent": "purchase_form_investor_${investmentId}"   }],
	                    	"click": [ 
	                    	{"dest":"autocomplete", "act":"click",   "entity": "investor", "mainFilter": ["name"], "parent": "purchase_form_investor_${investmentId}"   }]
                     	}' >

		                <div class="chip-cont"> </div>
						<div class="dn otherField"></div> 

	                </div><!-- textfield -->
	          	</div>

	          	<div class="c20">
	                <div class="textfield textfield-mini invested_amount" >

	                    <input autocomplete="off" placeholder="" class= 'elem' type="number" data-detail='{ "key":   
	                    [ 
	                    	{"dest":"textfield","act":"typing"  },
	                    	{"dest":"purchase", "elem":"fullcont",  "act":"calculate_values_p_vs_investment" ,"id_investmet_ac":"${investmentId}", 
	                    	"input":"invested_amount" }
	                    ] }' >
	                </div><!-- textfield -->
	          	</div>

	          	<div class="c20">
	                <div class="textfield textfield-mini revenue" >

	                    <input autocomplete="off" placeholder="" class= 'elem' type="number" data-detail='{ "key":   
	                    [ 
	                    	{"dest":"textfield","act":"typing"  },
							{"dest":"purchase", "elem":"fullcont",  "act":"calculate_values_p_vs_investment" ,"id_investmet_ac":"${investmentId}", 
	                    	"input":"revenue" }
	                    ] }' >

	                </div><!-- textfield -->
	          	</div>

		     	<div class="c20">
	                <div class="textfield textfield-mini revenue_amount" >

	                    <input autocomplete="off" placeholder="" class= 'elem' type="number" data-detail='{ "key":   
	                    [ 
	                    	{"dest":"textfield","act":"typing"  },
	                    	{"dest":"purchase", "elem":"fullcont",  "act":"calculate_values_p_vs_investment" ,"id_investmet_ac":"${investmentId}", 
	                    	"input":"revenue_amount"}
	                    ] }' >

	                </div><!-- textfield -->
	          	</div>

	          	<div class="c20">
	                <div class="textfield textfield-multiselect-mini textfield-filled status" >

	                    <select class= 'elem' > 
				    	  <option value="">Status</option>
				    	  <option value="requested">Requested</option>
				    	  <option value="waiting on deposit">Waiting on Deposit</option>
				    	  <option value="Approved">Approved</option>
				    	  <option value="Rejected">Rejected</option>
				    	  <option value="Paid to Investor">Paid to Investor</option>
				    	</select> 
	                </div><!-- textfield -->
	          	</div>

		</div><!-- row -->
    	<div class="restriction"   data-detail='{"click": [{ "dest":"textfield", "act":"restriction"  }] }' ></div>

	</div><!-- line -->  
	`

}

var expensesId = 0
export function purchase_vs_expenses(id){
	expensesId++
	return `

	<div class="line line-${id} " lineId="${id}" id="purchase_form_expenses_mt_${expensesId}"> 

    	<div class="removeLine" data-detail='{"click": [  {"dest":"ripple"}, {"dest":"multitable", "act":"removeLine" }  ] }'>
   		</div>  

		<div class="row">
		     	<div class="c25">
	                <div class="textfield textfield-desk textfield-autocomplete textfield-autocomplete-mini provider_id" id="purchase_form_provider_mt_${expensesId}" selected = '[]'  max = '1'>

	                    <input autocomplete="off" placeholder="" class= 'elem' type="text" data-detail='{
	                    	"key": [   
	                    	{"dest":"textfield",    "act":"typing" }, 
	                    	{"dest":"autocomplete", "act":"typing",  "entity": "provider", "mainFilter": ["name"], "parent": "purchase_form_provider_mt_${expensesId}"   }],
	                    	"click": [ 
	                    	{"dest":"autocomplete", "act":"click",   "entity": "provider", "mainFilter": ["name"], "parent": "purchase_form_provider_mt_${expensesId}"   }]
                     	}' >

		                <div class="chip-cont"></div>
	                    <div class="dn otherField"></div>
	                </div><!-- textfield -->
	          	</div>

	          	<div class="c25">
	                <div class="textfield textfield-mini textfield-autocomplete textfield-autocomplete-deskOne expenses_account_id" id="purchase_form_account_mt_${expensesId}" selected = '[]'  max = '1'>

	                    <input autocomplete="off" placeholder="" class= 'elem' type="text" data-detail='{
	                    	"key": 
	                    	[   
		                    	{"dest":"textfield",    "act":"typing" },
		                    	{"dest":"autocomplete", "act":"typing",  "entity": "accounts_type_expense", "mainFilter": ["name"], "parent": "purchase_form_account_mt_${expensesId}"   }
	                    	],
	                    	"click": 
	                    	[ 
	                    		{"dest":"autocomplete", "act":"click",   "entity": "accounts_type_expense", "mainFilter": ["name"], "parent": "purchase_form_account_mt_${expensesId}"   }
	                    	]
                     	}' >

		                <div class="chip-cont"></div>
	                    <div class="dn otherField"></div>

	                </div><!-- textfield -->
	          	</div>

	          	<div class="c25">
	                <div class="textfield textfield-mini date" >

	                    <input autocomplete="off" placeholder="" class= 'elem' type="date"
	                                             data-detail='{ "key":   [ {"dest":"textfield","act":"typing"  }] }' >

	                </div><!-- textfield -->
	          	</div>

		     	<div class="c25">
	                <div class="textfield textfield-cash textfield-mini amount" >

	                    <input autocomplete="off" placeholder="" class= 'elem' type="number"
	                                             data-detail='{ "key":   [ {"dest":"textfield","act":"typing"  }, {"dest":"purchase", "elem":"fullcont",  "act":"calculateGrandTotal"}] }' >

	                </div><!-- textfield -->
	          	</div>
	          	
		</div><!-- row -->

    	<div class="restriction"   data-detail='{"click": [{ "dest":"textfield", "act":"restriction"  }] }' ></div>

	</div><!-- line -->  
	`

}

var trackingId = 0
export function purchase_tracking(id){
	trackingId++
	return `

	<div class="line line-${id} " lineId="${id}" id="purchase_form_tracking_mt_${trackingId}"> 

		<div class="row">


				<div class="c25">
					<div class="textfield textfield-mini textfield-disabled email" >

						<input autocomplete="off" placeholder="Email" class= 'elem' type="text" 
							data-detail='{ "key":   [ {"dest":"textfield","act":"typing"  }] }' >
					</div><!-- textfield -->
				</div>

				<div class="c25">
	                <div class="textfield textfield-desk textfield-autocomplete textfield-autocomplete-mini textfield-autocomplete-disabled providerId" id="purchase_form_provider_tracking_mt_${trackingId}" selected = '[]'  max = '1'>

	                    <input autocomplete="off" placeholder="Provider" class= 'elem' type="text" data-detail='{
	                    	"key": [   
	                    	{"dest":"textfield",    "act":"typing" }, 
	                    	{"dest":"autocomplete", "act":"typing",  "entity": "provider", "mainFilter": ["name"], "parent": "purchase_form_provider_tracking_mt_${trackingId}"   }],
	                    	"click": [ 
	                    	{"dest":"autocomplete", "act":"click",   "entity": "provider", "mainFilter": ["name"], "parent": "purchase_form_provider_tracking_mt_${trackingId}"   }]
                     	}' >

		                <div class="chip-cont"></div>
	                    <div class="dn otherField"></div>
	                </div><!-- textfield -->
	          	</div>

				<div class="c25">
					<div class="textfield textfield-mini textfield-disabled mail_date" >

						<input autocomplete="off" placeholder="Send Mail" class= 'elem' type="date" 
							data-detail='{ "key":   [ {"dest":"textfield","act":"typing"  }] }' >
					</div><!-- textfield -->
				</div>

				<div class="c25">
                    <div class="textfield textfield-time  textfield-mini textfield-disabled mail_time" >
                        <input  autocomplete="off" class= 'elem' type="time"  value="00:00" 
							data-detail='{"click": [ {"dest":"textfield", "act":"focused"  }]  }'  >
                    </div><!-- textfield -->  
                </div><!-- 20 -->

		     	
	          	
		</div><!-- row -->

	</div><!-- line -->  
	`;
}
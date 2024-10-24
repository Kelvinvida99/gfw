//we use this id for create unic name for multiselect
//only used for the ac selection
var radioUnicId = 0

export function sale_vs_item(id){

	let check_showcost = document.querySelector("#showcost").checked;
	let class_dn       = "dn";
	let width_main     = "48%";
	let width_detail   = "50%";
	let class_c        = "c25";
	let class_c_qty    = "c25";

	if (check_showcost) {
		class_dn     = "";
		width_main   = "25%";
		width_detail = "73%";
		class_c      = "c20";
		class_c_qty  = "c14";
	}

	radioUnicId++
	return `

	<div class="line line-${id} " lineId="${id}"   > 

      <div class="removeLine" data-detail='{"click": [  {"dest":"ripple"}, {"dest":"multitable", "act":"removeLine" },
	  													{"dest":"sale", "elem":"fullcont",  "act":"calculateGrandTotal"}  ] }'>
   	 </div>  

	    <div class="row">
	 
		    <div  class="itemname" style="width: ${width_main};" >

				<div class="row">
					<div class="c100">

						<div class="textfield   textfield-autocomplete textfield-autocomplete-mini  purchase_vs_itemId" id="sale_form_item_mt_${radioUnicId}" selected = '[]'  max = '1'>

							<input autocomplete="off"  class= 'elem' type="text" 
								data-detail='{
								"key": [   {"dest":"textfield",    "act":"typing" }, 
											{"dest":"autocomplete", "act":"typing",  "entity": "purchase_vs_item", "mainFilter": ["item.name","item.code","purchase.code"], "parent": "sale_form_item_mt_${radioUnicId}"   }],
								"click": [ {"dest":"autocomplete", "act":"click",   "entity": "purchase_vs_item", "mainFilter": ["item.name","item.code","purchase.code"], "parent": "sale_form_item_mt_${radioUnicId}"   }]
								}' >
								
							<div class="chip-cont"></div>
							<!-- otherField is used for autocomplete other fields, different than id and displayText -->  
							<div class="dn otherField" data-detail='{"click": [ {"dest":"sale", "elem":"fullcont",  "act":"otherFieldItem" ,"id_ac":"${radioUnicId}" } ] }' ></div> 

						</div> <!-- textfield --> 

					</div><!-- c100 --> 
				</div>

			</div>



			<div class="itemdetail" style="width: ${width_detail};" >
   
				<div class="row">
					<div class="${class_c}">

						<div class="textfield textfield-disabled textfield-mini selling_type"  >

							<input autocomplete="off"  class= 'elem' type="text" placeholder="Type" tabindex="-1"
							data-detail='{"key":   [ {"dest":"textfield", "act":"typing"  }]}' readonly>

						</div><!-- textfield -->  

					</div><!-- c25 --> 

					<div class="${class_c_qty}">
						<div class="textfield textfield-mini qty"  >

							<input autocomplete="off"  class= 'elem' type="number"  placeholder="qty"  step="1" min="0"
							data-detail='{"key":   [ {"dest":"textfield", "act":"typing"  }, 
													 {"dest":"sale", "elem":"fullcont",  "act":"calculate_values" ,"id_item_ac":"${radioUnicId}", "input":"qty" },
													 {"dest":"sale", "elem":"fullcont", "act":"verifyQtyItem" }] }' >

						</div><!-- textfield -->  

					</div><!-- c25 -->

					<div class="c25 ${class_dn} cost">

						<div class="textfield textfield-mini textfield-cash  textfield-disabled item_unit_cost "  >

							<input autocomplete="off"  class= 'elem' type="text" 
							data-detail='{"key":   [ {"dest":"textfield", "act":"typing"  }] }' style="background-color: #f2c2cb;" readonly>
							
						</div><!-- textfield -->  

					</div><!-- c25 -->
					
					<div class="${class_c}">
						<div class="textfield textfield-cash textfield-mini price"  >

							<input autocomplete="off"  class= 'elem' type="number" placeholder="price"   step="1" min="0"
							data-detail='{"key":   [ {"dest":"textfield", "act":"typing"  }, 
													 {"dest":"sale", "elem":"fullcont",  "act":"calculate_values" ,"id_item_ac":"${radioUnicId}","input":"price"}] }' >

						</div><!-- textfield -->  

					</div><!-- c25 -->



					<div class="${class_c}">
						<div class="textfield textfield-cash  textfield-mini total"  >

							<input autocomplete="off"  class= 'elem' type="number" placeholder="Total Price"  step="1" min="0" 
							data-detail='{"key":     [{"dest":"textfield", "act":"typing"  }, 
											         {"dest":"sale", "elem":"fullcont",  "act":"calculate_values" ,"id_item_ac":"${radioUnicId}", "input":"total" }],
										  "keyDown": [{"dest":"sale", "elem":"key",  "act":"add_line_item"}] }'>

						</div><!-- textfield -->  

					</div><!-- c25 -->

				</div>

			</div>

	    </div><!-- row -->
		<div class="restriction"   data-detail='{"click": [{ "dest":"textfield", "act":"restriction"  }] }' ></div>


	</div><!-- line -->  
	`

}

var item_lost = 0
export function sale_vs_return(id){
	item_lost++
	return `

	<div class="line line-${id} " lineId="${id}" id="sale_form_lost_mt_${item_lost}"> 

    	<div class="removeLine" data-detail='{"click": [  {"dest":"ripple"}, {"dest":"multitable", "act":"removeLine" }  ] }'>
   		</div>  

		<div class="row">

			<div style="width:  40%;" >
				<div class="row">

					<div class="c100">
						<div class="textfield textfield-desk textfield-autocomplete textfield-autocomplete-mini sale_vs_itemId" id="sale_form_sale_vs_itemId_${item_lost}" selected = '[]'  max = '1' >

								<input class= 'elem' type="text" placeholder="" data-detail='{
									"key": [   
									{"dest":"textfield",    "act":"typing" }, 
									{"dest":"sale", "act":"beforeAutocomplete", "elem":"fullcont",  "entity": "sale_vs_return", "mainFilter": ["item.name","item.code"], "parent": "sale_form_sale_vs_itemId_${item_lost}"   }],
									"click": [ 
									{"dest":"sale", "act":"beforeAutocomplete", "elem":"fullcont",   "entity": "sale_vs_return", "mainFilter": ["item.name","item.code"], "parent": "sale_form_sale_vs_itemId_${item_lost}"   }]
								}' >

								<div class="chip-cont"> </div>
								<div class="dn otherField" data-detail='{"click": [ {"dest":"sale", "elem":"fullcont",  "act":"otherFieldItemLost" } ] }' ></div> 

							</div><!-- textfield -->
					</div>

	          	</div>
			</div>

			<div style="width:  57%;" >
				<div class="row">
					
					<div class="c16">
							<div class="textfield textfield-mini lost_qty"  >
								<input autocomplete="off"  class= 'elem' type="number"  placeholder="qty"  step="1" min="0"
								data-detail='{"key":   [{"dest":"textfield", "act":"typing"  },
														{"dest":"sale", "elem":"fullcont",  "act":"calculate_values_p_vs_lost"}] }' >

							</div><!-- textfield -->  
					</div><!-- c16 -->

					<div class="c16">
							<div class="textfield textfield-cash textfield-mini textfield-disabled lost_price"  >

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



					<div class="c25">
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
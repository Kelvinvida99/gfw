export function bodyAdmin(){
	return  [
	
		'purchase',
		'sale',
		'item',
		'customer',
		'investor',
		'provider',


		'accounts',		
		'investordeposit',
		'receivepayment',
	
		'otherexpense',
		'sentpayment',
        'admin',
	]	
}

export function body(){
	return 	{



	  		purchase: `
			   <div class="cont ">
				      
				      <div id='leftnav-purchase-page'  class='' data-detail='{"click": [ 
			                              {"dest":"ripple" }, 
			                              {"dest":"leftnav", "act":"select" },
			                              {"dest":"purchase", "elem":"page", "id":"purchase-page", "act":"show"  } ] }' >
			                <svg><use xlink:href="./css/svg.svg#purchase"></use></svg>
			                <label>Purchase</label>
				      </div>
			    </div>
	  		`,

	  		sale: `
			   <div class="cont cont_expad">
				      
				      <div id='leftnav-sale-page'  class='' data-detail='{"click": [ 
			                              {"dest":"ripple" }, 
			                              {"dest":"leftnav", "act":"select" },
			                              {"dest":"sale", "elem":"page", "id":"sale-page", "act":"show"  } ] }' >
			                <svg><use xlink:href="./css/svg.svg#purchase"></use></svg>
			                <label>Sale</label>
				      </div>
			    </div>
	  		`,

	  		item: `
			   <div class="cont ">
				      <div id='leftnav-item-page'  class='' data-detail='{"click": [ 
			                              {"dest":"ripple" }, 
			                              {"dest":"leftnav", "act":"select" },
			                              {"dest":"item", "elem":"page", "id":"item-page", "act":"show"  } ] }' >
			                 <svg><use xlink:href="./css/svg.svg#item"></use></svg>
			                 <label>Item</label>
				      </div>
			    </div>
	  		`,


	  		customer: `
			   <div class="cont ">
				      <div id='leftnav-customer-page'  class='' data-detail='{"click": [ 
			                              {"dest":"ripple" }, 
			                              {"dest":"leftnav", "act":"select" },
			                              {"dest":"customer", "elem":"page", "id":"customer-page", "act":"show"  } ] }' >
			                 <svg><use xlink:href="./css/svg.svg#customer"></use></svg>
			                 <label>Customer</label>
				      </div>
			    </div>
	  		`,

//xlink:href="data:img/png;base64,

	  		investor: `
			   <div class="cont ">
				      <div id='leftnav-investor-page'  class='' data-detail='{"click": [ 
			                              {"dest":"ripple" }, 
			                              {"dest":"leftnav", "act":"select" },
			                              {"dest":"investor", "elem":"page", "id":"investor-page", "act":"show"  } ] }' >
			                 <svg><use xlink:href="./css/svg.svg#investor"></use></svg>
			                <label>Investor</label>
				      </div>
			    </div>
	  		`,

	  		accounts: `
			   <div class="cont ">
				      
				      <div id='leftnav-accounts-page'  class='' data-detail='{"click": [ 
			                              {"dest":"ripple" }, 
			                              {"dest":"leftnav", "act":"select" },
			                              {"dest":"accounts", "elem":"page", "id":"accounts-page", "act":"show"  } ] }' >
			                <svg><use xlink:href="./css/svg.svg#account"></use></svg>
			                <label>accounts</label>
				      </div>
			    </div>
	  		`,

			provider: `
			   <div class="cont ">
				      
				      <div id='leftnav-provider-page'  class='' data-detail='{"click": [ 
			                              {"dest":"ripple" }, 
			                              {"dest":"leftnav", "act":"select" },
			                              {"dest":"provider", "elem":"page", "id":"provider-page", "act":"show"  } ] }' >
			                <svg><use xlink:href="./css/svg.svg#provider"></use></svg>
			                <label>Provider</label>
				      </div>
			    </div>
	  		`,


			investordeposit: `
			<div class="cont cont_expad">
					
					<div id='leftnav-investordeposit-page'  class='' data-detail='{"click": [ 
										{"dest":"ripple" }, 
										{"dest":"leftnav", "act":"select" },
										{"dest":"investordeposit", "elem":"page", "id":"investordeposit-page", "act":"show"  } ] }' >
						<svg><use xlink:href="./css/svg.svg#person"></use></svg>
						<label>Investor - Dep</label>
					</div>
			</div>
			`,

			receivepayment: `
			<div class="cont cont_expad">
					
					<div id='leftnav-receivepayment-page'  class='' data-detail='{"click": [ 
										{"dest":"ripple" }, 
										{"dest":"leftnav", "act":"select" },
										{"dest":"receivepayment", "elem":"page", "id":"receivepayment-page", "act":"show"  } ] }' >
						<svg><use xlink:href="./css/svg.svg#person"></use></svg>
						<label>Receive pay</label>
					</div>
			</div>
			`,


			sentpayment: `
			<div class="cont cont_expad">
					
					<div id='leftnav-admin-page'  class='' data-detail='{"click": [ 
										{"dest":"ripple" }, 
										{"dest":"leftnav", "act":"select" },
										{"dest":"sentpayment", "elem":"page", "id":"sentpayment-page", "act":"show"  } ] }' >
						<svg><use xlink:href="./css/svg.svg#person"></use></svg>
						<label>Sent pay</label>
					</div>
			</div>
			`,


			otherexpense: `
			<div class="cont cont_expad">
					
					<div id='leftnav-otherexpense-page'  class='' data-detail='{"click": [ 
										{"dest":"ripple" }, 
										{"dest":"leftnav", "act":"select" },
										{"dest":"otherexpense", "elem":"page", "id":"otherexpense-page", "act":"show"  } ] }' >
						<svg><use xlink:href="./css/svg.svg#person"></use></svg>
						<label>Other Expenses</label>
					</div>
			</div>
			`,

			admin: `
			   <div class="cont cont_expad">
				      
				      <div id='leftnav-admin-page'  class='' data-detail='{"click": [ 
			                              {"dest":"ripple" }, 
			                              {"dest":"leftnav", "act":"select" },
			                              {"dest":"admin", "elem":"page", "id":"admin-page", "act":"show"  } ] }' >
			                <svg><use xlink:href="./css/svg.svg#admin"></use></svg>
			                <label>Admin</label>
			                <div class="arrow" data-detail='{"click": [ {"dest":"leftnav", "act":"expand" } ] }'></div>
				      </div>



				      <div class="sub" id='leftnav-users-page' data-detail='{"click": [ 
							           {"dest":"ripple" },
							           {"dest":"leftnav", "act":"select" },
							           {"dest":"users", "elem":"page", "id":"users-page", "act":"show"  } ] }'  >
				          <svg><use xlink:href="./css/svg.svg#sub-right"></use></svg>
				          <label>Users</label>
				      </div>

				      <div class="sub" id='leftnav-areas-page' data-detail='{"click": [ 
						{"dest":"ripple" },
						{"dest":"leftnav", "act":"select" },
						{"dest":"areas", "elem":"page", "id":"areas-page", "act":"show"  } ] }'  >
							<svg><use xlink:href="./css/svg.svg#sub-right"></use></svg>
							<label>Areas</label>
						</div>

						<div class="sub" id='leftnav-item_unit-page' data-detail='{"click": [ 
							{"dest":"ripple" },
							{"dest":"leftnav", "act":"select" },
							{"dest":"item_unit", "elem":"page", "id":"item_unit-page", "act":"show"  } ] }'  >
								<svg><use xlink:href="./css/svg.svg#sub-right"></use></svg>
								<label>Item Units</label>
						</div>


			    </div>
	  		`,

			logout: ``,	

		}
}





module.exports = {
  	
  	default: { click: {dest: 'customer', elem: 'page', act: 'show', id: `customer-page`, leftnav: 'leftnav-customer-page', from:'leftnav' }, }, 

    //-------------------------------------------------------------------------------------------------------------------------------------
    purchase: {
      mainPage:true,
      activePage:'',
      click: {dest: 'purchase', elem: 'page', act: 'show', id: `purchase-page`, leftnav: 'leftnav-purchase-page', from:'leftnav' }, 
    }, 

    //-------------------------------------------------------------------------------------------------------------------------------------
    sale: {
      mainPage:true,
      activePage:'',
      click: {dest: 'sale', elem: 'page', act: 'show', id: `sale-page`, leftnav: 'leftnav-sale-page', from:'leftnav' }, 
    }, 

    //-------------------------------------------------------------------------------------------------------------------------------------
    
			inventory: {
				mainPage:true,
      	activePage:'',
				click: {dest: 'inventory', elem: 'page', act: 'show', id: `inventory-page`, leftnav: 'leftnav-inventory-page', from:'leftnav' }, 
			}, 

				item: {
		      mainPage:false,
				  parentPage:'inventory',
		      click: {dest: 'item', elem: 'page', act: 'show', id: `item-page`, leftnav: 'leftnav-inventory-page', }, 
		    }, 

		    areas: {
		      mainPage:false,
      		activePage:'',
		      parentPage:'inventory',
		      click: {dest: 'areas', elem: 'page', act: 'show', id: `areas-page`, leftnav: 'leftnav-inventory-page', }, 
		    }, 

		    item_unit: {
		      mainPage:false,
		      parentPage:'inventory',
		      click: {dest: 'item_unit', elem: 'page', act: 'show', id: `item_unit-page`, leftnav: 'leftnav-inventory-page', }, 
		    }, 


    //-------------------------------------------------------------------------------------------------------------------------------------
    customer: {
      mainPage:true,
      activePage:'',
      click: {dest: 'customer', elem: 'page', act: 'show', id: `customer-page`, leftnav: 'leftnav-customer-page', from:'leftnav' }, 
    }, 

		    provider: {
		      mainPage:false,
		      parentPage:'customer',
		      click: {dest: 'provider', elem: 'page', act: 'show', id: `provider-page`, leftnav: 'leftnav-customer-page', }, 
		    }, 


    //-------------------------------------------------------------------------------------------------------------------------------------
    transaction: {
		mainPage:true,
		activePage:'',
		click: {dest: 'transaction', elem: 'page', act: 'show', id: `transaction-page`, leftnav: 'leftnav-transaction-page', from:'leftnav' }, 
	  }, 
    
			  receivepayment: {
				mainPage:false,
				parentPage:'transaction',
				click: {dest: 'receivepayment', elem: 'page', act: 'show', id: `receivepayment-page`, leftnav: 'leftnav-accounts-page', }, 
			  }, 
  
  
			  sentpayment: {
				mainPage:false,
				parentPage:'transaction',
				click: {dest: 'sentpayment', elem: 'page', act: 'show', id: `sentpayment-page`, leftnav: 'leftnav-accounts-page', }, 
			  }, 
  
			  otherexpense: {
				mainPage:false,
				parentPage:'transaction',
				click: {dest: 'otherexpense', elem: 'page', act: 'show', id: `otherexpense-page`, leftnav: 'leftnav-accounts-page', }, 
			  },      

	//-------------------------------------------------------------------------------------------------------------------------------------
    admin: {
			mainPage:true,
			activePage:'',
			click: {dest: 'admin', elem: 'page', act: 'show', id: `admin-page`, leftnav: '' }, 
	  }, 
	dashboard: {
		mainPage:true,
		activePage:'',
		click: {dest: 'dashboard', elem: 'page', act: 'show', id: `dashboard-page`, leftnav: '' }, 
  	}, 


	report: {
		mainPage:true,
		activePage:'',
		click: {dest: 'report', elem: 'page', act: 'show', id: `report-page`, leftnav: '' }, 
	}, 

	users: {
		mainPage:true,
		activePage:'',
		click: {dest: 'users', elem: 'page', act: 'show', id: `users-page`, leftnav: '' }, 
	}, 

	employesspayment: {
		mainPage:true,
		activePage:'',
		click: {dest: 'employesspayment', elem: 'page', act: 'show', id: `employesspayment-page`, leftnav: '' }, 
	},

	equitydeposit: {
		mainPage:true,
		activePage:'',
		click: {dest: 'equitydeposit', elem: 'page', act: 'show', id: `equitydeposit-page`, leftnav: '' }, 
	},

	accounts: {
		mainPage:true,
		activePage:'',
		click: {dest: 'accounts', elem: 'page', act: 'show', id: `accounts-page`, leftnav: '' }, 
	},

}
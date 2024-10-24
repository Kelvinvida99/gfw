export function start( detail ){ //console.log('snackDefault -> ', detail)
  snackBody[detail.id].start(detail.msg) 
  return snackBody[detail.id]
}

const snackBody = {

//////////////////////////////////////ENTITY CUSTOMER
  billError: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = `Please enter Bill Address before proceeding`        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

//////////////////////////////////////ENTITY PURCHASE
  minAmountError: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = `Investment amount above the investment minimum`        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

  sellingError: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = `! Please note that the selling price is lower than the unit price`        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

  dueDateError: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = `The due date must be older than the current date`        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

  sellingTotalPriceError: { 
        title: '', long: false, btn: 'acptar', class:``, dataDetail:``,
        start: function(){  
          this.title   = `Total Selling Price must be higher than General Total Price`        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

//////////////////////////////////////ENTITY TRANSACTION
  noOption: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = `No options`        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

//////////////////////////////////////ACESS
  cantEdit: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = `You can't edit this entity`        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

  closeBeforeExit: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = `Closing elements before exit`        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },


  empty: { 
        title: '', long: true, btn: '', class:``, dataDetail:``,
        start: function(msg){  
          this.title   = msg        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

  hellow: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = 'Snack Default Text'        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },


  clickError: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = 'Click error'        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },


//////////////////////////////////////TEXTIELD
  inputErrors: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = 'Fix error before continue'        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

  atLeastOne: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = 'At least one element is require'        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

  restriction: { 
    title: '', long: false, btn: '', class:``, dataDetail:``,
    start: function(){  
      this.title   = 'This input is restricted'        //language.start('inProgress')     
      this.btn     = ''        //language.start('inProgress')     
    }
},


//////////////////////////////////////DB
  autocompleteMax: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = 'Max element reached'        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

  downloadError: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = 'Error downloading Data'        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

  downloadOk: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = 'The download was success'        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

  updateOk: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = 'The update was success'        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

  updateError: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = 'Error updating the element'        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

  updateNo: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = 'No changes were found'        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

  addOk: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = 'The element was added'        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

  addError: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = 'Error addeding the element'        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

//////////////////////////////////////Login
  loginOk: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = 'Authentication successfully'        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

  loginError: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = 'Authentication failed'        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },


//////////////////////////////////////FAB
  nothingToAdd: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = `No element to add on this page`        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },


//////////////////////////////////////WEBSOCKET
  socketOk: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = 'Websocket started'        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

  socketError: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = 'Websocket error'        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

  entityUpdate: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = 'This entity was updated'        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },


//////////////////////////////////////MAP
  mapError: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = `Error loading the map location`        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

//////////////////////////////////////SIGNATURE
  signatureEditError: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = `This signature can't be edited`        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

  signatureShort: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = `This signature is too short`        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

  signatureEmpty: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = `This signature is empty`        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

//////////////////////////////////////INTERNET
  internetDown: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = `Your internet is down`        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

  internetUp: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = `Your internet is on`        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },



//////////////////////////////////////SIGNATURE

  signatureTooshort: { 
        title: '', long: false, btn: '', class:``, dataDetail:``,
        start: function(){  
          this.title   = `The signature is too short`        //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

  insufficientQuantity: { 
    title: '', long: false, btn: '', class:``, dataDetail:``,
    start: function(){  
      this.title   = 'Insufficient quantity in inventory'        //language.start('inProgress')     
      this.btn     = ''        //language.start('inProgress')     
    }
  },

  noInvoicePending: { 
    title: '', long: false, btn: '', class:``, dataDetail:``,
    start: function(){  
      this.title   = 'There are no pending invoices'        //language.start('inProgress')     
      this.btn     = ''        //language.start('inProgress')     
    }
  },

  invalidValue: { 
    title: '', long: false, btn: '', class:``, dataDetail:``,
    start: function(){  
      this.title   = 'Invalid value'        //language.start('inProgress')     
      this.btn     = ''        //language.start('inProgress')     
    }
  },

  fillInvoiceRequired: { 
    title: '', long: false, btn: '', class:``, dataDetail:``,
    start: function(){  
      this.title   = 'An invoice must be affected'        //language.start('inProgress')     
      this.btn     = ''        //language.start('inProgress')     
    }
  },

  valueEqual: { 
    title: '', long: false, btn: '', class:``, dataDetail:``,
    start: function(){  
      this.title   = 'The value of the amount field must be equal to the total paid on the invoices'        //language.start('inProgress')     
      this.btn     = ''        //language.start('inProgress')     
    }
  },

  saleHasPayment: { 
    title: '', long: false, btn: '', class:``, dataDetail:``,
    start: function(){  
      this.title   = 'The sale has a payment. You Can not modified'        //language.start('inProgress')     
      this.btn     = ''        //language.start('inProgress')     
    }
  },

  purchaseHasPayment: { 
    title: '', long: false, btn: '', class:``, dataDetail:``,
    start: function(){  
      this.title   = 'The Purchase has a payment. You Can not modified'        //language.start('inProgress')     
      this.btn     = ''        //language.start('inProgress')     
    }
  },

  sendemail: { 
    title: '', long: false, btn: '', class:``, dataDetail:``,
    start: function(){  
      this.title   = 'Send Email...'        //language.start('inProgress')     
      this.btn     = ''        //language.start('inProgress')     
    }
  },

  accountidisless: { 
    title: '', long: false, btn: '', class:``, dataDetail:``,
    start: function(){  
      this.title   = 'This account can not be modified and deleted because it is default'        //language.start('inProgress')     
      this.btn     = ''        //language.start('inProgress')     
    }
  },

  greatersendamount: { 
    title: '', long: false, btn: '', class:``, dataDetail:``,
    start: function(){  
      this.title   = 'The send amount is greater than due amount'        //language.start('inProgress')     
      this.btn     = ''        //language.start('inProgress')     
    }
  },

  receivePaymentNoCredit: { 
    title: '', long: false, btn: '', class:``, dataDetail:``,
    start: function(){  
      this.title   = 'Selected Customer Does Not Have Credit Available'        //language.start('inProgress')     
      this.btn     = ''        //language.start('inProgress')     
    }
  },

  receivePaymentNoCustomer: { 
    title: '', long: false, btn: '', class:``, dataDetail:``,
    start: function(){  
      this.title   = 'Please, Select a Customer'        //language.start('inProgress')     
      this.btn     = ''        //language.start('inProgress')     
    }
  },



}/*const*/




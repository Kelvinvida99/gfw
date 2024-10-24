import gokuFullcontStepper from "./goku-fullcont-stepper.html";

const dialog               = require ('../../components/dialog/dialog')
const fullcont             = require ('../../components/fullcont/fullcont')
const fullcontForm         = require ('../../components/fullcont/fullcont-form')
const fullcontHandler      = require ('../../components/fullcont/fullcont-handler')
// const stepper              = require ('../../components/stepper/stepper')
// const stepperFormHandler   = require ('../../components/stepper/stepper-form-handler')
// const stepperHandler       = require ('../../components/stepper/stepper-handler')
const {formCopy}           = require('./goku-fullcont-stepper-form')
const {form}               = require('./goku-fullcont-stepper-form')


/****************ELEMENTS*****************/

var fullcontHTML  = ''
var HTMLwasSelected       = false

/****************ELEMENTS*****************/

export function start(detail, ev){ console.log('goku gokuFullcontStepper ############>', detail)
  
  	if(!HTMLwasSelected) {  //insert the fullcont on the body and select the inputs
				fullcontHTML      = fullcontHandler.HTMLselect(gokuFullcontStepper, form, formCopy, 'goku-fullcont-withStepper') 
				HTMLwasSelected   = true  	
  	} 

	switch (detail.act){  	
   		  case 'prepareAdd':     stepperHandler.prepareAdd(detail, form, formCopy);          break;
   		  case 'move':           stepper.move(detail, form);                                 break;
   		  case 'hide':           hide(detail);                break;
		  case 'addOne':         addOne(detail);                break;
   		  case 'saveFromDialog': saveFromDialog(detail);              break;
		  case 'discard':        discard(detail);             break;
	}
}


function saveFromDialog(detail){ console.log('saveFromDialog>')
	                                                           
		addOne(detail)
}


function addOne(detail){ console.log('goku addOne>')
																							  //we don't have tab on stepper  
		if( fullcontForm.checkRequired(form, false) ){  return	}   
		
		//we should have here the db request
		fullcontForm.clean(form)
		stepper.moveIndirect(fullcontHTML, 1) 
		fullcont.start({act:"hide", id:"goku-fullcont-withStepper"})	
}




function discard(detail){ console.log('goku discard>')

	dialog.start({act:"hide"})	

	fullcontForm.clean(form)
	stepper.moveIndirect(fullcontHTML, 1)
	fullcont.start({act:"hide", id:"goku-fullcont-withStepper"})	
}




function hide(detail){ console.log('goku hide>>>>>>>>>>>>>>>>')

 	stepperHandler.hide(detail, form, formCopy);
}



//https://www.npmjs.com/package/validator

const validator      = require('./validator.min')
const {changeSVG} = require('../../js-handler/graphic')
const password    = require('./textfield-password')

// console.log('x4', validator.isAfter('2000-10-15', '2010/01/01'))

export function start(detail){ //console.log('textfile-validator#############')
	setTimeout(()=>{

		const type  = detail.validator
		const value = detail.ev.target.value
		eva(detail.ev, type, value)


	},100)
}

function eva(ev, type, value){
	 switch(type){
	 	//case "email":       validator.isEmail(value)                ? completed(ev) : incomplete(ev); break;
	 	case "email":         email(ev, value);                    break;
	 	case "phone":         phone(ev, value);                    break;
	 	case "date":          date(ev, type, value);               break;
	 	case "passIsStrong":  passIsStrong(ev, type, value);       break;
	 	case "noEmpty":       noEmpty(ev, type, value);            break;
	 	case "ssn":           ssn(ev, type, value);                break;

	 }
}

function phone(ev, value){ 
	
	validator.isMobilePhone(value, 'en-US') ? completed(ev) : incomplete(ev);

}

//thsi module was unistall to avoid problems with Json pc
//https://www.npmjs.com/package/ssn-validator > only for SSN validation
//const ssnValidator   = require('ssn-validator')
function ssn(ev, value){ 

 	const target     =  ev.target 	
 	const inputValue =  ev.target.value 
 	//const isValid    =  ssnValidator.isValid(inputValue)
 	const isValid    = true

    if (isValid)  { completed(ev);  }
    else          { incomplete(ev); }  


}



function email(ev, value){ //console.log('email>', ev)
	
	if(value === ''){

		const parent    = ev.target.parentElement
		parent.classList.remove('textfield-error')
		parent.classList.remove('textfield-completed')
		return
	}

	validator.isEmail(value)? completed(ev) : incomplete(ev)

}

export function noEmpty(ev, type, value){ 


	const inputValue = ev.target.value
	const cleanValue = inputValue.replace(/\s/g, '')

	if(cleanValue.length < 2 ){ incomplete(ev, 'Min 2 letters') }
	else                      { completed(ev)                   }	


	//console.log('NO EMPTY VALUES ALLOWED', cleanValue.length )

}/**/


export function passIsStrong(ev, type, value){ //console.log('passIsStrong>>>>', value)

	const parent = ev.target.parentElement	
	const mess   = password.isStrong(value)
	
	if( mess === 'empty' ){
		parent.classList.remove('textfield-error')
		parent.classList.remove('textfield-completed')
		return
	}
	if( mess != true ){ incomplete(ev, mess) }
	else              { completed(ev)        }

}/**/


export function incomplete(ev, mess){ // console.log('Incomplete')

	const parent     = ev.target.parentElement
	const helper     = parent.querySelector('.helper')
	const trailing   = parent.querySelector('.trailing')	
	const isPassword = parent.classList.contains('textfield-password')

	parent.classList.add('textfield-error')
	parent.classList.remove('textfield-completed')



	//date input don't have trailing/password don't change it
	if(trailing != undefined && isPassword === false){
			changeSVG(trailing, 'error')
	}

	//date input don't have trailing/password don't change it
	if(helper != undefined){
		if(mess === undefined){helper.innerHTML = 'Incomplete' }
		else{helper.innerHTML = mess}
	}




}/**/


export function completed(ev){    //console.log('completed')

	const parent     = ev.target.parentElement
	const helper     = parent.querySelector('.helper')
	const trailing   = parent.querySelector('.trailing')	
	const isPassword = parent.classList.contains('textfield-password')

	parent.classList.add('textfield-completed')
	parent.classList.remove('textfield-error')
	if(helper != undefined) { helper.innerHTML = 'Completed' }

	//date input don't have trailing/password don't change it
	if(trailing != undefined && isPassword === false){
			changeSVG(trailing, 'check-round')
	}


}/**/


function date(ev, type, value){ //onsole.log('date', value)
	
	var year = 0 
	if(value != ''){
		year =  parseInt(value.split('-')[0])		
	}

	if( year > 2050){ 
		incomplete(ev, 'max 01/01/2050')
		return
	}

	if( year < 1900 ){ 
		incomplete(ev, 'Min 01/30/1900')
		return
	}

	if( validator.isAfter(value, '1900/01/01') ) {
		completed(ev);
	}

}/**/



export function onlyLetters(value){ //console.log(' validator required'); 

    var  newValue = value.toLowerCase()
    
    //replace all the spaces
    newValue = newValue.split('').filter(e => e.trim().length).join('')
    
    //remove all exept numbers or letters
    newValue = newValue.replace(/[^\w\s]/g,'')

    return newValue

}/**/







export function required(ev){ //console.log(' validator required'); 

	alert('Gosive - Admin - textfield-validator.js error check this function')

	const elem  = ev.target
	const type  = ev.target.getAttribute('data-validate')
	const value = ev.target.value

	if(elem.classList.contains('Lk_required') && value === ''){
		incomplete(ev)
		return
	}

	eva(ev, type, value)

}



export function phoneSetFormat(number) {
	var phone = number
	
	    phone = phone.replace(/\D/g, '')
	    phone = phone.slice(0,3)+"-"+phone.slice(3,6)+"-"+phone.slice(6,15)

    return phone
}


const {changeSVG} = require('../../js-handler/graphic')
const validator   = require('./textfield-validator')
const password    = require('./textfield-password')
const textfieldHandler      = require ('./textfield-handler')
const snack      = require ('../snack/snack')


//from click.js
//this funtion can recived multiples act events
//data-detail='{"key": "textfield",  "act":"typing validate" }'

export function start(detail){ //console.log('textfild start' )
    
    switch (detail.act){
        case 'typing':    typing(detail.ev);       break; 
        case 'clear':     clear(detail.ev);        break; 
        case 'password':  password.showHide(detail.ev);        break; 
        case 'validator': validator.start(detail); break; 
        case 'noEmptyReq':   noEmptyReq(detail); break; 
        case 'restriction':  restriction(detail); break; 

    }  
}

function restriction(detail){  //console.log('typing>')
	 
	snack.start({ act:'show', id:'restriction', })

}

//from key.js
function typing(ev){  //console.log('typing>')

	const elem    = ev.target
	const parent  = elem.parentElement //textfield div
	
	setTimeout(()=>{
		//input empty or filled
		elem.value === '' ? 
		parent.classList.remove('textfield-filled') : 
		parent.classList.add('textfield-filled')
		
		if (elem.tagName === 'TEXTAREA'){
			textarea(elem)
		}
	
	},100)

}



//when user click the clean btn on the input
function clear(ev){ //console.log('clear>')

	const  parent = ev.target.parentElement
	const  elem  = parent.querySelector('.elem')

	//to keep time on 00:00
 	if(elem.type === 'time'){ elem.value = '00:00' }
 	else                    { elem.value = ''      }
	

	parent.classList.remove('textfield-filled')
	parent.classList.remove('textfield-error')
	parent.classList.remove('textfield-completed')

	changeSVG(parent.querySelector('.trailing'), 'cancel')

	elem.focus() //keep input focus


	if (elem.tagName === 'TEXTAREA'){
		textarea(elem)
	}
}


//handle textarea increase
function textarea(elem){

	if(elem.value === ''){
		elem.style.height = '56px'
		return
	}

	if ( navigator.userAgent.indexOf("Firefox") != -1 ){
		 if (event.keyCode === 13) { 
			  setTimeout(function(){
			    elem.style.cssText = 'height:auto; padding:0';
			    // for box-sizing other than "content-box" use:
			     elem.style.cssText = '-moz-box-sizing:content-box';
			     elem.style.cssText = 'height:' + el.scrollHeight + 'px';
			  },0);

		 }
	}

	else {

		  setTimeout(function(){
		    elem.style.cssText = 'height:auto; padding:0';
		    elem.style.cssText = '-moz-box-sizing:content-box';
		    elem.style.cssText = 'height:' + elem.scrollHeight + 'px';
		  },0);
	}

}/**/

//inreate the size of the fullcont, incase that it have enters
export function textareaIncreaseAll(fullcontParent){ //console.log('increase all the textareas DDDDDDD')

    const textareaAll = fullcontParent.querySelectorAll('textarea')
   
    textareaAll.forEach((elem)=>{
    	textarea(elem)
    })
}/**/



//handle textarea 
function noEmptyReq(detail){ //console.log('noEmptyReq>>>>>')

	const  parent = detail.ev.target.parentElement
	const  elem   = parent.querySelector('.elem')

console.log('noEmptyReq>>>>>')


	if( textfieldHandler.isEmpty(parent) ){
		parent.classList.add('textfield-error')
		parent.classList.remove('textfield-completed')
	
	}else{
		parent.classList.remove('textfield-error')
		parent.classList.add('textfield-completed')

	}

}/**/


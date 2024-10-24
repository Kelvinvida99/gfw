
const {changeSVG} = require('../../js-handler/graphic')

export function showHide(ev){ //console.log('showHide>')
	
	const elem    = ev.target
	const parent  = elem.parentElement //textfield div
	const input   = parent.querySelector('input') //textfield div


	if(  parent.classList.toggle("password-noview")  ){

		changeSVG(parent.querySelector('.trailing'), 'eye')
		input.type='password'
	
	}else{

		changeSVG(parent.querySelector('.trailing'), 'eye-no')
		input.type='text'
	}


}/**/





function passwordBlur(ev){ //console.log('passwrod blur')
	
	const  parent = ev.target.parentElement
	const  elem  = parent.querySelector('.elem')

	if( parent.classList.contains('textfield-passwordBlur') ){ 
		parent.classList.remove('textfield-passwordBlur')	
		changeSVG(parent.querySelector('.trailing'), 'noview')

	}else{ 
		parent.classList.add('textfield-passwordBlur')	
		changeSVG(parent.querySelector('.trailing'), 'view') 
	}

}



//https://stackoverflow.com/questions/50547523/how-can-i-use-javascript-to-test-for-password-strength-in-a-way-that-returns-the

export function isStrong(value) { console.log('lenght passowrd', value.length === 0 )

    if (value.length === 0 ){
    	return "empty"
    }   

    if (value.indexOf(' ') >= 0){
        return "No spaces allowed"
    }

    if (!value.match(/[a-z]+/)){
        return "At least one letter lowercase"
    }
    
    if (!value.match(/[A-Z]+/)){
        return "At least one capital"
    }
    
    if (!value.match(/[0-9]+/)){
        return "At least one number"
    }
    
 //    if (!value.match(/[$@#&!]+/)){
 //       return "At least one Symbol @#$%"
	// }
 


    if (value.length < 7 ){
    	return "Minimum is 7"
    }

    if (value.length > 20){
        return "Maximum is 20"
	}

	return true
 
}






/*************************AutoGenerate password*******/
export function autoGenerate(){
	
	const password = (specials.pick(1) + lowercase.pick(1) + uppercase.pick(1) + all.pick(3, 10)).shuffle();
	
	return password
}


/*************************AutoGenerate password*******/

var specials  = '!@#$%^&*()_+{}:"<>?\|[];\',./`~'
var lowercase = 'abcdefghijklmnopqrstuvwxyz'
var uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
var numbers   = '0123456789'

var all = specials + lowercase + uppercase + numbers

String.prototype.pick = function(min, max) {
    var n, chars = ''

    if (typeof max === 'undefined') {
        n = min
    } else {
        n = min + Math.floor(Math.random() * (max - min))
    }

    for (var i = 0; i < n; i++) {
        chars += this.charAt(Math.floor(Math.random() * this.length))
    }

    return chars
};


// Credit to @Christoph: http://stackoverflow.com/a/962890/464744
String.prototype.shuffle = function() {
    var array = this.split('')
    var tmp, current, top = array.length

    if (top) while (--top) {
        current = Math.floor(Math.random() * (top + 1))
        tmp = array[current]
        array[current] = array[top]
        array[top] = tmp
    }

    return array.join('')
}



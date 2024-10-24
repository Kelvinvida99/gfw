

//this document is only made to handle the focus out of the textfield
const textfieldValidator = require('../components/textfield/textfield-validator')
const textfield = require('../components/textfield/textfield')

document.addEventListener('focusout', (ev) => { 

    ev = ev || window.event;

    const classes = ev.target.className
    if (classes === "" ) {return} ; //avoid error, empty elements
    const spliter = classes.split(" ")      

    spliter.forEach((element)=>{
      if(element.startsWith('Lk_')) { //only 
        call(element, ev)
      }
    })

});



function call(func, ev){ console.log('foucstout')

	switch (func){
        case 'Lk_required':   textfield.required(ev); break;
        case 'Lk_validate':   textfieldValidator.required(ev); break;

	}
}


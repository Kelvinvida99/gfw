const drawer   = require('../drawer/drawer')
const dialog   = require('../dialog/dialog')
const fullCont = require('../fullCont/fullCont')



/****************ELEMENTS*****************/
var scrim 	
var scrimGlass 


var wasSelectHtml = false
function selectHTML(){ //console.log('selectHTML')
	scrim 	   = document.getElementById('scrim')
	scrimGlass = document.getElementById('scrimGlass')

	wasSelectHtml  = true
}
/****************ELEMENTS*****************/


//serving → elem in front of scrim
function show(ev, serving){ //console.log('Lc_drawerShow')
	if(!wasSelectHtml) {selectHTML()}
	switch (serving){
		case 'drawer':   showScrim(true, serving);  drawer.show();		break;
		case 'fullCont': showScrim(true, serving);  fullCont.show(ev); 	break;
		case 'dialog':   showScrim(false, serving); dialog.show(); 		break;
	}
}

//normal scrim | normal true | scrimGlass → normal false
function showScrim(normal, serving){ //console.log('showScrim', normal, serving)

	if(normal){
		scrim.classList.add('scrim-show')
		scrim.setAttribute('data-serving', serving)			
		return
	}else{
		scrimGlass.classList.add('scrim-show')
		scrimGlass.setAttribute('data-serving', serving)
		return				
	}

}

function hide(ev){ 
	if(!wasSelectHtml) {selectHTML()}
	
	const elem    = ev.target
	const serving = elem.getAttribute("data-serving")

	switch ( serving ){
		case 'drawer':    drawer.hide(); 		break;
		case 'fullCont':  fullCont.hide(ev); 	break;
		case 'dialog':    dialog.hide(ev); 		break;
	}	

	if(elem.classList.contains('crim-glass')){
		scrimGlass.classList.remove('scrim-show')
		return
	}else{
		scrim.classList.remove('scrim-show')	
		return	
	}



}






module.exports = {
	show:show,
	hide:hide

}

const tabObj           = require('./tabObj').inf
const moveVertical     = require('./move-vertical')
const moveHorizontal   = require('./move-horizontal')
const endHorizontal    = require('./end-horizontal')
const endVertical      = require('./end-vertical')


export function Lt_tab(ev, touch){
  switch(touch){
         case "touchstart": touchstart(ev); break;
         //case "touchstart": tabObj.init(ev); break;
         case "touchmove":  touchmove (ev); break;
         case "touchend":   touchend  (ev); break;
  }  
}

function touchstart (ev){ 
	tabObj.init(ev)
}

function touchmove (ev){ 
	
	tabObj.distX = ev.changedTouches[0].clientX - tabObj.startX
	tabObj.distY = ev.changedTouches[0].clientY - tabObj.startY

	if (tabObj.verticalMov === undefined){
		if(Math.abs(tabObj.distY) > Math.abs(tabObj.distX)) {
			   tabObj.verticalMov = true
		}else{ tabObj.verticalMov = false }		
	}

	//is the movement vertical or horizontal
	tabObj.verticalMov ? moveVertical.mov(ev) : moveHorizontal.mov(ev)


}

function touchend   (ev){ 
//is the movement vertical or horizontal	
	tabObj.verticalMov ? endVertical.mov(ev) : endHorizontal.mov(ev)
}
















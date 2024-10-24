

const dialog    = require('../components/dialog/dialog')
const menu      = require('../components/menu/menu')
const fullcont  = require('../components/fullcont/fullcont')
const drawer    = require('../components/drawer/drawer')
const signature = require('../components/signature/signature')
const backdrop  = require('../components/backdrop/backdrop')


export function hide(elem){ //console.log('bridge>', elem)
  
  switch (elem){
      case 'backdrop':  backdrop.start({act:'hide'});  break;
      case 'dialog':    dialog.start({act:'hide'});    break;
      case 'drawer':    drawer.start({act:'hide'});    break;
      case 'menu':      menu.start({act:'hide'});      break;
      case 'signature': signature.start({act:'hide'}); break;

  }

  //we click the close button of the fullcont
  if( elem.startsWith("fullcont-") ){ //console.log('is a fullcont>')

      const fullcontHtml = document.getElementById(`${elem}-close`)
  	  
      if(fullcontHtml != undefined){ fullcontHtml.click() }
	 
  }/**/



}



const backdrop  = require('../components/backdrop/backdrop')
const dialog    = require('../components/dialog/dialog')
const drawer    = require('../components/drawer/drawer')
const fullcont  = require('../components/fullcont/fullcont')
const menu      = require('../components/menu/menu')
const signature = require('../components/signature/signature')
const file      = require('../components/file/file')

const onboard   = require('../components/onboard/onboard')
const settings  = require('../js-handler/settings')



export function hide(elem, lastShowed, lastPageHidden){  console.log('bridge>', elem, lastPageHidden)
  
  switch (elem){
      case 'dialog':           dialog.start({act:'hide'});           break;
      case 'menu':             menu.start({act:'hide'});             break;
      case 'drawer':           drawer.start({act:'hide'});           break;
      case 'signature':        signature.start({act:'hide'});        break;
      case 'file_full':        file.start({act:'hideFull'});         break;
      case 'avatar_full':      file.start({act:'hideAvatarFull'});   break;
      case 'hideRenameDialog': file.start({act:'hideRenameDialog'}); break;
      case 'hideNewFolder':    file.start({act:'hideNewFolder'});    break;
      case 'backdrop':         backdrop.start({act:'hide'});         break;
      case 'onboard':          onboard.start({act:'hide'});          break;

  }

  //we click the close button of the fullcont
   //on pc, back don't works with fullcont
  if( elem.startsWith("fullcont-") ){ //console.log('is a fullcont>',  lastShowed, lastPageHidden)

      const fullcontId   = elem.replace('fullcont-','')
      const fullcontHtml = document.getElementById(`${fullcontId}-close`)
      
      // console.log('fullcontHtml>', fullcontId)
      // console.log('fullcontHtml>', fullcontHtml)
      
      if(fullcontHtml != null){ fullcontHtml.click() }
   
  }

  if( elem.startsWith("page-") ){  // console.log('is a page>', settings.getData().typeApp, elem)

    var pageId       = ''
    var leftnavHtml  = ''
    var appnavHtml   = ''
    var settingsData = settings.getData()

    if(lastShowed === lastPageHidden)   {return}

    if(settingsData.typeApp === "nurse"){
        pageId        = lastPageHidden.replace('page-','')
        appnavHtml   = document.getElementById(`appnav-${pageId}`)
        //this entity have a value on the leftnav menu
        if(appnavHtml != null){ 
           appnavHtml.click() 
        }
    }   

    if(settingsData.typeApp === "staff"){
        pageId        = lastPageHidden.replace('page-','')
        leftnavHtml   = document.getElementById(`leftnav-${pageId}`)
       
        //this entity have a value on the leftnav menu
        if(leftnavHtml != null){ 
           leftnavHtml.click() 
        }
    }   



      

  }

}



// function pageAnalizer(){

// }
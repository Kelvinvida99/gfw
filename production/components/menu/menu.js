

const backControl     = require('../../js/back-control')
const {menuDefault}   = require('./menu-default')
const {menuGenerator} = require('./menu-generator')

/****************ELEMENTS*****************/
var menu      
var scrimMenu  
var HTMLwasSelected = false

function HTMLselect(){ //console.log('HTMLselect')

  menu          = document.getElementById('menu')
  scrimMenu     = document.getElementById('scrim_menu')
  HTMLwasSelected = true
}
/****************ELEMENTS*****************/


export function start(detail){ //console.log('menu start >', detail)

    switch (detail.act){
        case 'show':          show(detail);               break; 
        case 'hide':          hide();               break; 
    }
}


export function show(detail){  console.log('menu show1>', detail)

  if(!HTMLwasSelected) {HTMLselect()}


  var bodyMenu = ''

  //create html elements or generate one default
    switch (detail.html){
        case undefined:       bodyMenu = menuDefault(detail);       break; 
        default:              bodyMenu = detail.html ;
    }


  //fill the menu
  menu.innerHTML = menuGenerator(detail.html)
  
  //show the element
  menu.classList.add('menu-show')
  menu.classList.remove('menu-hide')

  position(detail.ev)

  scrimMenu.classList.add('scrim-show')

  //add to the url
  backControl.hashAdd({toShow:'menu'})

}


export function hide(){  //console.log('menu hide>')

  if(!HTMLwasSelected) {HTMLselect()}

  menu.classList.add('menu-hide')
  scrimMenu.classList.remove('scrim-show')

  //remove to the url
  backControl.hashSub({toHide:'menu'})

  remove(()=>{
      menu.classList.remove('menu-hide')
      menu.classList.remove('menu-show')
      menu.innerHTML = ''
  })
}


function position(ev){ //console.log('position ev', ev)

    var px=0; 
    var py=0; 
   // const ev = event.getEv()
    //in case of page reload, the ev is undefined, just return
    if  (ev === undefined || ev === "") {return}

    const elem     = ev.target

    const bounding = elem.getBoundingClientRect() //get element position

    //get X position → respect the edges of screem
    if ( bounding.left  + menu.offsetWidth > window.innerWidth ){
            px = bounding.left -  menu.offsetWidth  
    }else { px = bounding.left;}  


    //get Y position → respect the edges of screem
    if ( bounding.top +  menu.offsetHeight >  window.innerHeight ){
           py = bounding.top -  menu.offsetHeight  }
    else { py = bounding.top +  elem.offsetHeight  }

    menu.style.left = `${px}px`
    menu.style.top  = `${py}px`

}



function remove(callback){
	setTimeout(()=>{
		callback()
	}, 300)
}



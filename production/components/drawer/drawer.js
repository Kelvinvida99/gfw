
const backControl = require('../../js/back-control')
const string      = require('../../js-handler/string')


/****************ELEMENTS*****************/
const   drawer  = { html : ''}
var     scrimDrawer

var HTMLwasSelected = false
function HTMLselect(){ //console.log('HTMLselect')

   drawer.html      = document.querySelector('#drawer')
   scrimDrawer      = document.getElementById('scrim_drawer')

    HTMLwasSelected  = true
}
/****************ELEMENTS*****************/


export function start(detail){ //console.log('drawer start >', detail)
    
    if(!HTMLwasSelected) {HTMLselect()}
    
    switch (detail.act){
        case 'show':          show();               break; 
        case 'hide':          hide();               break; 
        case 'generator':     generator(detail.data);               break; 

    }
}

function generator(data){ //console.log('drawer generator>', data)
    
    const title   = drawer.html.querySelector('.header .title')
    const des     = drawer.html.querySelector('.header .des')
    const avatarD = drawer.html.querySelector('.avatarD') 
   
    title.innerHTML = string.capitalizeFirstLetter( data.company )
    des.innerHTML   = string.capitalizeFirstLetter( `${data.name} - ${data.right}`    ) 
   
    if(data.avatar != ''){
          avatarD.style.backgroundImage = `url('${data.avatar}')`;
    }
  

}/*show*/


function show(){ //console.log('drawer show>')
    
    drawer.html.classList.add('drawer-anime')
    drawer.html.classList.add('drawer-show')
    drawer.html.setAttribute("style", `left: 0px`)

    scrimDrawer.classList.add('scrim-show')

    //add to the url
    backControl.hashAdd({ toShow:`drawer` })

}/*show*/



function hide() { //console.log('drawer hide >')
  
  //remove to the url
  backControl.hashSub({ toHide:`drawer` })

    remove(()=>{
        scrimDrawer.classList.remove('scrim-show')
        scrimDrawer.setAttribute('data-serving', '')

        drawer.html.classList.add("drawer-anime")
        drawer.html.classList.add("drawer-hide")
        drawer.html.setAttribute("style", `left: -${drawer.html.clientWidth}-50px`)

        drawer.html.classList.remove('drawer-show')
        drawer.html.classList.remove('drawer-hide')

         //console.log('drawer show 123456>', drawer.html)
         
    }) 

}/*hide*/


function remove(callback){
  setTimeout(()=>{ callback() }, 100)
}



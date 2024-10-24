const drawer = require('./drawer')

var startX = 0
var distX = 0


/****************ELEMENTS*****************/
var drawerElem
var scrimDrawer
var wasSelectHtml = false

function selectHTML(){ //console.log('selectHTML')
  
   drawerElem     = document.getElementById('drawer')
   scrimDrawer    = document.getElementById('scrim_drawer')

   wasSelectHtml  = true
}
/****************ELEMENTS*****************/


// console.log ('drawer.elem', drawer.elem)
function init (ev, touch){
  
  if(!wasSelectHtml) {selectHTML()}

  switch(touch){
         case "touchstart": touchstart(ev); break;
         case "touchmove" : touchmove(ev);  break;
         case "touchend"  : touchend(ev);   break;
  }
}


function touchstart(ev){ console.log('touchstart', )
   // get x position of touch point relative to left edge of browser
   startX = parseInt(ev.changedTouches[0].clientX) 
   drawerElem.classList.remove("drawer-anime")  
}

function touchmove(ev){   console.log('touchmove', )

     distX = parseInt(ev.changedTouches[0].clientX) - startX
     //var mov = (parseInt((drawer.style.marginLeft).replace(/px/,""))+distX)+"px"

     if(distX <= 0){
        drawerElem.setAttribute("style", `left: ${distX}px`)
     }
}

function touchend(ev){ console.log('touchendxxxx', )
      
      drawerElem.classList.add("drawer-anime") //

      if( parseInt((drawerElem.style.left).replace(/px/,"")) < -(drawerElem.clientWidth/4)){
         
        drawer.start({act:'hide'})

        return

      }else{  drawerElem.setAttribute("style", `left: 0px`) }

}       


module.exports = { init:init } 
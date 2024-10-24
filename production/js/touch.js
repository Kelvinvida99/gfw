const drawer    = require('../components/drawer/drawer-touch')
const tabTouch  = require('../components/tab/tab-touch')



document.body.addEventListener('touchstart',function(ev){

    ev.stopPropagation();
    let classes = ev.target.className.split(" ")//convert to array  
    
    classes.forEach((element)=>{ //call all the function
      if(element.startsWith('Lt_')) { //only 
        callFunction(element, ev, 'touchstart')
      }
    })

 },  {passive: true}, false)

document.body.addEventListener('touchmove',function(ev){

    ev.stopPropagation();
    let classes = ev.target.className.split(" ")//convert to array  
    
    classes.forEach((element)=>{ //call all the function
      if(element.startsWith('Lt_')) { //only 
       callFunction(element, ev, 'touchmove')
      }
    })


 },  {passive: true}, false)


document.body.addEventListener('touchend',function(ev){


    ev.stopPropagation();
    let classes = ev.target.className.split(" ")//convert to array  
    
    classes.forEach((element)=>{ //call all the function
      if(element.startsWith('Lt_')) { //only 
       callFunction(element, ev, 'touchend')
      }
    })

},  {passive: true}, false)


function callFunction(func, ev, touch){

  switch (func){
    case 'Lt_tab':      tabTouch.Lt_tab(ev, touch);  break;
    case 'Lt_drawer':   drawer.init(ev, touch);     break;
  }
}




export function start(detail){console.log('appbar mai>')
    
    switch (detail.act){
        case 'showSecond':       showSecond(detail);     break;   
        case 'hideSecond':       hideSecond(detail);     break;   

    }    
}


function showSecond(detail){ 

  const elem   = detail.ev.target
  const appbar = elem.parentElement.parentElement//.querySelectorAll('fullcont__body')
  appbar.classList.add('appbar-show-second')

}

function hideSecond(detail) {

  const elem   = detail.ev.target
  const appbar = elem.parentElement.parentElement//.querySelectorAll('fullcont__body')
  appbar.classList.remove('appbar-show-second')
}








const checkDevice = require('../../js-handler/check-device')

import howEnableHtml  from "./howEnable.html";


export function show(detail){ console.log('howEnable>',checkDevice.detail())
    
    const body = document.body  
    const deviceDetails =  checkDevice.detail()

   if(deviceDetails.deviceOs === 'Windows'){
      console.log('chrome-desktop.gif')
      //return
   }

    body.insertAdjacentHTML("beforeend", howEnableHtml)

}

export function changeGif(detail){  console.log('changeGif>' )

  const img = document.getElementById('confirmation-map-img')

  img.style.backgroundImage = `url('./css/gif/${detail.id}')`;




}

export function hide(detail){ console.log('howEnableHide>',)

  const confirmationMap = document.getElementById('confirmation-map')
 
   confirmationMap.classList.add('confirmation-hide')
   remove(()=>{
        confirmationMap.remove()
   })

}

function remove(callback){
  setTimeout(()=>{
    callback()
  }, 500)
}


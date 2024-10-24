
const webSocket  = require('./web-socket')
const snack      = require ('../components/snack/snack')



var isEnable =  false
export function enable(){
   isEnable = true
}


window.addEventListener('online',  ()=>{  online()   })
window.addEventListener('offline', ()=>{  offline()  })




function offline(){  if(!isEnable){  return }

  console.log('offline on offline>')

  webSocket.closeDefinitive()  
  snack.start({act:'show', id:'internetDown'})
}



function online(){ if(!isEnable){  return }

  console.log('offline on offline>')

  webSocket.init()  
  snack.start({act:'show', id:'internetUp'})
}
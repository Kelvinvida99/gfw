

/****************ELEMENTS*****************/
var wasSelectHtml = false
var avatar = ''
var status = ''

function selectHTML(){ //console.log('selectHTML')
  avatar = document.querySelector('#avatar')
  status = avatar.querySelector('.status')
  wasSelectHtml  = true
}

/****************ELEMENTS*****************/
 

export  function up(){ if(!wasSelectHtml) selectHTML()

  avatar.classList.add('avatar-online')
  avatar.classList.remove('avatar-away')
  rotation()
}

export function down(){  if(!wasSelectHtml) selectHTML()

   avatar.classList.add('avatar-away')
   avatar.classList.remove('avatar-online')
   rotation(avatar)
}

export function pop(){ //console.log('POPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP')

   avatar.classList.add('avatar-pop')
   remove200(()=>{ avatar.classList.remove('avatar-pop') })
}

//rotate the greexn circle
function rotation(){
   status.classList.add('rotation')
   remove(()=>{ status.classList.remove('rotation') })
}


function remove(callback){
  setTimeout(()=>{
    callback()
  }, 500)
}

function remove200(callback){
  setTimeout(()=>{
    callback()
  }, 200)
}
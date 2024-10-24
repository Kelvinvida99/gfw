
/****************ELEMENTS*****************/
var HTMLwasSelected = false
var avatar = ''
var status = ''

function HTMLselect(){ //console.log('selectHTML')   
  avatar = document.querySelector('#avatar')
  status = avatar.querySelector('.status')
  HTMLwasSelected  = true
}

/****************ELEMENTS*****************/ 

export function start(detail){console.log('appbar mai>')

    if(!HTMLwasSelected) { HTMLselect() }

    switch (detail.act){
        case 'reload':      location.reload();     break;   


    }    
}

 

export  function up(){ if(!HTMLwasSelected) { HTMLselect() }

  avatar.classList.add('avatar-online')
  avatar.classList.remove('avatar-away')
  rotation()
}

export function down(){  if(!HTMLwasSelected) { HTMLselect() }

   avatar.classList.add('avatar-away')
   avatar.classList.remove('avatar-online')
   rotation(avatar)
}


//rotate the greexn circle
function rotation(){
   status.classList.add('avatar-rotation')
   remove(()=>{ status.classList.remove('avatar-rotation') })
}



export function generator(id, data){ //console.log('AVATAR GENERATOR', id, data)

      ///set the avatar
      const avatar  = document.getElementById(id)
     
      if(data.avatar != ''){
            avatar.style.backgroundImage = `url('${data.avatar}')`
      
      //if we don't have picture just add the initials
      }else{
           // const title =  avatar.querySelector('.title')
           // title.innerHTML = data.initials
           // avatar.style.backgroundColor  = data.bg
      }
}/**/


function remove(callback){
  setTimeout(()=>{
    callback()
  }, 800)
}

function remove200(callback){
  setTimeout(()=>{
    callback()
  }, 200)
}



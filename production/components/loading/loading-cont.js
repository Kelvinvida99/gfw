
const {changeSVG} = require('../../js-handler/graphic')


/****************ELEMENTS*****************/
const htmlLd         = {}
var  HTMLwasSelected = false

function HTMLselect(){ //console.log('HTMLselect')


     htmlLd.loading   = document.querySelector('#loading')
     htmlLd.title     = htmlLd.loading.querySelector('.title')
     htmlLd.des       = htmlLd.loading.querySelector('.des')
     htmlLd.img       = htmlLd.loading.querySelector('.icon')
     htmlLd.button    = htmlLd.loading.querySelector('.button')
    
     HTMLwasSelected  = true
}
/****************ELEMENTS*****************/


//this function get the right scrim notification and apply it
export function start( id, msg ){ // console.log('Loading Type -> ', id)

 if(!HTMLwasSelected) {HTMLselect()}

  scrimBody[id].start(msg)

  const loadingBody  = scrimBody[id]

  htmlLd.img.style.background  = `url('./css/svg/illustrations/${loadingBody.img}.svg')`

  htmlLd.title.innerHTML = loadingBody.title
  htmlLd.des.innerHTML   = loadingBody.des

}/**/


const scrimBody = {

  starting:
    { title: 'Starting app', 
      des:   'Please Wait',
      img:   'gosive-logo-white',
      start: function(){ 

      }
    },


  startingError:
    { title: 'Error Starting', 
      des:   '',
      img:   'sad',
      
      start: function(msg){ this.des = `
        An error has been happening while we start the app. 
        <br>If this error persists, contact your system administrator
        <br>Error: <br> ${msg}`
        
        htmlLd.button.classList.remove('dn')
      }
    },


  settingsError:
    { title: 'Login', 
      des:   ' ',
      img:   'gosive-logo-white',
      
      start: function(msg){  //console.log('settingsError -> ',  msg)
        
        this.des = `Error loading settings <br> ${msg}`
       
        htmlLd.button.classList.remove('dn')
      }
    },

  settingsApplying:
    { title: 'Applying settings', 
      des:   'Please Wait',
      img:   'gosive-logo-white',
      start: function(){ }
    },

  checkDevice:
    { title: 'Checking device', 
      des:   'Please Wait',
      img:   'gosive-logo-white',
      start: function(){ }
    },

  websocket:
    { title: 'Starting Websocket', 
      des:   'Please Wait',
      img:   'gosive-logo-white',
      start: function(){ }
    },

  lastPage:
    { title: 'Showing last status', 
      des:   'Please Wait',
      img:   'gosive-logo-white',
      start: function(){ }
    },

/*********************device*****************/
  checkDeviceError:
    { title: 'Error Starting', 
      des:   '',
      img:   'sad',
      start: function(msg){
        this.des = `
        We found error loading your device
        <br>If this error persists, contact your system administrator
        <br>Errro:  ${msg}
        <br><br>If this error persists, contact your system administrator
         `
        htmlLd.button.classList.remove('dn')

      }
    },

  timeError:
    { title: 'Time Error', 
      des:   ``,
      img: 'sad',
      start: function(msg){ 
        this.des = `
        The time zone on this device is different to the main server 
        <br>This can cause synchronization problems between both devices. 
        <br>Chance your device time zone at <b>${msg}</b>
        <br><br>If this error persists, contact your system administrator
        `
        htmlLd.button.classList.remove('dn')

      }
    },

  tooSmall:
    { title: 'Device too small', 
      img:   'sad',
      des:   '',
      start: function(){
        this.des = `
        This device screen is too small, try to use a bigger device 
        <br>At least 350 Pixels width
        <br><br>If this error persists, contact your system administrator`
       }
    },

  websocketError:
    { title: `Web Socket Error`,
      img:   'sad', 
      des:   ``,
      start: function(){
        this.des = `
        This device don't support Web Socket, 
        <br>the real time synchronization between this device and main server won't works. 
        <br>Try to use a different browser like <br>Google Chrome or Safari
        <br><br>If this error persists, contact your system administrator`
       }
    },


/*********************device*****************/

 dbTimeout:
    { title: `Time Out`,
      img:   'sad', 
      des:   ``, 
      start: function(){
        this.des = `
        The server took so long to respond
        <br><br>If this error persists, contact your system administrator`
        
        htmlLd.button.classList.remove('dn')

       }
    },

	

}



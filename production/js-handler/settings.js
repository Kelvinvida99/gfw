
const checkDevice       = require('./check-device')
const dbRequest         = require ('../js-network/db-request')
const loading           = require ('../components/loading/loading')
const userPreference    = require ('./user-preference')




/****************ELEMENTS*****************/

var data = undefined
export function getData(){ return data }

/****************ELEMENTS*****************/

export function controlUndefined(callback){ //console.log('controlUndefined>', )

    if( data === undefined ){

        data  =    JSON.parse( localStorage.getItem('settings')  )
        callback(data)
        return
    } 

    return data
}

//get the settings fromt he server
export const load = (detail) => {  //console.log('load 1 2>', window.navigator.onLine)
   
    //   console.log(`ERROR ON GETTING SETTINGS ONLY FROM LOCAL STORAGE`, ); 
    // return loadFromLocalStorage() // darkred darkred darkred error remove this is just for testing

    if (window.navigator.onLine === false){ //console.log('settings OFFLINE>'  )
        
        return loadFromLocalStorage()
    }

    return loadDB(detail)
      .then((result)=>  {  // console.log('settings>'  )

        if( result.status === 'errorConnection' ){ //console.log(' error on connection settings>', result  )
            return loadFromLocalStorage() 
        }

        data   = result.data[0]
        data.device = checkDevice.detail()
        registerLogin()


        /***************FORCE DE MIGUEL, PARA PROBAR ***/
            data.companySetup = {
                appCancelByAppBefore:   '1440', //on 0, the office user can't cancel by app, always minutes
                myDepartmentAdminPhone: '2016686688',
            }
            
            
            //data.device.deviceType = 'desktop'
           // data.right             = 'admin'
           // data.language          = 'en'


            //testing the tv
            //data.device.deviceType = 'tv'
            // data.typeApp   = 'nurse'
            // data.typeApp   = 'staff'
            //data.typeApp   = 'patient'


            // //console.log("data.id ", data.id)

            // if(data.id === "60" || data.id === "112" ){ //force para yeison
            //     data.typeApp   = 'nurse'
            // }
            
        /***************FORCE DE MIGUEL, PARA PROBAR ***/

        userPreference.checkLocal(data)
        return data

      }).catch((error) => {  console.log('settings error', error)
            loading.notify('settingsError', error.msg )   
     }) 
      
}/**/

async function loadDB(detail){  //console.log('downloadSettings>')

    detail.inf = ''   
   
    return await dbRequest.start(detail, 'server/php/sql/settings.php' ) //do the insert

}


//to avoid erro when diferent users login 
export function registerLogin(){ 

        
  //  setTimeout(()=>{
        // localStorage.setItem('lastLogin', `{"id":"${data.id}"}`)
        localStorage.setItem('settings', JSON.stringify(data))

        userPreference.start({act: "setDevice_no_reload",deviceType:data.device.deviceType});

  //  },1000)

}/**/



//load the setting from local storate, in case of error downloading 
function loadFromLocalStorage(){ //console.log( 'loadFromLocalStorage>'  )
    

    data = JSON.parse( localStorage.getItem('settings') )

    if( data === null ){ console.log( 'settings Dont exist >'  )
        
        loading.notify('settingsError',  )   
        return false
    
    }

    return data
}


//we use the data to send to ws, when we connect the first time
//this is data will be visible on the monitoring part
export function getDataWs(){ //console.log('getDataWs>',  timeHandler.getTime() )
    return {
        id:      data.id,
        name:    data.name,
        company: data.company,
        device:  data.device,        
        right:   data.right,  
        typeApp: data.typeApp,
        time:    new Date()
    }
}
 
 //we use this data to send to the server each time 
 //that we do a db request, to show to the suppervisers the last user activity
 //this is data will be visible on the monitoring part
export function getDataWsActivity(){ //console.log('getDataWs>',  timeHandler.getTime() )
    return {
        id:      data.id,
        company: data.company,
        right:   data.right,  
        typeApp: data.typeApp, 
        time:    new Date()
    }
}







export const loadODL = (detail) => {  console.log('load>')
   
    return loadDB(detail)
      .then((result)=>  { //console.log('settings result 2 >', result.data[0])

        data        = result.data[0]
        data.device = checkDevice.detail()
        registerLogin()

        /***************FORCE DE MIGUEL, PARA PROBAR green***/

            //data.typeApp = 'staffSoft/staffApp'
            data.typeApp = 'nurse'
           // data.right   = 'user'
           
            //data.device.deviceType = 'tv'
            data.language = 'en'
            
            //mobileMenu
            // data.bottomnav = [
            //     {entity: 'goku', privilegeDB: 'readOnly', privilegeFile: 'readOnly'},
            //     {entity: 'home', privilegeDB: 'readOnly', privilegeFile: 'readOnly'},
            // ]

            //desktopMenu readWrite
            // data.leftnav = [
            //     {entity: 'home',    privilegeDB: 'readOnly', privilegeFile: 'readOnly'},
            //     {entity: 'goku',    privilegeDB: 'readOnly', privilegeFile: 'readOnly'},
            //     {entity: 'powers',  privilegeDB: 'readOnly', privilegeFile: 'readOnly'},
            //     {entity: 'monitor', privilegeDB: 'readOnly', privilegeFile: 'readOnly'},
            //     {entity: 'users',   privilegeDB: 'readOnly', privilegeFile: 'readOnly'},
            // ]          
            
           ////green uncomment this to work with staff app********************************* green
            // data.typeApp = 'staff'
            // data.device.deviceType = 'desktop'
            //data.leftnav = [
            //     {entity: 'home',      privilegeDB: 'readWrite', privilegeFile: 'readWrite'},
            //     {entity: 'goku',      privilegeDB: 'readWrite', privilegeFile: 'readWrite'},
            //     {entity: 'powers',    privilegeDB: 'readWrite', privilegeFile: 'readWrite'},
            //     {entity: 'monitor',   privilegeDB: 'readWrite', privilegeFile: 'readWrite'},
            //     {entity: 'users',     privilegeDB: 'readWrite', privilegeFile: 'readWrite'},

                // {entity: 'patients',  privilegeDB: 'readWrite', privilegeFile: 'readWrite'},
                // {entity: 'nurses',    privilegeDB: 'readWrite', privilegeFile: 'readWrite'},
                // {entity: 'services',  privilegeDB: 'readWrite', privilegeFile: 'readWrite'},
                // {entity: 'admin',     privilegeDB: 'readWrite', privilegeFile: 'readWrite'},
            //]  

           ////green uncomment this to work with staff app********************************* green

            // data.leftnav = [
            //     {entity: 'homepatient', privilegeDB: 'readOnly', privilegeFile: 'readOnly'},
            // ]    
            ///goku gokuMobile 

        /***************FORCE DE MIGUEL, PARA PROBAR green ***/

        localStorage.setItem('settings', JSON.stringify(data))


        return data

      }).catch((error) => {  
            loading.notify('settingsError', error.msg )   
     }) 
      
}/**/
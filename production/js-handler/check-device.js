
const DeviceDetector  = require("device-detector-js");
const banner          = require ('../components/banner/banner')
const loading         = require ('../components/loading/loading')
const settings        = require('./settings')


//checke that this device support all the feactures of our system
//any screem < 1800 pixeles is consider small
export var  screemSmall = undefined

export function start(){
    return new Promise((resolve, reject)=>{

        //the port to connect is defined on the settings
        const settingsData = settings.getData()  
        var result      = false

        //the time zone of the device and the server, should be the same, for applications
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
        if( settingsData.timeZone  != timeZone  ){ 
            loading.notify('timeError', settingsData.timeZone)    
            result = undefined
        }

        const supportsWebSockets = 'WebSocket' in window || 'MozWebSocket' in window;
        if (!supportsWebSockets) {
            loading.notify('websocketError')
            result = undefined
        }

        if (window.screen.width < 300) {
            loading.notify('tooSmall')
            result = undefined
        }

        // if (window.screen.width > 1200 && window.screen.width < 1800) {
        //     banner.start({act:'show', id:'goodMonitor', pageId:'home-page'})
        //     //result = undefined
        // }

        if (  window.screen.width < 1800 ) {
               screemSmall = true
        }else{ screemSmall = false }


        //no error = false
        //undefined, fatal error, the application wont load
        resolve(result)

    })
}




export function detail(){

    const deviceDetector = new DeviceDetector()
    const userAgent      = window.navigator.userAgent
    const result         = deviceDetector.parse(userAgent)
    const deviceDetails  =  { 
                                navegatorType:      result.client.type, 
                                navegatorName:      result.client.name, 
                                navegatorVersion:   result.client.version, 

                                deviceType:       result.device.type, 
                                deviceOs:         result.os.name, 
                                deviceVersion:    result.os.version, 

                            }

    // console.log( deviceDetails )

    return deviceDetails

}


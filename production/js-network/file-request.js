

const errorHandler = require('../components/login/error-handler')
const loginBridge  = require('../components/login/login-bridge')
const scrim       = require('../components/scrim/scrim')
const settings    = require('../js-handler/settings')
const snack       = require('../components/snack/snack')
const websocket   = require('./web-socket')


export function start( detail, phpFile ){  //console.log('db-request>', phpFile, detail.inf )
	
  
    scrim.showLoading()


	const infNewData = detail.inf//object > FormData()

    //Timeout Controller
    const controller = new AbortController()
    const timeout    = setTimeout(() => { controller.abort() }, 30000)

	const options = { method: 'POST',  body: infNewData, signal: controller.signal,  credentials: 'same-origin' }


	return fetch(`./${phpFile}`, options)
    .then ( handleErrors )
    .then(result   =>   {   console.log('result 1', result); 
       
        return result.json()           
    })   
    .then((result) =>   { console.log('result 2', result) 
        
        scrim.hideLoading()
        return check(detail, result)   
    })
    .catch((error) => {  
        
        scrim.hideLoading()
        return { status: 'bad-error-request', msg:error.message}  
    })

}/**/



function check(detail, result){ //console.log('check Result X>', result)

    try {
            //authentication errors  
            if(result.authentication.val != "ok"  && result.authentication.val != undefined ){  
                
                loginBridge.start( {act:'show', val:result.authentication.val }, detail )
                return { status:"bad-auth" }
             }

             
             if( result.authorization.val != "ok"   ){ 
                errorHandler.start(result.authorization.val)
                return { status:"bad-error" }
            }
            //request errors 
            if( result.error.val != "ok"   ){ 
                errorHandler.start(result.error.val)
                return { status:"bad-error" }
            }



            //notify everyone about the activity, only if thw ws has been init
            //ws, start after the setting has been loaded
            if(websocket.ws != undefined){ 
                 websocket.send( { act: "activityUpdates", data: settings.getDataWsActivity() }  )               
            }
                
            //all good no errors
            return { status:"ok", 
                     data: result.data, 
                     multiTables: result.multiTables, 
                     file: result.file || "[]", 
                     availableRowsWithFilters: result.availableRowsWithFilters }

   
    }catch(err) {  console.log('db-request - check> ', err) }/**/

}/**/



function handleErrors(response) { 
    if (!response.ok) { throw Error(response.status)}
    return response;
}


function getFormData(object) {
    const formData = new FormData()
    Object.keys(object).forEach(key => formData.append(key, object[key]))
    return formData
}
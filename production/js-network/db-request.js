 

const errorHandler = require('../components/login/error-handler')
const loginBridge  = require('../components/login/login-bridge')
const scrim        = require('../components/scrim/scrim')
const settings     = require('../js-handler/settings')
const snack        = require('../components/snack/snack')
const websocket    = require('./web-socket')
var   searching    = false

//warinig an null detail.inf can break this function
export function start( detail, phpFile ){ 

    console.log('db-request phpFile>', JSON.parse(JSON.stringify(phpFile))     ) //,
    console.log('db-request infffff>', JSON.parse(JSON.stringify(detail.inf))  ) //,
	searching = true
    scrim.showLoading()

	const infNewData = getFormData(detail.inf) //object > FormData()
    
    //Timeout Controller
    const controller = new AbortController()
    const timeout    = setTimeout(() => { controller.abort() }, 30000)

	const options = { method: 'POST',  body: infNewData, signal: controller.signal,  credentials: 'same-origin' }


	return fetch(`./${phpFile}`, options)
    .then ( handleErrors )
    .then(result   =>   { // console.log('result 1>>', result) 
        searching = false
        //console.log('result 1', result.json() )
        //console.log('then Result>', JSON.stringify(result) ) 
        return result.json()           
    })   
    .then((result) =>   {   //console.log('result 2', result) 
        
        scrim.hideLoading()
        return check(detail, result)   
    })
    .catch((error) => { // console.log('result 3', 'ERRORRRRRRRR') 
        
        scrim.hideLoading()
        snack.start({act:'show', id:'downloadError'})
        return check(detail, {error:'connection'})   


    })
 
}/**/




function check(detail, result){    console.log('db-request checkkkk', JSON.parse(JSON.stringify(result)) ) 
  
    

    try {
            //any error > noDB, network, requestTimeout
            if(result.error === 'connection'){
                return { status:"errorConnection" }
            }

            //authentication errors > Show the loging confirmation 
            if( result.authentication.val != "ok"  && result.authentication.val != undefined ){  
                loginBridge.start( {act:'show', val:result.authentication.val }, detail )
                return { status:"bad-auth" }
             }
             
            if( result.authorization.val != "ok"   ){ 
                errorHandler.start(result.authorization.val)
                return { status:"bad-authorization" }
            }

            //request errors 
            if( result.error.val != "ok"   ){ 
                errorHandler.start(result.error.val)
                return { status:"bad-error" }
            }

            if(result.restriction === undefined){
                console.log('YEISON ON RESTRICTION EMPTY PLEASE FIXED')
            }
            
            //manage entitiy restrictions
            // if( result.restriction.val != "ok"   ){ 
            //    //errorHandler.start(result.restriction.val)
            //    console.log('EDITION/DELETE HAS BEEN RESTRICTED DUE DEPENDENCIES, RESTRICTION CODE: ', result.restriction.val ) 
            //    // return { status:"restriction" }
            // }




            //notify everyone about the activity, only if thw ws has been init 
            //ws, start after the setting has been loaded
            if( websocket.ws != undefined ){ 
                websocket.send( { act: "activityUpdates", data: settings.getDataWsActivity() }  )               
            }
                
            //all good no errors
            return { status:"ok", 
                     data: result.data, 
                     multiTables: result.multiTables,
		     entitychanges: result.entitychanges, 
                     file: result.file || "[]", 
                     availableRowsWithFilters: result.availableRowsWithFilters,
                     charts: result.charts,
                     restriction: result.restriction,

                      }


   
    }catch(err) {  console.log('db-request - check> ', err) }/**/

}/**/

//used for fullcont-jump, to see if the data was returned
export function isSearching(response) {  return searching }


function handleErrors(response) { 
    if (!response.ok) { throw Error(response.status)}
    return response;
}


function getFormData(object) {
    const formData = new FormData()
    Object.keys(object).forEach(key => formData.append(key, object[key]))
    return formData
}



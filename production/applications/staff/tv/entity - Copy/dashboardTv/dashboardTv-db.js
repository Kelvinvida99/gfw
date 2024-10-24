
const dbRequest   = require ('../../../../../js-network/db-request')
const snack       = require ('../../../../../components/snack/snack')
const settings    = require('../../../../../js-handler/settings')
const websocket   = require('../../../../../js-network/web-socket')


export function load(callback){  //console.log('load', detail)

    loadDB()
      .then((result)=>  { //console.log('monitor result', result.data ) 

            callback(result.data)

    }).catch((error) =>{  //console.log('ERROR DOWNLOADRING users for monitoring', error)  
        snack.start( { act:"show", id:"downloadError"  } )
    }) 

}/*loadBasic*/


async function loadDB(){ //console.log('loadDB')

   const detail = { inf: '' }
   
   //const result = await dbRequest.start(detail, 'php/users.php') 
   const result = await dbRequest.start(detail, 'server/php/sql/TVMonitorReport.php') 
 
   if(result.status != "ok"){ throw ( result ) }


   return result

}











const dbRequest   = require ('../../../../../js-network/db-request')
const snack       = require ('../../../../../components/snack/snack')
const settings    = require('../../../../../js-handler/settings')
const websocket   = require('../../../../../js-network/web-socket')


export function load(detail, callback){  //console.log('load', detail)

    loadDB(detail)
      .then((result)=>  { //console.log('monitor result', result.data ) 

            callback(result.data)

    }).catch((error) =>{  //console.log('ERROR DOWNLOADRING users for monitoring', error)  
        snack.start( { act:"show", id:"downloadError"  } )
    }) 

}/*loadBasic*/


async function loadDB(detail){ //console.log('loadDB')

   detail.inf = ''
   //const result = await dbRequest.start(detail, 'php/users.php') 
   const result = await dbRequest.start(detail, 'server/php/sql/monitorGetUsers.php') 
 
   if(result.status != "ok"){ throw ( result ) }


   return result

}




export function joinAdminDashboardTv(){ // console.log(`joinAdminDashboardTvjoinAdminDashboardTvjoinAdminDashboardTvjoinAdminDashboardTv`, ); 

    const data = settings.getDataWs()

    if( data.right === 'admin' || data.right === 'adminGosive' ){ 

        var timer = setInterval(()=>{    
           
           if( websocket.ws != undefined){
               if( websocket.ws.readyState === 1 ){ 
               
                    websocket.send({  act: "joinAdminDashboardTv", data: data  })
                    clearInterval(timer)
               }            
           }/*if*/

       }, 1000)/*setInterval*/

    }/*if*/
}/**/










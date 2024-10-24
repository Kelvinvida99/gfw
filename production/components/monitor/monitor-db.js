


const dbRequest   = require ('../../js-network/db-request')
const snack       = require ('../snack/snack')


export function load(detail, callback){  //console.log('load', detail)

    loadDB(detail)
      .then((result)=>  { //console.log('monitor result', result.data ) 

            callback(result.data)

    }).catch((error) =>{  //console.log('ERROR DOWNLOADRING users for monitoring', error)  
        snack.start( { act:"show", id:"downloadError"  } )
    }) 

}/*loadBasic*/


async function loadDB(detail){  console.log('loadDB')

   detail.inf = ''
   //const result = await dbRequest.start(detail, 'php/users.php') 
   const result = await dbRequest.start(detail, 'server/php/sql/monitorGetUsers.php') 
 
   if(result.status != "ok"){ throw ( result ) }


   return result

}


const dbRequest   = require ('../../../../../js-network/db-request')
const snack       = require ('../../../../../components/snack/snack')


export function load(callback){  //console.log('load', detail)

    loadDB()
      .then((result)=>  { //console.log('monitor result', result.data ) 

            callback(result.data)

    }).catch((error) =>{  //console.log('ERROR DOWNLOADRING users for monitoring', error)  
        snack.start( { act:"showxxxxx", id:"downloadError"  } )
    }) 

}/*loadBasic*/


async function loadDB(){ //console.log('loadDB')

   const detail = { inf: '' }
   
   const result = await dbRequest.start(detail, 'atoDelete/tvDashboardHome.php') 
 
   if(result.status != "ok"){ throw ( result ) }


   return result

}










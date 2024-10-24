
const dbRequest = require('../../js-network/db-request')


export function logMeOut(detail){   console.log('LOG ME OUT') 
  
      
  logMeOutDB(detail)
  .then((result) =>{  console.log('YOURE LOG OUT') 

     location.reload()

  }).catch((error) =>{  console.log('error login', error) }) 

}/*verify*/



async function logMeOutDB(detail){ 

    //this file don't get anything
   detail.inf = ''

   const result = await dbRequest.start(detail, 'server/php/auth/logMeOut.php') //do the insert
 
   if(result.status != "ok"){ throw ( result ) }

   return result
}



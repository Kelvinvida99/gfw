
const dbRequest   = require ('../../js-network/db-request')


export const logOthersOut = (detail) => {  
   
    detail.inf = { 
          reason:'',
          usersIds:JSON.stringify([detail.id]),

    }

    //console.log('logOthersOut>',  detail.inf )

    //alert('to logout')
    return DB(detail, 'server/php/auth/logOthersOut.php')
      .then((result)=>  {   

        console.log('logOthersOut result>', result)

      }).catch((error) => {  
            //console.log('logOthersOut error', error)
      }) 
      
}/**/

export const unlockOrLockUsers = (detail) => {  //console.log('unlockOrLockUsers>')
   
    detail.inf = { 
        status  : detail.status,
        reason  : '',
        usersIds: JSON.stringify([detail.id]),
    }

    //console.log('unlockOrLockUsers>',  detail.inf )

    return DB(detail, 'server/php/auth/unlockOrLockUsers.php')
      .then((result)=>  {   

       // console.log('logOthersOut result>', result)


      }).catch((error) => {  
            // console.log('logOthersOut error', error)
     }) 
      
}/**/






async function DB(detail, phpFile){  //console.log('downloadSettings>')

   const result = await dbRequest.start(detail, phpFile) //do the insert

   if(result.status != "ok"){ throw ( result ) }

   return result
}

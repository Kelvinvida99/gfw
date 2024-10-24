
const dbRequest            = require ('../../js-network/db-request')



//get the data from the server and fill the fullcont
export function select(detail, phpFile, callback){   console.log('select>', detail, phpFile)
        

  DB(detail, phpFile).then((result)=>  { //console.log('SELECT ONE', result.data[0] )

    callback(result.data )


  }).catch((error) =>{ console.log('error SELECT ONE', error)
        //snack.start( { act:"show", id:"downloadError"  } )
  }) 

}/**/



async function DB(detail, phpFile){ 

   const result = await dbRequest.start( detail, phpFile) //do the insert
 
   //console.log('addOnetDB>>>>>>>>>>>>>>>>result', result)
 
   if(result.status != "ok"){ throw ( result ) }
   return result

}

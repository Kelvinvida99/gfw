

const snack     = require('../snack/snack')
const dbRequest = require('../../js-network/db-request')



export function select(detail, htmlDt, callback){ //console.log('select> dt')
    
    htmlDt.entityDt.classList.add('dt-loading') 

    selectDB(detail)
      .then((result)=>  { //console.log('Data Table db General', result)

        const resultComplete = result
        
        callback(result.data, result.availableRowsWithFilters, resultComplete)
        
       // setTimeout(()=>{ }, 1000)
        
            htmlDt.entityDt.classList.remove('dt-error') 
            htmlDt.entityDt.classList.remove('dt-loading') 
         

      }).catch((error) =>{  //console.log('result', error)
          
           snack.start({ act:"show", id:"downloadError" }) 
           htmlDt.entityDt.classList.remove('dt-loading')   
           htmlDt.entityDt.classList.add('dt-error') 

      }) 

}/*loadBasic*/





async function selectDB(detail){ //console.log('Download>>>>>>>>>>>>>>>>', detail.inf)

   const result = await dbRequest.start(detail, 'server/php/sql/select.php' ) //do the insert
 
   if(result.status != "ok"){ throw ( result ) }

   return result

}/*BEFOREdbRequest*/

























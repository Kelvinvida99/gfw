const dbRequest            = require ('../../js-network/db-request')
const fullcontForm         = require ('../../components/fullcont/fullcont-form')
const fullcontHandler      = require ('../../components/fullcont/fullcont-handler')
const fullcont             = require ('../../components/fullcont/fullcont')
const snack                = require ('../snack/snack')
const dtGenerator          = require ('../dt/dt-generator')
const dialog               = require ('../dialog/dialog')


export function addOne(detail, htmlFc, callback){ 

  const phpFile = selectPhpFile( htmlFc, 'addOne' )

  DB(detail,  phpFile) 
  .then((result)=>  {  //console.log('addOne>', result)

	  		//prepare the fullcont
			fullcontForm.prepareAfterInsert(detail, htmlFc, result)
		  
		  snack.start( {act:"show", id:"addOk"} )

			//set the correct ID
			detail.dbid = result.data[0].id
			fullcontHandler.setDbid(detail)

		  //go to add the new row to dt
		  callback(result.data[0], result) 
	 

  }).catch((error) => {  //console.log('error addOne', error)

  		snack.start({ act:"show", id:"addError"  })
  }) 

}/*addOne*/




//get the data from the server and fill the fullcont
export function selectOne(detail, htmlFc,  callback){  //console.log('selectOne>', htmlFc)
		
  detail.inf = { entity: htmlFc.entity, id: detail.dbid }

  const phpFile = selectPhpFile( htmlFc, 'selectOne' )


  DB(detail, phpFile)
  .then((result)=>  {  // console.log('SELECT ONE', result.data[0] )

			//the entity was deleted
			if( result.data[0] === undefined  ){
				  dtGenerator.deleteRow({ dest: detail.dest,  dbid: [ detail.dbid ] })
				  dialog.start({ act:'show', id:'entityDeleted2' })
				  return
			}/**/


  		//prepare the fullcont
			fullcontForm.prepareAfterInsert(detail, htmlFc, result)
			 
			//set the correct ID
			fullcontHandler.setDbid(detail)

			//show the fullcont
			fullcont.start({  act:'show',  id: detail.id  })

		  callback(result.data[0], result) 


  }).catch((error) =>{ console.log('error SELECT ONE', error)

  			snack.start( { act:"show", id:"downloadError"  } )
  }) 

}/**/


export function update(detail, htmlFc , callback){ //console.log('update>')
	
	const phpFile = selectPhpFile( htmlFc, 'update' )

	  DB(detail, phpFile)
	  .then((result)=>{    console.log('update result>')
			 	
  		//prepare the fullcont
			fullcontForm.prepareAfterInsert(detail, htmlFc, result)

 			snack.start( { act:"show", id:"updateOk"  } )

	 	  //go to add the update row to dt
 	 	  callback(result.data[0], result) 
 
	  }).catch((error) =>{   console.log('error UPDATE ONE', error)

	  		snack.start( { act:"show", id:"updateError"  } )
	  }) 
	  
}/**/



export function trDelete(detail, htmlFc , callback){ //console.log('trDelete>',)
		
	  DB(detail, 'server/php/sql/delete.php')
	  .then((result)=>{   

	 	   //go to add the update row to dt
		 	callback(result.data) 

	  }).catch((error) =>{  // console.log('error', error)

	  		snack.start( { act:"show", id:"updateError"  } )
	  }) 
}/**/




async function DB(detail, phpFile){ //console.log('addOnetDB>>>>>>>>>>>>>>>>i', detail)

   const result = await dbRequest.start( detail, phpFile, ) //do the insert
 
   if(result.status != "ok"){ throw ( result ) }
   return result
}



function  selectPhpFile(htmlFc, from){


	switch (from) {

	   case 'addOne':
	   		if( htmlFc.addOne != undefined){  return htmlFc.addOne               }
	   		else                           {  return 'server/php/sql/insert.php' }
	   break;
	   case 'update':
	   		if( htmlFc.update != undefined){  return htmlFc.update               }
	   		else                           {  return 'server/php/sql/update.php' }
	   break;
	   case 'selectOne':
	   		if( htmlFc.selectOne != undefined){  return htmlFc.selectOne               }
	   		else                           {  return 'server/php/sql/selectOne.php' }
	   break;
	}/*switch*/

}/*selectPhpFile*/



const dbRequest            = require ('../../js-network/db-request')
const fullcontForm         = require ('../../components/fullcont/fullcont-form')
const fullcontHandler      = require ('../../components/fullcont/fullcont-handler')
const fullcont             = require ('../../components/fullcont/fullcont')
const snack                = require ('../snack/snack')
const dtGenerator          = require ('../dt/dt-generator')
const dialog               = require ('../dialog/dialog')


//################################################################## ADD ONE 
export function addOne(detail, htmlFc, callback){ //console.log('addOne>')
	
  addOnetDB(detail) 
  .then((result)=>  {  //console.log('addOne>', result)

  		//prepare the fullcont
		fullcontForm.prepareAfterInsert(detail, htmlFc, result)
	  
	   snack.start( {act:"show", id:"addOk"} )

		//set the correct ID
		detail.dbid = result.data[0].id
		fullcontHandler.setDbid(detail)

	   //go to add the new row to dt
	   callback(result.data) 
	 
	  // if(window.innerWidth < 1800) { 
	  //    fullcont.start( {act:"hide", id: detail.id} )
	  // }

  }).catch((error) => {  //console.log('error addOne', error)

  		snack.start({ act:"show", id:"addError"  })
  
  }) 

}/*addOne*/

async function addOnetDB(detail){ //console.log('addOnetDB>>>>>>>>>>>>>>>>i', detail)

   const result = await dbRequest.start( detail, 'yeison/php/insert.php', ) //do the insert
 
   if(result.status != "ok"){ throw ( result ) }
   return result
}



//################################################################## SELECT ONE 
//get the data from the server and fill the fullcont
export function selectOne(detail, htmlFc,  callback){  //console.log('selectOne>', )
		
  detail.inf = { entity: detail.entity, id: detail.dbid }


  selectOneDB(detail)
  .then((result)=>  {   //console.log('SELECT ONE', result.data[0])

  			//the entity was deleted
  			if( result.data[0] === undefined  ){
  				 dtGenerator.deleteRow({ dest: detail.entity,  dbid: [ detail.dbid ] })
  				 dialog.start({ act:'show', id:'entityDeleted2' })
  				 return
  			}

  			//prepare the fullcont
			fullcontForm.prepareAfterInsert(detail, htmlFc, result)

			//set the correct ID
			fullcontHandler.setDbid(detail)

			//show the fullcont
			fullcont.start({  act:'show',  id: detail.id  })

  }).catch((error) =>{  console.log('error SELECT ONE', error)

  			snack.start( { act:"show", id:"downloadError"  } )
  }) 

}/**/


async function selectOneDB(detail){ //console.log('selectOneDB>')

   const result = await dbRequest.start(detail, 'yeison/php/selectOne.php') //do the insert
   if(result.status != "ok"){ throw ( result ) }
   return result
}


//################################################################## UPDATE ONE 
export function update(detail, htmlFc , callback){ //console.log('update>')
		
	  updateDB(detail)
	  .then((result)=>{  // console.log('update result>')

  			//prepare the fullcont
			fullcontForm.prepareAfterInsert(detail, htmlFc, result)

 			snack.start( { act:"show", id:"updateOk"  } )

	 	   //go to add the update row to dt
		 	callback(result.data) 
 
	  }).catch((error) =>{ // console.log('error', error)

	  		snack.start( { act:"show", id:"updateError"  } )
	  }) 
}/**/


async function updateDB(detail){ //console.log('updateDB>')

   const result = await dbRequest.start(detail, 'yeison/php/update.php') //do the insert
   if(result.status != "ok"){ throw ( result ) }
   return result
}

//################################################################## TR DELEETE
export function trDelete(detail, htmlFc , callback){ //console.log('trDelete>',)
		
	  trDeleteDB(detail)
	  .then((result)=>{   

	 	   //go to add the update row to dt
		 	callback(result.data) 

	  }).catch((error) =>{  // console.log('error', error)

	  		snack.start( { act:"show", id:"updateError"  } )
	  }) 
}/**/


async function trDeleteDB(detail){ //console.log('trDeleteDB>')

   const result = await dbRequest.start(detail, 'yeison/php/delete.php') //do the insert
   if(result.status != "ok"){ throw ( result ) }
   return result
}



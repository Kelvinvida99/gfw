
const dbRequest            = require ('../../db/db-request')
const fullcont             = require ('../../components/fullcont/fullcont')
const fullcontFormHandler  = require ('../../components/fullcont/fullcont-form-handler')


export function getData(detail){

  downloadOne(detail)
  .then((result)=>  {  

  //load data to form
  fullcontFormHandler.loadDataToForm(form,  result.data[0]) 

	//refesh formCopy values
	fullcontFormHandler.refreshFormCopy(form, formCopy)

	//clean fullcont 
	fullcontFormHandler.clean(form)

	//load the data from form to input
	fullcontFormHandler.fill(form)

	//show the fullcont
	fullcont.start({act:'show',        id:'goku-fullcont'})
	fullcont.start({act:'prepareView', id:'goku-fullcont'})


  }).catch((result) =>{  console.log('Error', result)  }) 

}



export async function downloadOne(detail){ //console.log('Download>>>>>>>>>>>>>>>>')

   const result = await dbRequest.start('', 'downloadOne.php', detail) //do the insert
 
   if(result.status != "ok"){ throw ( result ) }

   return result

}







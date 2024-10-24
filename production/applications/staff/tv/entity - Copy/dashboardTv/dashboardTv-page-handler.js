




/****************ELEMENTS*****************/
var HTMLwasSelected  = false
var servicesHtml     = { complete: undefined, scheduled: undefined, NeedAttention: undefined  }

//insert the page  on the body
function HTMLselect(detail){ //console.log('goku init>')
	
	try{

		HTMLwasSelected        =  true
		servicesHtml.complete  =  document.querySelector('#dashboardTv-page-services-complete')
		servicesHtml.scheduled  =  document.querySelector('#dashboardTv-page-services-scheduled')
		servicesHtml.NeedAttention =  document.querySelector('#dashboardTv-page-services-NeedAttention')


	}catch(err){ console.log('error', err)}

}/*init*/

/****************ELEMENTS*****************/




export function start(detail){  // console.log('HANDLER >', detail)
  
  if(!HTMLwasSelected) {HTMLselect(detail)}

	switch (detail.elem){

      case 'services':    services(detail);  break;

	}
}
 





function services(detail){  //console.log('services>', detail.result)
	   
	servicesHtml.complete.querySelector('.title').innerHTML      = `a-${detail.result.Services.completed}`
	servicesHtml.scheduled.querySelector('.title').innerHTML      = `b-${detail.result.Services.scheduled}`
	servicesHtml.NeedAttention.querySelector('.title').innerHTML = `c-${detail.result.Services.NeedAttention}`


}
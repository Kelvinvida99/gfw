

const generator = require('./banner-generator')
const bannerDefault     = require('./banner-default')


export function start(detail){ //console.log('banner main >')

    switch (detail.act){
        case 'show':          show(detail);               break; 
        case 'hide':          hide(detail);               break; 
    }
}


function show(detail){  //console.log('banner main x>', detail)

  var bodyBanner = ''

  //create html elements or generate one default
    switch (detail.html){
        case undefined:       bodyBanner = bannerDefault.start(detail);       break; 
        default:              bodyBanner = detail.html ;
    }


 	const hmlt = generator.start(bodyBanner)
 	const page = document.getElementById(detail.pageId)
	
    page.insertAdjacentHTML("afterbegin", hmlt);   


}


//banner name = entityName-banner-id
//goku-banner-hellow
function hide(detail){ //console.log('banner hide>')

	const elem =  detail.ev.target.closest('.banner')
  	
    elem.classList.add('banner-hide')

	remove(()=>{ elem.remove(); })
}




function remove(callback){
	setTimeout(()=>{
		callback()
	}, 350)
}



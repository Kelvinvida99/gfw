

const loadingCont = require('./loading-cont')


/****************ELEMENTS*****************/
var  loading = false
var  HTMLwasSelected = false

function HTMLselect(){ //console.log('HTMLselect')

   loading = document.querySelector('#loading');
   HTMLwasSelected  = true
}

/****************ELEMENTS*****************/



//serving → elem in front of scrim
export function show(){ //console.log('loading show >')   
          
    if(!HTMLwasSelected) { HTMLselect() }
    loading.classList.add('loading-show')

}



//serving → elem in front of scrim
export function notify(id, msg){  //console.log('notify >')   

	loadingCont.start(id, msg)   
}



//serving → elem in front of scrim
export function hide(){ //console.log('loading hide1>')   

	  if(!HTMLwasSelected) { HTMLselect() }
	  loading.classList.add('loading-hide')

	  remove(()=>{ //console.log('loading hide1>')  
		    loading.classList.remove('loading-show');
		    loading.classList.remove('loading-hide');
		    loading.remove()
	  })

}/**/




function remove(callback){
  setTimeout(()=>{
    callback()
  }, 2000)
}

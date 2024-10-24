
/****************ELEMENTS*****************/
var scrim_loading 
var HTMLwasSelected = false

function HTMLselect(){ //console.log('HTMLselect')

   scrim_loading = document.getElementById('scrim_loading')
   HTMLwasSelected  = true
}
/****************ELEMENTS*****************/


//const scrimLoadingCont = require('./scrim-loading-cont')
//serving → elem in front of scrim
export function show(id){  //console.log('scrim show')   
          
       const scrim = document.getElementById(id)
       scrim.classList.add('scrim-show')

}


//serving → elem in front of scrim
export function hide(id){ //console.log('scrim hide')   

	  const scrim = document.getElementById(id)   
	  scrim.classList.add('scrim-hide')  

	  setTimeout(()=>{
	    scrim.classList.remove('scrim-show')
	    scrim.classList.remove('scrim-hide')
	  }, 250)
}



export function showLoading(){   //console.log('showLoading show')   
          
       if(!HTMLwasSelected) { HTMLselect() }

       // console.log('scrim_loading', scrim_loading)
      
       scrim_loading.classList.add('scrim-loading-show')

}


//serving → elem in front of scrim
export function hideLoading(id){ //console.log('scrim hide')   

	  scrim_loading.classList.add('scrim-loading-hide')  

	  setTimeout(()=>{
	    scrim_loading.classList.remove('scrim-loading-show')
	    scrim_loading.classList.remove('scrim-loading-hide')
	  }, 250)
}






function remove(callback){
  setTimeout(()=>{
    callback()
  }, 250)
}

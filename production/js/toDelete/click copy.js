const {obj}    = require ('./click-obj')
const snack    = require ('../components/snack/snack')


document.body.addEventListener('click', function(ev){ //console.log('click>')  
        
        //avoid duble click
        if(!(!ev.detail || ev.detail == 1) ) { return  }
       
        analice(ev) 
        ev.stopPropagation()

 }, true)


function analice(ev){  //console.log('click analice>', ev.target)
    
    const detail =  getDetail(ev)
   // console.log('click analice>',ev.target)
    
    if( cancel(detail) ){ return }

    detail.click.forEach((detailSplited)=>{
        start(detailSplited, ev)
    })

}/**/





export function start(detail, ev){  //console.log('clickx>', detail)  
    
    const elem = obj[detail.dest] //#######HERE
    detail.ev  = ev

    if( elem != undefined ){
        elem.start(detail)
        return
    }    

    snack.start({ act:'show', id:'clickError', })

}/**/


//get html data-detail
function getDetail(ev){
    
    return JSON.parse(ev.target.getAttribute('data-detail'))
}

//return true to cancel click process
function cancel(detail){

    if(detail       === null || detail       === undefined) { return true }
    if(detail.click === null || detail.click === undefined) { return true }

    return false
}












//const backControl  = require ('./backControl')
//entities
      //activate on first click only to avoid hiding again on multiple clicks
      // code here. // It will execute only once on multiple clicks
     // if(!(!ev.detail || ev.detail == 1) ){ return }


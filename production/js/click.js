// 25/10/2023 marco molina
//const {obj}    = require ('./click-obj')
const {obj}         = require ('./click-components')
const {obj_entity}  = require ('./click-components-entity')
const snack         = require ('../components/snack/snack')



document.body.addEventListener('click', function(ev){// console.log('click>', ev.detail)  
        
        //avoid duble click
        if(!(!ev.detail || ev.detail == 1) ) { return  }
       
       // console.log('click>', ev.detail ) 
    
        analice(ev) 
        ev.stopPropagation()

 }, true)


function analice(ev){  // console.log('click analice>', ev.target)
    
    const detail =  getDetail(ev)
  //console.log('click analice>',detail)
    
    if( cancel(detail) ){ return }

    detail.click.forEach((detailSplited)=>{
        start(detailSplited, ev)
    })

}/**/


export function start(detail, ev){  //console.log('clickx>', detail)  
    
    // 25/10/2023 marco molina se cambio el tipo const por la variable let
    let elem = obj[detail.dest] //#######HERE
    detail.ev  = ev

    //buscar en click-obj
    if( elem != undefined ){
        elem.start(detail)
        return
    }    

    // 25/10/2023 marco molina
    //buscar en click-obj-entity
    elem = obj_entity[detail.dest];
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

    if(detail       === null || detail       === undefined || detail       === "" ) { return true }
    if(detail.click === null || detail.click === undefined || detail.click === "" ) { return true }

    return false
}














//const backControl  = require ('./backControl')
//entities
      //activate on first click only to avoid hiding again on multiple clicks
      // code here. // It will execute only once on multiple clicks
     // if(!(!ev.detail || ev.detail == 1) ){ return }


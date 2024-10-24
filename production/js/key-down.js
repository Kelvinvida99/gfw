
const {obj}    = require ('./key-down-obj')
const snack    = require ('../components/snack/snack')
const shortcut =require('./key-shortcut')
// document.paste     = function (ev) {  listen(ev)  }

document.addEventListener('paste', (ev) => {  setTimeout(()=>{ listen(ev) }, 100) })

document.onkeydown   = function (ev) {  listen(ev)   }

function listen(ev){  
    

    analice(ev)
    ev.stopPropagation()
}

function analice(ev){  
        
    const detail =  getDetail(ev)


    if( cancel(detail) ){ 
        shortcut.start(ev)
        return 
    }

    detail.keyDown.forEach((detailSplited)=>{
        start(detailSplited, ev)
    })
}

function start(detail, ev){   
    
  
    const elem = obj[detail.dest]  //#######HERE
    detail.ev  = ev

    

    if( elem != undefined ){ // console.log('gooood >', detail)
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
function cancel(detail){  // console.log(`keyCancel`, detail ); 

    if(detail         === null   || detail         === undefined) { return true }
    if(detail.keyDown === null   || detail.keyDown === undefined) { return true }

    return false
}


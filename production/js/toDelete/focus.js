
const {obj}    = require ('./key-obj')
const snack    = require ('../components/snack/snack')
const shortcut =require('./key-shortcut')
// document.paste     = function (ev) {  listen(ev)  }

document.addEventListener('paste', (ev) => {  setTimeout(()=>{ listen(ev) }, 100) })

document.onkeyup   = function (ev) {  listen(ev)   }

function listen(ev){ //console.log('keypress listen >', ev.key)

    analice(ev)
    ev.stopPropagation()
}

function analice(ev){  //console.log('keypress analice >')
        
    const detail =  getDetail(ev)

    if( cancel(detail) ){ 
        shortcut.start(ev)
        return 
    }

    detail.key.forEach((detailSplited)=>{
        start(detailSplited, ev)
    })
}

function start(detail, ev){ // console.log('keypress start >', detail)
    
    const elem = obj[detail.dest]  //#######HERE
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
function cancel(detail){  // console.log(`keyCancel`, detail ); 

    if(detail     === null   || detail     === undefined) { return true }
    if(detail.key === null   || detail.key === undefined) { return true }

    return false
}


const {obj}    = require ('./click-right-obj')
const snack    = require ('../components/snack/snack')

document.body.addEventListener('contextmenu', function(ev){ //console.log('click-right')  
        
    //avoid browser menu on the page
    ev.preventDefault()
    ev.stopPropagation()
    analice(ev)

}, true)

function analice(ev){ //console.log('click analice>')
    
    const detail =  getDetail(ev)
    
    if( cancel(detail) ){ return }

    detail.clickRight.forEach((detailSplited)=>{
        start(detailSplited, ev)
    })
}/**/

function start(detail, ev){  //console.log('clickx>', detail)  
    
    const elem = obj[detail.dest] //#######HERE
    detail.ev  = ev

    if( elem != undefined ){
        elem.start(detail)
        return
    }    

    //verifica la entidad transaction y manda un snack personalizado
    if (detail.entity == "transaction") {
        snack.start({ act:'show', id:'noOption', })
    }else{

        console.log(detail.entity)
        snack.start({ act:'show', id:'clickError', })
    }
}/**/

//get html data-detail
function getDetail(ev){
    
    return JSON.parse(ev.target.getAttribute('data-detail'))
}

//return true to cancel click process
function cancel(detail){

    if(detail === null            || detail            === undefined) { return true }
    if(detail.clickRight === null || detail.clickRight === undefined) { return true }

    return false
}
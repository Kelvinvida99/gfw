const {obj}    = require ('./change-obj')

document.body.addEventListener('change', function(ev){  //console.log('!!!!!!change EVENT')  
        
    //avoid browser menu on the page
    ev.preventDefault()
    ev.stopPropagation()
    analice(ev)

 }, true)


function analice(ev){ //console.log('click analice>')
    
    const detail =  getDetail(ev)
   // console.log('!!!!!!change analice', detail)  
    
    if( cancel(detail) ){ return }

    detail.change.forEach((detailSplited)=>{
        start(detailSplited, ev)
    })

}/**/


function start(detail, ev){   //console.log('change>', detail)  
    
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

    if(detail === null            || detail            === undefined) { return true }
    if(detail.change === null || detail.change === undefined) { return true }

    return false
}



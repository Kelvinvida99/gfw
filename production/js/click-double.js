
//const {obj}    = require ('./click-right-obj')
const {obj}    = require ('./click-double-obj')



document.body.addEventListener('dblclick', function(ev){ //console.log('click-double')  
        
    //avoid browser menu on the page
    //ev.preventDefault()
    ev.stopPropagation()
    analice(ev)

 }, true)


function analice(ev){ // console.log('click analice>', detail)

    const detail =  getDetail(ev)
    
   
    
    if( cancel(detail) ){ return }
    
    detail.clickDouble.forEach((detailSplited)=>{
        start(detailSplited, ev) 
    })

}/**/


function start(detail, ev){ // console.log('CLIKC DOUBLE>', detail)  
    
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
    if(detail.clickDouble === null || detail.clickDouble === undefined) { return true }

    return false
}



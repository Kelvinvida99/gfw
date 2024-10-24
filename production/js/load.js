const {obj}    = require ('./load-obj')



document.body.addEventListener('load', function(ev){ //console.log('!!!!!!load EVENT')  

        
    //avoid browser menu on the page
    ev.preventDefault()
    ev.stopPropagation()
    analice(ev)

 }, true)


function analice(ev){ //console.log('click analice>')
    
    const detail =  getDetail(ev)
    
    
    if( cancel(detail) ){ return }

   // console.log("LOADING EVENT222222222222",detail)
    detail.load.forEach((detailSplited)=>{
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

    //snack.start({ act:'show', id:'clickError', })

}/**/


//get html data-detail
function getDetail(ev){
    
    return JSON.parse(ev.target.getAttribute('data-detail'))
}

//return true to cancel click process
function cancel(detail){

    if(detail === null            || detail            === undefined) { return true }
    if(detail.load === null || detail.load === undefined) { return true }

    return false
}



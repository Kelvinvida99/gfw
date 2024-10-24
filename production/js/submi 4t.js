
//const {obj}    = require ('./click-right-obj')
const {obj}    = require ('./submit-obj')






document.body.addEventListener('submit', function(ev){ console.log('submit!!!!!!!!!!EVENT')  
      
    //avoid browser menu on the page action="yeison/php/files/upload.php"
    ev.preventDefault();
    ev.stopPropagation()
    analice(ev)

 }, true)


function analice(ev){ //console.log('click analice>')

    const detail =  getDetail(ev)
    alert(5)
    if( cancel(detail) ){ return }
    
    detail.submit.forEach((detailSplited)=>{
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

    snack.start({ act:'show', id:'clickError', })

}/**/


//get html data-detail
function getDetail(ev){

    return JSON.parse(ev.target.getAttribute('data-detail'))
}

//return true to cancel click process
function cancel(detail){

    if(detail === null            || detail            === undefined) { return true }
    if(detail.submit === null || detail.submit === undefined) { return true }

    return false
}



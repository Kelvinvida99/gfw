const {obj}    = require ('./drop-obj')

document.body.addEventListener('dragover', function(ev){ 
    
    ev.preventDefault();
    
    console.log('dragover', ev.target);

    const container = ev.target;
    if (container == document.getElementById('a')) {
        const elem = document.getElementById('b');
        elem.classList.add('dropIn');
    }

    // container.appendChild(elem)   
}, true)

document.body.addEventListener('dragleave', function(ev){ 
    
    ev.preventDefault();
    
    const container = ev.target;
    if (container == document.getElementById('a')) {
        const elem = document.getElementById('b');
        elem.classList.remove('dropIn');
    }

    // container.appendChild(elem)   
}, true)

document.body.addEventListener('dragend', function(ev){
    
    const elem = document.getElementById('b');
    elem.classList.remove('dropIn');

    
}, true)

document.body.addEventListener('drop', function(ev){  console.log('!!!!!!drop EVENT')  
        
    //avoid browser menu on the page
    ev.preventDefault()
    ev.stopPropagation()
    analice(ev)
    const elem = document.getElementById('b');
    elem.classList.remove('dropIn');

 }, true)


function analice(ev){ console.log('click analice>')
    
    const detail =  getDetail(ev)
     
    
    if( cancel(detail) ){ return }
    console.log('!!!!!!change analice', detail)
        detail.drop.forEach((detailSplited)=>{
        console.log(detailSplited)
        start(detailSplited, ev)
    })

    

}/**/


function start(detail, ev){   console.log('change>', detail)  
    
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
    if(detail.drop === null || detail.drop === undefined) { return true }

    return false
}
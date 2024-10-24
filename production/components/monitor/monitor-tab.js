const selector     = require('../../js-handler/selector')

export function start(detail){ //console.log('pageMov>>>>', detail)
    
    const company     =  document.getElementById(detail.id)
    const allPage     =  company.querySelectorAll('.page')
    const pagetoshow  =  company.querySelector('.' + detail.pagetoshow)

    //hide all the pages
    for (let item of allPage) { 
        item.classList.add('dn') 
    }

    //control when the showed tab is visible, just hide it
    if( detail.ev.target.classList.contains('select')   ){
        detail.ev.target.classList.remove('select' )

    }else{
        pagetoshow.classList.remove('dn')
        selector.siblingRemoveClass(detail.ev.target, 'select')
        detail.ev.target.classList.add('select')
   }
}/*tab*/



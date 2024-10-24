///////////////////////////////////

const scroll = document.addEventListener('scroll', function(ev){ //console.log('scroll>')
	ev.stopPropagation();

    var detail =  JSON.parse(ev.target.getAttribute('data-detail'))

    if(detail === null        || detail        === undefined) { return }
    if(detail.scroll === null || detail.scroll === undefined) { return }

    //console.log('detail.click>', detail.click )  

     detail.scroll.forEach((detailSplited)=>{
        start(detailSplited, ev)
     })


}, true);


export function start(detail, ev){ //console.log('click detail>', detail )  

    detail["ev"] = ev

    switch (detail.dest){

        case 'page-fullcont':    scrollFullcont(detail)  ; break; 
        case 'page-main':        scrollMainPage(detail)  ; break; 
        case 'page':             scrollPage(detail)  ; break; 
      
    }
}/*start*/

function scrollMainPage(detail){ //console.log('scrollMainPage', detail)
        
    const destShadow = detail.ev.target.querySelector(".banner-cont")
    destShadow.classList.add('bs-4')

}


function scrollFullcont(detail){ //console.log('scrollFullcont', detail)
        
        detail.elem = detail.ev.target.parentNode.querySelector(".appbar")
        pageShadow(detail.ev, detail.elem)
}

function scrollPage(detail){ //console.log('scrolling Page #############') 

    const elem = detail.ev.target

    if (elem.scrollTop == 0) {
        elem.classList.remove('page-scrolled')
        return
    }


    if (elem.scrollTop > 0 ) {
        elem.classList.add('page-scrolled')
        return
    }



}/*pageShadow*/


function pageShadow(ev, elem){//console.log('pageShadow', elem) 
    
    const scroll = ev.target.scrollTop

    if (ev.target.scrollTop == 0) {
        elem.classList.remove('bs-4')
        return
    }

    //the appbar already has the shadow?
    //only add the shadonw if the appbar dosen't have it
    const hasShadow = elem.classList.contains('bs-4')

    if (ev.target.scrollTop > 0 && !hasShadow) {
        elem.classList.add('bs-4')
        return
    }

}/*pageShadow*/

//at the moment this only shows a showdown on fullcont :)
// data-detail='{"scroll": [ {"dest":"page-fullcont"  }] }'
///////////////////////////////code no on use







function call(module, func, ev){
    
    switch (module){
        case 'page':  p_page(func, ev);   break; 
    }
}/*call*/


function p_page(func, ev){ //console.log('on ls')

var elem
    switch (func){ 

        case 'body':  //main pages on the body
        		elem = ev.target.parentNode.parentNode.querySelector("#appbar")
       			pageShadow(ev, elem)
        		break; 

        case 'fullcont':  //fullcont without tab  
        		elem = ev.target.parentNode.querySelector(".appbar")
       			pageShadow(ev, elem)
        		break; 

        case 'fullccontTab': //fullcont with tab  
        		elem = ev.target.parentNode.parentNode.querySelector(".tab")
       			pageShadow(ev, elem) 
        		break; 

        case 'tab':  //fullcont with tab  
             tapShadow(ev, elem)
             break; 

    }   
}/*p_page*/



//
function tapShadow(ev, elem){
 
  const page = ev.target.parentNode.parentNode.querySelector(".page")
  const tab = page.querySelector(".page")

  console.log('tab', tab)
  console.log('page', page)
 

  // const scroll = ev.target.scrollTop

  // if (ev.target.scrollTop == 0) {
  //   tab.classList.remove('bs-4')
  //   return
  // }

  // //the appbar already has the shadow?
  // //only add the shadonw if the appbar dosen't have it
  // const hasShadow = elem.classList.contains('bs-4')

  // if (ev.target.scrollTop > 0 && !hasShadow) {
  //   tab.classList.add('bs-4')
  //   return
  // }

}/*pageShadow*/





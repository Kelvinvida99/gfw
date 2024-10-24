
const mapHanlder    = require('./map-handler')
const mapHowEnable  = require('./map-howEnable')


export function start(detail){ console.log('map star>', detail)
  
    switch (detail.act){
        case 'howEnable':      mapHowEnable.show(detail);               break;
        case 'changeGif':      mapHowEnable.changeGif(detail);               break;

        case 'howEnableHide':  mapHowEnable.hide(detail);               break;
    }
}


export function loadLocation(detail){ //console.log('map loadLocation>',)
    mapHanlder.loadLocation(detail)
}

export function loadLocationMultiple(detail){ //console.log('map loadLocation>',)
    mapHanlder.loadLocationMultiple(detail)
}





export function loadMyPosition (detail) { //console.log('loadMyPosition')
      
    mapHanlder.searchMyCoor(detail, (position)=>{ 

        if(position === 'errorLoadingLocation'){ 
            
            addNoGeo(detail.html)
            keepLoadMyPosition(detail)
            return
        }

        mapHanlder.generateMap(detail,  position)
        detail.html.classList.remove('map-nogeo')
        detail.html.classList.remove('map-error')
    })

}/*start*/

export function loadMyPositionById (id, pin) { console.log('loadMyPositionById')
    
    const html = document.getElementById(id)
    const detail = {pin: 'pin', id: id, html: html}

    //if the user send a pin
    if(pin != undefined){ detail.pin = pin }

    mapHanlder.searchMyCoor(detail, (position)=>{ 

        if(position === 'errorLoadingLocation'){ 
            
            addNoGeo(detail.html)
            keepLoadMyPosition(detail)
            return
        }

        mapHanlder.generateMap(detail,  position)
        html.classList.remove('map-nogeo')
        html.classList.remove('map-error')
    })
}/*start*/

//if the position wasn't loaded, keep searching the postion
//until th eufllocnt is on addeding mode
function keepLoadMyPosition(detail){  //console.log('keepLoadMyPosition', detail)

    const fullcontHtml = detail.html.closest(".fullcont")

    //console.log('fullcontHtml', fullcontHtml)

    const timer = setInterval(()=>{ 

            if(!fullcontIsAddeding(fullcontHtml)) {
                 clearInterval(timer)
            }

            mapHanlder.searchMyCoor(detail, (position)=>{   //console.log('searchingPosition>',)

                if(position != 'errorLoadingLocation'){ 

                    mapHanlder.generateMap(detail,  position)
                    detail.html.classList.remove('map-nogeo')
                    detail.html.classList.remove('map-error')
                    clearInterval(timer)
                }
            })

    },2000) 

}/**/

//retrun true > if the user still addeding the element && fullcontHtml.classList.contains('mode-add')
function fullcontIsAddeding(fullcontHtml){
    if( fullcontHtml.classList.contains('fullcont-show')  ){
        return true
    }
    return false
}



//get the coors form the html element
export function getValue(id){  //console.log('getValue##>')

    const mapDest = document.getElementById(id)
    const data    = mapDest.getAttribute('data-coor')

    return data
}

export function getValueAddress(id){  //console.log('getValue##>')

    const mapDest = document.getElementById(id)
    const data    = mapDest.getAttribute('data-address')

    return data
}

export function addNoGeo(html){ 

    html.classList.add('map-nogeo')
    html.classList.add('a-shake')
    remove(()=>{   html.classList.remove('a-shake') })   
}

export function addError(id){ 

    const mapDest = document.getElementById(id)
    mapDest.classList.add('map-error')
    mapDest.classList.add('a-shake')
    remove(()=>{   mapDest.classList.remove('a-shake') })   
}


export function removeError(id){ 

    const mapDest = document.getElementById(id)
    mapDest.classList.remove('map-error')
}


export function clean(id){ //console.log('clean>')

    const mapDest  = document.getElementById(id)
    const body     = mapDest.querySelector('.body')
    body.innerHTML = ''

    mapDest.setAttribute('data-coor', '')
    body.setAttribute('style', '');

}




function remove(callback){
  setTimeout(()=>{
    callback()
  }, 500)
}


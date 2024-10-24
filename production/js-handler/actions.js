

export function start(detail){

    switch (detail.act){
        case 'call':         return call(detail) ;          break;          


    }  

}




function call(detail){


	window.open(`tel:${detail.phone}`, '_self')

}
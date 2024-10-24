
var control = 0
var timer

export function start(callback){ //console.log('setInterval>' ) 
    
    if ( control < 700 && control > 0 ){ return }
    
    clearInterval(timer)

    timer = setInterval(()=>{ //console.log('setInterval>' )
        
        control += 100
        
        if( control >= 700){
            control  = 0
            clearInterval(timer)
            callback()
        }/**/

    }, 100)    

}/**/



const notificationDetail = require('./sale-fullcont-notification-obj')
const dateTime           = require ('../../../../../js-handler/time-time')
const dateDate           = require ('../../../../../js-handler/time-date')

var schedule     = []
var agreements   = []

export function start( data, result, htmlFc){  //console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn', htmlFc.notification)
    //console.log('selectOne>goxxxresult', result)

    emptyVars(htmlFc)
        
    hasTrestictions    (data, result, htmlFc  )


}/**/

//return true for continues, false to stop
function hasTrestictions(data, result, htmlFc){ // console.log('overSchedule>go', result.restriction )
      
    if( result.restriction.val === "saleHasPayment" ){ //console.log('on the if', )
        addBody({ type:'blockEdition', msg:`S `}, htmlFc)
        return true


    }

    return false 
}/**/











function addBody(detail, htmlFc){
    htmlFc.notification.insertAdjacentHTML("beforeend", notificationDetail.start(detail))  
}
 

function emptyVars(htmlFc){
    htmlFc.notification.innerHTML = ``
    schedule   = []
    agreements = []    
}








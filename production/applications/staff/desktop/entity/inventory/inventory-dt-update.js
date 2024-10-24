const timeDate = require ('../../../../../js-handler/time-date')

const settings         = require('../../../../../js-handler/settings')


export function getshelflifestyle(elem) {  
    let default_shelf_life = settings.getData().default_shelf_life;
    let alert_shelf_life = settings.getData().alert_shelf_life;
    let shelf_life = 0;
    let delivered_date = new Date(elem.remaining_days); // Convertir la fecha de entrega a objeto de fecha
    let today = new Date(); // Obtener la fecha actual
    let days_elapsed = Math.floor((today - delivered_date) / (1000 * 60 * 60 * 24)); // Calcular los días transcurridos
    let days_remaining = 0;
    let alert = "";
    let icon = "";
    let descr = "";

    if(elem.shelf_life === 0 ){
        shelf_life = default_shelf_life;
    }else{
        shelf_life = elem.shelf_life;
    }

   
    days_remaining = parseInt(shelf_life) - parseInt(days_elapsed);
    
    
    if (days_remaining == 0) {
        alert = "Expired";
        icon = { color: 'td-red-icon', svg: 'check-round' };
        descr = "Today";
    } 
    else if (days_remaining <= 0) {
        alert = "Expired";
        icon = { color: 'td-red-icon', svg: 'check-round' };
        descr = Math.abs(days_remaining) + " days ago";
    }
    else if (days_remaining <= alert_shelf_life) {
        alert = "Expiring soon";
        icon = { color: 'td-orange-icon', svg: 'check-round' };
        descr = "On " + days_remaining + " days";
    } else if( Number.isNaN(days_remaining)) {
        alert = shelf_life + " days "
        icon = { color: 'td-gray-icon', svg: 'check-round' };
        descr = "Not Delivered Yet";
        console.log(elem.remaining_days)
    }
    else {
        alert = "Expires On";
        icon = { color: 'td-gray-icon', svg: 'check-round' };
        descr = "On " + days_remaining + " days";
        console.log(elem.remaining_days)
    }

    return { alert: alert, icon: icon, descr: descr };   
}





// export function getshelflifestyle(elem){  

//     // console.log(settings.getData());
//     let default_shelf_life = settings.getData().default_shelf_life
//     let alert_shelf_life   = settings.getData().alert_shelf_life
//     let shelf_life         = 0;
//     let alert              = "";
//     let icon               = "";
//     let descr              = "";

//     // console.log("sheft life",elem.shelf_life)

//     if(elem.shelf_life === 0 ){
//         shelf_life = default_shelf_life;
//     }else{
//         shelf_life = elem.shelf_life;
//     }

//     console.log("sheft life setting",(parseInt(shelf_life) - parseInt(elem.remaining_days)))

//     if (shelf_life < elem.remaining_days) {
//         alert="Expired";
//         icon = {color:'td-red-icon', svg:'check-round'};
//         descr= "Expired " + (parseInt(elem.remaining_days) - parseInt(shelf_life)) +   " day ago"
//         console.log('expired', descr)


//     }else if ( parseInt(shelf_life) - parseInt(elem.remaining_days)  <= alert_shelf_life ) {
//         alert="Expiring soon";
//         icon = {color:'td-orange-icon', svg:'check-round'};
//         descr= "On " + ( parseInt(shelf_life) -  parseInt(elem.remaining_days) ) + " days"
//         // console.log('expired soon', descr)
        
//     }else{
//         alert="Expiring soon";
//         icon = {color:'td-gray-icon', svg:'check-round'};
//         descr= "On " + ( parseInt(shelf_life) -  parseInt(elem.remaining_days) ) + " days"

//     }


//     return {alert: alert, icon:icon, descr:descr };   
    
 
//  }
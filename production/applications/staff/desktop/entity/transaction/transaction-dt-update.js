const timeDate = require ('../../../../../js-handler/time-date')
const settings = require('../../../../../js-handler/settings')

/*
This function determines the shelf life status of an item
and returns an object containing information about its expiration state.
*/
export function getshelflifestyle(elem){  

    //console.log(settings.getData());
    let default_shelf_life = settings.getData().default_shelf_life
    let alert_shelf_life   = settings.getData().alert_shelf_life
    let shelf_life         = 0;
    let alert              = "";
    let icon               = "";
    let descr              = "";

    if(elem.shelf_life == 0 ){
        shelf_life=default_shelf_life;
    }else{
        shelf_life = elem.shelf_life;
    }



    if (shelf_life < elem.remaining_days) {
        alert = "Expired";
        icon  = {color:'td-red-icon', svg:'check-round'};
        descr = "Expired " + (parseInt(elem.remaining_days) - parseInt(shelf_life)) +   " day ago"

    }else if ( parseInt(shelf_life) - parseInt(elem.remaining_days)  <= alert_shelf_life ) {
        alert = "Expiring soon";
        icon  = {color:'td-orange-icon', svg:'check-round'};
        descr = "On " + ( parseInt(shelf_life) -  parseInt(elem.remaining_days) ) + " days"
        
    }else{
        alert = "Expiring soon";
        icon  = {color:'td-gray-icon', svg:'check-round'};
        descr = "On " + ( parseInt(shelf_life) -  parseInt(elem.remaining_days) ) + " days"
    }

    return {alert: alert, icon:icon, descr:descr };   
     
}
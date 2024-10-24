const timeDate = require ('../../../../../js-handler/time-date')



export function getTimeSensitiveStyle(elem){  
    
    let icon = "";
    if (elem.shelf_life=="0" || elem.shelf_life=="") {
        icon = {color:'td-gray-icon', svg:'check-round'};
    }else{
        icon = {color:'td-green-icon', svg:'check-round'};
    }

    return icon;   
    
 
 }


 export function getTimeTemperatureStyle(elem){  
    
    let icon = "";
    if (elem.temperature=="") {
        icon = {color:'td-gray-icon', svg:'check-round'};
    }else{
        icon = {color:'td-green-icon', svg:'check-round'};
    }

    return icon;   
    
 
 }
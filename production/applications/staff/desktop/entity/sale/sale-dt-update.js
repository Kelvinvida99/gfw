const timeDate = require ('../../../../../js-handler/time-date')





export function getStatusStyle(elem){  
    

    let icon = "";
    switch (elem.payment_status) {
        case "paid":
            icon = {color:'td-gray-icon', svg:'check-round'};
            break;
        case "unpaid":
            icon = {color:'td-orange-icon', svg:'check-round'};
            break;

        case "partially_paid":
            icon = {color:'td-orange-icon', svg:'check-round'};
            break;

        case "close":
            icon = {color:'td-gray-icon', svg:'check-round'};
            break;

        default:
            icon = {color:'td-white-icon', svg:'check-round'};
            break;
    }

    if (elem.payment_status != "paid" && parseInt(elem.remaining_days)<=0) {
        icon = {color:'td-red-icon', svg:'check-round'};
    }



    
    return icon;   
    
 
 }

 
export function getstatusshippingtyle(elem){  
    

    let icon      = "";
    let label_top = "";
    let desc      = "";

    switch (elem.shipping_status) {
        case "preparing":
            icon      = {color:'td-red-icon', svg:'hammer'};
            label_top = "Preparing";
            desc      = "Getting ready";
            break;

        case "ready to pickup":
            icon      = {color:'td-green-icon', svg:'check-round'};
            label_top = "Ready";
            desc      = "To Pickup";
            break;

        case "shipped":
            icon      = {color:'td-green-icon', svg:'truck'};
            label_top = "Shipped";
            desc      = "On Way";
            break;

        case "delivered":
            icon      = {color:'td-gray-icon', svg:'check-round'};
            label_top = "Delivered";
            desc      = "Dispatched";
            break;

        default:
            icon      = {color:'', svg:''};
            label_top = "";
            desc      = "";
            break;
    }



    
    return {label_top:label_top, desc: desc , icon:icon};   
    
 
 }


 
export function getstatuspaymentstyle(elem){  
    

    let icon      = "";
    let label_top = "";
    let desc      = "";

    switch (elem.payment_status) {
        case "paid":
            icon      = {color:'td-green-icon', svg:'cash'};
            label_top = "Paid";
            desc      = "No action needed"
            break;
        case "unpaid":
            if (elem.shipping_status != 'delivered') {
                icon      = {color:'td-gray-icon', svg:'cash'};
                label_top = "--";
                desc      = "No Payment needed"
            }else{
                icon      = {color:'td-orange-icon', svg:'cash'};
                label_top = "Unpaid";
                desc      = "Payment needed"
            }
            break;

        case "partially_paid":
            icon      = {color:'td-orange-icon', svg:'cash'};
            label_top = "Partially paid";
            desc      = "Payment needed";
            break;

        case "close":
            icon      = {color:'td-gray-icon', svg:'cash'};
            label_top = "Close";
            desc      = "No action needed";
            break;

        default:
            icon      = {color:'td-white-icon', svg:'cash'};
            label_top = "";
            desc      = "";
            break;
    }

    if (elem.payment_status != "paid" && parseInt(elem.remaining_days)<=0) {
        icon = {color:'td-red-icon', svg:'cash'};
        label_top = "Overdue";
        desc      = "Payment needed";

    }



    
    return {label_top:label_top, desc: desc , icon:icon};   
    
 
 }
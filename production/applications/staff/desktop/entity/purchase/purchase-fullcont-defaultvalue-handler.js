const settings         = require('../../../../../js-handler/settings')
const timeDate         = require ('../../../../../js-handler/time-date')

//Function to set default values to fullcont fields when creating a record is pressed
export function setDefaultValue(htmlFc){

    let purchase_date              = htmlFc.fullcontHTML.querySelector('#purchase_form_date input');
    purchase_date.value            = timeDate.convertDateToInput();

    let purchase_statement         = htmlFc.fullcontHTML.querySelector('#purchase_form_purchase_statement textarea');
    purchase_statement.value       = settings.getData().purchase_statement

    let purchase_footer            = htmlFc.fullcontHTML.querySelector('#purchase_form_purchase_footer textarea');
    purchase_footer.value          = settings.getData().purchase_footer

    let purchase_due_date          = htmlFc.fullcontHTML.querySelector('#purchase_form_due_date input');
    let grace_period               = settings.getData().grace_period =="" ? 0 :  parseInt(settings.getData().grace_period);
    purchase_due_date.value        = timeDate.convertDateToInput( new Date().setDate(new Date().getDate()+grace_period));


    let purchase_shipping_status   =  htmlFc.fullcontHTML.querySelector('#purchase_form_shipping select');
    purchase_shipping_status.value = 'delivered';

    let event = new Event('change');
    purchase_shipping_status.dispatchEvent(event);


    //console.log("setttiinggggggg" ,settings.getData());

    htmlFc.formCopy.forEach(element => {

        if (element.name == "purchase_date") {
            element.value = purchase_date.value;
        }

        if (element.name == "purchase_statement") {
            element.value = purchase_statement.value;
        }
            
        if (element.name == "purchase_footer") {
            element.value = purchase_footer.value;
        }

        if (element.name == "due_date") {
            element.value = purchase_due_date.value;
        }

        if (element.name == "shipping") {
            element.value = purchase_shipping_status.value;
        }

        if (element.name == "delivered_date") {
            element.value = htmlFc.fullcontHTML.querySelector('#purchase_form_delivered_date input').value;
        }

        if (element.name == "bill_date") {
            element.value = htmlFc.fullcontHTML.querySelector('#purchase_form_bill_date input').value;
        }
    });
}
const snack = require ('../../../../../components/snack/snack')

export function addBillingToShipping(detail, htmlFc){  
    // console.log(htmlFc.fullcontHTML)
    let bill_to_address = htmlFc.fullcontHTML.querySelector("#customer_form_bill_to_address").querySelector('input[type="text"]');
    let bill_to_apt     = htmlFc.fullcontHTML.querySelector("#customer_form_bill_to_apt").querySelector('input[type="text"]');
    let bill_to_city    = htmlFc.fullcontHTML.querySelector("#customer_form_bill_to_city").querySelector('input[type="text"]');
    let bill_to_state   = htmlFc.fullcontHTML.querySelector("#customer_form_bill_to_state").querySelector('select');
    let bill_to_zip     = htmlFc.fullcontHTML.querySelector("#customer_form_bill_to_zip").querySelector('input[type="text"]');
    let ship_to_address = htmlFc.fullcontHTML.querySelector("#customer_form_ship_to_address");
    let ship_to_apt     = htmlFc.fullcontHTML.querySelector("#customer_form_ship_to_apt");
    let ship_to_city    = htmlFc.fullcontHTML.querySelector("#customer_form_ship_to_city");
    let ship_to_state   = htmlFc.fullcontHTML.querySelector("#customer_form_ship_to_state");
    let ship_to_zip     = htmlFc.fullcontHTML.querySelector("#customer_form_ship_to_zip");
    let check           = htmlFc.fullcontHTML.querySelector("#customer_form_check_shipping_address");
    let check_value     = check.querySelector('input[type="checkbox"]').checked;

            if (check_value) {
                // Verificar si el campo de facturación no está vacío
                if (bill_to_address.value.trim().length  > 0 
                    || bill_to_apt.value.trim().length   > 0 
                    || bill_to_city.value.trim().length  > 0 
                    || bill_to_state.value.trim().length > 0 
                    || bill_to_zip.value.trim().length   > 0) {
                    
                    ship_to_address.querySelector('input[type   ="text"]').value = bill_to_address.value;
                    ship_to_apt.querySelector('input[type       ="text"]').value = bill_to_apt.value;
                    ship_to_city.querySelector('input[type      ="text"]').value = bill_to_city.value;
                    ship_to_state.querySelector('select').value                  = bill_to_state.value;
                    ship_to_zip.querySelector('input[type       ="text"]').value = bill_to_zip.value;
                    // console.log('Asignando dirección de facturación a la dirección de envío');
                }
            } else {
                ship_to_address.querySelector('input[type ="text"]').value = ship_to_address.querySelector('input[type="text"]').value;
                ship_to_apt.querySelector('input[type     ="text"]').value = ship_to_apt.querySelector('input[type="text"]').value;
                ship_to_city.querySelector('input[type    ="text"]').value = ship_to_city.querySelector('input[type="text"]').value;
                ship_to_state.querySelector('input[type   ="text"]').value = ship_to_state.querySelector('input[type="text"]').value;
                ship_to_zip.querySelector('input[type     ="text"]').value = ship_to_zip.querySelector('input[type="text"]').value ;
            }
         
} 
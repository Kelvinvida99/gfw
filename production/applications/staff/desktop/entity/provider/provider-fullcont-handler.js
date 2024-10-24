
const textfieldMultiselect = require ('../../../../../components/textfield/textfield-multiselect')

export function complete_bill_to_ship(htmlFc) {  
  

  let input_bill_to_address = htmlFc.fullcontHTML.querySelector('#provider_form_bill_to_address input').value;
  let input_bill_to_apt     = htmlFc.fullcontHTML.querySelector('#provider_form_bill_to_apt input').value;
  let input_bill_to_city    = htmlFc.fullcontHTML.querySelector('#provider_form_bill_to_city input').value;
  let input_bill_to_state   = htmlFc.fullcontHTML.querySelector('#provider_form_bill_to_state select').value;
  let input_bill_to_zip     = htmlFc.fullcontHTML.querySelector('#provider_form_bill_to_zip input').value;
  let check                 = htmlFc.fullcontHTML.querySelector("#provider_form_check_shipping_address");
  let check_value           = check.querySelector('input[type="checkbox"]').checked;


  if (check_value) {
    htmlFc.fullcontHTML.querySelector('#provider_form_ship_to_address input').value = input_bill_to_address;
    htmlFc.fullcontHTML.querySelector('#provider_form_ship_to_apt input').value = input_bill_to_apt;
    htmlFc.fullcontHTML.querySelector('#provider_form_ship_to_city input').value = input_bill_to_city;
    textfieldMultiselect.choose(htmlFc.fullcontHTML.querySelector('#provider_form_ship_to_state'), input_bill_to_state)
    htmlFc.fullcontHTML.querySelector('#provider_form_ship_to_zip input').value = input_bill_to_zip;
  }




}

function set_required(htmlFc, value) {

  htmlFc.form.forEach((element, index) => {

    if (element.name == "username") {
      element.required = value;
      htmlFc.formCopy[index].required=value;
    }

    if (element.name == "__password") {
      element.required = value;
      htmlFc.formCopy[index].required=value;

    }


  });


  // htmlFc.formCopy.forEach(element => {

  //   if (element.name == "username") {
  //     element.required = value;
  //   }

  //   if (element.name == "__password") {
  //     element.required = value;
  //   }
  // });

}

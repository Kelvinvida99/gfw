export function otherFieldProvider( detail, htmlFc ){  //console.log('updateCsutomerField -> ', htmlFc)

    var rawFields = htmlFc.fullcontHTML.querySelector('#purchase_form_provider_id').querySelector(".otherField").getAttribute('otherField');

    try {
      var purchaseOtherField = JSON.parse(rawFields);
      // console.log(purchaseOtherField);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
    htmlFc.fullcontHTML.querySelector('#purchase_form_email input').value = purchaseOtherField.email;
}

export function otherFieldInvestor( detail, htmlFc ){  //console.log('updateCsutomerField -> ', htmlFc)

  var rawFields = htmlFc.fullcontHTML.querySelector('#purchase_form_provider_id');

  try {
    var customerOtherField = JSON.parse(rawFields);
    //console.log(customerOtherField);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }

  // htmlFc.fullcontHTML.querySelector('#sale_form_bill_to_address input').value = customerOtherField.address;
}

export function otherFieldItem(detail, htmlFc) {
  // console.log('updateItemField -> ', detail)

  let ac_line = htmlFc.fullcontHTML.querySelector("#purchase_form_item_selling_" + detail.id_ac + " input");
  ac_line.focus();
  ac_line.click();
}
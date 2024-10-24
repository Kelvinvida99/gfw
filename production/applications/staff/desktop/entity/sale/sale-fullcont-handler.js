import { line } from '../../../../../components/monitor/monitor-generator'

const snack                = require('../../../../../components/snack/snack')
const textfieldMultiselect = require('../../../../../components/textfield/textfield-multiselect')
const textfieldHandler     = require('../../../../../components/textfield/textfield-handler')
const fullcontTab          = require('../../../../../components/fullcont/fullcont-form-handler-tab')
const dialog               = require('./sale-dialog')
const saleSnack            = require('./sale-snack')
const dtsalechanges        = require('./sale-dt-handler')
const dtGenerator          = require('../../../../../components/dt/dt-generator')
const settings             = require('../../../../../js-handler/settings')
const timeDate             = require ('../../../../../js-handler/time-date')
const autocomplete         = require ('../../../../../components/textfield/autocomplete')


//const invoiceBasic     = require ('./sale-pdf-invoice')
//const packSlip     = require ('./sale-pdf-packSlip')
export var inventoryStock = [];

export function verifyQtyItem(htmlFc) {
  let mt         = htmlFc.fullcontHTML.querySelector("#sale_form_sale_vs_item");
  let mtRow      = mt.querySelectorAll(".line");
  let itemGroups = [];
  let qtyField;
  
  // Agrupar ítems por item_name y type
  mtRow.forEach((a) => {
    let mtField          = a.querySelector(".row");
    let itemNameElements = mtField.querySelectorAll(".itemname");
    let itemQty          = mtField.querySelectorAll(".qty");

    itemNameElements.forEach((b) => {
      let atibuti        = b.querySelector(".otherField");
      let dataAttribut   = atibuti.getAttribute('otherfield');
      let attributValues = JSON.parse(dataAttribut);

      let key = `${attributValues.item_name}-${attributValues.type}`;

      if (!itemGroups[key]) {

        itemGroups[key] = {
          item_name: attributValues.item_name,
          type: attributValues.type,
          qty_available: attributValues.qty_available,
          user_qty: 0
        };
      }

      itemQty.forEach((c) => {
        qtyField       = c
        let inputValue = c.querySelector('input[type="number"]').value;
        if (inputValue) {
          itemGroups[key].user_qty += parseFloat(inputValue);
        }
      });
    });
  });

  // Verificar y trabajar con los ítems que son iguales
  Object.keys(itemGroups).forEach(key => {
    let item     = itemGroups[key];
    let qtyTotal = item.qty_available - item.user_qty;
    // console.log(item)

    if (qtyTotal < 0) {
      saleSnack.start({ act: 'show', id: 'noItems' });
      textfieldHandler.error(qtyField.closest(".textfield"));
      fullcontTab.notify(qtyField.closest(".textfield"));
      htmlFc.fullcontHTML.querySelector("#saveButton").classList.add('hideOnAdd');
      htmlFc.fullcontHTML.querySelector("#savePrintButton").classList.add('hideOnAdd');
      htmlFc.fullcontHTML.querySelector("#updateButton").classList.add('hideOnEdit');
      htmlFc.fullcontHTML.querySelector("#updatePrintButton").classList.add('hideOnEdit');
    } else {
      // console.log(`Item: ${item.item_name}, Type: ${item.type}, Qty Total: ${qtyTotal}`);
      saleSnack.start({ act: 'show', id: 'totalQtyItems', value: `${qtyTotal}` });
      htmlFc.fullcontHTML.querySelector("#saveButton").classList.remove('hideOnAdd');
      htmlFc.fullcontHTML.querySelector("#savePrintButton").classList.remove('hideOnAdd');
      htmlFc.fullcontHTML.querySelector("#updateButton").classList.remove('hideOnEdit');
      htmlFc.fullcontHTML.querySelector("#updatePrintButton").classList.remove('hideOnEdit');
    }
  });
}

export function otherFieldCustomer(detail, htmlFc) {  //console.log('updateCsutomerField -> ', htmlFc)

  var rawFields = htmlFc.fullcontHTML.querySelector('#sale_form_customer_id').querySelector(".otherField").getAttribute('otherField');

  try {
    var customerOtherField = JSON.parse(rawFields);
    //console.log(customerOtherField);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }


  htmlFc.fullcontHTML.querySelector('#sale_form_email input').value = customerOtherField.email;
  htmlFc.fullcontHTML.querySelector('#sale_form_bill_to_address input').value = customerOtherField.bill_to_address;
  htmlFc.fullcontHTML.querySelector('#sale_form_bill_to_apt input').value = customerOtherField.bill_to_apt;
  htmlFc.fullcontHTML.querySelector('#sale_form_bill_to_city input').value = customerOtherField.bill_to_city;
  textfieldMultiselect.choose(htmlFc.fullcontHTML.querySelector('#sale_form_bill_to_state'), customerOtherField.bill_to_state)
  htmlFc.fullcontHTML.querySelector('#sale_form_bill_to_zip input').value = customerOtherField.bill_to_zip;

  htmlFc.fullcontHTML.querySelector('#sale_form_ship_to_address input').value = customerOtherField.ship_to_address;
  htmlFc.fullcontHTML.querySelector('#sale_form_ship_to_apt input').value = customerOtherField.ship_to_apt;
  htmlFc.fullcontHTML.querySelector('#sale_form_ship_to_city input').value = customerOtherField.ship_to_city;
  textfieldMultiselect.choose(htmlFc.fullcontHTML.querySelector('#sale_form_ship_to_state'), customerOtherField.ship_to_state)
  htmlFc.fullcontHTML.querySelector('#sale_form_ship_to_zip input').value = customerOtherField.ship_to_zip;

}



export function otherFieldItem(detail, htmlFc) {
  //console.log('updateItemField -> ', detail)


  var rawFields = htmlFc.fullcontHTML.querySelector("#sale_form_item_mt_" + detail.id_ac).querySelector(".otherField").getAttribute('otherField');

  try {
    var itemOtherField = JSON.parse(rawFields);
    //console.log(customerOtherField);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }

  let ac_line = htmlFc.fullcontHTML.querySelector("#sale_form_item_mt_" + detail.id_ac);

  ac_line.closest('.line').querySelector('.selling_type input').value = itemOtherField.type;
  ac_line.closest('.line').querySelector('.item_unit_cost input').value = parseFloat(itemOtherField.item_unit_cost).toFixed(2);
  ac_line.closest('.line').querySelector('.price input').value = parseFloat(itemOtherField.selling_price).toFixed(2);
  ac_line.closest('.line').querySelector('.qty input').value = "";
  ac_line.closest('.line').querySelector('.qty input').focus();
  ac_line.closest('.line').querySelector('.total input').value = "";


  // htmlFc.fullcontHTML.querySelector('.line-' + detail.id_ac + ' .type input').value = itemOtherField.type;
  // htmlFc.fullcontHTML.querySelector('.line-' + detail.id_ac + ' .unit_price input').value = itemOtherField.unit_price;

  // htmlFc.fullcontHTML.querySelector('.line-' + detail.id_ac + ' .qty input').value = 0;
  // htmlFc.fullcontHTML.querySelector('.line-' + detail.id_ac + ' .total input').value = 0;


}


export function calculate_values(detail, htmlFc) {

  let ac_line = htmlFc.fullcontHTML.querySelector("#sale_form_item_mt_" + detail.id_item_ac);

  let input_qty = ac_line.closest('.line').querySelector('.qty input');
  let input_total = ac_line.closest('.line').querySelector('.total input');
  let input_price = ac_line.closest('.line').querySelector('.price input');

  let qty_value = (input_qty.value == "" || parseFloat(input_qty.value) == NaN || parseFloat(input_qty.value) == 0) ? 0 : parseFloat(input_qty.value);
  let price_value = (input_price.value == "" || parseFloat(input_price.value) == NaN || parseFloat(input_price.value) == 0) ? 0 : parseFloat(input_price.value);
  let total_value = (input_total.value == "" || parseFloat(input_total.value) == NaN || parseFloat(input_total.value) == 0) ? 0 : parseFloat(input_total.value);


  let itemOtherField = get_otherField(ac_line);


  switch (detail.input) {

    case "qty":

      if (qty_value == 0 || price_value == 0) {
        return;
      }

      if (qty_value > parseFloat(itemOtherField.qty_available)) {
        snack.start({ act: 'show', id: 'insufficientQuantity', });
        textfieldHandler.error(input_qty.closest(".textfield"));
      } else {
        let allItemError = htmlFc.fullcontHTML.querySelectorAll("#sale_form_sale_vs_item  .line .textfield-error");

        textfieldHandler.errorClean(input_qty.closest(".textfield"));
        if (allItemError != null && allItemError.length < 2) {
          fullcontTab.clean(input_qty);
        }

      }

      input_total.value = (price_value * qty_value).toFixed(2);

      


      break;

    case "price":
      if (price_value == 0 || qty_value == 0) {
        return;
      }

      input_total.value = (price_value * qty_value).toFixed(2);

      break;



    case "total":
      if (total_value == 0 || qty_value == 0) {
        return;
      }

      input_price.value = (parseFloat(input_total.value) / qty_value).toFixed(2);

      break;

    default:
      break;
  }

  calculateGrandTotal(htmlFc);
  fillFieldCostMT(ac_line.closest('.line'));

}


export function get_otherField(ac_line) {


  try {

    let rawFields = ac_line.querySelector(".otherField");

    if (rawFields == null) {
      throw "Null";
    }

    return JSON.parse(rawFields.getAttribute('otherField'));

  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
}


export function calculateGrandTotal(htmlFc) {
  

  let all_line = htmlFc.fullcontHTML.querySelectorAll("#sale_form_sale_vs_item .line");
  let input_grand_total = htmlFc.fullcontHTML.querySelector("#sale_form_grand_total input");
  let input_total_profit_pct = htmlFc.fullcontHTML.querySelector("#sale_form_total_profit_pct input");
  let total = 0;
  let total_profic = 0;
  let total_costo = 0;

  if (all_line == undefined || all_line == null || all_line == undefined || all_line == null) {
    return;
  }

  all_line.forEach(function (element) {
    let input_total   = element.querySelector('.total input');
    let total_value   = (input_total.value == "" || parseFloat(input_total.value) == NaN || parseFloat(input_total.value) == 0) ? 0 : parseFloat(input_total.value);
    total = total + total_value;


    //calcular la ganancia total 
    let input_qty   = element.querySelector('.qty input');
    let input_price = element.querySelector('.price input');
    let qty_value   = (input_qty.value == "" || parseFloat(input_qty.value) == NaN || parseFloat(input_qty.value) == 0) ? 0 : parseFloat(input_qty.value);
    let price_value = (input_price.value == "" || parseFloat(input_price.value) == NaN || parseFloat(input_price.value) == 0) ? 0 : parseFloat(input_price.value);
  
    let item = element.querySelector(".purchase_vs_itemId");
    let item_selected = item.getAttribute("selected");

    if (JSON.parse(item_selected).length > 0) {
      let itemOtherField = get_otherField(item);
      total_costo = total_costo + (parseFloat(itemOtherField.item_unit_cost) * qty_value);
      total_profic = total_profic + (price_value * qty_value) - (parseFloat(itemOtherField.item_unit_cost) * qty_value);
    }
    
  });

  //calcular el porcentaje de la ganancia total
  let porcent_profict = (total_profic / total_costo) * 100;
  input_total_profit_pct.value = total_profic.toFixed(2) + ' / %' + porcent_profict.toFixed(2)
  //input_grand_total.value = parseFloat(total).toFixed(2);
  input_grand_total.value = `${parseFloat(total).toFixed(2)}`;

  //console.log("proceso terminado");


}

export async function validated(detail, htmlFc, mode) {



  if (mode == "update" || mode == "updatePrint") {
    let dbid = htmlFc.fullcontHTML.getAttribute("data-dbid");

    if (dbid == undefined || dbid == "" || dbid == null) {
      console.log('An error occurred during the validated payment.');
      return true;
    }

    // if (await processpayment(htmlFc,mode,dbid)) {
    //   return true;
    // }

  }





  let allItem = htmlFc.fullcontHTML.querySelectorAll("#sale_form_sale_vs_item  .line");
  let itemUnitPriceLower = [];

  let error = false;

  for (let i = 0; i < allItem.length; i++) {

    let item = allItem[i].querySelector(".purchase_vs_itemId");
    let item_selected = item.getAttribute("selected");
    let line = allItem[i];

    if (JSON.parse(item_selected).length > 0) {

      let itemOtherField = get_otherField(item);
      let input_qty = line.querySelector(".qty input");
      let input_unit_price = line.querySelector(".price input");
      let input_total = line.querySelector(".total input");

      let input_unit_price_value = (input_unit_price.value == "" || parseFloat(input_unit_price.value) == NaN
        || parseFloat(input_unit_price.value) == 0) ? 0 : parseFloat(input_unit_price.value);

      let input_qty_value = (input_qty.value == "" || parseFloat(input_qty.value) == NaN || parseFloat(input_qty.value) == 0) ? 0 : parseFloat(input_qty.value);

      let input_total_value = (input_total.value == "" || parseFloat(input_total.value) == NaN || parseFloat(input_total.value) == 0)
        ? 0 : parseFloat(input_total.value);

      if (input_qty_value == 0) {

        textfieldHandler.error(input_qty.closest(".textfield"));
        snack.start({ act: 'show', id: 'invalidValue', });

        fullcontTab.notify(input_qty.closest(".textfield"));

        error = true;
        break;
      }

      if (input_unit_price_value == 0) {

        textfieldHandler.error(input_unit_price.closest(".textfield"));
        snack.start({ act: 'show', id: 'invalidValue', });

        fullcontTab.notify(input_unit_price.closest(".textfield"));

        error = true;
        break;
      }

      if (input_total_value == 0) {

        textfieldHandler.error(input_total.closest(".textfield"));
        snack.start({ act: 'show', id: 'invalidValue', });

        fullcontTab.notify(input_total.closest(".textfield"));

        error = true;
        break;
      }

      if (input_qty_value > itemOtherField.qty_available) {

        textfieldHandler.error(input_qty.closest(".textfield"));
        snack.start({ act: 'show', id: 'insufficientQuantity', });

        fullcontTab.notify(input_qty.closest(".textfield"));

        error = true;
        break;

      }

      if (input_unit_price_value < itemOtherField.selling_price) {
        itemUnitPriceLower.push(input_unit_price);
      }
    }

  }


  if (error == false && itemUnitPriceLower.length > 0) {
    let itemName = "";
    let listItem = `<table  border="1">
      <thead>
        <tr>
            <th>PO# - ITEM NAME</th>
            <th>CURRENT SELLING PRICE</th>
            <th>EXPECTED SELLING PRICE</th>
        </tr>
      </thead>  
      <tbody>              
    `;

    let itemOtherField = "";
    itemUnitPriceLower.forEach(function (input_unit_price) {

      let rawFields = input_unit_price.closest('.line').querySelector('.purchase_vs_itemId').querySelector(".otherField").getAttribute('otherField');

      try {
        itemOtherField = JSON.parse(rawFields);

      } catch (error) {
        console.error("Error parsing JSON:", error);
      }


      textfieldHandler.error(input_unit_price.closest(".textfield"));
      fullcontTab.notify(input_unit_price.closest(".textfield"));



      listItem += '<tr><td>'+ itemOtherField.po +' - ' + itemOtherField.item_name + '</td> <td>' + parseFloat(input_unit_price.value).toFixed(2) + '</td> <td>'
        + itemOtherField.selling_price.toFixed(2) + '</td></tr>';


      error = true;

    });

    listItem = listItem + '</tbody></table>';

    if (error == true) {
      let actDialog = '';
      let modeEntity = '';
      switch (mode) {
        case "add":
          modeEntity = "Save";
          actDialog = "addOneFromDialog";
          break;
        case "addPrint":
          modeEntity = "Save";
          actDialog = "addOnePrintFromDialog";
          break;
        case "update":
          modeEntity = "Update";
          actDialog = "updateFromDialog";
          break;

        case "updatePrint":
          modeEntity = "Update";
          actDialog = "updatePrintFromDialog";
          break;

        default:
          break;
      }
      dialog.start({ act: "show", dest: 'sale', id: "saleSellingPrice", actDialog: actDialog, mode: modeEntity, entity: 'sale', items: listItem });

    }
  }




  return error;

}


export function required_field(htmlFc) {

  // console.log('updateCsutomerField -> ', htmlFc)

  let input_send = htmlFc.fullcontHTML.querySelector('#sale_form_send_email input');
  if (input_send.checked) {

    set_required(htmlFc, true);


  } else {
    set_required(htmlFc, false);
  }

}




function set_required(htmlFc, value) {

  htmlFc.form.forEach((element, index) => {
    if (element.name == "email") {
      element.required = value;
      htmlFc.formCopy[index].required = value;
    }

  });


}


export function sendInvoice(pathpdf, name, code, dbid) {
  // console.log("llego");
  let input_email = document.querySelector('#sale_form_email input');

  let userId = settings.getData().id

  sendmail({ email: input_email.value, type: "sendinvoice", pathpdf: pathpdf, name: name, code: code, dbid: dbid, userId: userId, entity: 'sale' });

}




function sendmail(data) {

  const infNewData = getFormData(data) //object > FormData()


  const controller = new AbortController();
  const timeout = setTimeout(() => { controller.abort() }, 30000);

  let options = { method: 'POST', body: infNewData, signal: controller.signal, credentials: 'same-origin' };

  snack.start({ act: 'show', id: 'sendemail', });

  fetch(`./server/php/send-emails/sendEmail.php`, options)
    .then(result => {
      return result.json()
    })
    .then((result) => {

      if (result.code == 400) {
        alert("An error occurred while sending the email. Recharge")
      }
    })
    .catch((error) => { // 
      console.log('An error occurred while sending the email. Recharge', 'ERROR');
    })

}


function getFormData(object) {
  const formData = new FormData()
  Object.keys(object).forEach(key => formData.append(key, object[key]))
  return formData
}


export function pdfMenuFullcont(type) {

  let elem = document.querySelector("#sale-fullcont");
  let dbid = elem.getAttribute("data-dbid");

  pdfGenerator(dbid, true, type);
}


export function pdfFullcontPackSlip() {

  let elem = document.querySelector("#sale-fullcont");
  let dbid = elem.getAttribute("data-dbid");

  pdfGenerator(dbid, false, "print");
}


export function pdfMenudt(detail) {

  pdfGenerator(detail.dbid, true, "print");
}


export function pdfPackSlipdt(detail) {

  pdfGenerator(detail.dbid, false, "print");
}



function pdfGenerator(dbid, showprice, type) {

  //let elem = document.querySelector("#sale-fullcont");
  //let dbid = elem.getAttribute("data-dbid");

  if (dbid == undefined || dbid == "" || dbid == null) {
    console.log('An error occurred during the create pdf.');
    return;
  }

  const formData = new FormData();
  formData.append('sale_id', dbid);
  formData.append('type', type);

  const controller = new AbortController();
  const timeout = setTimeout(() => { controller.abort() }, 30000);

  let options = {
    method: 'POST',
    body: formData,
    signal: controller.signal,
    credentials: 'same-origin'
  };

  let pdf = "";
  if (showprice == true) {
    pdf = "pdf-invoice.php";
  } else {
    pdf = "pdf-packSlip.php";
  }

  fetch(`./server/php/queries/report/sale/` + pdf, options)
    .then(result => result.json())
    .then(result => {

      if (result.file_path != "" && result.print == "true") {


        const iframe = document.querySelector("#reportIframe");
        iframe.src = result.file_path;


        setTimeout(() => {
          iframe.contentWindow.print();
        }, 200);




      }



      if (result.check_mail == "true") {
        sendInvoice(result.file_path, result.name, result.code, dbid);
      }


      //pdf(result,showprice);

    })
    .catch(error => {
      console.log('Error:', error);
      if (error.name === 'AbortError') {
        console.log('The request was canceled due to waiting time ');
      } else {
        console.log('An error occurred during the recovery request.');
      }
    });
}

// function pdf(result,showprice){
//   // Acceder a los datos
//   let data = {};
//   let dtBody = [];
//   //const randomNumber = getRandomIntInclusive(89, 9999999);


//   // Acceder a los datos
//   result.multiTables[0].data.forEach((item) => {
//     let row
//     if (showprice) {
//       dtBody.push([item.item_name,  item.selling_type, item.qty, item.price, item.total]);
//     }else{
//       dtBody.push([item.item_name,  item.selling_type, item.qty]);
//     }


//   });

//   let dtHeader = [];

//   if (showprice) {
//     dtHeader = ['DESCRIPTION', 'UNIT', 'QTY', 'UNIT PRICE', 'TOTAL'];
//   } else {
//     dtHeader = ['DESCRIPTION', 'UNIT', 'QTY'];
//   }

//   //console.log(result);




//   data = {
//     // dates 
//     date: result.data[0].saleDate,
//     code: result.data[0].code,
//     customer: result.data[0].customerName,
//     phone: result.data[0].customerPhone,
//     fax: result.data[0].customerFax,
//     email: result.data[0].email,
//     logo: "./css/img/pic/gosive.png",
//     // bill to
//     billtoAddress: result.data[0].bill_to_address,
//     billtoCity: result.data[0].bill_to_city,
//     billtoState: result.data[0].bill_to_state,
//     billtoZip: result.data[0].bill_to_zip,
//     // ship to
//     shiptoAddress: result.data[0].ship_to_address,
//     shiptoCity: result.data[0].ship_to_city,
//     shiptoState: result.data[0].ship_to_state,
//     shiptoZip: result.data[0].ship_to_zip,

//     total: result.data[0].grand_total,
//     //note: 'The due date for this invoce is on 1/24/2024 The due date for this invoce is on 1/24/2024 The due date for this invoce is on 1/24/2024 The due date for this invoce is on 1/24/2024 The due date for this invoce is on 1/24/2024 The due date for this invoce is on 1/24/2024 The due date for this invoce is on 1/24/2024 The due date for this invoce is on 1/24/2024 The due date for this invoce is on 1/24/2024 The due date for this invoce is on 1/24/2024 The due date for this invoce is on 1/24/2024 The due date for this invoce is on 1/24/2024 The due date for this invoce is on 1/24/2024 The due date for this invoce is on 1/24/2024 The due date for this invoce is on 1/24/2024 The due date for this invoce is on 1/24/2024 The due date for this invoce is on 1/24/2024 The due date for this invoce is on 1/24/2024 The due date for this invoce is on 1/24/2024 The due date for this invoce is on 1/24/2024 The due date for this invoce is on 1/24/2024 The due date for this invoce is on 1/24/2024 The due date for this invoce is on 1/24/2024 The due date for this invoce is on 1/24/2024 The due date for this invoce is on 1/24/2024',
//     //pdfName: "Sale Order " + randomNumber + ".pdf",
//     sale_statement: result.data[0].sale_statement,
//     sale_footer: result.data[0].sale_footer,


//     dtHeader: dtHeader,
//     dtBody: dtBody,
//   }


//   if (showprice) {
//     invoiceBasic.start(data)
//   } else {
//     packSlip.start(data)
//   }




// }

async function verifyPayment(htmlFc, dbid) {

  let data = { id: dbid };
  const formData = new FormData();
  formData.append('sale_id', data.id);

  const controller = new AbortController();
  const timeout = setTimeout(() => { controller.abort() }, 30000);

  let options = {
    method: 'POST',
    body: formData,
    signal: controller.signal,
    credentials: 'same-origin'
  };

  try {
    const result = await fetch(`./server/php/sql/salepayment.php`, options);
    const paymentData = await result.json();

    // console.log("validacion", paymentData);
    if (paymentData.restriction.val == "SaleHasPayment") {
      snack.start({ act: 'show', id: 'saleHasPayment', });
      return true;
    } else {
      return false;
    }

    // Aquí puedes continuar con el código que depende de los datos de la petición fetch
  } catch (error) {
    console.log('Error:', error);
    if (error.name === 'AbortError') {
      console.log('The request was canceled due to waiting time ');
    } else {
      console.log('An error occurred during the recovery request.');
    }
  } finally {
    clearTimeout(timeout);
  }
  return false;
}


export async function processpayment(htmlFc, mode = "", dbid) {

  if (mode == "update" || mode == "updatePrint") {
    if (await verifyPayment(htmlFc, dbid)) {
      return true;
    }
  }

  return false;

}



export function dtgenerator(result, htmlFc) {
 
  let dtBody = htmlFc.fullcontHTML.querySelector('#sale-changes');
  dtBody.innerHTML = '';

  if (result.entitychanges.length > 0 && (result.entitychanges[0].data[0].user_name != null || result.entitychanges[0].data[0].user_name != undefined)) {

      let data = result.entitychanges[0].data;
      let dataorganizeRow = [];

    //  console.log("dtgeneratoooooor" ,JSON.parse(data[0].changes));

      dataorganizeRow = dtsalechanges.organizeRowEntityChange(data);


    //  console.log("dtgeneratoooooor" ,dataorganizeRow);
    
  
      let saleChanges = htmlFc.fullcontHTML.querySelector('#sale-changes')
      saleChanges.insertAdjacentHTML("beforeend", dataorganizeRow)  
  
  
  
  
  
  } 


}

export function cleandtfullcont(htmlFc) {
   
  let dtBody = htmlFc.fullcontHTML.querySelector('#sale-changes');
  dtBody.innerHTML = '';

  dtBody = htmlFc.fullcontHTML.querySelector('#sale-email');
  dtBody.innerHTML = '';
}


export function getemailTraking(result) {

  let dtBody = document.querySelector('#sale-email');
  dtBody.innerHTML = '';

  let resultEmail = JSON.parse(result.data[0].email_traking);

  if (resultEmail[0].data[0].id != null) {
    emailTrackingProcess(resultEmail);
  }


}

function emailTrackingProcess(resultEmail) {
  
  let data = resultEmail[0].data;
  let dataorganizeRow = [];

  dataorganizeRow = dtsalechanges.organizeRowemailTraking(data);

  let emailTraking = document.querySelector('#sale-email');
  emailTraking.insertAdjacentHTML("beforeend", dataorganizeRow);

}


export function shippingnow(htmlFc) {
  let shipping_date  = htmlFc.fullcontHTML.querySelector('#sale_form_shipping_date input');
  shipping_date.value = timeDate.convertDateToInput();

  let shipping_time  = htmlFc.fullcontHTML.querySelector('#sale_form_shipping_time input');
  shipping_time.value = timeDate.convertTimeToInput();


}



export function insertshippingdatetime(htmlFc) {
  const shipping_status       = htmlFc.fullcontHTML.querySelector("#sale_form_shipping_status select");

  if (shipping_status.value === "shipped") {
    shippingnow(htmlFc);
  }else{
    let shipping_date  = htmlFc.fullcontHTML.querySelector('#sale_form_shipping_date input').value = '';
    let shipping_time  = htmlFc.fullcontHTML.querySelector('#sale_form_shipping_time input').value = '';
  }

}

export function showcost(htmlFc) {

  
  let showcost = htmlFc.fullcontHTML.querySelector("#showcost").checked;


  if (showcost) {
    let col_showcost = htmlFc.fullcontHTML.querySelector("#col_showcost");
    col_showcost.classList.remove('dn');
    
    let input_total_profit_pct = htmlFc.fullcontHTML.querySelector("#sale_form_total_profit_pct");
    input_total_profit_pct.parentNode.classList.remove('dn');

    let col_title= htmlFc.fullcontHTML.querySelector("#cont_main");
    col_title.style.width = '25%';

    col_title = htmlFc.fullcontHTML.querySelector("#cont_detail");
    col_title.style.width = '73%';

    let title_label_detail = htmlFc.fullcontHTML.querySelectorAll("#cont_detail  label");
    title_label_detail.forEach(function (element) {

      if (element.parentNode.classList.contains('title_qty')) {
        element.parentNode.classList.remove('c25');
        element.parentNode.classList.add('c14');
      }else if (!element.parentNode.classList.contains('title_cost')) {
        element.parentNode.classList.remove('c25');
        element.parentNode.classList.add('c20');
      }

    });
    

    let lines = htmlFc.fullcontHTML.querySelectorAll("#sale_form_sale_vs_item  .line");
    
    lines.forEach(function (element) {
      element.querySelector(".item_unit_cost").closest('.cost').classList.remove('dn');
      let item_name = element.querySelector(".itemname");
      item_name.style.width = '25%';

      let detail_cont = element.querySelector(".itemdetail");
      detail_cont.style.width = '73%';

      //recorrer los otros elementos para cambiarles el ancho
      let items_other = element.querySelectorAll(".itemdetail input");
      items_other.forEach(function (elementdetail) {
        //preguntar si el input es el qty se debe hacer ese proceso en especifico
        if (elementdetail.parentNode.classList.contains('qty')) {
          elementdetail.parentNode.parentNode.classList.remove('c25');
          elementdetail.parentNode.parentNode.classList.add('c14');
        }else if (!elementdetail.parentNode.classList.contains('item_unit_cost')) {
          elementdetail.parentNode.parentNode.classList.remove('c25');
          elementdetail.parentNode.parentNode.classList.add('c20');
        }

      })

      fillFieldCostMT(element);


  
    });
  
  }else{
    let col_showcost = htmlFc.fullcontHTML.querySelector("#col_showcost");
    col_showcost.classList.add('dn');

    let input_total_profit_pct = htmlFc.fullcontHTML.querySelector("#sale_form_total_profit_pct");
    input_total_profit_pct.parentNode.classList.add('dn');

    let col_title= htmlFc.fullcontHTML.querySelector("#cont_main");
    col_title.style.width = '48%';

    col_title = htmlFc.fullcontHTML.querySelector("#cont_detail");
    col_title.style.width = '50%';

    let title_label_detail = htmlFc.fullcontHTML.querySelectorAll("#cont_detail  label");
    title_label_detail.forEach(function (element) {
      
      if (element.parentNode.classList.contains('title_qty')) {
        element.parentNode.classList.remove('c14');
        element.parentNode.classList.add('c25');
      }else if (!element.parentNode.classList.contains('title_cost')) {
        element.parentNode.classList.remove('c20');
        element.parentNode.classList.add('c25');
      }

    });



    let lines = htmlFc.fullcontHTML.querySelectorAll("#sale_form_sale_vs_item  .line");

    lines.forEach(function (element) {
      element.querySelector(".item_unit_cost").closest('.cost').classList.add('dn');
      let item_name = element.querySelector(".itemname");
      item_name.style.width = '48%';

      let detail_cont = element.querySelector(".itemdetail");
      detail_cont.style.width = '50%';

      //recorrer los otros elementos para cambiarles el ancho
      let items_other = element.querySelectorAll(".itemdetail input");
      items_other.forEach(function (elementdetail) {

        //preguntar si el input es el qty se debe hacer ese proceso en especifico
        if (elementdetail.parentNode.classList.contains('qty')) {
          elementdetail.parentNode.parentNode.classList.remove('c14');
          elementdetail.parentNode.parentNode.classList.add('c25');
        }else if (!elementdetail.parentNode.classList.contains('item_unit_cost')) {
          elementdetail.parentNode.parentNode.classList.remove('c20');
          elementdetail.parentNode.parentNode.classList.add('c25');
        }
      })

      fillFieldCostMT(element);
    });
    
  }

  calculateGrandTotal(htmlFc);

  
}

//esta funcion es para que en el campo de cost se coloque el costo del articulo / ganancias
function fillFieldCostMT(element) {
  let input_qty   = element.querySelector('.qty input');
  let input_cost  = element.querySelector('.cost input');
  let input_price = element.querySelector('.price input');
  let qty_value   = (input_qty.value == "" || parseFloat(input_qty.value) == NaN || parseFloat(input_qty.value) == 0) ? 0 : parseFloat(input_qty.value);
  let price_value = (input_price.value == "" || parseFloat(input_price.value) == NaN || parseFloat(input_price.value) == 0) ? 0 : parseFloat(input_price.value);


  let item = element.querySelector(".purchase_vs_itemId");
  let item_selected = item.getAttribute("selected");

  if (JSON.parse(item_selected).length > 0) {
    let itemOtherField = get_otherField(item);
    input_cost.value =  parseFloat(itemOtherField.item_unit_cost).toFixed(2) + ' / ' 
    + ((parseFloat(price_value) * parseFloat(qty_value)) - (parseFloat(itemOtherField.item_unit_cost) * parseFloat(qty_value))).toFixed(2)
  }
 
  
}

//agregar notificacion o circulo rojo en el tab de file solo si hay archivos
export function notifytab(htmlFc) {
  
  let bodyFile = htmlFc.fullcontHTML.querySelector("#bodyfile");
 
  let files_div =  bodyFile.querySelectorAll(':scope > :not(.cont-empty)');
  if (files_div.length > 0) {
      //colocar identificador si hay archivos en el tab file
    fullcontTab.notify(htmlFc.fullcontHTML.querySelector('#sale_form_file'));
  }else{
    fullcontTab.clean(htmlFc.fullcontHTML.querySelector('#sale_form_file'));
  }

}

export function calculatepaymentdue(htmlFc) {

  let sale_form_terms =  htmlFc.fullcontHTML.querySelector('#sale_form_terms select');
  let due_date  = htmlFc.fullcontHTML.querySelector('#sale_form_due_date input');
  let sale_date  = htmlFc.fullcontHTML.querySelector('#sale_form_sale_date input');

	if (!isNaN(new Date(sale_date.value).getTime())) {
    due_date.value = timeDate.convertDateToInput( new Date().setDate(new Date(sale_date.value + 'T00:00:00').getDate()+parseInt(sale_form_terms.value)));
  }
  
}





export function beforeAutocomplete(detail,htmlFc){ 


  let dbid      = htmlFc.fullcontHTML.getAttribute("data-dbid");
 

  detail.act = "click"
  detail.acMoreData = { fields:['sale.id'], values: [dbid] }
  autocomplete.start(detail)
}

//funcion para traer la existencia de un articulo del array inventoryStock
export function getQtyAvailable(sale_vs_itemId) {
  let qty_available = 0;
  
  for (let index = 0; index < inventoryStock.length; index++) {
      
    if (sale_vs_itemId == inventoryStock[index].id) {
      qty_available = inventoryStock[index].qty_available;
      break;
    }
  }
  return parseFloat(qty_available);
}

// llenar los demas campos cuando se seleccione un item 
export function otherFieldItemLost(detail, htmlFc) {

  setTimeout(() => {
    let chipCont_label = detail.ev.target.closest('.textfield').querySelector('.chip-cont label');
    console.log('desde 1067', chipCont_label)
    let line = detail.ev.target.closest('.line');
    let input_item = line.querySelector('.sale_vs_itemId');
    let itemOtherField = get_otherField(input_item);
  
    let qty_available = getQtyAvailable(itemOtherField.sale_vs_itemId);
  
    // colocar la existencia del articulo junto a la descripcion
    chipCont_label.textContent += ' - ' +  qty_available;
  
  
    line.querySelector('.lost_price input').value =  "";
    line.querySelector('.lost_qty input').value = "";
    line.querySelector('.lost_qty input').focus();
  }, 100);

}

export function calculate_values_p_vs_lost(detail, htmlFc) {

  let line = detail.ev.target.closest('.line');
  let input_item = line.querySelector('.sale_vs_itemId');

  let item_selected = input_item.getAttribute("selected");
  //verificar si hay un articulo seleccionado
  if (JSON.parse(item_selected).length > 0) {

    let input_lost_qty = line.querySelector('.lost_qty input');
    let input_lost_price = line.querySelector('.lost_price input');

    let qty_value = (input_lost_qty.value == "" || parseFloat(input_lost_qty.value) == NaN || parseFloat(input_lost_qty.value) == 0) ? 0 :
      parseFloat(input_lost_qty.value);

    let itemOtherField = get_otherField(input_item);

    let price = (itemOtherField.item_unit_cost == "" || parseFloat(itemOtherField.item_unit_cost) == NaN
      || parseFloat(itemOtherField.item_unit_cost) == 0) ? 0 : parseFloat(itemOtherField.item_unit_cost);

    input_lost_price.value = "";

    if (qty_value == 0) {
      textfieldHandler.errorClean(input_lost_qty.closest(".textfield"));
      return;
    }
    
    let qty_available = getQtyAvailable(itemOtherField.sale_vs_itemId);

    if (!verifyQtyItemLost(itemOtherField.sale_vs_itemId, qty_available, htmlFc)) {
      return;
    }

    input_lost_price.value = (qty_value * price).toFixed(2);

  } else {
    return;
  }

}

//verificar las cantidades del articulo vs las que hay en existencia
export function verifyQtyItemLost(sale_vs_itemId, qty_available, htmlFc) {
  let lines = [];
  let total_qty = 0;
  let allLine = htmlFc.fullcontHTML.querySelectorAll("#sale_form_sale_vs_return  .line");



  //se agrupan los ac que tengan el mismo articulo y se suman las cantidades de estos
  for (let index = 0; index < allLine.length; index++) {
    let line = allLine[index];

    let ac_item = line.querySelector(".sale_vs_itemId")

    let item_selected = ac_item.getAttribute("selected");
    item_selected = JSON.parse(item_selected);
    if (item_selected.length > 0) {

      if (item_selected[0] == sale_vs_itemId) {
        let input_lost_qty = line.querySelector(".lost_qty input");
        let qty_value = (input_lost_qty.value == "" || parseFloat(input_lost_qty.value) == NaN || parseFloat(input_lost_qty.value) == 0) ? 0 :
          parseFloat(input_lost_qty.value);

        if (qty_value > 0) {
          total_qty = total_qty + qty_value;
          lines.push(line);
        }
      }
    }
  }

  //si la cantidad todal sumada es mayor a la disponible pues mostrar mensaje y colocar los inputs en rojo
  if (total_qty > qty_available) {
    for (let index = 0; index < lines.length; index++) {
      let input_lost_qty = lines[index].querySelector(".lost_qty");
      console.log(input_lost_qty)
      textfieldHandler.error(input_lost_qty);
    }
    saleSnack.start({ act: 'show', id: 'insufficientQuantity', });
    return false;
  } else {
    for (let index = 0; index < lines.length; index++) {
      let input_lost_qty = lines[index].querySelector(".lost_qty");
      textfieldHandler.errorClean(input_lost_qty);
    }
  }

  return true;
}

export function fill_InventoryStock(data) {
  let result_inventory = JSON.parse(data.inventory_stock);

  inventoryStock = [];
  result_inventory[0].data.forEach(element => {
    inventoryStock.push(element);
  });

}
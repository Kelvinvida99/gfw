const dbRequest  = require('../../../../../js-network/db-request')
const multitable = require('../../../../../components/multitable/multitable')
const snack      = require ('../../../../../components/snack/snack')
const textfieldHandler     = require ('../../../../../components/textfield/textfield-handler')
const autocomplete         = require ('../../../../../components/textfield/autocomplete')
//const fullcontTab          = require ('../../../../../components/fullcont/fullcont-form-handler-tab')

export function getAllInvoice(detail, htmlFc) {  //console.log('updateCsutomerField -> ', htmlFc)

  let input_customer = htmlFc.fullcontHTML.querySelector("#receivepayment_form_customer_id");
  let input_selected = input_customer.getAttribute("selected");


  if (JSON.parse(input_selected).length > 0) {

    load(detail, JSON.parse(input_selected)[0], htmlFc)

  }
}

const load = (detail, value, htmlFc) => {


  return loadDB(detail, value)
    .then((result) => {

      console.log("pruera")

      //the entity was deleted
      if (result.multiTables[0] === undefined) {
        snack.start({ act: 'show', id: 'noInvoicePending', });
        multitable.start({ act: 'clean', entityMT: htmlFc.entityMT })
        return
      }/**/




      multitable.start({ act: 'loadResultToForm', entityMT: htmlFc.entityMT, resultMT: result.multiTables })

      multitable.start({ act: 'generator_insert', entityMT: htmlFc.entityMT })


    }).catch((error) => {

      console.log('Error Getting Invoice', error)

    })
}/**/

async function loadDB(detail, value) {


  detail.inf = { customer_id: value }



  ///yeison/php/settings.php
  //const result = await dbRequest.start(detail, 'php/settings.php' ) //do the insert
  const result = await dbRequest.start(detail, 'server/php/sql/getAllInvoice.php') //do the insert

  if (result.status != "ok") { throw (result) }

  return result
}

export function verifyMultitable(detail, htmlFc) {
  let allInvoice = htmlFc.fullcontHTML.querySelectorAll("#receivepayment_form_payment_vs_sale  .line");

  let allInputsEmpty = true;
  let totalAmountSent = 0;
  let input_amount = htmlFc.fullcontHTML.querySelector("#receivepayment_form_amount input");

  //let error= false;

  for (const line of allInvoice) {
    let input_sent = line.querySelector(".sent_amount input");

    if (/^(?:[1-9]\d*|0)?(?:\.\d+)?$/.test(input_sent.value) == false) {
      snack.start({ act: 'show', id: 'invalidValue', });
      textfieldHandler.error(input_sent.closest(".textfield"));
      return false;
    }

    if (input_sent.value.trim() != "" && parseFloat(input_sent.value) != 0) {
      allInputsEmpty = false;
    }

    if (input_sent.value.trim() !="") {
      input_sent.value = parseFloat(input_sent.value);
      totalAmountSent=totalAmountSent+parseFloat(input_sent.value);
    }


  }


  if (allInputsEmpty == true) {
    snack.start({ act: 'show', id: 'fillInvoiceRequired', });

    allInvoice.forEach(function (line) {
      let input_sent = line.querySelector(".sent_amount input");
      textfieldHandler.error(input_sent.closest(".textfield"));

    });

    return false;
  }

  if (parseFloat(input_amount.value) != totalAmountSent  ) {
    snack.start({ act: 'show', id: 'valueEqual', });
    textfieldHandler.error(input_amount.closest(".textfield"));
    return false;
  }

   
  allInvoice.forEach(function (line) {

    let input_sent = line.querySelector(".sent_amount input");

    if (input_sent.value.trim()=="" || parseFloat(input_sent.value) == 0) {
      line.remove();
    }
   });

  return true;
}



// print pdf
export function reportPdf( detail, htmlFc ){ 
  let elem        = document.querySelector("#receivepayment-fullcont");
  let dbid        = elem.getAttribute("data-dbid");


  if (detail.id != "") {
    printPdf({ id: detail.id, type: "print" });
  }else{
    printPdf({ id: dbid, type: "print" });
  }
}

function printPdf(data) {
  const formData = new FormData();
  formData.append('receivepayment_id', data.id);
  formData.append('type', data.type);

  const controller = new AbortController();
  const timeout = setTimeout(() => { controller.abort() }, 30000);

  let options = {
    method: 'POST',
    body: formData,
    signal: controller.signal,
    credentials: 'same-origin'
  };

  fetch(`./server/php/queries/report/receivepayment/pdf-invoice.php`, options)
    .then(response => {
      if (!response.ok) {
        alert("An error occurred while printing the PDF. Please try again.");
      } else {
        return response.text(); // Devolver el nombre del archivo PDF generado
      }
    })
    .then(pdfFileName => {
      if (pdfFileName) {
        // Ruta base del servidor
        const baseUrl = 'https://beestock.gosive.com/server/server/';

        // Agregar la parte faltante a la ruta del PDF
        const fullPath = pdfFileName.startsWith('server/') ? pdfFileName : 'server/' + pdfFileName;

        // Construir la URL absoluta del archivo PDF
        const realPdfUrl = new URL(fullPath, baseUrl).href;

        // Crear un iframe para cargar el PDF generado
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = realPdfUrl;
        document.body.appendChild(iframe);
        
        // Esperar a que el PDF se cargue en el iframe antes de imprimir
        iframe.contentWindow.print();

        console.log(realPdfUrl)

      }
    })
    .catch(error => {
      console.log('An error occurred while printing the PDF:', error);
    });
}



export function verifyvalue(detail, htmlFc) {

  let ac_line = htmlFc.fullcontHTML.querySelector("#receivepayment_form_saleid_mt_" + detail.id_item_ac);

  let input_sent_amount = ac_line.closest('.line').querySelector('.sent_amount input');
  let sent_amount_value = (input_sent_amount.value == "" || parseFloat(input_sent_amount.value) == NaN
                            || parseFloat(input_sent_amount.value) == 0) ? 0 : parseFloat(input_sent_amount.value);

  let input_due_amount = ac_line.closest('.line').querySelector('.due_amount input');
  let due_amount_value = (input_due_amount.value == "" || parseFloat(input_due_amount.value) == NaN
                            || parseFloat(input_due_amount.value) == 0) ? 0 : parseFloat(input_due_amount.value);



  if (sent_amount_value == 0) {
    return;
  }

  if (sent_amount_value > due_amount_value) {
    snack.start({ act: 'show', id: 'greatersendamount', });
    textfieldHandler.error(input_sent_amount.closest(".textfield"));
  } else {
    let allItemError = htmlFc.fullcontHTML.querySelectorAll("#receivepayment_form_payment_vs_sale  .line .textfield-error");

    textfieldHandler.errorClean(input_sent_amount.closest(".textfield"));
    if (allItemError != null && allItemError.length < 2) {
      fullcontTab.clean(input_sent_amount);
    }

  }



}


export function verifyamount(detail, htmlFc) {
  let input_amount =  htmlFc.fullcontHTML.querySelector('#receivepayment_form_amount input');
  let amount_value = (input_amount.value == "" || parseFloat(input_amount.value) == NaN
  || parseFloat(input_amount.value) == 0) ? 0 : parseFloat(input_amount.value);

  if (amount_value == 0) {
    return;
  }

  let allItem = htmlFc.fullcontHTML.querySelectorAll("#receivepayment_form_payment_vs_sale  .line");
  let rowfind = "";
  let due_amount_total = 0;
  if (allItem.length > 0) {

    for (const line of allItem) {
      let due_amount = line.querySelector(".due_amount input");
      if (parseFloat(due_amount.value) == amount_value && rowfind == "") {
        rowfind = line;
      }
      due_amount_total = due_amount_total + parseFloat(due_amount.value);
    }

    if (due_amount_total == amount_value ) {
      for (const line of allItem) {
        let due_amount = line.querySelector(".due_amount input");
        let sent_amount = line.querySelector(".sent_amount input");

        sent_amount.value = due_amount.value;

      }
    }else if(rowfind !=""){
          rowfind.querySelector(".sent_amount input").value = amount_value;
    }
    


  }

}

export function addAmount(detail, htmlFc) {
  // Inicializar el total
  let total_due_amount = 0;
  let total_sent_amount = 0;

  // Obtener todos los checkbox de las filas
  const checkboxes = htmlFc.fullcontHTML.querySelectorAll("#receivepayment_form_mt_" + detail.line + " input[type='checkbox']");
  // Obtener todas las filas
  const inputs = htmlFc.fullcontHTML.querySelectorAll("#receivepayment_form_payment_vs_sale .line");
  
  // Obtener el elemento del formulario donde se mostrará el total
  const div_amount_fc = htmlFc.fullcontHTML.querySelector("#receivepayment_form_amount .elem");

  // Iterar sobre cada checkbox
  checkboxes.forEach((checkbox) => {
    // Si el checkbox está seleccionado, sumar el valor correspondiente
    if (checkbox.checked) {
      const row = checkbox.closest("#receivepayment_form_mt_" + detail.line);
      const due_amount_elem = row.querySelector(".due_amount .elem");
      
      // Obtener el valor de due_amount y sumarlo al total_due_amount
      const due_amount = parseFloat(due_amount_elem.value) || 0;
      total_due_amount += due_amount;
    }
  });

  // Mostrar el total de due_amount en el input correspondiente (opcional)
  const div_sent_amount = htmlFc.fullcontHTML.querySelector("#receivepayment_form_mt_" + detail.line + " .sent_amount .elem");
  div_sent_amount.value = total_due_amount;

  // Sumar todos los valores de los inputs sent_amount
  inputs.forEach((line) => {
    const input_sent = line.querySelector(".sent_amount .elem");
    if (input_sent) {
      total_sent_amount += parseFloat(input_sent.value) || 0;
    }
  });

  // Mostrar el total en el input correspondiente
  div_amount_fc.value = total_sent_amount;

  // depuración
  // console.log("Total due amount:", total_due_amount);
  // console.log("Total final de sent amount:", total_sent_amount);
}

export function verifyCheckBox(htmlFc){

  // console.log('htmlFc.entityMT[0].data:', htmlFc.entityMT[0].data);
  setTimeout(()=>{
        if (htmlFc.entityMT[0].data.length > 0) {
              let firstDataItem = htmlFc.entityMT[0].data;
              firstDataItem.forEach((a)=>{

                    console.log('sent_amount:', a.sent_amount);
                    console.log('total_amount:', a.po_total_amount);

                    if (parseFloat(a.sent_amount) == parseFloat(a.po_total_amount)) {
                          let mt = htmlFc.fullcontHTML.querySelector('#receivepayment_form_payment_vs_sale')
                          setTimeout(()=>{
                                let checkbox = mt.querySelectorAll('#add_amount')
                                checkbox.forEach((check)=>{
                                      check.querySelector('.elem').checked = true
                                      check.classList.add('textfield-disabled')

                                })
                                // console.log(checkbox.querySelector('.elem'))
                          },100)
                          console.log('valores iguales')
                    }
              })
        } else {
              console.log('El array data está vacío.');
        }
  },500)
}














export function beforeAutocomplete(detail,htmlFc){ 


  //let customerId      = htmlFc.fullcontHTML.getElementById("receivepayment_form_customer_id").getAttribute("selected");
  
  //const index = htmlFc.form.findIndex(element => element.name === "customer_id");
  //const cust_id = htmlFc.form[index].value[0];

  //getElementById("receivepayment_form_customer_id").getAttribute("selected")

  
  let parser = new DOMParser();
  let doc = parser.parseFromString(htmlFc.fullcontHTML.innerHTML, "text/html");
  let customerElement = doc.getElementById("receivepayment_form_customer_id");
  const cust_id = JSON.parse(customerElement.getAttribute("selected"))[0];
  //console.log("############################# type: ", typeof cust_id);
  //console.log("############################# val: ",  cust_id);
    if(cust_id == undefined){
      snack.start({ act: 'show', id: 'receivePaymentNoCustomer', });
      return;
    }


  else{
    detail.act = "click"
    detail.acMoreData = { fields:['sale.customer_id'], values: [cust_id] }
    autocomplete.start(detail)
  }


}



export function otherFieldCredit(detail, htmlFc) {

  setTimeout(() => {
    let chipCont_label = detail.ev.target.closest('.textfield').querySelector('.chip-cont label');
    //console.log('@@@@@@@@@@@', chipCont_label)
    let line = detail.ev.target.closest('.line');
    let sale = line.querySelector('.saleId');
    let saleOtherField = get_otherField(sale);  
 console.log("$$$$$$$$$$$$$$$$$",saleOtherField);
    //line.querySelector('.textfield-autocomplete  .otherField').value =  "";
    line.querySelector('.amount input').value = saleOtherField.credit - saleOtherField.spent_credit;
    line.querySelector('.amount input').focus();
  }, 100);

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
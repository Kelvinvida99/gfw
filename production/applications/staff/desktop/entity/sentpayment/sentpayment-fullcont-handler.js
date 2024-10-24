const dbRequest        = require("../../../../../js-network/db-request");
const multitable       = require("../../../../../components/multitable/multitable");
const snack            = require("../../../../../components/snack/snack");
const textfieldHandler = require("../../../../../components/textfield/textfield-handler");

export function getAllInvoice(detail, htmlFc) {
  //console.log('updateCsutomerField -> ', htmlFc)

  let input_customer = htmlFc.fullcontHTML.querySelector(
    "#sentpayment_form_provider_id"
  );
  let input_selected = input_customer.getAttribute("selected");

  if (JSON.parse(input_selected).length > 0) {
    load(detail, JSON.parse(input_selected)[0], htmlFc);
  }
}

export function addAmount(detail, htmlFc) {
  // Inicializar el total
  let total_due_amount  = 0;
  let total_sent_amount = 0;

  // Obtener todos los checkbox de las filas
  const checkboxes = htmlFc.fullcontHTML.querySelectorAll("#sentpayment_form_mt_" + detail.line + " input[type='checkbox']");
  // Obtener todas las filas
  const inputs     = htmlFc.fullcontHTML.querySelectorAll("#sentpayment_form_payment_vs_po_or_services .line");
  
  // Obtener el elemento del formulario donde se mostrará el total
  const div_amount_fc = htmlFc.fullcontHTML.querySelector("#sentpayment_form_amount .elem");

  // Iterar sobre cada checkbox
  checkboxes.forEach((checkbox) => {
    // Si el checkbox está seleccionado, sumar el valor correspondiente
    if (checkbox.checked) {
      const row             = checkbox.closest("#sentpayment_form_mt_" + detail.line);
      const due_amount_elem = row.querySelector(".due_amount .elem");
      
      // Obtener el valor de due_amount y sumarlo al total_due_amount
      const due_amount = parseFloat(due_amount_elem.value) || 0;
      total_due_amount += due_amount;
    }
  });

  // Mostrar el total de due_amount en el input correspondiente (opcional)
  const div_sent_amount = htmlFc.fullcontHTML.querySelector("#sentpayment_form_mt_" + detail.line + " .sent_amount .elem");
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

  // Para depuración
  console.log("Total due amount:", total_due_amount);
  console.log("Total final de sent amount:", total_sent_amount);
}

export function getAllInvoiceExpenses(detail, htmlFc) {
  //console.log('updateCsutomerField -> ', htmlFc)

  let input_customer = htmlFc.fullcontHTML.querySelector(
    "#sentpayment_form_provider_id"
  );
  let input_selected = input_customer.getAttribute("selected");

  if (JSON.parse(input_selected).length > 0) {
    loadExpenses(detail, JSON.parse(input_selected)[0], htmlFc);
  }
}

const load = (detail, value, htmlFc) => {
  return loadDB(detail, value)
    .then((result) => {
      console.log("pruera");

      //the entity was deleted
      if (result.multiTables[0] === undefined) {
        snack.start({ act: "show", id: "noInvoicePending" });
        multitable.start({ act: "clean", entityMT: htmlFc.entityMT });
        return;
      } /**/

      multitable.start({
        act: "loadResultToForm",
        entityMT: htmlFc.entityMT,
        resultMT: result.multiTables,
      });

      multitable.start({ act: "generator_insert", entityMT: htmlFc.entityMT });
    })
    .catch((error) => {
      console.log("Error Getting Invoice", error);
    });
}; /**/

async function loadDB(detail, value) {
  detail.inf = { purchase_id: value };

  ///yeison/php/settings.php
  //const result = await dbRequest.start(detail, 'php/settings.php' ) //do the insert
  const result = await dbRequest.start(
    detail,
    "server/php/sql/getAllPurchase.php"
  ); //do the insert

  if (result.status != "ok") {
    throw result;
  }

  return result;
}

export function verifyMultitable(detail, htmlFc) {
  let allInvoice = htmlFc.fullcontHTML.querySelectorAll(
    "#sentpayment_form_payment_vs_po_or_services  .line"
  );

  let allInputsEmpty  = true;
  let totalAmountSent = 0;
  let input_amount    = htmlFc.fullcontHTML.querySelector(
    "#sentpayment_form_amount input"
  );

  //let error= false;

  for (const line of allInvoice) {
    let input_sent = line.querySelector(".sent_amount input");

    if (/^(?:[1-9]\d*|0)?(?:\.\d+)?$/.test(input_sent.value) == false) {
      snack.start({ act: "show", id: "invalidValue" });
      textfieldHandler.error(input_sent.closest(".textfield"));
      return false;
    }

    if (input_sent.value.trim() != "" && parseFloat(input_sent.value) != 0) {
      allInputsEmpty = false;
    }

    if (input_sent.value.trim() != "") {
      input_sent.value = parseFloat(input_sent.value);
      totalAmountSent  = totalAmountSent + parseFloat(input_sent.value);
    }
  }

  if (allInputsEmpty == true) {
    snack.start({ act: "show", id: "fillInvoiceRequired" });

    allInvoice.forEach(function (line) {
      let input_sent = line.querySelector(".sent_amount input");
      textfieldHandler.error(input_sent.closest(".textfield"));
    });

    return false;
  }

  if (parseFloat(input_amount.value) != totalAmountSent) {
    snack.start({ act: "show", id: "valueEqual" });
    textfieldHandler.error(input_amount.closest(".textfield"));
    return false;
  }

  allInvoice.forEach(function (line) {
    let input_sent = line.querySelector(".sent_amount input");

    if (input_sent.value.trim() == "" || parseFloat(input_sent.value) == 0) {
      line.remove();
    }
  });

  return true;
}

export function validated_press(detail, htmlFc) {
  let input_sent = detail.ev.target;

  if (/^\d+(\.\d+)?$/.test(input_sent.value) == true) {
    textfieldHandler.errorClean(input_sent.closest(".textfield"));
  }
}

// print pdf
export function reportPdf( detail, htmlFc ){ 
  let elem        = document.querySelector("#sentpayment-fullcont");
  let dbid        = elem.getAttribute("data-dbid");


  if (detail.id != "") {
    printPdf({ id: detail.id, type: "print" });
  }else{
    printPdf({ id: dbid, type: "print" });
  }
}

function printPdf(data) {
  const formData = new FormData();
  formData.append('sentpayment_id', data.id);
  formData.append('type', data.type);

  const controller = new AbortController();
  const timeout = setTimeout(() => { controller.abort() }, 30000);

  let options = {
    method: 'POST',
    body: formData,
    signal: controller.signal,
    credentials: 'same-origin'
  };

  fetch(`./server/php/queries/report/sentpayment/pdf-invoice.php`, options)
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

export function verifyCheckBox(htmlFc){

  // console.log('htmlFc.entityMT[0].data:', htmlFc.entityMT[0].data);
  setTimeout(()=>{
        if (htmlFc.entityMT[0].data.length > 0) {
              let firstDataItem = htmlFc.entityMT[0].data;
              firstDataItem.forEach((a)=>{

                    console.log('sent_amount:', a.sent_amount);
                    console.log('total_amount:', a.total_amount);

                    if (parseFloat(a.sent_amount) == parseFloat(a.total_amount)) {
                          let mt = htmlFc.fullcontHTML.querySelector('#sentpayment_form_payment_vs_po_or_services')
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
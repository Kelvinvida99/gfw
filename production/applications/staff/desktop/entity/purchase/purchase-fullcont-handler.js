const snack            = require ('../../../../../components/snack/snack')
const dialog           = require ('./purchase-dialog')
const textfieldHandler = require ('../../../../../components/textfield/textfield-handler')
const dtpurchasechanges = require('./purchase-dt-handler')
const dtGenerator       = require('../../../../../components/dt/dt-generator')
const fullcontTab = require('../../../../../components/fullcont/fullcont-form-handler-tab')

export function cogsPercent(detail, htmlFc) {
  console.log('desde cogs_row_amount');
}

export function disableopcion(detail){

  //disable-mode-edit
  const input_check = document.querySelector("#purchase_check_opcion_" + detail.line + " input" );
  let input_cant = document.querySelector("#purchase_cant_opcion_" + detail.line);

  if (input_check.checked) {
    input_cant.classList.remove("textfield-disabled");
  }else{
    input_cant.classList.add("textfield-disabled");

  }
}

export function changeBilleOn(){

  let input_delivered_date = document.querySelector("#purchase_form_delivered_date input");
  let bill_date = document.querySelector("#purchase_form_bill_date");
  let input_bill_date = document.querySelector("#purchase_form_bill_date input");

  if (!bill_date.classList.contains('textfield-restriction')) {

    input_bill_date.value = input_delivered_date.value;
  }
}

export function dtgenerator(result, htmlFc) {
  console.log("desde dtgenerator", result)
  let dtBody = htmlFc.fullcontHTML.querySelector('#purchase-changes');
  dtBody.innerHTML = '';

  if (result.entitychanges.length > 0 && (result.entitychanges[0].data[0].user_name != null || result.entitychanges[0].data[0].user_name != undefined)) {

      let data = result.entitychanges[0].data;
      let dataorganizeRow = [];

      console.log("dtgeneratoooooor" ,JSON.parse(data[0].changes));

      dataorganizeRow = dtpurchasechanges.organizeRowEntityChange(data);


      console.log("dtgeneratoooooor" ,dataorganizeRow);
    
  
      let saleChanges = htmlFc.fullcontHTML.querySelector('#purchase-changes')
      saleChanges.insertAdjacentHTML("beforeend", dataorganizeRow)  
    
  } 
}

export function cleandtfullcont(htmlFc) {
   
  let dtBody = htmlFc.fullcontHTML.querySelector('#purchase-changes');
  dtBody.innerHTML = '';
}

export function goToQtyField(detail, htmlFc) {
  console.log('updateItemField -> ', detail)

  let ac_line = htmlFc.fullcontHTML.querySelector("#purchase_form_item_qty_" + detail.id_ac + " input");
  ac_line.focus();
}

export async function verifyPayment(htmlFc, dbid) {

  let data = { id: dbid };
  const formData = new FormData();
  formData.append('purchase_id', data.id);

  const controller = new AbortController();
  const timeout = setTimeout(() => { controller.abort() }, 30000);

  let options = {
    method: 'POST',
    body: formData,
    signal: controller.signal,
    credentials: 'same-origin'
  };

  try {
    const result = await fetch(`./server/php/sql/purchasepayment.php`, options);
    const paymentData = await result.json();

    // console.log("validacion", paymentData);
    if (paymentData.restriction.val == "PurchaseHasPayment") {
      snack.start({ act: 'show', id: 'purchaseHasPayment', });
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
    return true;
  } finally {
    clearTimeout(timeout);
  }
  return false;
}

//Para poner que no se pueda cambiar el item o eliminar si este tiene sale, solo permitir  cambiar sus propiedades 
//como la cantidad o la unidad etc.
export function itemWithSale(result,htmlFc) {

  result.multiTables.forEach(element => {
      if(element.tableName=="purchase_vs_item"){
        element.data.forEach(item_data => {
          let lines = htmlFc.fullcontHTML.querySelectorAll("#purchase_form_purchase_vs_item  .line");
          lines.forEach(line => {
            let item = line.querySelector('.item_id');
            let otherfield = item.querySelector(".otherField").getAttribute('otherField');

            if ( JSON.parse(otherfield).id == parseInt(item_data.id) && JSON.parse(otherfield).sold_qty > 0   ) {
              item.classList.add('textfield-autocomplete-disabled');
              item.closest('.line').classList.add('mt-purchase-restriction');
              let removeElement = item.closest('.line').querySelector('.removeLine');;
              // Nuevo valor para el atributo data-detail
              let newDataDetail = '{"click": [{"dest":"ripple"}, {"dest":"purchase", "elem":"fullcont", "act":"removeItem"}]}';

              // Reemplazar el valor del atributo data-detail
              removeElement.setAttribute('data-detail', newDataDetail);

              // Verificar que el atributo fue reemplazado
              console.log(removeElement.getAttribute('data-detail'));
            }
          });
        });
      }
  });
}

//para verificar que las cantidades de los articulos no sean menor a la cantidad vendida
export async function verifyItemQtySold(htmlFc) {
  let dbid = htmlFc.fullcontHTML.getAttribute("data-dbid");
  let data = { id: dbid };
  const formData = new FormData();
  formData.append('purchase_id', data.id);

  const controller = new AbortController();
  const timeout = setTimeout(() => { controller.abort() }, 30000);

  let options = {
    method: 'POST',
    body: formData,
    signal: controller.signal,
    credentials: 'same-origin'
  };

  try {
    const result = await fetch(`./server/php/sql/purchaseitemsold.php`, options);
    let result_data = await result.json();

    result_data = result_data.data;

    for (let index = 0; index < result_data.length; index++) {
      let lines = htmlFc.fullcontHTML.querySelectorAll("#purchase_form_purchase_vs_item  .line");

      for (let i = 0; i < lines.length; i++) {
          let item = lines[i].querySelector('.item_id');
          let input = lines[i].querySelector('.qty input');
          
          let otherfield = item.querySelector(".otherField").getAttribute('otherField');

          if ( JSON.parse(otherfield).id == parseInt(result_data[index].id) && parseFloat(input.value) < parseFloat(result_data[index].sold_qty) ) {
            textfieldHandler.error(lines[i].querySelector('.qty'));

            let info = `The ${JSON.parse(otherfield).name} product has been sold ${result_data[index].sold_qty} units and fewer units
            are being placed than those sold: ${parseFloat(input.value)} units`;

            dialog.start({ act: "show", dest: 'purchase', id: "purchaseItemQtySold", entity: 'purchase', info: info });
            return false;
          }

      }
      
      
    }
  

      



    // Aquí puedes continuar con el código que depende de los datos de la petición fetch
  } catch (error) {
    console.log('Error:', error);
    if (error.name === 'AbortError') {
      console.log('The request was canceled due to waiting time ');
    } else {
      console.log('An error occurred during the recovery request.');
    }
    return false;
  } finally {
    clearTimeout(timeout);
  }
  return true;
}

// export function notifytab(htmlFc) {
  
//   let bodyFile = htmlFc.fullcontHTML.querySelector("#bodyfile");
 
//   let files_div =  bodyFile.querySelectorAll(':scope > :not(.cont-empty)');
//   if (files_div.length > 0) {
//       //colocar identificador si hay archivos en el tab file
//     fullcontTab.notify(htmlFc.fullcontHTML.querySelector('#purchase_form_file'));
//   }else{
//     fullcontTab.clean(htmlFc.fullcontHTML.querySelector('#purchase_form_file'));
//   }
// } //se deshabilito esta funcion
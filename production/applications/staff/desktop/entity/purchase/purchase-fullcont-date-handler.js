const snack            = require ('../../../../../components/snack/snack')
const timeDate         = require ('../../../../../js-handler/time-date')

export function verifyDate( detail, htmlFc ){  //console.log('updateCsutomerField -> ', htmlFc)
  let due_date       = htmlFc.fullcontHTML.querySelector("#purchase_form_due_date")
  let due_date_value = due_date.querySelector(".elem").value;
  let date           = htmlFc.fullcontHTML.querySelector("#purchase_form_date")
  let data_value     = date.querySelector(".elem").value;
  let update_button  = htmlFc.fullcontHTML.querySelector("#update_button");

  switch (detail.input) {

    case "purchase_form_due_date":
      if (due_date_value <= data_value) {
        update_button.classList.add('hideOnEdit');
        date.classList.add('textfield-error')
        snack.start({ act:'show', id:'dueDateError', });
      }else{
        update_button.classList.remove('hideOnEdit');
        date.classList.remove('textfield-error')
        date.classList.add('textfield-complete')
      }
      break;

    case "purchase_form_date":
      if (data_value >= due_date_value) {
        update_button.classList.add('hideOnEdit');
        due_date.classList.add('textfield-error')
        snack.start({ act:'show', id:'dueDateError', });
      }else{
        update_button.classList.remove('hideOnEdit');
        due_date.classList.remove('textfield-error')
        due_date.classList.add('textfield-completed')
      }
      break;

    default:
      break;
  }
}

export function addBillingDate( detail, htmlFc ){ 
  let check = htmlFc.fullcontHTML.querySelector("#purchase_fill_bill_date");
  let check_value = check.querySelector("input[type='checkbox']").checked;
  let bill_date = htmlFc.fullcontHTML.querySelector("#purchase_form_bill_date");
  let due_date = htmlFc.fullcontHTML.querySelector("#purchase_form_due_date");

  if (check_value) {
    if (bill_date.querySelector("input[type='date']").value === "") {
      // Obtener la fecha actual
      const currentDate = new Date();

      // Agregar 10 días a la fecha actual
      const dueDate = new Date(currentDate);
      dueDate.setDate(currentDate.getDate() + 10);

      // Formatear la nueva fecha
      const formattedDueDate = dueDate.toISOString().split('T')[0];

      // Actualizar el valor en el campo del formulario
      bill_date.querySelector("input[type='date']").value = currentDate.toISOString().split('T')[0];
    }else{
      bill_date.querySelector("input[type='date']").value = bill_date.querySelector("input[type='date']").value;
    }

    if (due_date.querySelector("input[type='date']").value === "") {
      // Obtener la fecha actual
      const currentDate = new Date();

      // Agregar 10 días a la fecha actual
      const dueDate = new Date(currentDate);
      dueDate.setDate(currentDate.getDate() + 10);

      // Formatear la nueva fecha
      const formattedDueDate = dueDate.toISOString().split('T')[0];

      // Actualizar el valor en el campo del formulario
      due_date.querySelector("input[type='date']").value = formattedDueDate;
    }else{
      due_date.querySelector("input[type='date']").value = due_date.querySelector("input[type='date']").value;
    }
  } 
}

export function insertDateExpenses(detail, htmlFc) {
  const ac_line = htmlFc.fullcontHTML.querySelector("#purchase_form_purchase_vs_expenses");
  const input_date = ac_line.querySelector("input[type='date']");

  // Verificar si ac_line no es null antes de intentar iterar sobre sus descendientes
  if (ac_line) {
    // Obtener todos los elementos descendientes de ac_line
    const descendientes = ac_line.querySelectorAll(".date");

    // Iterar sobre los descendientes
    descendientes.forEach((e) => {
      let a = e.querySelector("input[type='date']")
      if (a.value === "") {
    // Llenar a con la fecha actual en formato yyyy/mm/dd
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];

      // Asegurarse de que a se encuentra correctamente
        a.value = formattedDate;
        // console.log("Fecha insertada correctamente en a");
        }
    });
  } else {
    // console.log("El elemento ac_line no se encontró en el DOM");
  }
  // 
}

export function insertDeliveredDate(detail, htmlFc) {
  const form_shipping       = htmlFc.fullcontHTML.querySelector("#purchase_form_shipping");
  const select_shipping     = form_shipping.querySelector("select");
  const form_date_delivered = htmlFc.fullcontHTML.querySelector("#purchase_form_delivered_date");
  const form_date_bill      = htmlFc.fullcontHTML.querySelector("#purchase_form_bill_date");

  const delivered_date = form_date_delivered.querySelector("input[type='date']");
  const bill_date      = form_date_bill.querySelector("input[type='date']");

  // console.log("shipping:", select_shipping.value)

  if (select_shipping.value === "delivered" && delivered_date.value === "" && bill_date.value === "") {
    delivered_date.value = timeDate.convertDateToInput();
    bill_date.value      = timeDate.convertDateToInput();
  }
  else if(select_shipping.value === "delivered" && delivered_date.value === "" && bill_date.value != ""){
    delivered_date.value = timeDate.convertDateToInput();
  }
  else if(select_shipping.value != "delivered" && delivered_date.value != ""){
    delivered_date.value = "";
    bill_date.value      = "";

  }

  console.log("delivered date:", delivered_date.value);
}
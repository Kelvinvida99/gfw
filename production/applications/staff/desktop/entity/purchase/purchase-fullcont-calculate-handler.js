const snack            = require ('../../../../../components/snack/snack')
const snackP           = require ('./purchase-snack')

export function checkOtherCostItem( detail, htmlFc ){ 
  let ac_line = htmlFc.fullcontHTML.querySelector("#purchase_form_expenses_mt_"+detail.id_expenses_ac);
  let input_other_cost = ac_line.closest('.line').querySelector('.other_cost input').checked;
  
  if (input_other_cost) {
    console.log('send')
  } else {
    console.log('no send')
  }
}

export function noDecimal(detail, htmlFc){
  let ac_line = htmlFc.fullcontHTML.querySelector("#purchase_form_item_mt_" + detail.id_item_ac);
  let input_qty = ac_line.closest('.line').querySelector('.qty input');

  if (!isNaN(parseFloat(input_qty.value)) && /\.\d+/.test(input_qty.value)) {
    snackP.start({ act:'show', id:'noDecimal', });
    console.log('qty value decimal:', input_qty.value);
  } else {
    console.log('qty value entero:', input_qty.value);
  }
}

export function calculate_values_p_vs_item( detail, htmlFc ){  
  let ac_line     = htmlFc.fullcontHTML.querySelector("#purchase_form_item_mt_"+detail.id_item_ac);

  let input_qty   = ac_line.closest('.line').querySelector('.qty input');
  let input_unit_price = ac_line.closest('.line').querySelector('.unit_price input');
  let input_total_price = ac_line.closest('.line').querySelector('.total_price input');

  let qty_value   = ( input_qty.value == "" || parseFloat(input_qty.value) == NaN ||  parseFloat(input_qty.value) == 0) ? 0 : parseFloat(input_qty.value);
  let price_value = ( input_unit_price.value == "" || parseFloat(input_unit_price.value) == NaN ||  parseFloat(input_unit_price.value) == 0) ? 0 : parseFloat(input_unit_price.value);
  let total_value = ( input_total_price.value == "" || parseFloat(input_total_price.value) == NaN ||  parseFloat(input_total_price.value) == 0) ? 0 : parseFloat(input_total_price.value);

  switch (detail.input) {

    case "qty":
      if (qty_value === 0) {
        return;
      }

      if (price_value !== 0) {
        input_total_price.value = (price_value * qty_value).toFixed(2);
      }
      break;

    case "unit_price":
      if (price_value === 0) {
        return;
      }

      if (qty_value !== 0) {
        input_total_price.value = (qty_value * price_value).toFixed(2);
      }
      break;

    case "total_price":
      if (total_value === 0) {
        return;
      }

      if (qty_value !== 0) {
        input_unit_price.value = (total_value / qty_value).toFixed(2);
      }
      break;

    default:
      break;
  }
}

export function sellingPrice( detail, htmlFc ){  //console.log('selling price')

  setTimeout(()=>{

      let ac_line                    = htmlFc.fullcontHTML.querySelector("#purchase_form_item_mt_"+detail.id_item_ac);

      let input_unit_price           = ac_line.closest('.line').querySelector('.unit_price input');
      let input_selling_price        = ac_line.closest('.line').querySelector('.selling_price input');
      let add_class_to_input_selling = ac_line.closest('.line').querySelector('.selling_price');
      let update_button              = htmlFc.fullcontHTML.querySelector("#update_button");

      let price_value   = ( input_unit_price.value == "" || parseFloat(input_unit_price.value) == NaN ||  parseFloat(input_unit_price.value) == 0) ? 0 : parseFloat(input_unit_price.value);
      let selling_value = ( input_selling_price.value == "" || parseFloat(input_selling_price.value) == NaN ||  parseFloat(input_selling_price.value) == 0) ? 0 : parseFloat(input_selling_price.value);

      switch (detail.input){
        case "selling_price":
          if (selling_value < price_value) {
            add_class_to_input_selling.classList.add('textfield-error')
            snack.start({ act:'show', id:'sellingError', });
          }else{
            add_class_to_input_selling.classList.remove('textfield-error')
          }
        break;

        case "unit_price":
         if (price_value > selling_value) {
            add_class_to_input_selling.classList.add('textfield-error')
            snack.start({ act:'show', id:'sellingError', });
          }else{
            add_class_to_input_selling.classList.remove('textfield-error')
          }
        break;
      }


  }, 3000)
}

export function calculate_values_p_vs_investment( detail, htmlFc ){  
  // console.log(htmlFc.fullcontHTML)
  let ac_line    = htmlFc.fullcontHTML.querySelector("#purchase_form_investment_mt_"+detail.id_investmet_ac);
  let min_amount = htmlFc.fullcontHTML.querySelector("#purchase_form_min_amount").querySelector(".elem").value;
  let price      = htmlFc.fullcontHTML.querySelector("#purchase_form_price").querySelector(".elem").value;
  let update_button      = htmlFc.fullcontHTML.querySelector("#update_button");

  let input_invested_amount = ac_line.closest('.line').querySelector('.invested_amount input');
  let input_revenue         = ac_line.closest('.line').querySelector('.revenue input');
  let input_revenue_amount  = ac_line.closest('.line').querySelector('.revenue_amount input');

  let invested_amount_value = ( input_invested_amount.value == "" || parseFloat(input_invested_amount.value) == NaN ||  parseFloat(input_invested_amount.value) == 0) ? 0 : parseFloat(input_invested_amount.value);
  let revenue_value         = ( input_revenue.value == "" || parseFloat(input_revenue.value) == NaN ||  parseFloat(input_revenue.value) == 0) ? 0 : parseFloat(input_revenue.value);
  let revenue_amount_value  = ( input_revenue_amount.value == "" || parseFloat(input_revenue_amount.value) == NaN ||  parseFloat(input_revenue_amount.value) == 0) ? 0 : parseFloat(input_revenue_amount.value);

  
  // console.log(min_amount)


  // let itemOtherField = get_otherField(ac_line);

  if (invested_amount_value > min_amount) {
          update_button.classList.add('hideOnEdit');
          input_invested_amount.style.setProperty('color', '#EF1010', 'important');
          snack.start({ act:'show', id:'minAmountError', });
        }else{
          update_button.classList.remove('hideOnEdit');
          input_invested_amount.style.setProperty('color', '#000', 'important');
        }

  switch (detail.input) {
    case "invested_amount":
      if (invested_amount_value === 0) {
        return;
      }

      if (revenue_value !== 0) {
        input_revenue_amount.value = (invested_amount_value * revenue_value).toFixed(2);
      } 
      if (revenue_amount_value !== 0) {
        input_revenue.value = (revenue_amount_value / invested_amount_value).toFixed(2);
      }
      break;

    case "revenue":
      if (revenue_value === 0) {
        return;
      }

      if (invested_amount_value !== 0) {
        input_revenue_amount.value = (invested_amount_value * revenue_value).toFixed(2);
      } 
      break;

    case "revenue_amount":
      if (revenue_amount_value === 0) {
        return;
      }

      if (invested_amount_value !== 0) {
        input_revenue.value = (revenue_amount_value / invested_amount_value).toFixed(2);
      }
      break;

    default:
      break;
  }
}

export function calculateGrandTotal(htmlFc) {
  let total_price         = htmlFc.fullcontHTML.querySelector("#purchase_general_total_price");
  let total_selling       = htmlFc.fullcontHTML.querySelector("#purchase_general_total_selling_price");
  let total_expenses      = htmlFc.fullcontHTML.querySelector("#purchase_general_total_expenses");
  let suma_total_price    = 0;
  let suma_total_selling  = 0;
  let suma_total_expenses = 0;

  // purchase_vs_item //////////////////////////////////////////

  const ac_line = htmlFc.fullcontHTML.querySelector("#purchase_form_purchase_vs_item");

  // Verificar si ac_line no es null antes de intentar iterar sobre sus descendientes
  if (ac_line) {
    // Obtener todos los elementos descendientes de ac_line
    const descendientesA = ac_line.querySelectorAll(".total_price");
    const descendientesB = ac_line.querySelectorAll(".selling_price");
    
    // Iterar sobre los descendientes
    descendientesA.forEach((e) => {
      let a            = e.querySelector("input[type='number']");
      let valor        = parseFloat(a.value) || 0;
      suma_total_price += valor;
      total_price.querySelector("input[type='text']").value = suma_total_price.toFixed(2)
    });

    // Iterar sobre los descendientes
    descendientesB.forEach((e) => {
      let a              = e.querySelector("input[type='number']");
      let input_qty      = e.closest('.line').querySelector('.qty input').value;
      let valor          = parseFloat(a.value) || 0;
      suma_total_selling += (valor * input_qty);
      total_selling.querySelector("input[type='text']").value = suma_total_selling.toFixed(2)
    });
  } else {
    // console.log("El elemento ac_line no se encontró en el DOM");
  }

  // purchase_vs_expense ///////////////////////////////////////////

  const ac_line_expenses         = htmlFc.fullcontHTML.querySelector("#purchase_form_purchase_vs_expenses");

  // Verificar si ac_line no es null antes de intentar iterar sobre sus descendientes
  if (ac_line_expenses) {
    // Obtener todos los elementos descendientes de ac_line_expenses
    const descendientesA = ac_line_expenses.querySelectorAll(".amount");

    // Iterar sobre los descendientes
    descendientesA.forEach((e) => {
      let a            = e.querySelector("input[type='number']");
      let valor        = parseFloat(a.value) || 0;
      suma_total_expenses += valor;
      total_expenses.querySelector("input[type='text']").value = suma_total_expenses.toFixed(2)
    });

  } else {
    // console.log("El elemento ac_line_expenses no se encontró en el DOM");
  }
}
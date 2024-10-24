const fullcontJump = require ('../../../../../components/fullcont/fullcont-jump')

export function jumperToSale(detail, htmlFc){

  const purchaseCode = htmlFc.fullcontHTML.querySelector("#purchase_form_code");
  const code         = purchaseCode.querySelector("input[type='text']");

  fullcontJump.start({
    actJump:"goToSales",
    dtId:"sale-dt",
    toSearch:code.value
  });
}

export function jumperToSendPayment(detail, htmlFc){

  const purchaseCode = htmlFc.fullcontHTML.querySelector("#purchase_form_code");
  const code         = purchaseCode.querySelector("input[type='text']");

  fullcontJump.start({
    actJump:"goToSendPayment",
    dtId:"sentpayment-dt",
    toSearch:code.value
  });
}
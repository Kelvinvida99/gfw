const settings         = require('../../../../../js-handler/settings')

export function purchaseSendEmail( detail, htmlFc ){ 
  let check       = htmlFc.fullcontHTML.querySelector("#purchase_send_email");
  let check_value = check.querySelector("input[type='checkbox']").checked;
  let mail        = htmlFc.fullcontHTML.querySelector("#purchase_form_email input").value;
  let elem        = document.querySelector("#purchase-fullcont");
  let dbid        = elem.getAttribute("data-dbid");

  if (check_value) {
    sendmail({ id: dbid, email: mail, type: "sendinvoice", validate:true });
  } else {
    console.log('no send')
  }
}

function sendmail(data) {
  // const infNewData = getFormData(data);
  console.log(data)
  const formData = new FormData();
  formData.append('purchase_id', data.id);
  formData.append('email', data.email);
  formData.append('type', data.type);
  console.log(formData);

  const controller = new AbortController();
  const timeout    = setTimeout(() => { controller.abort() }, 30000);

  // Obtén el purchase_id de alguna manera (puede ser un parámetro o una variable)
    let options = {
      method: 'POST',
      body: formData,
      signal: controller.signal,
      credentials: 'same-origin'
    };

    fetch(`./server/php/queries/report/purchase/pdf-invoice.php`, options)
        .then(result => {
          console.log(result)
            return result.json();
        })
        .then((result) => {
            if (result.code == 400) {
                alert("An error occurred while sending the email. Recharge");
            }
        })
        .catch((error) => {
            console.log('result 3', 'ERRORRRRRRRR');
        });
}

export function purchaseTrackingMail( detail, htmlFc ){ 
  let check       = htmlFc.fullcontHTML.querySelector("#purchase_send_email");
  let check_value = check.querySelector("input[type='checkbox']").checked;
  let mail        = htmlFc.fullcontHTML.querySelector("#purchase_form_email input").value;
  let provider_id = "";
  let elem        = document.querySelector("#purchase-fullcont");
  let dbid        = elem.getAttribute("data-dbid");
  let userId      = "";
  userId          = settings.getData().id

  htmlFc.form.forEach((a)=>{
    if (a.name == 'provider_id'){
      provider_id = a.value;
    }
  })

  if (check_value) {
    trackingEmail({ purcahse_id: dbid, email: mail, provider: provider_id , entity: "purchase", user: userId });
  } else {
    console.log('no send')
  }
}

function trackingEmail(data) {
  // const infNewData = getFormData(data);
  console.log(data)
  const formData = new FormData();
  formData.append('purchase_id', data.purcahse_id);
  formData.append('email', data.email);
  formData.append('provider', data.provider);
  formData.append('entit', data.entity);
  formData.append('userId', data.user);
  console.log(formData);

  const controller = new AbortController();
  const timeout = setTimeout(() => { controller.abort() }, 30000);

  // Obtén el purchase_id de alguna manera (puede ser un parámetro o una variable)
    let options = {
      method: 'POST',
      body: formData,
      signal: controller.signal,
      credentials: 'same-origin'
    };

    fetch(`./server/php/queries/tracking/purchase_tracking_email.php`, options)
        .then(result => {
          console.log(result)
            return result.json();
        })
        .then((result) => {
            if (result.code == 400) {
                alert("An error occurred while sending the email. Recharge");
            }
        })
        .catch((error) => {
            console.log('result 3', 'ERRORRRRRRRR');
        });
}
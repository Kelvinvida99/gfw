const snack            = require ('../../../../../components/snack/snack')
const dialog           = require ('./purchase-dialog')
const dialog_general   = require ('../../../../../components/dialog/dialog')
const textfieldHandler = require ('../../../../../components/textfield/textfield-handler')
const string           = require ('../../../../../js-handler/string')

//print label
export function printlabel() {

  let elem = document.querySelector("#purchase-fullcont");
  let dbid = elem.getAttribute("data-dbid");

  opcionsgenerator(dbid);
}

export function printlabeldt(detail) {

  opcionsgenerator(detail.dbid);
}

export function labelgenerator(detail) {

  let itemlabel   = document.querySelectorAll(".purchase_opcion");
  let line        = "";
  let input_check = "";
  let input_cant  = "";
  let opcion      = [];
  let item_id     = "";
  let idpo        = "";
  let error_input = false;
  let all_disable = true;

  itemlabel.forEach(element => {
    let line        = element.getAttribute("line");
    let input_check = document.querySelector("#purchase_check_opcion_" + line + " input");
    
    if(input_check.checked){
      all_disable = false;
      input_cant  = document.querySelector("#purchase_cant_opcion_" + line + " input");
      item_id     = element.getAttribute("iddb");
      idpo        = element.getAttribute("idpo");

      if ( input_cant.value == "" || parseFloat(input_cant.value) == NaN ||  parseFloat(input_cant.value) < 1) {
        textfieldHandler.error(input_cant.closest(".textfield"));
        snack.start({ act: 'show', id: 'invalidValue', });
        error_input=true;
        return;
      }

      opcion.push({purchase_item_id: idpo,item_id: item_id, cant: input_cant.value })
    }
  });

  if (error_input==true) {
    return;
  }

  if (all_disable==true) {
    snack.start({ act: 'show', id: 'atLeastOne', });
    return;
  }

  dialog_general.start({ act: "hide"});

  if (detail.dbid == undefined || detail.dbid == "" || detail.dbid == null) {
    console.log('An error occurred during the create pdf.');
    return;
  }

  const formData = new FormData();
  formData.append('purchase_id', detail.dbid);
  formData.append('opcion', JSON.stringify(opcion));


  const controller = new AbortController();
  const timeout    = setTimeout(() => { controller.abort() }, 30000);

  let options = {
    method: 'POST',
    body: formData,
    signal: controller.signal,
    credentials: 'same-origin'
  };

  fetch(`./server/php/queries/report/purchase/pdf-label.php`, options)
    .then(result => result.json())
    .then(result => {
     // console.log("entroooooo.");

      if (result.file_path != "") {

        const iframe = document.querySelector("#reportIframe");
        iframe.src   = result.file_path;

        setTimeout(() => {
          iframe.contentWindow.print();
        }, 200);

      }

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

function opcionsgenerator(dbid) {

  if (dbid == undefined || dbid == "" || dbid == null) {
    console.log('An error occurred during the create pdf.');
    return;
  }

  const formData = new FormData();
  formData.append('purchase_id', dbid);

  const controller = new AbortController();
  const timeout    = setTimeout(() => { controller.abort() }, 30000);

  let options = {
    method: 'POST',
    body: formData,
    signal: controller.signal,
    credentials: 'same-origin'
  };

  fetch(`./server/php/queries/report/purchase/query-purchase.php`, options)
    .then(result => result.json())
    .then(result => {

      let opcion = `<div class='mt-8'></div>`;
      let cont   = 0;

      result.mt.forEach(element => {
        if (element.tableName == "purchase_vs_item") {
            element.data.forEach(element => {
              cont++

              opcion +=`
   
              <div class="row purchase_opcion" style='min-width: 400px;' line="${cont}" iddb="${element.item_id_label}" idpo="${element.id}" id="purchase_opcion_${cont}">

                <div class="c75">
                  <div class="checkbox  " id="purchase_check_opcion_${cont}">

                    <input autocomplete="off" type="checkbox" data-detail='{"change": 
                        [  
                          {"dest":"purchase", "elem":"fullcont",  "id":"purchase-fullcont", "act":"disableopcion", "line":"${cont}" } 
                        ] }' checked>

                        <label>${string.cutText(element.item_name, 45)}</label>
                  </div><!-- checkbox -->
                </div>

                <div class="c25">
                  <div class="textfield  textfield-desk" id="purchase_cant_opcion_${cont}" >
                    <input autocomplete="off"  class= 'elem' type="number" min="1" max="10" step="1" 
                        data-detail='{ "key":   [ {"dest":"textfield", "act":"typing"  }]  }' value="1" >
                    <div class="label">Cant</div> 
                  </div><!-- textfield -->
                </div>

              </div>
    
              `;

            });
        }
        
      });

      dialog.start({ act: "show", dest: 'purchase', id: "purchaseprintlabel", entity: 'purchase', opcion: opcion,  dbid: dbid });

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
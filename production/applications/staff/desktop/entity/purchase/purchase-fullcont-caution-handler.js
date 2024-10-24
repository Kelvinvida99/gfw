const dialogP             = require ('./purchase-dialog')
const fullcontEntity      = require ('../../../../../components/fullcont/fullcont-entity')
const handler             = require('./purchase-fullcont-handler')

// precaucion selling price menor, boton update / update print
async function updateCaution(detail, htmlFc) {
    let min_amount        = htmlFc.fullcontHTML.querySelector("#purchase_form_min_amount").querySelector(".elem").value;
    let price             = htmlFc.fullcontHTML.querySelector("#purchase_form_price").querySelector(".elem").value;
    let differenceFound   = false; // Variable para rastrear si se encontró alguna diferencia
    let invest_amount_sum = "";
    let invest_amount     = "";

    if (!await handler.verifyItemQtySold(htmlFc)) {
        return false;
    }

    // console.log(htmlFc.entityMT[0].html.children.length);

    if (htmlFc.entityMT[0].html.children.length > 0) {

        if (purcahseVsItem(htmlFc) === true) {
            if (detail.type == 'pdf') {
                dialogP.start({ act:"show",  dest:'purchase', id:"purchaseSellingPricePrint", entity:'purchase' } )
            }else{
                dialogP.start({ act:"show",  dest:'purchase', id:"purchaseSellingPrice", entity:'purchase' } )
            }
        }else{
            console.log('create hay mt desde las iteraciones')
            if (detail.type == 'pdf') {
                fullcontEntity.update(detail, htmlFc) 
                setTimeout(()=>{
                    handler.purchasePrintPdf(detail, htmlFc)
                },2000) 
            }else{
        
                fullcontEntity.update(detail, htmlFc) 
            } 
        } 

    } else if(htmlFc.entityMT[1].data.length != 0) {
          
        for (const elem of htmlFc.entityMT) {
            if (elem.tableName === "purchase_vs_investment") {
                  for (const data of elem.data) {
                        invest_amount_sum += parseFloat(data.invested_amount);
                        invest_amount     = data.invested_amount;

                        if (price >= invest_amount_sum && min_amount < invest_amount) {
                            differenceFound = true;
                            console.log(min_amount, 'no es mayor que', invest_amount);
                            break;  // Salir del bucle interior
                        }
                    }
                    if (differenceFound) {
                        break;  // Salir del bucle exterior si se encontró una iteración que no cumple con la condición
                    }
                }
        }

        if (differenceFound) {
            // Se encontró una iteración que no cumple con la condición
            console.log("Se encontró una iteración que no cumple con la condición");
            return false;
        } else {
            // Todas las iteraciones cumplen con la condición
            if (purcahseVsItem(htmlFc) === true) {
                if (detail.type == 'pdf') {
                    dialogP.start({ act:"show",  dest:'purchase', id:"purchaseSellingPricePrint", entity:'purchase' } )
                }else{
                    dialogP.start({ act:"show",  dest:'purchase', id:"purchaseSellingPrice", entity:'purchase' } )
                }
                        
            }else{
                console.log('create hay mt desde las iteraciones')
                fullcontEntity.update(detail, htmlFc) 
            }
        }

    } else {
        console.log('create no hay mt')
        fullcontEntity.update(detail, htmlFc) 
    }
}

// precaucion selling price menor, boton save
function creationCaution(detail, htmlFc) {
    let min_amount        = htmlFc.fullcontHTML.querySelector("#purchase_form_min_amount").querySelector(".elem").value;
    let price             = htmlFc.fullcontHTML.querySelector("#purchase_form_price").querySelector(".elem").value;
    let differenceFound   = false; // Variable para rastrear si se encontró alguna diferencia
    let invest_amount_sum = "";
    let invest_amount     = "";

    // console.log(htmlFc.entityMT[0].html.children.length);

    if (htmlFc.entityMT[0].html.children.length > 0) {

        if (purcahseVsItem(htmlFc) === true) {
                dialogP.start({ act:"show",  dest:'purchase', id:"purchaseCreateSellingPrice", entity:'purchase' } )
        }else{
            console.log('create hay mt desde las iteraciones')
        } 

    } else if(htmlFc.entityMT[1].data.length != 0) {
          
        for (const elem of htmlFc.entityMT) {
            if (elem.tableName === "purchase_vs_investment") {
                  for (const data of elem.data) {
                        invest_amount_sum += parseFloat(data.invested_amount);
                        invest_amount     = data.invested_amount;

                        if (price >= invest_amount_sum && min_amount < invest_amount) {
                            differenceFound = true;
                            console.log(min_amount, 'no es mayor que', invest_amount);
                            break;  // Salir del bucle interior
                        }
                    }
                    if (differenceFound) {
                        break;  // Salir del bucle exterior si se encontró una iteración que no cumple con la condición
                    }
                }
        }

        if (differenceFound) {
            // Se encontró una iteración que no cumple con la condición
            console.log("Se encontró una iteración que no cumple con la condición");
            return false;
        } else {
            // Todas las iteraciones cumplen con la condición
            if (purcahseVsItem(htmlFc) === true) {
                dialogP.start({ act:"show",  dest:'purchase', id:"purchaseCreateSellingPrice", entity:'purchase' } )
                        
            }else{
                console.log('create hay mt desde las iteraciones')
                fullcontEntity.addOne(detail, htmlFc) 
            }
        }

    } else {
        console.log('create no hay mt')
        fullcontEntity.addOne(detail, htmlFc) 
    }
}

// verifica el selling price y el unit price de cada elemento de la mt purchase vs item
function purcahseVsItem(htmlFc) {
    let diferenciaEncontrada = false; // Inicializamos la bandera
        for (const elem of htmlFc.entityMT) {
            if (elem.tableName === "purchase_vs_item") {
                elem.html.querySelectorAll('.selling_price').forEach((sellingInput, index) => {
                    const selling_value = parseFloat(sellingInput.querySelector('input[type="number"]').value);
                    const unit_value    = parseFloat(elem.html.querySelectorAll('.unit_price')[index].querySelector('input[type="number"]').value);
                    
                    if (unit_value >= selling_value) {
                        diferenciaEncontrada = true; // Si se encuentra una diferencia, establecemos la bandera en true
                    }
                });

                 if (diferenciaEncontrada) {
                    return true;
                } else {
                    return false;
                }
            }
        }
}

export async function verifyPayment(detail, htmlFc) {
    if( !htmlFc.fullcontHTML.classList.contains('mode-add') ) { 
        let dbid = htmlFc.fullcontHTML.getAttribute("data-dbid");
        if (!await handler.verifyPayment(htmlFc,dbid)) {
            updateCaution(detail, htmlFc);
        }
    }else{
        fullcontEntity.saveFromDialog(detail, htmlFc);
    }
}
const snack  = require ('../../../../../components/snack/snack')
const snackP = require ('./purchase-snack')

export function evaluation(htmlFc, restriction) { //console.log('result 5555555555555 5555555555555', restriction ) 
 

   if(restriction.val === 'ok'){ 
       // console.log('result 5555555555555 5555555555555 NO RESRTICTIONS ON THIS INPUT', restriction.val ); 
        return 
   }

   const test = ['provider_id', 'item_id']
   
   const inputToRestrict = ['purchase_form_provider_id', 'purchase_form_due_date', 'purchase_form_bill_date', 'purchase_fill_bill_date']


   restriction.restrictedFields.forEach((elem)=>{ //console.log('elem', elem.id)

        let elemHtml = document.getElementById(`purchase_form_${elem.id}`)
       // console.log(elemHtml)
   })



    for (let x = 0; x < htmlFc.form.length ; x++) {   
        for (let y = 0; y < inputToRestrict.length ; y++) {   
           
            if(htmlFc.form[x].id === inputToRestrict[y]) { 

                    htmlFc.form[x].html.classList.add('textfield-restriction')
               
            }
        }
    }


    ///MT
    const purchaseVsItem        = document.getElementById('purchase_form_purchase_vs_item')
    const purchaseVsInvestment  = document.getElementById('purchase_form_purchase_vs_expenses')

    purchaseVsItem.classList.add('multitable-restriction')
    purchaseVsInvestment.classList.add('multitable-restriction')


}/**/

export function restirctionClick(detail, htmlFc){
    let restirction = htmlFc.fullcontHTML.querySelectorAll("#purchase_form_purchase_vs_item .mt-purchase-restriction")
    restirction.forEach((a)=>{
        snack.start({ act: 'show', id: 'restriction', });

    })
}

export function removeItem(htmlFc){
    snackP.start({ act: 'show', id: 'restriction', });
}
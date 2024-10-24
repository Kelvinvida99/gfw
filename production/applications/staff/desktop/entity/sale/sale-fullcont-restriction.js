



export function evaluation(htmlFc, restriction) { 
    
    if (restriction.val === 'ok') {
        return;
    }
   
   
   const inputToRestrict = restriction.restrictedFields;
   //console.log(' go to restrict to item_id', restriction.restrictedFields) 



    for (let x = 0; x < htmlFc.form.length ; x++) {   
        for (let y = 0; y < inputToRestrict.length ; y++) {   
           
            if(htmlFc.form[x].name === inputToRestrict[y].id) { 

                    htmlFc.form[x].html.classList.add('textfield-restriction')
               
            }
        }
    }


    
    ///MT
    const saleVsItem        = document.getElementById('sale_form_sale_vs_item')

    saleVsItem.classList.add('multitable-restriction')

}/**/



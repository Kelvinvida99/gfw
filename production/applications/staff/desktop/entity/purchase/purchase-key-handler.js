
const purchaseMultitable = require('./purchase-fullcont-multitable')



export function add_line_item(detail) {
   
    if (detail.ev.key === 'Tab' || detail.ev.keyCode === 9) {
        
        let multitable = document.getElementById('purchase_form_purchase_vs_item');

        let lines = multitable.querySelectorAll('.line');

        if (lines.length > 0) {
            let lastline = lines[lines.length - 1];

            if (lastline.contains(detail.ev.target)) {
                detail.ev.preventDefault();
                purchaseMultitable.start({act: 'add' ,  tableName: 'purchase_vs_item' , tab: true});
            }
        }

    }
}

const saleMultitable = require('./sale-fullcont-multitable')



export function add_line_item(detail) {
   
    if (detail.ev.key === 'Tab' || detail.ev.keyCode === 9) {
        
        let multitable = document.getElementById('sale_form_sale_vs_item');

        let lines = multitable.querySelectorAll('.line');

        if (lines.length > 0) {
            let lastline = lines[lines.length - 1];

            if (lastline.contains(detail.ev.target)) {
                detail.ev.preventDefault();
                saleMultitable.start({act: 'add' ,  tableName: 'sale_vs_item' , tab: true});

            }
            
        }

    }
}
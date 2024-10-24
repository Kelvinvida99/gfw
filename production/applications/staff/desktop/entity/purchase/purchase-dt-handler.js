
/****************ELEMENTS*****************/
//this obj define, the actions realeted to each  
//th>table header and td

const timeDate = require ('../../../../../js-handler/time-date')

export const tableDetail = {
    entity: 'purchase',//name table on the db
    dest: 'purchase',//name of the entity on the system

    //action for body 
    //left click, directly to the fullcont 
    tdDataDetail:`data-detail='{ "click": [ {"dest":"ripple" },
                                            {"dest":"purchase", "elem":"fullcont", "id":"purchase-fullcont", "act":"selectOne", "entity":"purchase", "dbid": "#dbid"}  ],
                                
                                 "clickRight": [{"dest":"purchase", "elem":"dt", "act":"trMenu", "id":"trMenu",  "entity":"purchase", "dbid": "#dbid" } ]  }'`,
    // andry 28/12/2023
    filter: {
        mainFilterFields : ["purchase.code","provider.name","purchase.reference_number","item.name","item.brand"],
        mainFilterValues : ["", ""],         
        andFilterFields  : [""],
        andFilterValues  : [""],  
    }

}



/****************ELEMENTS*****************/



//each element could organize their data diferent
export function organizeRow(data){ console.log('organizeRow>', data)

    var newData = []
    
    // andry 28/12/2023
    if(data.length === 0){
        newData.push({   id: 'nothing', colum: [{ label:'No Results', span: ''},
                                                { label:'', span: ''},
                                                { label:'', span: ''},
                                                { label:'', span: ''},
                                                { label:'', span: ''}, ] })
        return newData
    }
    // andry 28/12/2023

    data.forEach((elem)=>{
        let text;
        let subTextStatus;
        let textBill;
        let subTextBill;
        let paymentColor;
        let statusStyle;
        let billColor;
        let statusStyleBill;
        let subTextDueDate;
        
        const differenceInDays = timeDate.compareDates(elem.purchaseDueDate)

        if (differenceInDays > 0) {
            subTextDueDate = differenceInDays+' '+'Days Left'
        }else if(isNaN(differenceInDays)){
            subTextDueDate = 'NA'
        }else{
            subTextDueDate = Math.abs(differenceInDays)+' '+'Days Over Due'
        }

        switch (elem.payment_status) {
            case 'paid':
              text = 'Payed';
              subTextStatus = '';
              paymentColor = 'tdWithIcon td-green-icon';
              statusStyle = './css/svg.svg#cash';
              break;

            case 'unpaid':
                if (elem.shipping === 'ordered') {                   
                  text = 'Unpaid';
                  subTextStatus = 'Payment needed';
                  paymentColor = 'tdWithIcon td-orange-icon';
                  statusStyle = './css/svg.svg#cash';
                }else{
                    text = '--';
                    subTextStatus = 'No Payment needed';
                    paymentColor = 'tdWithIcon td-gray-icon';
                    statusStyle = './css/svg.svg#cash';
                }
              break;

            case 'partially_paid':
              text = 'Partialy Paid';
              subTextStatus = 'Payment needed';
              paymentColor = 'tdWithIcon td-orange-icon';
              statusStyle = './css/svg.svg#cash';
              break;

            case 'close':
              text = 'Close';
              subTextStatus = 'be closed';
              paymentColor = 'tdWithIcon td-lg-icon';
              statusStyle = './css/svg.svg#cash';
              break;

            case 'overdue':
              text = 'overdue';
              subTextStatus = "Payment needed";
              paymentColor = 'tdWithIcon td-red-icon';
              statusStyle = './css/svg.svg#cash';
              break;

            case '':
              text = '';
              subTextStatus = '';
              paymentColor = 'tdWithIcon td-lg-icon';
              statusStyle = './css/svg.svg#cash';
              break;

            default:
              break;
        }

        switch (elem.shipping){

            case 'ordered':
                textBill = 'Ordered';
                subTextBill = 'Orde placed';
                billColor = 'tdWithIcon td-orange-icon';
                statusStyleBill = './css/svg.svg#warning';
                break;

            case 'shipped':
                textBill = 'Shipped';
                subTextBill = 'Comming';
                billColor = 'tdWithIcon td-green-icon';
                statusStyleBill = './css/svg.svg#truck';
                break;

            case 'delivered':
                textBill = "Delivered";
                subTextBill = 'On Site';
                billColor = 'tdWithIcon td-gray-icon';
                statusStyleBill = './css/svg.svg#check-round';
                break;

            default:
                textBill = '';
                subTextBill = '';
                billColor = '';
                break;
        }

        // const date = new Date(elem.purchaseDeliveredDate);
  
        // if (isNaN(date.getTime())) {
        //   elem.purchaseDeliveredDate =  'No Day';
        // }

        // switch (elem.fill_bill_date){
        //     case 'true':
        //         textBill = 'Bill';
        //         subTextBill = 'Bill'
        //         billColor = 'tdWithIcon td-green-icon';
        //         statusStyleBill = './css/svg.svg#bill';
        //         break;

        //     case '':
        //         textBill = "No Bill";
        //         subTextBill = "No a Bill"
        //         billColor = 'tdWithIcon td-lg-icon';
        //         statusStyleBill = './css/svg.svg#bill';
        //         break;

        //     default:
        //         break;
        // }

        
       
        newData.push(
                {   id: elem.id,   colum: [ { label: elem.providerName, span:elem.purchaseCodeREF_td,style:{ 
                                                tdClass:'tdWithAvatar',  
                                                avatar:elem.providerAvatar, 
                                                
                                            } },

                                            { label: elem.general_total_price_dt, span:elem.total_expenses },

                                            { label: timeDate.friendlyDate(elem.purchaseDate), span:subTextDueDate },

                                            { label: textBill, span:subTextBill,style:{ 
                                                tdClass:billColor,  
                                                svg:statusStyleBill 
                                                
                                            }},
                                            
                                            { label: text, span:subTextStatus, style:{
                                                tdClass:paymentColor,
                                                svg:statusStyle
                                            } },
                                            
                                        ]    
                }
        )/*push*/
    })/*forEach*/

    return newData
}

export function organizeRowEntityChange(data){ 
    let newData = "";
    let avatar  = "";
    let changes_inputs;
    let changes_mt;

    data.forEach((elem)=>{

        if (elem.avatar == "") {
            avatar = "css/img/pic/person.svg";
        }else{
            avatar = elem.avatar;
        }
        


        newData +=`<cont> 
                        <user>
                            <photo class="photo" 
                            style="background-image: url('${avatar}')"></photo>
                            <title>${elem.user_name.trim()}</title>
                            <time>${timeDate.friendlyDate(elem.date_change) + ' | ' + timeDate.friendlyTime(elem.date_change.substring(10))}</time>
                        </user>

                        <entry>
                            <div class="row">
                                <div class="c33">Data</div><!-- c16 -->
                                <div class="c33">From</div><!-- c16 -->
                                <div class="c33">To</div><!-- c16 -->
                            </div><!-- row --> 
        
                    `;

        changes_inputs = JSON.parse(elem.changes).input;

        changes_inputs.forEach(input => {
            newData +=`
                            <div class="row">
                                <div class="c33">${input.elemId}</div><!-- c16 -->
                                <div class="c33">${input.from}</div><!-- c16 -->
                                <div class="c33">${input.to}</div><!-- c16 -->
                            </div><!-- row --> 
            `;
        });

        changes_mt = JSON.parse(elem.changes).mt;
        if (changes_mt.length > 0) {
            newData +=`     </entry>
                        <entry>
                            <div class="row mt-8">
                                <div class="c16">Status</div><!-- c16 -->
                                <div class="c16">Items</div><!-- c16 -->
                                <div class="c16">Units</div><!-- c16 -->
                                <div class="c16">Qty</div><!-- c16 -->
                                <div class="c16">Unit Price</div><!-- c16 -->
                                <div class="c16">Total</div><!-- c16 -->
                            </div><!-- row --> `;
            
        }


        changes_mt.forEach(mt => {

            mt.from.forEach(function(mt_from, index) {
                newData += `
                    <div class="row">
                        <div class="c16">From</div><!-- c16 -->
                        <div class="c16">${mt_from.id}</div><!-- c16 -->
                        <div class="c16">${mt_from.selling_type}</div><!-- c16 -->
                        <div class="c16">${mt_from.qty}</div><!-- c16 -->
                        <div class="c16">${'$' + mt_from.price}</div><!-- c16 -->
                        <div class="c16">${'$' + mt_from.total}</div><!-- c16 -->
                    </div><!-- row -->`;
        
                // Verificar si hay datos en mt.to
                if (mt.to && mt.to[index]) {
                    newData += `
                    <div class="row">
                        <div class="c16">To</div><!-- c16 -->
                        <div class="c16">${mt.to[index].id}</div><!-- c16 -->
                        <div class="c16">${mt.to[index].selling_type}</div><!-- c16 -->
                        <div class="c16">${mt.to[index].qty}</div><!-- c16 -->
                        <div class="c16">${'$' + mt.to[index].price}</div><!-- c16 -->
                        <div class="c16">${'$' + mt.to[index].total}</div><!-- c16 -->
                    </div><!-- row -->`;
                }
            });
        
        });
        

        newData +=`     </entry>
                   <cont>`;



    })/*forEach*/

    return newData
}/*organizeRow*/
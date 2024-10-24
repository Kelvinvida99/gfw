
/****************ELEMENTS*****************/
//this obj define, the actions realeted to each 
//th>table header and td

const dtUpdate = require ('./sale-dt-update')
const timeDate = require ('../../../../../js-handler/time-date')


export const tableDetail = {
    entity: 'sale',//name table on the db
    dest: 'sale',//name of the entity on the system

    //action for body 
    //left click, directly to the fullcont 
    tdDataDetail:`data-detail='{ "click": [ {"dest":"ripple" },
                                            {"dest":"sale", "elem":"fullcont", "id":"sale-fullcont", "act":"selectOne", "entity":"sale", "dbid": "#dbid"}  ],
                                
                                 "clickRight": [{"dest":"sale", "elem":"dt", "act":"trMenu", "id":"trMenu",  "entity":"sale", "dbid": "#dbid" } ]  }'`,

    filter: {
        mainFilterFields : ["sale.code","customer.name","purchase.code","item.name","item.brand"],
        mainFilterValues : ["", ""],         
        andFilterFields  : [""],
        andFilterValues  : [""],  
    }

}



/****************ELEMENTS*****************/



//each element could organize their data diferent
export function organizeRow(data){ 
    
    console.log('organizeRow>',data)

    var newData = []

    if(data.length === 0){
        newData.push({   id: 'nothing', colum: [{ label:'No Results', span: ''},
                                                { label:'', span: '' }, 
                                                { label:'', span: '' },    
                                                { label:'', span: '' },
                                                { label:'', span: '' }] })
        return newData
    }
   

    data.forEach((elem)=>{

     //   const  statusStyle  = dtUpdate.getStatusStyle(elem);
        const  statusshippingstyle  = dtUpdate.getstatusshippingtyle(elem);
        const  statuspaymentstyle  = dtUpdate.getstatuspaymentstyle(elem);
     


        let shipping_date = new Date(elem.shipping_date);
        let shipping_time="";
        if (isNaN(shipping_date.getTime())) {
            shipping_time = 'No Time';
        }else{
            shipping_time = timeDate.friendlyTime(elem.shipping_time);
        }

        newData.push(
                {   id: elem.id,   colum: [  
                    { label: elem.name, span: elem.code,
                                                style:{ 
                                                    tdClass:'tdWithAvatar',  
                                                    avatar:elem.avatar, 
                                                    
                                                } },
                                             { label: elem.qty + ' Units', span: elem.grand_total_dt }, 
                                             { label: timeDate.friendlyDate(elem.sale_date_td), span: timeDate.friendlyDate(elem.due_date_td)}, 
                                             { label: timeDate.friendlyDate(elem.packing_slip_last_printed)}, 
                                             { label: statusshippingstyle.label_top, span: statusshippingstyle.desc,
                                                style:{ 
                                                    tdClass:`tdWithIcon ${statusshippingstyle.icon.color}`,  
                                                    svg:`./css/svg.svg#${statusshippingstyle.icon.svg}`,
                                                } }, 
                                             { label: statuspaymentstyle.label_top, span: statuspaymentstyle.desc,
                                                style:{ 
                                                    tdClass:`tdWithIcon ${statuspaymentstyle.icon.color}`,  
                                                    svg:`./css/svg.svg#${statuspaymentstyle.icon.svg}`,
                                                } }]    
                }
        )
        /*push*/
    })/*forEach*/

    return newData
}/*organizeRow*/


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
 
                newData +=`
                            <div class="row">
                                <div class="c16">From</div><!-- c16 -->
                                <div class="c16">${mt_from.id}</div><!-- c16 -->
                                <div class="c16">${mt_from.selling_type}</div><!-- c16 -->
                                <div class="c16">${mt_from.qty}</div><!-- c16 -->
                                <div class="c16">${'$' + mt_from.price}</div><!-- c16 -->
                                <div class="c16">${'$' + mt_from.total}</div><!-- c16 -->
                            </div><!-- row --> `;

                if (typeof mt.to[index] !== 'undefined'){

                            newData +=`<div class="row">
                            <div class="c16">To</div><!-- c16 -->
                            <div class="c16">${mt.to[index].id}</div><!-- c16 -->
                            <div class="c16">${mt.to[index].selling_type}</div><!-- c16 -->
                            <div class="c16">${mt.to[index].qty}</div><!-- c16 -->
                            <div class="c16">${'$' + mt.to[index].price}</div><!-- c16 -->
                            <div class="c16">${'$' + mt.to[index].total}</div><!-- c16 -->
                        </div><!-- row --> `; 

                }
               





            });


        });

        newData +=`     </entry>
                   <cont>`;



    })/*forEach*/

    return newData
}



export function organizeRowemailTraking(data){ 

    let newData = "";
    let avatar  = "";
    
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
                            <time>${timeDate.friendlyDate(elem.mail_date) + ' | ' + timeDate.friendlyTime(elem.mail_time)}</time>
                        </user>

                        <entry>
                            <div class="row">
                                <div class="c33">Data</div><!-- c16 -->
                                <div class="c33">Status</div><!-- c16 -->
                            </div><!-- row --> 

                            <div class="row">
                                <div class="c33">${elem.email}</div><!-- c16 -->
                                <div class="c33">${elem.sent == "true" ? "Send" : "Don't Send"}</div><!-- c16 -->
                            </div><!-- row --> 
                        </entry>
                    <cont>
                    `;

    

    })/*forEach*/

    return newData
}






















/*organizeRow*/
/*
{
    "id": "11",
    "department": "[{\"id\": \"25\", \"displayText\": \"TEST\"}]",
    "admission_date": "2022-06-01",
    "termination_date": "2003-03-03",
    "status": "Active",
    "max_hours": 100,
    "classification_level": "CL1",
    "TAL": "TAL1",
    "Proxy": "P1",
    "sendEvv": "true",
    "memberId": "101010",
    "is24hr": "",
    "patient_agrmt_hourly_payrate": "32.50",
    "rhio_consent": "",
    "rhio_consent_date": "2022-06-01",
    "privateCase": "true",
    "managed_care_plan": "MCP1",
    "N_procedureCode": "PC1",
    "N_saleRateCode": "PRC1",
    "N_procedureModCode": "PMC1",
    "insurance_contact": "IC1",
    "health_insurance_company": "HIP1",
    "notes": "1111"
}

*/
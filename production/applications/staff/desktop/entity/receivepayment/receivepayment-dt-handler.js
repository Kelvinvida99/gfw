
/****************ELEMENTS*****************/
//this obj define, the actions realeted to each 
//th>table header and td

const timeDate = require ('../../../../../js-handler/time-date')


export const tableDetail = {
    entity: 'receivepayment',//name table on the db
    dest: 'receivepayment',//name of the entity on the system

    //action for body 
    //left click, directly to the fullcont 
    tdDataDetail:`data-detail='{ "click": [ {"dest":"ripple" },
                                            {"dest":"receivepayment", "elem":"fullcont", "id":"receivepayment-fullcont", "act":"selectOne", "entity":"receivepayment", "dbid": "#dbid"}  ],
                                
                                 "clickRight": [{"dest":"receivepayment", "elem":"dt", "act":"trMenu", "id":"trMenu",  "entity":"receivepayment", "dbid": "#dbid" } ]  }'`,

    filter: {
        mainFilterFields : ["a.code","a.customer_name"],
        mainFilterValues : ["", ""],         
        andFilterFields  : [""],
        andFilterValues  : [""],  
    }

}



/****************ELEMENTS*****************/



//each element could organize their data diferent
export function organizeRow(data){ //console.log('organizeRow>')

    var newData = []

    if(data.length === 0){
        newData.push({   id: 'nothing', colum: [{ label:'No Results', span: ''},
                                                { label:'', span: '' },
                                                { label:'', span: '' },
                                                { label:'', span: '' }] })
        return newData
    }

    data.forEach((elem)=>{
        newData.push(
            {   id: elem.id,   colum: [  { label: elem.customer_name, span: elem.code,
                                            style:{ 
                                                tdClass:'tdWithAvatar',  
                                                avatar:elem.avatar, 
                                                
                                            } },  
                                         { label: elem.accounts_name, span: elem.reference_number,
                                            style:{ 
                                                tdClass:'tdWithAvatar',  
                                                avatar:elem.accounts_avatar, 
                                                
                                            }
                                         },
                                         { label: elem.amount_dt, span: timeDate.friendlyDate(elem.date_td)},
                                         { label: elem.paid_invoices, span: elem.sales_code}]    
            }
        )/*push*/
    })/*forEach*/

    return newData
}/*organizeRow*/
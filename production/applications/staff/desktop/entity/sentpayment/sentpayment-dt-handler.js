/****************ELEMENTS*****************/
//this obj define, the actions realeted to each 
//th>table header and td
const timeDate = require ('../../../../../js-handler/time-date')


export const tableDetail = {
    entity: 'sentpayment',//name table on the db
    dest: 'sentpayment',//name of the entity on the system

    //action for body 
    //left click, directly to the fullcont 
    tdDataDetail:`data-detail='{ "click": [ {"dest":"ripple" },
                                            {"dest":"sentpayment", "elem":"fullcont", "id":"sentpayment-fullcont", "act":"selectOne", "entity":"sentpayment", "dbid": "#dbid"}  ],
                                
                                 "clickRight": [{"dest":"sentpayment", "elem":"dt", "act":"trMenu", "id":"trMenu",  "entity":"sentpayment", "dbid": "#dbid" } ]  }'`,

    filter: {
        mainFilterFields : ["sentpayment.code","provider.name","purchase.code"],
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
                                                { label:'', span: '' }                                            
                                                ] })
        return newData
    }


    data.forEach((elem)=>{
        newData.push(
            {   id: elem.id,   colum: [  { label: elem.provider_name, span: elem.code,
                                            style:{ 
                                                tdClass:'tdWithAvatar',  
                                                avatar:elem.provider_avatar, 
                                                
                                            }
                                         },  
                                         { label: elem.accounts_name, span: elem.reference_number,
                                            style:{ 
                                                tdClass:'tdWithAvatar',  
                                                avatar:elem.accounts_avatar, 
                                                
                                            }
                                         },
                                         { label: elem.amount_dt, span: elem.date_dt},
                                         { label: elem.paid_bills_count, span: elem.paid_bills}
                                        ]    
            }
        )/*push*/
    })/*forEach*/

    return newData
}/*organizeRow*/
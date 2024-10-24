
/****************ELEMENTS*****************/
//this obj define, the actions realeted to each 
//th>table header and td

export const tableDetail = {
    entity: 'customer',//name table on the db
    dest: 'customer',//name of the entity on the system

    //action for body 
    //left click, directly to the fullcont 
    tdDataDetail:`data-detail='{ "click": [ {"dest":"ripple" },
                                            {"dest":"customer", "elem":"fullcont", "id":"customer-fullcont", "act":"selectOne", "entity":"customer", "dbid": "#dbid"}  ],
                                
                                 "clickRight": [{"dest":"customer", "elem":"dt", "act":"trMenu", "id":"trMenu",  "entity":"customer", "dbid": "#dbid" } ]  }'`,

    filter: {
        mainFilterFields : ["customer.code","customer.name"],
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
                                                { label:'', span: '' },
                                             ] })
        return newData
    }

    data.forEach((elem)=>{
        console.log(elem)
        newData.push(
                {   id: elem.id,   colum: [  { label: elem.name, span:elem.contact ,style:{ 
                                                tdClass:'tdWithAvatar',  
                                                avatar:elem.avatar, 
                                                
                                            } },
                                             { label: elem.phone, span:elem.other_phone},
                                             { label: elem.bill_to_city, span:elem.bill_to_state},
                                           ]    
                }
        )/*push*/
    })/*forEach*/

    return newData
}/*organizeRow*/
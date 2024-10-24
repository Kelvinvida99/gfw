
/****************ELEMENTS*****************/
//this obj define, the actions realeted to each 
//th>table header and td

export const tableDetail = {
    entity: 'provider',//name table on the db
    dest: 'provider',//name of the entity on the system

    //action for body 
    //left click, directly to the fullcont 
    tdDataDetail:`data-detail='{ "click": [ {"dest":"ripple" },
                                            {"dest":"provider", "elem":"fullcont", "id":"provider-fullcont", "act":"selectOne", "entity":"provider", "dbid": "#dbid"}  ],
                                
                                 "clickRight": [{"dest":"provider", "elem":"dt", "act":"trMenu", "id":"trMenu",  "entity":"provider", "dbid": "#dbid" } ]  }'`,

    filter: {
        mainFilterFields : ["code","name", "contact"],
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
            {   id: elem.id,   colum: [  { label: elem.name, span: elem.contact,
                                            style:{ 
                                                tdClass:'tdWithAvatar',  
                                                avatar:elem.avatar, 
                                                
                                            }  },  
                                         { label: elem.phone, span:elem.phone2},
                                         { label: elem.bill_to_city, span: elem.bill_to_state}]    
            }
        )/*push*/
    })/*forEach*/

    return newData
}/*organizeRow*/
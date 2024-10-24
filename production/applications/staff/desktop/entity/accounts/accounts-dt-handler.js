/****************ELEMENTS*****************/
//this obj define, the actions realeted to each 
//th>table header and td

export const tableDetail = {
    entity: 'accounts',//name table on the db
    dest: 'accounts',//name of the entity on the system

    //action for body 
    //left click, directly to the fullcont 
    tdDataDetail:`data-detail='{ "click": [ {"dest":"ripple" },
                                            {"dest":"accounts", "elem":"fullcont", "id":"accounts-fullcont", "act":"selectOne", "entity":"accounts", "dbid": "#dbid"}  ],
                                
                                 "clickRight": [{"dest":"accounts", "elem":"dt", "act":"trMenu", "id":"trMenu",  "entity":"accounts", "dbid": "#dbid" } ]  }'`,

    filter: {
        mainFilterFields : ["accounts.code","accounts.name"],
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
        newData.push({   id: 'nothing', colum: [{ label:'No Results', span: '' },
                                                { label:'', span:'' },
                                                { label:'', span:'' },] })
        return newData
    }

    data.forEach((elem)=>{
        newData.push(
                {   id: elem.id,   colum: [ { label: elem.name, span:elem.code, style:{ 
                                                tdClass:'tdWithAvatar',  
                                                avatar:elem.avatar, 
                                            } },
                                             { label: elem.type },
                                             { label: elem.balance, span:'' }, ]    
                }
        )/*push*/
    })/*forEach*/

    return newData
}/*organizeRow*/
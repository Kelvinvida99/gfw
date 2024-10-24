
/****************ELEMENTS*****************/
//this obj define, the actions realeted to each 
//th>table header and td

export const tableDetail = {
    entity: 'shipper',//name table on the db
    dest: 'shipper',//name of the entity on the system

    //action for body 
    //left click, directly to the fullcont 
    tdDataDetail:`data-detail='{ "click": [ {"dest":"ripple" },
                                            {"dest":"shipper", "elem":"fullcont", "id":"shipper-fullcont", "act":"selectOne", "entity":"shipper", "dbid": "#dbid"}  ],
                                
                                 "clickRight": [{"dest":"shipper", "elem":"dt", "act":"trMenu", "id":"trMenu",  "entity":"shipper", "dbid": "#dbid" } ]  }'`,

    filter: {
        mainFilterFields : ["name", "email"],
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
                                                { label:'', span: '' }, { label:'', span: '' }] })
        return newData
    }

    data.forEach((elem)=>{
        newData.push(
            {   id: elem.id,   colum: [  { label: elem.name, span: elem.code },  
                                         { label: elem.email, span: elem.phone},
                                         { label: elem.type, span: ''} ]    
            }
        )/*push*/
    })/*forEach*/

    return newData
}/*organizeRow*/

/****************ELEMENTS*****************/
//this obj define, the actions realeted to each 
//th>table header and td

export const tableDetail = {
    entity: 'item_unit',//name table on the db
    dest: 'item_unit',//name of the entity on the system

    //action for body 
    //left click, directly to the fullcont 
    tdDataDetail:`data-detail='{ "click": [ {"dest":"ripple" },
                                            {"dest":"item_unit", "elem":"fullcont", "id":"item_unit-fullcont", "act":"selectOne", "entity":"item_unit", "dbid": "#dbid"}  ],
                                
                                 "clickRight": [{"dest":"item_unit", "elem":"dt", "act":"trMenu", "id":"trMenu",  "entity":"item_unit", "dbid": "#dbid" } ]  }'`,

    filter: {
        mainFilterFields : ["item_unit.name","item_unit.notes"],
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
                                                { label:'', span: '' }] })
        return newData
    }

    data.forEach((elem)=>{
        newData.push(
                {   id: elem.id,   colum: [  { label: elem.name },
                                             { label: elem.notes } ]    
                }
        )/*push*/
    })/*forEach*/

    return newData
}/*organizeRow*/

/****************ELEMENTS*****************/
//this obj define, the actions realeted to each 
//th>table header and td

export const tableDetail = {
    entity: 'investor',//name table on the db
    dest: 'investor',//name of the entity on the system

    //action for body 
    //left click, directly to the fullcont 
    tdDataDetail:`data-detail='{ "click": [ {"dest":"ripple" },
                                            {"dest":"investor", "elem":"fullcont", "id":"investor-fullcont", "act":"selectOne", "entity":"investor", "dbid": "#dbid"}  ],
                                
                                 "clickRight": [{"dest":"investor", "elem":"dt", "act":"trMenu", "id":"trMenu",  "entity":"investor", "dbid": "#dbid" } ]  }'`,

    filter: {
        mainFilterFields : ["code","name"],
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
                                                { label:'', span: '' }] })
        return newData
    }

    data.forEach((elem)=>{
        newData.push(
            {   id: elem.id,   colum: [  {  label: elem.code, 
                                            span: '',
                                            style:{ 
                                                tdClass:'tdWithAvatar',  
                                                avatar:elem.avatar, 
                                                
                                            }  },  
                                         { label: elem.name, span: ''}]    
            }
        )/*push*/
    })/*forEach*/

    return newData
}/*organizeRow*/
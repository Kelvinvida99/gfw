
/****************ELEMENTS*****************/
//this obj define, the actions realeted to each 
//th>table header and td

export const tableDetail = {
    entity: 'investordeposit',//name table on the db
    dest: 'investordeposit',//name of the entity on the system

    //action for body 
    //left click, directly to the fullcont 
    tdDataDetail:`data-detail='{ "click": [ {"dest":"ripple" },
                                            {"dest":"investordeposit", "elem":"fullcont", "id":"investordeposit-fullcont", "act":"selectOne", "entity":"investordeposit", "dbid": "#dbid"}  ],
                                
                                 "clickRight": [{"dest":"investordeposit", "elem":"dt", "act":"trMenu", "id":"trMenu",  "entity":"investordeposit", "dbid": "#dbid" } ]  }'`,

    filter: {
        mainFilterFields : ["investordeposit.code","investor.name"],
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
                                                { label:'', span: '' },
                                                { label:'', span: '' }] })
        return newData
    }

    data.forEach((elem)=>{
        newData.push(
            {   id: elem.id,   colum: [  { label: elem.code, span: '' },  
                                         { label: elem.investor_name, span: ''},    
                                         { label: elem.type, span: ''},    
                                         { label: elem.amount_dt, span: ''},  
                                         { label: elem.accounts_name, span: ''},   
                                         { label: elem.date_td, span: ''}]    
            }
        )/*push*/
    })/*forEach*/

    return newData
}/*organizeRow*/
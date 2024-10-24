
/****************ELEMENTS*****************/
//this obj define, the actions realeted to each 
//th>table header and td

export const tableDetail = {
    entity: 'equitydeposit',
    dest: 'equitydeposit',

    //action for body 
    //left click, directly to the fullcont 
    tdDataDetail:`data-detail='{ "click": [ {"dest":"ripple" },
                                            {"dest":"equitydeposit", "elem":"fullcont", "id":"equitydeposit-fullcont", 
                                              "act":"selectOne", "entity":"equitydeposit", "dbid": "#dbid"}  ],
                                
                                 "clickRight": [{ "dest":"equitydeposit", "elem":"dt", "act":"trMenu", 
                                                  "id":"trMenu",  "entity":"equitydeposit", 
                                                   "dbid": "#dbid"  } ]  }'`, //"username": "#username"

    filter: {
        mainFilterFields : ["equitydeposit.code","equitydeposit.date"],
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
        newData.push({   id: 'nothing', colum: [{ label:'No Reulsts', span: '---' },
                                                { label:'', span: '' },
                                                { label:'', span: '' },] })
        return newData
    }





    data.forEach((elem)=>{
        newData.push(
                {   id: elem.id,   colum: [  { label: elem.userName, span:elem.code, style:{ 
                                                tdClass:'tdWithAvatar',  
                                                avatar:elem.userAvatar, 
                                                
                                              }},
                                             { label: elem.accountName, span:elem.equitydepositDate, style:{ 
                                                tdClass:'tdWithAvatar',  
                                                avatar:elem.accountAvatar, 
                                                
                                              } },
                                             { label: elem.equitydepositAmount, span:elem.reference_number},
                                           ]    
                }
        )/*push*/
    })/*forEach*/

    return newData
}/*organizeRow*/


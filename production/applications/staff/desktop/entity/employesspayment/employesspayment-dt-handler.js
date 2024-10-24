
/****************ELEMENTS*****************/
//this obj define, the actions realeted to each 
//th>table header and td

export const tableDetail = {
    entity: 'employesspayment',
    dest: 'employesspayment',

    //action for body 
    //left click, directly to the fullcont 
    tdDataDetail:`data-detail='{ "click": [ {"dest":"ripple" },
                                            {"dest":"employesspayment", "elem":"fullcont", "id":"employesspayment-fullcont", 
                                              "act":"selectOne", "entity":"employesspayment", "dbid": "#dbid"}  ],
                                
                                 "clickRight": [{ "dest":"employesspayment", "elem":"dt", "act":"trMenu", 
                                                  "id":"trMenu",  "entity":"employesspayment", 
                                                   "dbid": "#dbid"  } ]  }'`, //"username": "#username"

    filter: {
        mainFilterFields : ["employesspayment.code", "employesspayment.employee"],
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
                {   id: elem.id,   colum: [  { label: elem.userName, span:elem.code,
            style:{ 
                                                tdClass:'tdWithAvatar',  
                                                avatar:elem.userAvatar, 
                                                
                                              }},
                                             { label: elem.accountName, span:elem.employesspaymentDate, style:{ 
                                                tdClass:'tdWithAvatar',  
                                                avatar:elem.accountAvatar, 
                                                
                                              } },
                                             { label: elem.employesspaymentAmount, span:elem.reference_number},
                                           ]    
                }
        )/*push*/
    })/*forEach*/

    return newData
}/*organizeRow*/


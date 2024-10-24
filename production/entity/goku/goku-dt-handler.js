
/****************ELEMENTS*****************/
//this obj define, the actions realeted to each 
//th>table header and td

export const tableDetail = {
    entity: 'goku',//name table on the db
    dest: 'goku',//name of the entity on the system

    //action for body 
    //left click, directly to the fullcont 
    tdDataDetail:`data-detail='{ "click": [ {"dest":"ripple" },
                                            {"dest":"goku", "elem":"fullcont", "id":"goku-fullcont", "act":"selectOne", "entity":"goku", "dbid": "#dbid"}  ],
                                
                                 "clickRight": [{"dest":"goku", "elem":"dt", "act":"trMenu", "id":"trMenu",  "entity":"goku", "dbid": "#dbid" } ]  }'`,

    filter: {
        mainFilterFields : ["name", "last_name"],
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
        newData.push({   id: 'nothing', colum: [{ label:'No Reulsts', span: '' },
                                                { label:'', span: '' } ] })
        return newData
    }

    data.forEach((elem)=>{
        newData.push(
                {   id: elem.id,   colum: [  { label: elem.name,      span: elem.last_name },
                                             { label: elem.id,        span: elem.ssn       } ]    
                }
        )/*push*/
    })/*forEach*/

    return newData
}/*organizeRow*/


/*
{
    "id": "11",
    "department": "[{\"id\": \"25\", \"displayText\": \"TEST\"}]",
    "admission_date": "2022-06-01",
    "termination_date": "2003-03-03",
    "status": "Active",
    "max_hours": 100,
    "classification_level": "CL1",
    "TAL": "TAL1",
    "Proxy": "P1",
    "sendEvv": "true",
    "memberId": "101010",
    "is24hr": "",
    "patient_agrmt_hourly_payrate": "32.50",
    "rhio_consent": "",
    "rhio_consent_date": "2022-06-01",
    "privateCase": "true",
    "managed_care_plan": "MCP1",
    "N_procedureCode": "PC1",
    "N_providerRateCode": "PRC1",
    "N_procedureModCode": "PMC1",
    "insurance_contact": "IC1",
    "health_insurance_company": "HIP1",
    "notes": "1111"
}

*/
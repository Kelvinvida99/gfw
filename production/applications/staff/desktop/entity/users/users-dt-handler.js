/****************ELEMENTS*****************/
//this obj define, the actions realeted to each 
//th>table header and td
const dtUpdate = require ('./users-dt-update')

export const tableDetail = {
    entity: 'users',
    dest: 'users',

    //action for body 
    //left click, directly to the fullcont 
    tdDataDetail:`data-detail='{ "click": [ {"dest":"ripple" },
                                            {"dest":"users", "elem":"fullcont", "id":"users-fullcont", 
                                              "act":"selectOne", "entity":"users", "dbid": "#dbid"}  ],
                                
                                 "clickRight": [{ "dest":"users", "elem":"dt", "act":"trMenu", 
                                                  "id":"trMenu",  "entity":"users", 
                                                   "dbid": "#dbid"  } ]  }'`, //"username": "#username"

    filter: {
        mainFilterFields : ["__name", "last_name", "users.username"],
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
                                                { label:'No Reulsts', span: '---' } ] })
        return newData
    }

    data.forEach((elem)=>{

        const statusStyle  = dtUpdate.getstatusStyle(elem)   
        
        if(!elem.hasOwnProperty('sex')){
            elem.sex = "NA";
        }

        newData.push(
                {   id: elem.id, sex: elem.sex,  // username:elem.username,
                     colum: [  { 
                           label: elem.__name, span: elem.last_name,
                            style:{ 
                                tdClass:'td-bluex tdWithAvatar',  
                                avatar:elem.avatar,                         
                            } 
                                 },
                                 { label: elem.username,  span: elem.phone        },    
                                 { label: elem.type,  span: elem.entities        },   
                                 { label: elem.phone,  span: elem.email        }, 
                                 
                                 {  label: statusStyle.title,  
                                    span: statusStyle.des,      
                                    style:{ 
                                         tdClass:`tdWithIcon ${statusStyle.color}`,  
                                         svg:`./css/applications/nurse/svg-nurse.svg#${statusStyle.svg}`,
                                     } 
                                 }  ]    
                }
        )/*push*/
    })/*forEach*/

    return newData
}/*organizeRow*/
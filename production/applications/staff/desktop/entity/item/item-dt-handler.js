
/****************ELEMENTS*****************/
//this obj define, the actions realeted to each 
//th>table header and td

const dtUpdate = require ('./item-dt-update')

export const tableDetail = {
    entity: 'item',//name table on the db
    dest: 'item',//name of the entity on the system

    //action for body 
    //left click, directly to the fullcont 
    tdDataDetail:`data-detail='{ "click": [ {"dest":"ripple" },
                                            {"dest":"item", "elem":"fullcont", "id":"item-fullcont", "act":"selectOne", "entity":"item", "dbid": "#dbid"}  ],
                                
                                 "clickRight": [{"dest":"item", "elem":"dt", "act":"trMenu", "id":"trMenu",  "entity":"item", "dbid": "#dbid" } ]  }'`,

    filter: {
        mainFilterFields : ["item.code","name","brand", "origin_country"],
        mainFilterValues : ["", ""],         
        andFilterFields  : [""],
        andFilterValues  : [""],  
    }

}



/****************ELEMENTS*****************/



//each element could organize their data diferent
export function organizeRow(data){ 
    console.log('organizeRow>')

    var newData = []

    if(data.length === 0){
        newData.push({   id: 'nothing', colum: [{ label:'No Result', span: '' },
                                                { label:'', span: '' },
                                                { label:'', span: '' } ]})
        return newData
    }

    data.forEach((elem)=>{
        const  timeSensitiveStyle  = dtUpdate.getTimeSensitiveStyle(elem)
        const  getTimeTemperatureStyle  = dtUpdate.getTimeSensitiveStyle(elem)

        newData.push(
                {   id: elem.id,   colum: [  { label: elem.name,      span: elem.code,  style:{ 
                                                tdClass:'tdWithAvatar',  
                                                avatar:elem.avatar, 
                                                
                                              }                                                     },
                                              { label: elem.brand,   span: elem.origin_country       }
                                              //  ,{ label: elem.shelf_life_check,  span: elem.shelf_life + ' Days', 
                                              //     style:{ 
                                              //         tdClass:`tdWithIcon ${timeSensitiveStyle.color}`,  
                                              //         svg:`./css/svg.svg#${timeSensitiveStyle.svg}`,
                                              //     } },    
                                              //  { label: elem.temperature_check,     span: elem.temperature,
                                              //  style:{ 
                                              //     tdClass:`tdWithIcon ${getTimeTemperatureStyle.color}`,  
                                              //     svg:`./css/svg.svg#${getTimeTemperatureStyle.svg}`,
                                              // }                }
                                               
                                        ]    
                }
        )/*push*/
    })/*forEach*/

    return newData
}/*organizeRow*/
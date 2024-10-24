
/****************ELEMENTS*****************/
//this obj define, the actions realeted to each 
//th>table header and td

const dtUpdate = require ('./inventory-dt-update')
const timeDate = require ('../../../../../js-handler/time-date')



export const tableDetail = {
    entity: 'inventory',//name table on the db
    dest: 'inventory',//name of the entity on the system

    //action for body 
    //left click, directly to the fullcont 
    tdDataDetail:`data-detail='{ "click": [ {"dest":"ripple" },
                                            {"dest":"inventory", "elem":"dt", "id":"inventory-page", "act":"snackAction"} ],
                                
                                 "clickRight": [{"dest":"inventory", "elem":"dt", "act":"trMenu", "id":"trMenu",  "entity":"inventory", "dbid": "#dbid" } ]  }'`,

    filter: {
        mainFilterFields : ["inventory.item_name","inventory.item_code","inventory.code"],
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
        newData.push({   id: 'nothing', colum: [{ label:'No Results', span: ''},
                                                { label:'', span: '' }, 
                                                { label:'', span: '' },
                                                { label:'', span: '' },
                                                { label:'', span: '' },
                                                { label:'', span: '' }] })
        return newData
    }

    data.forEach((elem)=>{


        const  shelflifestyle  = dtUpdate.getshelflifestyle(elem)  


        newData.push(
            {   id: elem.id,   colum: [  { label: elem.item_name, span: elem.brand,
                                            style:{ 
                                                tdClass:'tdWithAvatar',  
                                                avatar:elem.avatar, 
                                                
                                            } }, 
                                         { label: elem.code, span: elem.provider_name,  
                                            style:{ 
                                            tdClass:'tdWithAvatar',  
                                            avatar:elem.provider_avatar, 
                                            
                                            }},
                                         { label: elem.available, span: elem.item_unit_name},
                                         { label: elem.unit_price, span: elem.avg_sold_price},
                                         { label: timeDate.friendlyDate(elem.delivered_date) == "No Day" ? "Not Delivered Yet" : timeDate.friendlyDate(elem.delivered_date)
                                          , span: timeDate.friendlyDate(elem.purchase_date)},        
                                         { label: shelflifestyle.alert, span: shelflifestyle.descr,
                                            style:{ 
                                                tdClass:`tdWithIcon ${shelflifestyle.icon.color}`,  
                                                svg:`./css/applications/nurse/svg-nurse.svg#${shelflifestyle.icon.svg}`,
                                            }} ]    
            }
        )/*push*/
    })/*forEach*/

    return newData
}/*organizeRow*/
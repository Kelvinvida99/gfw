/****************ELEMENTS*****************/
//this obj define, the actions realeted to each 
//th>table header and td

const timeDate = require ('../../../../../js-handler/time-date')

export const tableDetail = {
    entity: 'transaction',//name table on the db
    dest: 'transaction',//name of the entity on the system

    //action for body 
    //left click, directly to the fullcont 
    tdDataDetail:`data-detail='{ "click": [ {"dest":"ripple" } ],
                                
                                 "clickRight": [{"dest":"transaction", "elem":"dt", "act":"trMenu", "id":"trMenu",  "entity":"transaction", "dbid": "#dbid" } ]  }'`,

    filter: {
        mainFilterFields : ["transaction.entity","transaction.account"],
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
                                                { label:'', span: '' }] })
        return newData
    }

    data.forEach((elem)=>{

        let textType;
        let benefitAvatar;

        if (elem.customer_id == '') {
            benefitAvatar = elem.providerAvatar
        }else if(elem.provider_id == ''){
            benefitAvatar = elem.customerAvatar
        }else{
            console.log('no avatar')
        }

        switch (elem.action) {
            case 'out':
              textType = 'Sent';
              break;

            case 'in':
              textType = 'Received';
              break;

            default:
              break;
        } 

        newData.push(
            {   id: elem.id,   colum: [  { label: elem.entity,  }, 
                                         { label: elem.accountName  , span: elem.typeUser,  
                                            style:{ 
                                            tdClass:'tdWithAvatar',  
                                            avatar:elem.accountAvatar, 
                                            
                                            }
                                         },
                                         { label: textType, span:'',style:{ 
                                            tdClass:'tdWithAvatar',  
                                            avatar:benefitAvatar, 
                                            
                                            }
                                        },
                                         { label: elem.transactionAmount, span: timeDate.friendlyTime(elem.date_time)},
                                         { label: timeDate.friendlyDate(elem.date) , span: timeDate.friendlyTime(elem.date_time)}
                                      ]    
            }
        )/*push*/
    })/*forEach*/

    return newData
}/*organizeRow*/
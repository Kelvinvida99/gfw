

const dialog       = require ('../../components/dialog/dialog')
const fullcont     = require('./fullcont')
const snack        = require ('../../components/snack/snack')
const customerfullcont         = require('../../applications/staff/desktop/entity/customer/customer-fullcont')
const providerfullcont         = require('../../applications/staff/desktop/entity/provider/provider-fullcont')
const accountsfullcont         = require('../../applications/staff/desktop/entity/accounts/accounts-fullcont')
const areasfullcont            = require('../../applications/staff/desktop/entity/areas/areas-fullcont')
const investorfullcont         = require('../../applications/staff/desktop/entity/investor/investor-fullcont')
const investordepositfullcont  = require('../../applications/staff/desktop/entity/investordeposit/investordeposit-fullcont')
const itemfullcont             = require('../../applications/staff/desktop/entity/item/item-fullcont')
const item_unitfullcont        = require('../../applications/staff/desktop/entity/item_unit/item_unit-fullcont')
const otherexpensefullcont     = require('../../applications/staff/desktop/entity/otherexpense/otherexpense-fullcont')
const purchasefullcont         = require('../../applications/staff/desktop/entity/purchase/purchase-fullcont')
const receivepaymentfullcont   = require('../../applications/staff/desktop/entity/receivepayment/receivepayment-fullcont')
const salefullcont             = require('../../applications/staff/desktop/entity/sale/sale-fullcont')
const sentpaymentfullcont      = require('../../applications/staff/desktop/entity/sentpayment/sentpayment-fullcont')
const shipperfullcont          = require('../../applications/staff/desktop/entity/shipper/shipper-fullcont')
const usersfullcont            = require('../../applications/staff/desktop/entity/users/users-fullcont')
const companyfullcont          = require('../../applications/staff/desktop/entity/company/company-fullcont')
const employesspaymentfullcont = require('../../applications/staff/desktop/entity/employesspayment/employesspayment-fullcont')
const equitydepositfullcont = require('../../applications/staff/desktop/entity/equitydeposit/equitydeposit-fullcont')


//C:\xampp\htdocs\GosiveFW\production\applications\staff\desktop\entity\services


export function findDest (detail) { //console.log('dt-web-scocket>', detail)

    switch (detail.dest){

        case 'customer':         customerfullcont.start({      dest: detail.dest, entity: detail.entity, act:'selectOne', id: 'customer-fullcont',     dbid: detail.id  });                 break;
        case 'provider':         providerfullcont.start({      dest: detail.dest, entity: detail.entity, act:'selectOne', id: 'provider-fullcont',     dbid: detail.id  });                 break;
        case 'accounts':         accountsfullcont.start({      dest: detail.dest, entity: detail.entity, act:'selectOne', id: 'accounts-fullcont',     dbid: detail.id  });                 break;
        case 'areas':            areasfullcont.start({      dest: detail.dest, entity: detail.entity, act:'selectOne', id: 'areas-fullcont',     dbid: detail.id  });                       break;
        case 'investor':         investorfullcont.start({      dest: detail.dest, entity: detail.entity, act:'selectOne', id: 'investor-fullcont',     dbid: detail.id  });                 break;
        case 'investordeposit':  investordepositfullcont.start({      dest: detail.dest, entity: detail.entity, act:'selectOne', id: 'investordeposit-fullcont',     dbid: detail.id  });   break;
        case 'item':             itemfullcont.start({      dest: detail.dest, entity: detail.entity, act:'selectOne', id: 'item-fullcont',     dbid: detail.id  });                         break;
        case 'item_unit':        item_unitfullcont.start({      dest: detail.dest, entity: detail.entity, act:'selectOne', id: 'item_unit-fullcont',     dbid: detail.id  });               break;
        case 'otherexpense':     otherexpensefullcont.start({      dest: detail.dest, entity: detail.entity, act:'selectOne', id: 'otherexpense-fullcont',     dbid: detail.id  });         break;
        case 'purchase':         purchasefullcont.start({      dest: detail.dest, entity: detail.entity, act:'selectOne', id: 'purchase-fullcont',     dbid: detail.id  });                 break;
        case 'receivepayment':   receivepaymentfullcont.start({      dest: detail.dest, entity: detail.entity, act:'selectOne', id: 'receivepayment-fullcont',     dbid: detail.id  });     break;
        case 'sale':             salefullcont.start({      dest: detail.dest, entity: detail.entity, act:'selectOne', id: 'sale-fullcont',     dbid: detail.id  });                         break;
        case 'sentpayment':      sentpaymentfullcont.start({      dest: detail.dest, entity: detail.entity, act:'selectOne', id: 'sentpayment-fullcont',     dbid: detail.id  });           break;
        case 'shipper':          shipperfullcont.start({      dest: detail.dest, entity: detail.entity, act:'selectOne', id: 'shipper-fullcont',     dbid: detail.id  });                   break;
        case 'users':            usersfullcont.start({      dest: detail.dest, entity: detail.entity, act:'selectOne', id: 'users-fullcont',     dbid: detail.id  });                       break;
        case 'company':          companyfullcont.start({      dest: detail.dest, entity: detail.entity, act:'selectOne', id: 'company-fullcont',     dbid: detail.id  });                   break;
        case 'employesspayment': employesspaymentfullcont.start({      dest: detail.dest, entity: detail.entity, act:'selectOne', id: 'employesspayment-fullcont',     dbid: detail.id  }); break;
        case 'equitydeposit':    equitydepositfullcont.start({      dest: detail.dest, entity: detail.entity, act:'selectOne', id: 'equitydeposit-fullcont',     dbid: detail.id  });       break;
    }
} 




//if an element has been updated while the fullcont is opened
//if the fullcont is opened on edit mode, alert to the user
export function control(detail){ //console.log('fullcont WS control>', detail)

    //verify if the fullcont has been init
    //if not, just ignore
    const fullcontHTML = document.getElementById(`${detail.dest}-fullcont`)
    if( fullcontHTML === null ||  fullcontHTML === undefined ){ return  }


console.log('fullcont WS control>', fullcontHTML.classList.contains('dn') )


    ///if not visible, just ignore
    if( fullcontHTML.classList.contains('fullcont-show') ){ 

        ///get the dbid to know what is the entity that is being edited
        const dbid =  fullcontHTML.getAttribute('data-dbid') 


        if( dbid === detail.id ){ 
            update(detail, fullcontHTML)
        }  

    }


 

}/**/

//Here we kows that the the fullcont open, and was edited for another person
//we have to take an action
export function update( detail, fullcontHTML ){ console.log('fullcont WS update>', detail)

    //mode-view, just notify the user from a snack labe, and update the information on the fullcont
    if( fullcontHTML.classList.contains('mode-view') ){ //console.log( 'TAKE MODE VIEWWWWW'  )
        findDest (detail)
        snack.start( { act:"show", id:"entityUpdate"  } )
        return
    }


    //mode-edit, notify the user that an change has been generate at the same time that he is editing
    //the user decide if get the changes or ignore by a dialog box
    if( fullcontHTML.classList.contains('mode-edit') ){ 
        
      //  console.log( 'TAKE MODE EDITTTTTTTTT'  )
        dialog.start({ act:"show", id:"entityUpdated", dest:detail.dest,  entity: detail.entity, dbid: detail.id, } )
        return
    }

}/**/

//control if an entity was deleted and the fullcont is open
export function forDeleted(detail){ //console.log('forDeleted', detail)

    const fullcontHTML = document.getElementById(`${detail.dest}-fullcont`)

    //if the fullcont don't exits
    if( fullcontHTML === null ||  fullcontHTML === undefined ){ return  }

    ///just if the fullcont is visible
    if( fullcontHTML.classList.contains('fullcont-show') ){ 

        ///get the dbid to know what is the entity that is being edited
        const dbid =  parseInt( fullcontHTML.getAttribute('data-dbid') ) 

        detail.dbid.forEach((id)=>{
            if(id === dbid ){ 
                dialog.start({ act:"show", id:"entityDeleted", entity:detail.entity} )
            }
        })

    }/**/

}/**/
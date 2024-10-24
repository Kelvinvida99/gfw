
const monitorDB        = require('./monitor-db')
const monitorMenu      = require('./monitor-menu')
const monitorTab       = require('./monitor-tab')
const monitorActivity  = require('./monitor-activity')
const monitorCommand   = require('./monitor-command')
const generator        = require('./monitor-generator')
const page             = require('../page/page')
const companies        = require('./monitor-companies')
const monitorHandler   = require('./monitor-handler')

//data
import monitorPage       from "./monitor-page.html";


export function start(detail){   
  
    //if the page isn't loaded, the using didn't click the page leftmenu
    //we can ignore all the monitoring activity  
    if(!wasHTMLinit) { 
        if(detail.elem === 'page' ){
            initHTML(detail) 
        }    
    }

    if(!wasHTMLinit){ return  }

    console.log('monitor>', detail)

	switch (detail.elem){
        case 'activityUpdates':  monitorActivity.activityUpdates(detail.user.data);  break;
        case 'joinAdminReplay':  monitorActivity.joinAdminReplay(detail);            break;
        case 'leftOne':          monitorActivity.leftOne(detail.user);               break;
        case 'menu':             monitorMenu.start(detail);                          break;
        case 'oneJoin':          monitorActivity.lineUpdate(detail.user);            break;
        case 'page':             page.start(detail);                                 break;
        case 'sendBefore':       monitorCommand.sendBefore(detail);                  break;
        case 'tab':              monitorTab.start(detail);                           break;
	}
}
 


var wasHTMLinit    = false

function initHTML(detail){  //console.log('Monitor initHTML>')
    
    wasHTMLinit = true
   
    //insert the page  on the body
    const body = document.body  
    body.insertAdjacentHTML("beforeend", monitorPage)

    //show the page
    page.start(detail)

    //make a dbREquest to get all companies    
    monitorDB.load(detail, (data)=>{  //console.log('data>', data)

        //generate all the companies and all the users in the companie
        data.forEach((company) => { 
            generator.company(company)
            generator.line(company)
        })

        //get all the html, for all the components companies
        companies.HTMLselect(data)

        //start the timer, for keep time activity fresh
        monitorActivity.lastupdateTimer()

        monitorHandler.joinAdmin()

    })/**/
    
}/**/


function cancelEvaluation(){

}














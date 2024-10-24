

const handler       = require('./monitor-command-handler')
const monitorDialog = require('./monitor-dialog')
const websocket     = require('../../js-network/web-socket')


export function receiver (detail) { //console.log('command receiver>', detail)

    switch (detail.data.command){
        case 'restart':           monitorDialog.start({ "elem":"dialog", "id":"restart", "act":"show"});  break;
        case 'logOthersOut':      location.reload();                                                      break;
        case 'unlockOrLockUsers': location.reload();  
    }
} 


export function sendBefore (detail) { console.log('command sendBefore>', detail)

    switch (detail.command){
        case 'restart':           sender(detail);            
                                  break;

        case 'logOthersOut':      handler.logOthersOut(detail);
                                  sender(detail);            
                                  break;

        case 'unlockOrLockUsers': handler.unlockOrLockUsers(detail);
                                  sender(detail);
                                  break;
    }
} 



//all user element, only handle commands
//commands are actions sent to only one person
function sender (detail) { 

      websocket.send({
            act: 'command', 
            data: { 
                command: detail.command,
                company: detail.company,
                id:      detail.id,
                result:  detail.result
            }  
      })
}/**/



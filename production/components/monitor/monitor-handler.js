
const websocket    = require('../../js-network/web-socket')
const settings     = require('../../js-handler/settings')



/*
if the user is an admin > sedn the joinAdmin, 
to get all the users connected
wait until ws is connedted
 */
export function joinAdmin(){  ///console.log(`joinAdmin EXTERNAL`, ); 

    const data = settings.getDataWs()

    if( data.right === 'admin' || data.right === 'adminGosive' ){ 

        var timer = setInterval(()=>{    
           
           if( websocket.ws != undefined){
                //25/10/2023 marco molina
                //if( websocket.ws.readystate === 1 ){ 
                if( websocket.ws.connected == true ){ 
               
                    websocket.send({  act: "joinAdmin", data: data  })
                    clearInterval(timer)
               }            
           }/*if*/

       }, 1000)/*setInterval*/

    }/*if*/
}/**/
















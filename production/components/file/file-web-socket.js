const websocket            = require ('../../js-network/web-socket')
const getFile            = require ('./file-server-getFiles')
const getDeletedFile            = require ('./file-server-getDeletedFile')


export function start( detail ){ ///console.log('FILE WEBSOCKETWWWWWWWWW', detail         )
   
   // console.log('FILE WEBSOCKETWWWWWWWWW', detail.entity  )
    
     const fullcontHtml = document.getElementById(`${detail.entity}-fullcont`)
     const id           =  fullcontHtml.getAttribute('data-dbid')
     const visible      =  fullcontHtml.classList.contains('fullcont-show')

     console.log('FILE fullcontHtml', `${detail.entity}-fullcont` , fullcontHtml  )

     //return if the fullcont don't exit
     if(fullcontHtml === null){ return }

    // console.log('FILE fullcontHtml after', fullcontHtml.getAttribute('data-dbid'), visible  )
    if(fullcontHtml.getAttribute('data-dbid') === detail.id && visible){

        //IF TRASH IS VISIBLE
        if(fullcontHtml.querySelector(".filePage").classList.contains("filePage-view-trash")){//IF TRASH IS VISIBLE
               // alert();
            getDeletedFile.start(detail);
        
        }

        detail.currentPath = fullcontHtml.dataset.currentPath; 
        getFile.start(detail);
        //send the fullcontHtml. to don't make the selection again
    }



}/**/

export function fileWebsocket(detail){ //console.log('File Websocket>>>>>')

        const sendDetail = { to:'allStaff', from:'staffDesktop', id:'' }
        // websocket.entityUpdate("entityUpdate", 'addRow', result, sendDetail)   

		websocket.entityUpdate("entityUpdate", 'fileUpdate', {entity:detail.entity, id:detail.id}, sendDetail )  

}




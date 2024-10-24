const dtGenerator         = require('../dt/dt-generator')
const fullcontWebSocket   = require('../fullcont/fullcont-web-socket')
const dtWSHandler         = require('./dt-web-socket-handler')
const fileWebsocket       = require('../file/file-web-socket')


//const clockWebSocket      = require('../../applications/nurse/entity/clocknurse/clock-web-socket')



export function receiver (detail) { //console.log('dt-web-scocket>', detail)

    switch (detail.act){
        case 'addRow':        addRow(detail);     break;
        case 'updateRow':     updateRow(detail);  break;
        case 'deleteRow':     deleteRow(detail);  break;
		case 'fileUpdate':    fileWebsocket.start(detail.row[0]);  break;
    }
} 




function addRow(detail){ // console.log('addRow>', detail)
	
	//if the dt exist,  
	if( !dtExist(detail.row[0]) ){ return }

	dtWSHandler.start(detail)

}/*addRow*/

//update tr, if it exist
function updateRow(detail){ // console.log('updateRow UPDATE ROWWWWWWWWWWWWWW>', detail)

	//if the tr don't exist, ignore update
	if( !trExist(detail.row[0]) ){ return }

	dtWSHandler.start(detail)

	fullcontWebSocket.control( detail.row[0] )
			
}/*addRow*/



function deleteRow(detail){ // console.log('deleteRow >')

	//this function control if the element exist or not
	dtGenerator.deleteRow( detail.row[0] )
	
	fullcontWebSocket.forDeleted( detail.row[0] )
}/*deleteRow*/



//stop the update if the tr element don't exist
function trExist(elem){ //console.log('stopUpdate>')

	const elemHtml = document.getElementById(`${elem.dest}-tableRow-${elem.id}`)

	if( elemHtml === null ||  elemHtml === undefined ){ return false }

	return true
}



//stop the update if the tr element don't exist
function dtExist(elem){ //console.log('stopUpdate>')

	const elemHtml = document.getElementById(`${elem.dest}-dt`)

	if( elemHtml === null ||  elemHtml === undefined ){ return false }

	return true
}
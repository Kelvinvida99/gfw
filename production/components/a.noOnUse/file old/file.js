
const {changeSVG} = require('../../js-handler/graphic')
const getFile = require('./file-server-getFiles') //YEISON U
const viewFile = require('./file-server-view') //YEISON U
const uploadFile = require('./file-server-upload') //YEISON U
const deleteFile = require('./file-server-deleteFiles') //YEISON U
const renameFile = require('./file-server-renameFile') //YEISON U 
const getDeletedFile = require('./file-server-getDeletedFile') //YEISON U 
const restoreFile = require('./file-server-restoreFile') //YEISON U 
const deletePermanentFile = require('./file-server-permanentDelete') //YEISON U 
const deleteFileDialog = require('./file-dialog') //YEISON U 
//const fileSnack = require('./file-snack')  


var fileFull      
var scrimFile 
var HTMLwasSelected = false

const scrimClass  = ["scrim", "scrim-show"]

function HTMLselect(){ //console.log('HTMLselect')

    fileFull       = document.getElementById('file_full')
    scrimFile      = document.getElementById('scrim_file')

	HTMLwasSelected  = true

}
/*
entidad > elementos > actiones
		  file      > actiones
		  dialog    > actiones

file > actiones > 

*/


export function start(detail){ console.log('file start >', detail)

	if(!HTMLwasSelected) {HTMLselect()}

    switch (detail.act){
        case 'checking':       checking(detail);               break; 
        case 'checkingCancel': checkingCancel(detail);               break; 

        case 'view':           view(detail);               break; 

        case 'open':           open(detail);               break; 
        case 'hideFull':       hideFull(detail);               break; 
		///case 'listFile':       getFiles.listFile(detail);               break; //YEISON U
		case 'getPathFile':       getFile.start(detail);               break; //YEISON U
		case 'goBack':       getFile.goBack(detail);               break; //YEISON U
		case 'multiDownload':       getFile.multiDownload(detail);               break; //YEISON U
		case 'triggerFileUpload':       uploadFile.triggerFileUpload(detail.formId);               break; //YEISON U 
		case 'triggerSubmit':       uploadFile.triggerSubmit(detail);               break; //YEISON U 
		case 'submittingFile':       uploadFile.submittingFile(detail);               break; //YEISON U submittingFile
		case 'newFolder':       uploadFile.newFolder(detail);               break; //YEISON U submittingFile
		case 'openNewFolderDialog':       uploadFile.openNewFolderDialog(detail);               break; //YEISON U submittingFile
		case 'deleteFile':       deleteFile.start(detail);               break; //YEISON U submittingFile
		case 'openRenameDialog':       renameFile.openRenameDialog(detail);               break; //YEISON U submittingFile
		case 'renameFile':       renameFile.start(detail);               break; //YEISON U submittingFile
		case 'viewFile':       viewFile.start(detail);               break; //YEISON U submitting 
		case 'resizeFileView':       viewFile.resizeFileView(detail);               break; //YEISON U submitting 
		case 'changeSrc':       viewFile.changeSrc(detail);               break; //YEISON U submittingFile
		case 'deleteFileFromView':       viewFile.deleteFileFromView(detail);               break; //YEISON U submittingFile
		case 'downloadFileFromView':       viewFile.downloadFileFromView(detail);               break; //YEISON U submittingFile
		case 'getDeletedFile':       getDeletedFile.start(detail);               break; //YEISON U submittingFile
		case 'deletePermanentFile':       deletePermanentFile.start(detail);               break; //YEISON U submittingFile 
		case 'restoreFile':       restoreFile.start(detail);               break; 
		case 'deleteFileDialog':       deleteFileDialog.start(detail);               break; 
		case 'hideRenameDialog':       renameFile.hideRenameDialog(detail);               break; 
		case 'hideNewFolder':       uploadFile.hideNewFolder(detail);               break; //YEISON U submittingFile
    }

}

//handler > file-handler

function hideFull(detail){ console.log('file hideFull >')
	
	fileFull.classList.remove('file-full-show')
	scrimFile.classList.remove('scrim-show')
}


function checking(detail){ console.log('file checking >')
	
	const elem  = detail.ev.target
	const cont  = elem.closest('.cont')
	const file  = elem.closest('.file')
	const body  = elem.closest('.body')
	const conts = body.querySelectorAll('.cont')

	cont.classList.toggle('cont-checked')

	//console.log(conts)
	var areSelecting = false

	conts.forEach((elem)=>{
		if( elem.classList.contains('cont-checked') ){ areSelecting = true }
	})

	if(areSelecting){
		file.classList.add('file-selecting')
	}else{
		file.classList.remove('file-selecting')
	}
	
	//console.log('areSelecting', areSelecting)


}

function checkingCancel(detail){
	
	const elem = detail.ev.target
	const file = elem.closest('.file')
	const body = file.querySelector('.body')

	console.log('body', body)

	
	const conts = body.querySelectorAll('.cont')

	conts.forEach((elem)=>{
		elem.classList.remove('cont-checked')
	})


	file.classList.remove('file-selecting')


}


function open(detail){ console.log('file open >')
	const elem = detail.ev.target
	const cont = elem.closest('.cont')

	fileFull.classList.add('file-full-show')

  	//show the scrim
  	scrimFile.classList.add(...scrimClass)

    //for remove the url when user click the scrim
     scrimFile.setAttribute('data-detail', '{"click": [  {"dest":"file", "act":"hideFull"}  ] }')


}


function view(detail){ console.log('view open >')
	
	const elem = detail.ev.target
	const cont = elem.closest('.file')

	if( cont.classList.contains('file-list-view') ){
		cont.classList.remove('file-list-view')
	    //chage icon to save
	    changeSVG(elem, 'list') 
	}else{
		cont.classList.add('file-list-view')
		changeSVG(elem, 'grid') 

	}
}


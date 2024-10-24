
const avatarUpload        = require('./file-server-avatarUpload') //yeison U
const deleteFile          = require('./file-server-deleteFiles') //yeison U
const deleteFileDialog    = require('./file-dialog') //yeison U
const deletePermanentFile = require('./file-server-permanentDelete') //yeison U
const getDeletedFile      = require('./file-server-getDeletedFile') //yeison U
const getFile             = require('./file-server-getFiles') //yeison U
const renameFile          = require('./file-server-renameFile') //yeison U
const restoreFile         = require('./file-server-restoreFile') //yeison U
const uploadFile          = require('./file-server-upload') //yeison U
const uploadFileDrag      = require('./file-server-uploadDrag') //andry U
const userAvatarUpload    = require('./file-server-userAvatarUpload') //yeison U
const entityAvatarUpload  = require('./file-server-entityAvatarUpload') //yeison U
const viewFile            = require('./file-server-view') //yeison U
const viewAvatar          = require('./viewAvatar') //yeison U
const {changeSVG}         = require('../../js-handler/graphic')
//25/10/2023 marco molina
const backControl          = require('../../js/back-control')
//const fileSnack = require('./file-snack')  

var fileFull    
var scrimFile 
var scrim_file_newFolder 
var scrim_file_rename 

var HTMLwasSelected = false

const scrimClass  = ["scrim", "scrim-show"]

function HTMLselect(){ //console.log('HTMLselect')

  fileFull       		  = document.getElementById('file_full')
  scrimFile      		  = document.getElementById('scrim_file')
  scrim_file_newFolder  = document.getElementById('scrim_file_newFolder')
  scrim_file_rename     = document.getElementById('scrim_file_rename')
	HTMLwasSelected       = true

}

export function start(detail){ // console.log('file start >', detail.act)

	if(!HTMLwasSelected) {HTMLselect()}

    switch (detail.act){

		///case 'listFile':       getFiles.listFile(detail);               break; //yeison U
		case 'changeSrc'                        : viewFile.changeSrc(detail);                  break; //yeison U submittingFile
		case 'deleteFile'                       : deleteFile.start(detail);                    break; //yeison U submittingFile
		case 'deleteFileDialog'                 : deleteFileDialog.start(detail);              break;
		//case 'confirmDeleteFromView': deleteFileDialog.start(detail);              break; 
		case 'deleteAvatarDialog'               : deleteFileDialog.deleteAvatar(detail);             		 	break;
		case 'deleteFileFromView'               : viewFile.deleteFileFromView(detail);         					break; //yeison U submittingFile
		case 'deletePermanentFile'              : deletePermanentFile.start(detail);           					break; //yeison U submittingFile downloadAvatarFromView
		case 'downloadFileFromView'             : viewFile.downloadFileFromView(detail);       					break; //yeison U submittingFile
		case 'deleteAvatarFromView'             : viewAvatar.deleteAvatarFromView(detail);       				break; //yeison U submittingFile
		case 'downloadAvatarFromView'           : viewAvatar.downloadAvatarFromView(detail);       				break; //yeison U submittingFile
		case 'getDeletedFile'                   : getDeletedFile.start(detail);                					break; //yeison U submittingFile
		case 'getPathFile'                      : getFile.start(detail);                       					break; //yeison U
		case 'goBack'                           : getFile.goBack(detail);                      					break; //yeison U

		case 'renameFile'                       : renameFile.start(detail, scrim_file_rename);               	break; //yeison U submittingFile
		case 'newFolder'                        : uploadFile.newFolder(detail, scrim_file_newFolder);           break; //yeison U submittingFile
		case 'hideNewFolder'                    : uploadFile.hideNewFolder(detail, scrim_file_newFolder);       break; //yeison U submittingFile
		case 'hideRenameDialog'                 : renameFile.hideRenameDialog(detail, scrim_file_rename);       break;
		case 'openNewFolderDialog'              : uploadFile.openNewFolderDialog(detail, scrim_file_newFolder); break; //yeison U submittingFile
		case 'openRenameDialog'                 : renameFile.openRenameDialog(detail, scrim_file_rename);       break; //yeison U submittingFile

		case 'multiDownload'                    : getFile.multiDownload(detail);               break; //yeison

		case 'resizeFileView'                   : viewFile.resizeFileView(detail);             break; //yeison U submitting
		case 'resizeAvatarView'                 : viewAvatar.resizeAvatarView(detail);         break; //yeison U submitting
		case 'restoreFile'                      : restoreFile.start(detail);                   break;
		case 'submittingFile'                   : uploadFile.submittingFile(detail);           break; //yeison U submittingFile
		case 'triggerFileUpload'                : uploadFile.triggerFileUpload(detail.formId); break; //yeison U
		case 'triggerSubmit'                    : uploadFile.triggerSubmit(detail);            break; //yeison U
		case 'dropEvent'												: uploadFileDrag.dropEvent(detail);			   break;//andry
		case 'viewFile'                         : viewFile.start(detail);                      break; //yeison U submitting
		case 'viewAvatar'                       : viewAvatar.start(detail);                    break; //yeison U submitting
		case 'checking'                   			: checking(detail);                            break;
		case 'checkingCancel'             			: checkingCancel(detail);                      break;
		case 'hideFull'                   			: hideFull(detail);                            break;
		case 'hideAvatarFull'             			: viewAvatar.hideAvatarFull(detail);           break;
		case 'open'                       			: open(detail);                                break;
		case 'view'                       			: view(detail);                                break;
		case 'viewTrash'                        : viewTrash(detail);                           break;
				
		case 'triggerAvatarUpload'              : avatarUpload.triggerAvatarUpload(detail);    break;
		case 'triggerAvatarSubmit'        			: avatarUpload.triggerAvatarSubmit(detail);    break;

		case 'triggerUserAvatarUpload'          : userAvatarUpload.triggerAvatarUpload(detail);	break;
		case 'triggerUserAvatarSubmit'    			: userAvatarUpload.triggerAvatarSubmit(detail);	break;

		case 'triggerEntityAvatarUpload'        : entityAvatarUpload.triggerAvatarUpload(detail.formId);	break;
		case 'triggerEntityAvatarSubmit'  			: entityAvatarUpload.triggerAvatarSubmit(detail);	break;
  }
}

function checking(detail){ //console.log('file checking >')
	
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

	//console.log('body', body)
	const conts = body.querySelectorAll('.cont')

	conts.forEach((elem)=>{
		elem.classList.remove('cont-checked')
	})

	file.classList.remove('file-selecting')

}

function open(detail){ //console.log('file open >')
	
	const elem = detail.ev.target
	const cont = elem.closest('.cont')

	fileFull.classList.add('file-full-show')

  	//show the scrim
  	scrimFile.classList.add(...scrimClass)

    //for remove the url when user click the scrim
    scrimFile.setAttribute('data-detail', '{"click": [  {"dest":"file", "act":"hideFull"}  ] }')

}

function view(detail){ // console.log('view open >')
	
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

//handler > file-handler
function hideFull(detail){ //console.log('file hideFull >')
	
	fileFull.classList.add('file-full-hide')
	scrimFile.classList.remove('scrim-show')


	remove(() => {
		fileFull.classList.remove('file-full-show');
		fileFull.classList.remove('file-full-hide');
	})

    //25/10/2023 mm
	backControl.hashSub({ toHide:`file_full` })

}

function remove(callback){
  setTimeout(()=>{
    callback()
  }, 250)
}

function viewTrash(detail){ //console.log('viewTrash>')

	const elem     = detail.ev.target
	const filePage = elem.closest('.filePage')

	filePage.classList.toggle("filePage-view-trash")
}
const setting = require('../../js-handler/settings')
const deleteFileDB = require('./file-server-deleteFiles') //server U
const snack                = require ('./file-snack')







export function start(detail){

  if(!(detail.fileExt == "cont-img" || detail.fileExt == "cont-pdf")){
    detail.id = "general";
    detail.title = "View is not available due file format.";
    snack.start(detail);
    return;
  }

 const fullCont = document.querySelector("#"+detail.entity+"-fullcont");
 const fileFullViewDiv = document.querySelector('#file_full');
 const currentPath =  fullCont.dataset.currentPath;
 const companyID = setting.getData().companyID;  
 const link = "server/storage/"+companyID+"/entities/"+detail.entity+"/"+fullCont.dataset.dbid+"/uploaded_files/"+currentPath+"/"+detail.file; 
 fileFullViewDiv.dataset.path = "server/storage/"+companyID+"/entities/"+detail.entity+"/"+fullCont.dataset.dbid+"/uploaded_files/"+currentPath+"/";
 fileFullViewDiv.dataset.entity = detail.entity;
 fileFullViewDiv.dataset.contFiles = JSON.stringify(getContFile(detail.entity));
 fileFullViewDiv.querySelector('h1').innerHTML = detail.file;
 fileFullViewDiv.querySelector('iframe').src = link;
 open();
}





export function changeSrc(detail){ 

  const fileFullViewDiv = document.querySelector('#file_full');
  const files =  JSON.parse(fileFullViewDiv.dataset.contFiles);
  var pos = files.indexOf(fileFullViewDiv.querySelector('h1').innerHTML) + parseInt(detail.direction);  

  if(files.length == 0){
    hideFull();
    return;
  }
  else if(files.length == 1 && fileFullViewDiv.querySelector('h1').innerHTML == files[pos]){
    return;
  }

  if(pos == files.length){
    pos = 0;
  }
  else  if(pos == -1){
    pos = files.length - 1;
  }

  fileFullViewDiv.querySelector('h1').innerHTML = files[pos];
  fileFullViewDiv.querySelector('iframe').src =  fileFullViewDiv.dataset.path+files[pos];  

}


export function resizeFileView(detail){

    var iframe = document.querySelector('#file_full').querySelector('iframe');

    if(iframe.src == "") return;

    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    iframeDocument.querySelector('img').setAttribute("style","user-select: none; max-width: 99%; max-height: 780px;");  

}








export function getContFile(entity){
  var fileNames = [];

  document.querySelector('#'+entity+"-fullcont .file-regularFiles").querySelectorAll('.file .cont-img,.cont-pdf').forEach(function(fileContainer) { 
    fileNames.push(fileContainer.querySelector('.des label').textContent);
  });

  return fileNames;

}



export function deleteFileFromView(detail){
  
  const fileFullViewDiv = document.querySelector('#file_full');
  const fulcontId = fileFullViewDiv.dataset.entity+"-fullcont"; 

  detail.inf = {  entity:  fileFullViewDiv.dataset.entity, 
                  id: document.querySelector("#"+fulcontId).dataset.dbid, 
                  currentPath: document.querySelector("#"+fulcontId).dataset.currentPath, 
                  filesAndFolders: '["'+fileFullViewDiv.querySelector('h1').innerHTML+'"]'
                }; 

  detail.entity = fileFullViewDiv.dataset.entity;
  deleteFileDB.start2(detail).then((result)=>  {  
     fileFullViewDiv.dataset.contFiles = JSON.stringify(getContFile(fileFullViewDiv.dataset.entity));
     var detail = {direction : 1};
     changeSrc(detail);
  });

}


export function downloadFileFromView(detail){
  
  const fileFullViewDiv = document.querySelector('#file_full');
  var fileToDownload =  fileFullViewDiv.querySelector('h1').innerHTML; 
  var fullCont = document.querySelector("#"+fileFullViewDiv.dataset.entity+"-fullcont");
  const currentPath =  fullCont.dataset.currentPath;
  var link = "";
  const companyID = setting.getData().companyID;  
  link = "server/storage/"+companyID+"/entities/"+fileFullViewDiv.dataset.entity+"/"+fullCont.dataset.dbid+"/uploaded_files/"+currentPath+"/"+fileToDownload; 
  link = "<a class='clickMultiDownload' href='"+link+"' download='"+fileToDownload+"' >WEAAAAAAAA</a>";  

  document.querySelector('#multi_download_container').innerHTML = link; 

  document.querySelector('#multi_download_container').querySelectorAll('.clickMultiDownload').forEach(function(el) { 
    setTimeout(function wait(){
      el.click();
      c--;
      if(c == 0) {//hide snack loading
        setTimeout(function wait(){//REMOVE ALL LINKS
          document.querySelector('#multi_download_container').innerHTML = "";
        }, 300);
      };
    }, 300);
  });

}





function hideFull(){

  document.getElementById('file_full').classList.remove('file-full-show')
  document.getElementById('scrim_file').classList.remove('scrim-show')
  
}


function open(){ 

  const scrimClass  = ["scrim", "scrim-show"]

	document.getElementById('file_full').classList.add('file-full-show')

  	//show the scrim
  	document.getElementById('scrim_file').classList.add(...scrimClass)

    //for remove the url when user click the scrim
    document.getElementById('scrim_file').setAttribute('data-detail', '{"click": [  {"dest":"file", "act":"hideFull"}  ] }')


}















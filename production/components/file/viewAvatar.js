const setting = require('../../js-handler/settings')
const deleteFileDB = require('./file-server-deleteFiles') //server U  
const snack                = require ('./file-snack')
const backControl          = require('../../js/back-control')





export function start(detail){



 const fullCont = document.querySelector("#myuser-fullcont");
 const fileFullViewDiv = document.querySelector('#avatar_full');
 const avatarDiv =  fullCont.querySelector(".avatar")

 const style = avatarDiv.currentStyle || window.getComputedStyle(avatarDiv, false);
 let avatarUrl = style.backgroundImage.slice(4, -1).replace(/"/g, "").split("/");
 const avatarName = avatarUrl[avatarUrl.length - 1];





 const companyID = setting.getData().companyID;  
 var link = "server/storage/"+companyID+"/entities/users/"+fullCont.dataset.dbid+"/avatar/"+avatarName; 


  if(avatarName.includes("person.svg")){
  //link = "css/svg/person.png"; 
  link = "css/img/pic/person.png"; 
  }
  

 fileFullViewDiv.dataset.path = "server/storage/"+companyID+"/entities/users/"+fullCont.dataset.dbid+"/avatar/";
 fileFullViewDiv.dataset.entity = "myuser";
 //fileFullViewDiv.dataset.contFiles = JSON.stringify(getContFile("myuser"));
 fileFullViewDiv.querySelector('h1').innerHTML = avatarName.split("?")[0];
 fileFullViewDiv.querySelector('iframe').src = link; 
 let fileFormat = avatarName.split(".");
 fileFormat = fileFormat[fileFormat.length - 1];

 //if(fullViewFormats.includes(fileFormat))
open();

}





export function changeSrc(detail){ 

  const fileFullViewDiv = document.querySelector('#avatar_full');

  //AVOIDING FLICKERING
  fileFullViewDiv.querySelector('iframe').classList.add("dn");   
  fileFullViewDiv.querySelector('iframe').src =  "css/img/pic/person.png";  

}


export function resizeAvatarView(detail){
    const iframe = document.querySelector('#avatar_full').querySelector('iframe');

    if(iframe.src == "") return;

    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    iframeDocument.querySelector('body').setAttribute("style","text-align: center; height: 94%;  ");  
    if(iframeDocument.querySelector('img')){
      iframeDocument.querySelector('img').setAttribute("style","user-select: none; max-width: 99%; max-height: 780px;   position: relative;  top: 50%;  transform: translateY(-50%);");  
    }
    //
    iframe.classList.remove("dn");   
}








export function getContFile(entity){

  var fileNames = [];

  document.querySelector('#'+entity+"-fullcont .file-regularFiles").querySelectorAll('.file .cont-img,.cont-pdf').forEach(function(fileContainer) { 
    fileNames.push(fileContainer.querySelector('.des label').textContent);
  });

  return fileNames;

}



export function deleteAvatarFromView(detail){
  
  const fileFullViewDiv = document.querySelector('#avatar_full');
  const fulcontId = "myuser-fullcont"; 
  let avatarUrl =  fileFullViewDiv.querySelector('iframe').src.split("/");
   avatarUrl =  avatarUrl[avatarUrl.length - 1];
   const avatarName = avatarUrl.split("?")[0]

  detail.inf = {  entity:  "users", 
                  id: document.querySelector("#"+fulcontId).dataset.dbid, 
                  currentPath: "", 
                  avatarName: avatarName, 
                  filesAndFolders: '["'+""+'"]'
                }; 

  detail.entity = "users";

  deleteFileDB.avatarRemove(detail).then((result)=>  {  
    // fileFullViewDiv.dataset.contFiles = JSON.stringify(getContFile(fileFullViewDiv.dataset.entity));
     var detail = {direction : 1};
     changeSrc(detail);
  });

}








export function hideAvatarFull(){ 

  document.getElementById('avatar_full').classList.remove('file-full-show')
  document.getElementById('scrim_file').classList.remove('scrim-show')
  backControl.hashSub({ toHide:`avatar_full` })
  
}


function open(){ 

  const scrimClass  = ["scrim", "scrim-show"]

	document.getElementById('avatar_full').classList.add('file-full-show')

  	//show the scrim
  	document.getElementById('scrim_file').classList.add(...scrimClass)

    //for remove the url when user click the scrim
    document.getElementById('scrim_file').setAttribute('data-detail', '{"click": [  {"dest":"file", "act":"hideAvatarFull"}  ] }')

    backControl.hashAdd({ toShow:`avatar_full` })

}















//FILES//
//var current_directorie = { uploaded_files: [{path:"", files:""}], conf_files: [{path:"", files:""}]};
//var folder_files_full_preview = [];
//const generator = require('./file-server-generator') 
const generator   = require('./file-server-generator')
const fileRequest = require ('../../js-network/file-request')
const dbRequest   = require ('../../js-network/db-request')
const snack       = require ('./file-snack')

export function dropEvent(detail){
  console.log(detail, "desde dropEvent")
  let dragFiles = ""
  const ev = detail.ev
  const cont = ev.target
  const elem = document.querySelector('.dragMe-active')
  const isCont = cont.id

    if (elem) {
      cont.appendChild(elem)
    }else{
      dragFiles = ev.dataTransfer.files
      if(dragFiles.length > 1){
        for (let i = 0; i < dragFiles.length; i++) {
          let file = dragFiles[i]
          console.log(file.type)
          let validFiles = [
            "image/jpg",
            "image/jpeg",
            "image/JPG",
            "image/JPEG",
            "image/JFIF",
            "image/jfif",
            "image/gif",
            "image/png",
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
            "text/plain",
            "video/mp4",
            "video/webm",
            "video/x-matroska",
          ];
    
          if(dragFiles){
            if (validFiles.includes(file.type)) {
              console.log('Excelente')
              triggerSubmitDrag(detail,dragFiles)
              return ;
            }else{
              alert('Not valid file')
            }
          }
        }
        console.log('multiples archivos')
      }else{
        console.log('un archivo')
        let validFiles = [
          "image/jpg",
          "image/jpeg",
          "image/JPG",
          "image/JPEG",
          "image/JFIF",
          "image/jfif",
          "image/gif",
          "image/png",
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
          "text/plain",
          "video/mp4",
          "video/webm",
          "video/x-matroska",
        ];
        
        if(dragFiles){
          if (validFiles.includes(dragFiles[0].type)) {
            console.log('excelente')
            triggerSubmitDrag(detail,dragFiles)
            return ;
          }else{
            alert('Not valid file')
          }
        }
      }
        
    }
  console.log(' file drop in areaDrop')
}

export function triggerFileUploadDrag(fulcontId){
    
    document.querySelector("#"+fulcontId+" .fileDragUploadInput").click();
}

export function triggerSubmitDrag(detail, files){

    var fulcontId   = detail.entity+"-fullcont";
    // const files     = document.querySelector("#"+fulcontId+" .fileDragUploadInput").files;
    const formData  = new FormData();
    var fileNames   = [];
   
    for (let i = 0; i < files.length; i++) {
      let file = files[i];  
      fileNames.push(files[i].name);
      formData.append('fileInputElement[]', file);
    }

    formData.append('id', document.querySelector("#"+fulcontId).dataset.dbid);
    formData.append('entity', detail.entity); 
    formData.append('currentPath',  document.querySelector("#"+fulcontId).dataset.currentPath);

    detail.inf = formData;
    if (sendFile(detail, fileNames)) {
      return ;
    }else{
      return ;
    }
}

export const sendFile = (detail, fileNames) => {  
  
  console.log(detail,"andry")
  console.log(fileNames,"andry")
    
      return sendFileDB(detail)
        .then((result)=>  {   console.log("AFTER FILE UPLOAD!!!!!!!!",result)          
  
          const fulcontId = detail.entity+"-fullcont";
          var obj = { 
            entity        : detail.entity,
            id            : document.querySelector("#"+fulcontId).dataset.dbid,
            file          : result.file,
            currentPath   : document.querySelector("#"+fulcontId).dataset.currentPath,
            form          : document.getElementById(detail.entity+"-fullcont"),
            sendWebSocket : 1
           };

           generator.printFile(obj);


         //ADDIN SHAKE CLASS ON RENAMED ELMENT
         setTimeout(function(){
          document.querySelector("#"+fulcontId).querySelectorAll('.fileFolderLabel').forEach(function(label) { 
            if(fileNames.includes(label.innerHTML)){
              label.closest('.cont').classList.add("a-shake");
              setTimeout(function(){
                label.closest('.cont').classList.remove("a-shake");
              }, 300);
            }          
          });           
        }, 300);



           return ;  
  
        }).catch((error) => {  
            console.log('ERROR Uploading Files', error)
  
       }) 
        
}/**/

async function sendFileDB(detail){  //console.log('downloadSettings>')
 
     const result = await fileRequest.start(detail, 'server/php/files/upload.php' ) //do the insert  
     if(result.status != "ok"){ throw ( result ) }
   
     return result
}

export function openNewFolderDialogDrag(detail, scrim_file_newFolder){

    var dialog = document.querySelector("#file-newFolder-dialog")

    dialog.classList.add("dialog-show");  
    scrim_file_newFolder.classList.add("scrim-show");  

    dialog.dataset.entity = detail.entity;     
    dialog.querySelector("input").value  = "New Folder";    
    dialog.querySelector("input").select(); 

}

export const newFolder = (detail) => { 
    

    if((typeof(detail.ev.key) != "undefined" && detail.ev.key != "Enter")){
      return;
    }
    

    detail.entity = document.querySelector("#file-newFolder-dialog").dataset.entity;    
    const fulcontId = detail.entity+"-fullcont"; 
    const newName =  sanitizeFileName(document.querySelector("#file-newFolder-dialog input").value.replace(/(\r\n|\n|\r)/gm, ""));

    if(newName == false){

      document.querySelector("#file-newFolder-dialog input").select(); 
      detail.id = "general";
      detail.title = "Invalid folder name!";
      snack.start(detail);      
      return;

    }
  
    //document.querySelector("#file-newFolder-dialog").classList.remove("dialog-show")
    hideNewFolder(detail, scrim_file_newFolder)


    detail.inf = {  entity: detail.entity, 
                    id: document.querySelector("#"+fulcontId).dataset.dbid, 
                    currentPath: document.querySelector("#"+fulcontId).dataset.currentPath, 
                    name: newName
                  }; 
    
      return newFolderDB(detail)
        .then((result)=>  {   //console.log("!!!!!!!!",result) 
          
  
  
        const fulcontId = detail.entity+"-fullcont";
        var obj = { entity: detail.entity, 
          id: document.querySelector("#"+fulcontId).dataset.dbid, 
          file: result.file, 
          currentPath: document.querySelector("#"+fulcontId).dataset.currentPath,
          form: document.getElementById(detail.entity+"-fullcont"),
          sendWebSocket: 1
         };

          generator.printFile(obj);
          return ;
  
  
        }).catch((error) => {  
            console.log('ERROR Getting Current Path Files', error)
  
       }) 
        
}

async function newFolderDB(detail){ 
     const result = await dbRequest.start(detail, 'server/php/files/createFolder.php' ) //do the insert  
     if(result.status != "ok"){ throw ( result ) }
     
     return result
}

export function hideNewFolder(detail, scrim_file_newFolder){ //console.log('dialog hide>')
   
    const dialog = document.querySelector("#file-newFolder-dialog");
  
    dialog.classList.add('dialog-hide');
    scrim_file_newFolder.classList.add("scrim-hide")    

  
    remove(()=>{

      dialog.classList.remove('dialog-hide');
      dialog.classList.remove('dialog-show');
      scrim_file_newFolder.classList.remove("scrim-hide")  
      scrim_file_newFolder.classList.remove("scrim-show")  

    })
  
}
 
function remove(callback){
    setTimeout(()=>{
      callback()
    }, 300)
}

function sanitizeFileName(n){

    const validChars = "abcdefghijklmnopqrstuwvxyzABCDEFGHIJKLMNOPQRSTUWVXYZ -_.()0123456789";
    var arr = n.split('');

    //CHECKING FIRST CHARACTER OF FILE/FOLDER NAME
    while(arr[0] == " " || arr[0] == "."){
      arr.shift();
      if(arr.length == 0) return false;
    }

    const l = arr.length;
    var c = 0;
    
    while(c < l){
      if(!validChars.includes(arr[c])){
        return false;
      }
      c++;
    }

    return arr.join('');

}
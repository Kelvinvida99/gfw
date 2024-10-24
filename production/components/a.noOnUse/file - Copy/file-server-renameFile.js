
const generator = require('./file-server-generator') 
const dbRequest            = require ('../../js-network/db-request')
const snack                = require ('./file-snack')

export const start = (detail) => {  

  if((typeof(detail.ev.key) != "undefined" && detail.ev.key != "Enter")){
    return;
  }

    detail.entity = document.querySelector("#file-dialog").dataset.entity;
    var filesToRename =  generator.getSelectedFiles(detail.entity);

    if(filesToRename.length > 1){
      detail.id = "general";
      detail.title = "Select only one file to rename!";
      snack.start(detail);
      return;
    }
    else if(filesToRename.length < 1){
      detail.id = "general";
      detail.title = "Select one file to rename!";
      snack.start(detail);      
      return;
    }

    const fulcontId = detail.entity+"-fullcont"; 
    var  newName =  sanitizeFileName(document.querySelector("#file-dialog input").value.replace(/(\r\n|\n|\r)/gm, ""));

    if(newName == false){

      document.querySelector("#file-dialog input").select(); 

      detail.id = "general";
      detail.title = "Invalid file name!";
      snack.start(detail);      
      return;
    }

    document.querySelector("#file-dialog").classList.remove("dialog-show");  

    const fileExt =  document.querySelector("#file-dialog").querySelector("input").dataset.fileExt;

    if(fileExt != ""){//IF FILE IS NOT A FOLDER
      newName = newName+"."+fileExt;
    }

    if(newName === filesToRename[0]) return; //NAME WAS NOT CHANGED

    detail.inf = {  entity: detail.entity, 
                    id: document.querySelector("#"+fulcontId).dataset.dbid, 
                    currentPath: document.querySelector("#"+fulcontId).dataset.currentPath, 
                    oldName: filesToRename[0],
                    newName: newName
                  }; 

      return startDB(detail)
        .then((result)=>  {  // console.log("!!!!!!!!",result) 
          
  
  
        const fulcontId = detail.entity+"-fullcont";

        var obj = { entity: detail.entity, 
          id: document.querySelector("#"+fulcontId).dataset.dbid, 
          file: result.file, 
          currentPath: document.querySelector("#"+fulcontId).dataset.currentPath,
          form: document.getElementById(detail.entity+"-fullcont"),
          sendWebSocket: 1
         };

          generator.printFile(obj);
          


         //ADDIN SHAKE CLASS ON RENAMED ELMENT
         setTimeout(function(){
            document.querySelector("#"+fulcontId).querySelectorAll('.fileFolderLabel').forEach(function(label) { 
              if(label.innerHTML == newName){
                label.closest('.cont').classList.add("a-shake");
                setTimeout(function(){
                  label.closest('.cont').classList.remove("a-shake");
                }, 1500);
              }          
            });           
          }, 300);

  
  
        }).catch((error) => {  
            console.log('ERROR Renaming File', error)
  
       }) 
        
  }/**/
  /*
  function remove(callback){
    setTimeout(()=>{
      callback()
    }, 800)
  }*/
  
  async function startDB(detail){  //console.log('downloadSettings>')
  
     const result = await dbRequest.start(detail, 'server/php/files/renameFile.php' ) //do the insert
  
     if(result.status != "ok"){ throw ( result ) }
     //console.log('!!!!!!!!!!starteDB', result)
     return result
  }


  export function openRenameDialog(detail){

    var filesToRename =  generator.getSelectedFiles(detail.entity); 

    if(filesToRename.length > 1){
      detail.id = "general";
      detail.title = "Select only one file to rename!";
      snack.start(detail);
      return;
    }
    else if(filesToRename.length < 1){
      detail.id = "general";
      detail.title = "Select one file to rename!";
      snack.start(detail);      
      return;
    }

    const fileInfo = filesToRename[0].split(".");
    const fileDialog = document.querySelector("#file-dialog");

    fileDialog.classList.add("dialog-show");    
    fileDialog.dataset.entity = detail.entity;    
    fileDialog.querySelector(".title").innerHTML  = "Rename File";    
    fileDialog.querySelector(".des").innerHTML  = "Current file name: "+filesToRename[0];    
    fileDialog.querySelector("input").dataset.fileExt = fileInfo[1] || "";   
    fileDialog.querySelector("input").value  = fileInfo[0];   
    fileDialog.querySelector("input").select(); 
  }




  export function hideRenameDialog(){ //console.log('dialog hide>')
    
    const dialog = document.querySelector("#file-dialog");
    
    dialog.classList.add('dialog-hide');
  
    remove(()=>{
      dialog.classList.remove('dialog-hide');
      dialog.classList.remove('dialog-show');
    })
  
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
  
  function remove(callback){
    setTimeout(()=>{
      callback()
    }, 300)
  }

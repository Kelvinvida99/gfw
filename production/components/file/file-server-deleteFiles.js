
const generator = require('./file-server-generator') 
const dbRequest            = require ('../../js-network/db-request')
const snack                = require ('./file-snack')

export const start = (detail) => {  

    var filesToDelete =  generator.getSelectedFiles(detail.entity); 
    const fc = document.querySelector("#"+detail.entity+"-fullcont");

    if(filesToDelete.length < 1){
      detail.id = "general";
      detail.title = "Select at least one file!";
      snack.start(detail);
      return;
    }
      
    detail.inf = {  entity: detail.entity, 
                    id: fc.dataset.dbid, 
                    currentPath: fc.dataset.currentPath, 
                    filesAndFolders: JSON.stringify(filesToDelete)
                  }; 


      //ADDING ANIMATION TO FILES TO BE DELETED $fileDiv = "file-regularFiles"
      document.querySelector('#'+detail.entity+"-fullcont").querySelectorAll('.file-regularFiles .cont-checked').forEach(function(fileContainer) { 

        fileContainer.classList.add("tr-deleteRow");

      });
      remove(()=>{

        start2(detail);

      })
      
  }  


  function remove(callback){
    setTimeout(()=>{
      callback()
    }, 800)
  }




  export const start2 = (detail) => { 
    return startDB(detail)
    .then((result)=>  {  // console.log("!!!!!!!!",result)      
   
    const fc = document.querySelector("#"+detail.entity+"-fullcont");

    var obj = { entity: detail.entity, 
      id: fc.dataset.dbid, 
      file: result.file, 
      currentPath: fc.dataset.currentPath,
      form: document.getElementById(detail.entity+"-fullcont"),
      sendWebSocket: 1,
     };

      generator.printFile(obj);
      
      return ;
  
  
    }).catch((error) => {  
      
        console.log('ERROR deleting Files', error)
        document.querySelector("#"+detail.entity+"-fullcont").querySelectorAll(' .tr-deleteRow').forEach(function(fileSelected) { 
      
          fileSelected.classList.remove("tr-deleteRow");
      
        });

  
   }) 
        
  }
  

  export const avatarRemove = (detail) => { 
    return startDBAvatarRemove(detail)
    .then((result)=>  {  console.log("!!!!!!!!",result)      
   
    const fc = document.querySelector("#myuser-fullcont");

    var obj = { entity: "users", 
      id: fc.dataset.dbid, 
      file: '', 
      currentPath: "",
      avatarName: detail.avatarName,
      form: "",
      sendWebSocket: 1,
     };

      //generator.printFile(obj);
      
      return ;
  
  
    }).catch((error) => {  
      
        console.log('ERROR deleting Files', error)
       // document.querySelector("#"+detail.entity+"-fullcont").querySelectorAll(' .tr-deleteRow').forEach(function(fileSelected) { 
      
         // fileSelected.classList.remove("tr-deleteRow");
      
        //});

  
   }) 
        
  }








  
  async function startDB(detail){ 
  
     const result = await dbRequest.start(detail, 'server/php/files/deleteFiles.php' ) //do the insert
  
     if(result.status != "ok"){ throw ( result ) }
     return result
  }

  async function startDBAvatarRemove(detail){ 
  
    const result = await dbRequest.start(detail, 'server/php/files/deleteAvatar.php' ) //do the insert
 
    if(result.status != "ok"){ throw ( result ) }
    return result
 }


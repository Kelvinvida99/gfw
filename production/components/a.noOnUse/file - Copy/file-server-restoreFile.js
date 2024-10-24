
const generator = require('./file-server-generator') 
const generatorDeletedFile = require('./file-server-getDeletedFile') 
const dbRequest            = require ('../../js-network/db-request')
const snack                = require ('./file-snack')

export const start = (detail) => {  

    var filesToRestore =  getSelectedFiles(detail.entity); 
    
    if(filesToRestore.length < 1){
      detail.id = "general";
      detail.title = "Select at least one file to restore!";
      snack.start(detail);
      return;
    }

    const fulcontId = detail.entity+"-fullcont"; 

    detail.inf = {  entity: detail.entity, 
                    id: document.querySelector("#"+fulcontId).dataset.dbid, 
                    currentPath: document.querySelector("#"+fulcontId).dataset.currentPath, 
                    filesAndFolders: JSON.stringify(filesToRestore)
                  }; 

    start2(detail);
        
  }
  


  export const start2 = (detail) => { 
    return startDB(detail)
    .then((result)=>  {   //console.log("!!!!RESTORED!!!!",result); 
      

    const fulcontId = detail.entity+"-fullcont";

    var obj = { entity: detail.entity, 
      id: document.querySelector("#"+fulcontId).dataset.dbid, 
      file: result.file.regularFiles, 
      currentPath: document.querySelector("#"+fulcontId).dataset.currentPath, 
      form: document.getElementById(detail.entity+"-fullcont"),
      sendWebSocket: 1
     };

    generator.printFile(obj);

    obj = { entity: detail.entity, 
        id: document.querySelector("#"+fulcontId).dataset.dbid, 
        file: result.file.deletedFiles, 
        currentPath: "",
        form: document.getElementById(detail.entity+"-fullcont"),
        sendWebSocket: 1
       };

       generatorDeletedFile.printFile(obj);

      return ;
  
  
    }).catch((error) => {  
        console.log('ERROR restoring file', error)
  
   }) 
        
  }/**/

  
  
  async function startDB(detail){  //console.log('downloadSettings>') 
 
     const result = await dbRequest.start(detail, 'server/php/files/restoreFiles.php' ) //do the insert
  
     if(result.status != "ok"){ throw ( result ) }

     return result
  }




  export function getSelectedFiles($entity){

    var fileFolderNames = [];
    
    document.querySelector('#'+$entity+"-fullcont").querySelectorAll('.file-deletedFiles .cont-checked').forEach(function(fileContainer) { 
      fileFolderNames.push(fileContainer.dataset.fileid); 
    });

    return fileFolderNames;
    
  }
  

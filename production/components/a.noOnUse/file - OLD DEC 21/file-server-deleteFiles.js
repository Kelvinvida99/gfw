
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

  //console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!",detail.inf);
    
    start2(detail);
        
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
  
   }) 
        
  }
  
  
  async function startDB(detail){ 
  
     const result = await dbRequest.start(detail, 'server/php/files/deleteFiles.php' ) //do the insert
  
     if(result.status != "ok"){ throw ( result ) }
     return result
  }


const generator = require('./file-server-generator') 
const dbRequest            = require ('../../js-network/db-request')
const snack                = require ('./file-snack')

export const start = (detail) => {  

    var filesToDelete =  generator.getSelectedFiles(detail.entity); 

    if(filesToDelete.length < 1){
      detail.id = "general";
      detail.title = "Select at least one file!";
      snack.start(detail);
      return;
    }
    const fulcontId = detail.entity+"-fullcont";     
    detail.inf = {  entity: detail.entity, 
                    id: document.querySelector("#"+fulcontId).dataset.dbid, 
                    currentPath: document.querySelector("#"+fulcontId).dataset.currentPath, 
                    filesAndFolders: JSON.stringify(filesToDelete)
                  }; 
    
    start2(detail);
        
  }  


  export const start2 = (detail) => { 
    return startDB(detail)
    .then((result)=>  {   console.log("!!!!!!!!",result)      

    const fulcontId = detail.entity+"-fullcont";
    var obj = { entity: detail.entity, 
      id: document.querySelector("#"+fulcontId).dataset.dbid, 
      file: result.file, 
      currentPath: document.querySelector("#"+fulcontId).dataset.currentPath,
      form: document.getElementById(detail.entity+"-fullcont"),
      div: "file-regularFiles"
     };

      generator.printFile(obj);
      return ;
  
  
    }).catch((error) => {  
        console.log('ERROR Getting Current Path Files', error)
  
   }) 
        
  }
  
  
  async function startDB(detail){ 
  
     const result = await dbRequest.start(detail, 'server/php/files/deleteFiles.php' ) //do the insert
  
     if(result.status != "ok"){ throw ( result ) }
     return result
  }

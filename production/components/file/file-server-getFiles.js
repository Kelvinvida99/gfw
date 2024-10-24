

const dbRequest            = require ('../../js-network/db-request')
const generator = require('./file-server-generator') 
const setting = require('../../js-handler/settings')
const snack                = require ('./file-snack')

export const start = (detail) => {  //console.log('getPathFile>')
    
    detail.inf = {entity: detail.entity, id: detail.id, currentPath: detail.currentPath}; 

      return startDB(detail)
        .then((result)=>  {  // console.log("!!!!!!!!",result)
          
  
          var obj = { entity: detail.entity, 
            id: detail.id, 
            file: result.file, 
            currentPath: detail.currentPath,
            form: document.getElementById(detail.entity+"-fullcont")
           };
          generator.printFile(obj);
          
          return ;
  
  
        }).catch((error) => {  
            console.log('ERROR Getting Current Path Files', error)
  
       }) 
        
  }/**/
  
  
  
  async function startDB(detail){  
  
     const result = await dbRequest.start(detail, 'server/php/files/getFiles.php' ) //do the insert
  
     if(result.status != "ok"){ throw ( result ) }
     return result
  }

  export function goBack(detail){
    var path = (document.querySelector("#"+detail.entity+"-fullcont").dataset.currentPath).split("/");
    if(path.length < 2) {

      return;

    }

    else{

      path.pop(); 
      path = path.join("/"); 

    }

     detail.id = document.querySelector("#"+detail.entity+"-fullcont").dataset.dbid;
     detail.currentPath = path; 

     start(detail);

  }

  export function multiDownload(detail){ 
	
    var filesToDownload =  generator.getSelectedFiles(detail.entity); 

    if(filesToDownload.length < 1){

      detail.id = "general";
      detail.title = "Select at least one file!";
      snack.start(detail);
      return;

    }

    var fullCont = document.querySelector("#"+detail.entity+"-fullcont");    
    var d_links = "";
    const id = fullCont.dataset.dbid;
    const currentPath =  fullCont.dataset.currentPath;
    var link = "";
    const companyID = setting.getData().companyID;  
    var c = filesToDownload.length;

    filesToDownload.forEach(function(f){

      link = "server/storage/"+companyID+"/entities/"+detail.entity+"/"+fullCont.dataset.dbid+"/uploaded_files/"+currentPath+"/"+f; 
      d_links += "<a class='clickMultiDownload' href='"+link+"' download='"+f+"' >WEAAAAAAAA</a>";
      c++;   

     });
     
     document.querySelector('#multi_download_container').innerHTML = d_links; 

     // show  snack loading
     detail.id = "general";
     detail.title = "Downloading Files";
     snack.start(detail); 

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
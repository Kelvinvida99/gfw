

const dbRequest            = require ('../../js-network/db-request')
const setting              = require('../../js-handler/settings')
const webSocket            = require ('./file-web-socket');

export const start = (detail) => {  //console.log('getPathFile4444>', detail) 

  const fc = document.querySelector("#"+detail.entity+"-fullcont");  

    detail.inf = {
                entity: detail.entity,
                entityId: fc.dataset.dbid      
            }; 

  
      return startDB(detail)
        .then((result)=>  {  // console.log("!!!!!!!!",result)
          console.log("###########",result.file,);
          var obj = { entity: detail.entity, 
            id: fc.dataset.dbid, 
            file: result.file, 
            form: fc
           };

           printFile(obj);

          return ;
  
  
        }).catch((error) => {  
            console.log('ERROR Getting deleted Files', error)
  
       }) 
        
  }/**/
  
  
  
  async function startDB(detail){ 

     const result = await dbRequest.start(detail, 'server/php/files/getDeletedFiles.php' ) //do the insert
  
     if(result.status != "ok"){ throw ( result ) }
    
     return result
  }




  
export function printFile(obj){  //console.log('printFile>')

  /* OBJECT AS PARAMETER   
        const obj = { entity: detail.entity, 
          id: document.querySelector("#"+fulcontId).dataset.dbid, 
          file: result.file.deletedFiles, 
          form: document.getElementById(detail.entity+"-fullcont"),
          sendWebSocket: 1,
        };
  */

  var fileHmtl = "";
  var knownFileExt = {
        "jpeg": "cont-img", 
        "jpg": "cont-img", 
        "png": "cont-img",
        "gif": "cont-img", 
        "JFIF": "cont-img", 
        "jfif": "cont-img",
        "pdf": "cont-pdf", 
        "txt": "cont-doc", 
        "doc": "cont-doc", 
        "docx": "cont-doc", 
        "csv": "cont-exel", 
        "xls": "cont-exel", 
        "xlsx": "cont-exel", 
        "unknow": "unknow"
    };

    if(!Array.isArray(obj.file)){//IF FILE ERRORS OR NO PERMISSIONS
        //REPRINT FILES
      obj.form.querySelector('.file-deletedFiles .body').innerHTML = `<div class="card"><h1>${obj.file}</h1></div>"`;

      return;

    }



    obj.file.forEach(file => {

      if(file.folder == "true"){

        fileHmtl += `<div class="cont cont-folder-empty"  data-fileid = "${file.id || 0}"  title = "Deleted on ${file.deletedDate}">
                        
                        <div class="img"> </div>
                        
                        <div class="check" data-detail='{"click": [ {"dest":"file", "act": "checking" }] }'>
                          <svg><use xlink:href="./css/svg.svg#check-round"></use></svg>
                        </div>   
                      
                        <div class="des"  >
                          <div class="img"> </div>
                          <label>${file.name}</label><br>
                          <h1 style="color:gray; font-size:9px;">${file.deletedDate}</h1>
                        </div> 
                      
                    </div>`;

      }
      else{

        var imgIconPath = "";
        var fileExt = file.name.split(".");

        fileExt = fileExt[fileExt.length - 1];

        if(typeof knownFileExt[fileExt] !== 'undefined') {

          fileExt = knownFileExt[fileExt];

          if(fileExt == "cont-img"){
                
            imgIconPath = `style="background: url('./server/storage/gokudb/deleted_files/${file.uniqueFolder}/lowlowlowCompression/${file.name}') !important;"`;    

          }

        }

        else{

          fileExt = knownFileExt["unknow"];

        }

        fileHmtl += `<div class="cont ${fileExt}"   data-fileid = "${file.id || 0}"  title = "Deleted on ${file.deletedDate}">
                        
                        <div class="img" ${imgIconPath}   }'> </div>
                        
                        <div class="check" data-detail='{"click": [ {"dest":"file", "act": "checking" } ] }'>
                          <svg><use xlink:href="./css/svg.svg#check-round"></use></svg>
                        </div>   

                        <div class="des"  >
                          <div class="img"> </div>
                          <label>${file.name}</label> 
                          <h1 style="color:gray; font-size:9px;">${file.deletedDate}</h1>
                        </div> 

                    </div>`;

      }

  });

  if(fileHmtl != ""){

    fileHmtl = `${fileHmtl}`;

  }

  else{

    fileHmtl =  `<div class="cont-empty">
                    <svg><use xlink:href="./css/svg.svg#delete"></use></svg>
                    <label>Empty</label>
                  </div>`;
                  
  }


  //REPRINT FILES
  obj.form.querySelector(".file-deletedFiles .body").innerHTML = fileHmtl; 

  //HIDING SECOND HEADER (SELECTED FILES OPTIONS)
  obj.form.querySelector(".file-deletedFiles").classList.remove("file-selecting");


    //SENDING WEBSOCKET UPDATE
    if(obj.sendWebSocket == 1){
    
      webSocket.fileWebsocket(obj);

    }


}




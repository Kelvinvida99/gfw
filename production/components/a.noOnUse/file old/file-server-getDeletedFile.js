

const dbRequest            = require ('../../js-network/db-request')
//const generator = require('./file-server-generator') 
const setting = require('../../js-handler/settings')

export const start = (detail) => {  //console.log('getPathFile4444>')
    
    detail.inf = {
                entity: detail.entity,
                entityId: document.querySelector("#"+detail.entity+"-fullcont").dataset.dbid,          
            }; 

  
      return startDB(detail)
        .then((result)=>  {  // console.log("!!!!!!!!",result)
          
          var obj = { entity: detail.entity, 
            id: document.querySelector("#"+detail.entity+"-fullcont").dataset.dbid, 
            file: result.file, 
            currentPath: "",
            form: document.getElementById(detail.entity+"-fullcont"),
            div: "file-deletedFiles"
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
    var obj = { entity: detail.entity, 
             id: result.data[0].id, 
             file: result.file, 
             currentPath: "",
             form: htmlFc.fullcontHTML 
            };
*/
var fileHmtl = "";
var pathHtml = "";
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
      "xls": "cont-exel", 
      "xlsx": "cont-exel", 
      "unknow": "unknow"
  };

  if(!Array.isArray(obj.file)){//IF FILE ERRORS OR NO PERMISSIONS
      //REPRINT FILES
    obj.form.querySelector('.file .body').innerHTML = `<div class="card"><h1>${obj.file}</h1></div>"`;
    return;
  }



  obj.file.forEach(file => {
  if(file.folder == "true"){
    fileHmtl += `<div class="cont cont-folder-empty"  data-fileid = "${file.id || 0}"  title = "Root${file.currentPath+"/"+file.name || ""}">
                    
                    <div class="img"> </div>
                    
                    <div class="check" data-detail='{"click": [ {"dest":"file", "act": "checking" }] }'>
                      <svg><use xlink:href="./css/svg.svg#check-round"></use></svg>
                    </div>   
                  
                    <div class="des"  >
                      <div class="img"> </div>
                      <label>${file.name}</label>
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
       // imgIconPath = `style="background: url('./server/storage/gokudb/entities/${obj.entity}/${obj.id}/uploaded_files/${file.currentPath}/lowlowlowCompression/${file.name}') !important;"`;          
        imgIconPath = `style="background: url('./server/storage/gokudb/deleted_files/${file.uniqueFolder}/lowlowlowCompression/${file.name}') !important;"`;          
      }
    }
    else{
      fileExt = knownFileExt["unknow"];
    }

    fileHmtl += `<div class="cont ${fileExt}"   data-fileid = "${file.id || 0}"   title = "Root${file.currentPath+"/"+file.name || ""}">
                    
                    <div class="img" ${imgIconPath}   }'> </div>
                    
                    <div class="check" data-detail='{"click": [ {"dest":"file", "act": "checking" } ] }'>
                      <svg><use xlink:href="./css/svg.svg#check-round"></use></svg>
                    </div>   

                    <div class="des"  >
                      <div class="img"> </div>
                      <label>${file.name}</label>
                    </div> 

                </div>`;
  }
});
if(fileHmtl != ""){
  fileHmtl = `${fileHmtl}`;
}
else{
  fileHmtl =  `<div class="card"><h1>EMPTY FOLDER</h1></div>"`;
}

  //GETTING PATH URL
  var paths2       = ("Root"+obj.currentPath).split("/");
  var pathCountStr = ""; 

  paths2.forEach(function (p){ 
    if(p != "Root") pathCountStr += "/"+p; 
    pathHtml += `<label data-detail='{"click":
     [ {"dest":"ripple"},{"dest":"file", "act":"getPathFile", "id":"${obj.id}", "entity":"${obj.entity}", "currentPath":"${pathCountStr}" } ] }' > ${p}  </label>`;
  });


//REPRINT FILES
obj.form.querySelector("."+obj.div+' .body').innerHTML = fileHmtl; 

//HIDING SECOND HEADER (SELECTED FILES OPTIONS)
obj.form.querySelector("."+obj.div).classList.remove("file-selecting");
}






const dbRequest            = require ('../../js-network/db-request');

export function printFile(obj){  //console.log('printingFile>')
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
      fileHmtl += `<div class="cont cont-folder-empty"  data-fileid = "${file.id || 0}">
                      
                      <div class="img" data-detail='{"click": [ {"dest":"file", "act":"getPathFile", "id":"${obj.id}", "entity":"${obj.entity}", "currentPath":"${obj.currentPath+"/"+file.name}" }] }'> </div>
                      
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
          imgIconPath = `style="background: url('./server/storage/gokudb/entities/${obj.entity}/${obj.id}/uploaded_files/${obj.currentPath}/lowlowlowCompression/${file.name}') !important;"`;          
        }
      }
      else{
        fileExt = knownFileExt["unknow"];
      }

      fileHmtl += `<div class="cont ${fileExt}"   data-fileid = "${file.id || 0}">
                      
                      <div class="img" ${imgIconPath}  data-detail='{"click": [ {"dest":"file", "act": "viewFile", "entity":"goku", "file":"${file.name}", "fileExt":"${fileExt}"} ] }'> </div>
                      
                      <div class="check" data-detail='{"click": [ {"dest":"file", "act": "checking" } ] }'>
                        <svg><use xlink:href="./css/svg.svg#check-round"></use></svg>
                      </div>   

                      <div class="des" data-detail='{"click": [ {"dest":"file", "act": "viewFile", "entity":"goku", "file":"${file.name}", "fileExt":"${fileExt}"} ] }' >
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
  obj.form.querySelector("."+obj.div+' .path').innerHTML = pathHtml;

  //SETTING CURRENT PATH DATASET
  obj.form.dataset.currentPath = obj.currentPath;

   //HIDING SECOND HEADER (SELECTED FILES OPTIONS)
  obj.form.querySelector("."+obj.div).classList.remove("file-selecting");
  
}


export function getSelectedFiles($entity, $fileDiv = "file-regularFiles"){

  var fileFolderNames = [];

  document.querySelector('#'+$entity+"-fullcont").querySelectorAll('.'+$fileDiv+' .cont-checked').forEach(function(fileContainer) { 
    fileFolderNames.push(fileContainer.querySelector('.des label').textContent);
  });
  return fileFolderNames;
}

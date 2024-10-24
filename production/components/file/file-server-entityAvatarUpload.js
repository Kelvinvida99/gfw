const fileRequest            = require ('../../js-network/file-request')
const snack                = require ('./file-snack')
const settings             = require ('../../js-handler/settings.js')

export function triggerAvatarUpload(fulcontId){ 
    document.querySelector("#"+fulcontId).querySelector(".avatarUploadInput").click();

}



export function triggerAvatarSubmit(detail){ 

    const files = document.querySelector("#"+detail.entity+"-fullcont").querySelector(".avatarUploadInput").files;
    const formData = new FormData()
  
    for (let i = 0; i < files.length; i++) {
      let file = files[i];  
      formData.append('fileInputElement[]', file);
    }


    formData.append('id', document.querySelector("#"+detail.entity+"-fullcont").dataset.dbid);
    formData.append('entity', detail.entity);
    detail.inf = formData; 
    sendFile(detail);

}



///style="background-image: url("server/storage/gokudb/entities/nurses/61/avatar/lowlowlowCompression/avatar.jpg");"
//style="background-image: url("/server/storage/gokudb/entities/nurses/61/avatar/lowlowlowCompression/avatar.jpg");" 


//style="background: url("/server/storage/gokudb/entities/nurses/61/avatar/lowlowlowCompression/avatar.jpg");"


const sendFile = (detail) => {  //console.log('UPLOADING FILE!!!!!!!!')
    
      return sendFileDB(detail)
        .then((result)=>  {   //console.log("AFTER AVATAR UPLOAD!!!!!!!!",result.data[0].avatar)          

          
          const fcUserPic = document.querySelector("#"+detail.entity+"-fullcont").querySelector(".avatar");
          //const loggedUserId = settings.getData().id;    
          const editedUser = document.querySelector("#"+detail.entity+"-fullcont").dataset.dbid; 
          const elemRow = document.querySelector("#"+detail.entity+"-tableRow-"+editedUser); 
          const avatarUrl = result.data[0].avatar || 'css/img/pic/person.svg';
           
          
          //CHANGING FULL-CONTAINER USER AVATAR
          fcUserPic.style.backgroundImage = "url('')";   
          fcUserPic.style.backgroundImage = "url('"+avatarUrl+"?" + new Date().getTime();+"')";

          //CHANGING ROW AVATAR
          if (elemRow != undefined) {
            elemRow.querySelector(".avatarOnTD").style.backgroundImage = "url('')";   
            elemRow.querySelector(".avatarOnTD").style.backgroundImage = "url('"+avatarUrl+"?" + new Date().getTime();+"')";
          }


          
      detail.id = "general";
      detail.title = "User profile picture has been updated";
      snack.start(detail);   

      return ;  

      }).catch((error) => {  
          console.log('ERROR Uploading User Avatar', error)

      }) 
        
  }/**/
  
  
  
  async function sendFileDB(detail){  //console.log('downloadSettings>')
 
     const result = await fileRequest.start(detail, 'server/php/files/entityAvatarUpload.php' ) //do the insert  
     if(result.status != "ok"){ throw ( result ) }
   
     return result
  }




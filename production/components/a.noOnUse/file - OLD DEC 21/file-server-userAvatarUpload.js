const fileRequest            = require ('../../js-network/file-request')
const snack                = require ('./file-snack')

export function triggerAvatarUpload(fulcontId){
    
    document.querySelector("#users-fullcont").querySelector(".fileUploadInput").click();

}



export function triggerAvatarSubmit(detail){ 

    const files = document.querySelector("#users-fullcont").querySelector(".fileUploadInput").files;
    const formData = new FormData()
  
    for (let i = 0; i < files.length; i++) {
      let file = files[i];  
      formData.append('fileInputElement[]', file);
    }


    formData.append('id', document.querySelector("#users-fullcont").dataset.dbid);
    detail.inf = formData; 
    sendFile(detail);

}



///style="background-image: url("server/storage/gokudb/entities/users/61/avatar/lowlowlowCompression/avatar.jpg");"
//style="background-image: url("/server/storage/gokudb/entities/users/61/avatar/lowlowlowCompression/avatar.jpg");"


//style="background: url("/server/storage/gokudb/entities/users/61/avatar/lowlowlowCompression/avatar.jpg");"


const sendFile = (detail) => {  //console.log('UPLOADING FILE!!!!!!!!')
    
      return sendFileDB(detail)
        .then((result)=>  {   //console.log("AFTER AVATAR UPLOAD!!!!!!!!",result.data[0].avatar)          
  
       const fcUserPic = document.querySelector("#users-fullcont").querySelector("#user-avatar");   
       
       fcUserPic.style.backgroundImage = "url('')"; 
       fcUserPic.style.backgroundImage = "url('"+result.data[0].avatar+"')";
          
        detail.id = "general";
        detail.title = "User profile picture has been updated";
        snack.start(detail);   

        return ;  
  
        }).catch((error) => {  
            console.log('ERROR Uploading User Avatar', error)
  
       }) 
        
  }/**/
  
  
  
  async function sendFileDB(detail){  //console.log('downloadSettings>')
 
     const result = await fileRequest.start(detail, 'server/php/files/userAvatarUpload.php' ) //do the insert  
     if(result.status != "ok"){ throw ( result ) }
   
     return result
  }




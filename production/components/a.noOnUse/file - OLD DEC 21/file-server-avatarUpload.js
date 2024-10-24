const fileRequest            = require ('../../js-network/file-request')
const snack                = require ('./file-snack')

export function triggerAvatarUpload(fulcontId){
    
    document.getElementById("myuser-fullcont").querySelector(".fileUploadInput").click();

}



export function triggerAvatarSubmit(detail){ 

    const files = document.getElementById("myuser-fullcont").querySelector(".fileUploadInput").files;
    const formData = new FormData()
  
    for (let i = 0; i < files.length; i++) {
      let file = files[i];  
      formData.append('fileInputElement[]', file);
    }

    detail.inf = formData; 
    sendFile(detail);

}



///style="background-image: url("server/storage/gokudb/entities/users/61/avatar/lowlowlowCompression/avatar.jpg");"
//style="background-image: url("/server/storage/gokudb/entities/users/61/avatar/lowlowlowCompression/avatar.jpg");"


//style="background: url("/server/storage/gokudb/entities/users/61/avatar/lowlowlowCompression/avatar.jpg");"


const sendFile = (detail) => {  //console.log('UPLOADING FILE!!!!!!!!')
    
      return sendFileDB(detail)
        .then((result)=>  {   console.log("AFTER AVATAR UPLOAD!!!!!!!!",result.data[0].avatar)          
  
           
        document.getElementById("avatar").style.backgroundImage = "url('')";
        document.getElementById("avatar").style.backgroundImage = "url('"+result.data[0].avatar+"')";
          
        detail.id = "general";
        detail.title = "Profile picture has been updated";
        snack.start(detail);   

        return ;  
  
        }).catch((error) => {  
            console.log('ERROR Uploading Avatar', error)
  
       }) 
        
  }/**/
  
  
  
  async function sendFileDB(detail){  //console.log('downloadSettings>')
 
     const result = await fileRequest.start(detail, 'server/php/files/avatarUpload.php' ) //do the insert  
     if(result.status != "ok"){ throw ( result ) }
   
     return result
  }




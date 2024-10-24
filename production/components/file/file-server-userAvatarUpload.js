const fileRequest            = require ('../../js-network/file-request')
const snack                = require ('./file-snack')
const settings             = require ('../../js-handler/settings.js')

export function triggerAvatarUpload(fulcontId){
    
    document.querySelector("#users-fullcont").querySelector(".avatarUploadInput").click();

}



export function triggerAvatarSubmit(detail){ 

    const files = document.querySelector("#users-fullcont").querySelector(".avatarUploadInput").files;
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


          const fcUserPic = document.querySelector("#users-fullcont").querySelector(".avatar");
          const loggedUserId = settings.getData().id;    
          const editedUser = document.querySelector("#users-fullcont").dataset.dbid; 
          const elemRow = document.querySelector("#users-tableRow-"+editedUser); 
          const avatarUrl = result.data[0].avatar || 'css/img/pic/person.svg';
           
          
          //CHANGING FULL-CONTAINER USER AVATAR

          fcUserPic.style.backgroundImage = "url('')";      
          fcUserPic.style.backgroundImage = "url('"+avatarUrl+"?" + new Date().getTime();+"'), #E6E6E6";

        //CHANGING ROW AVATAR
          elemRow.querySelector(".avatarOnTD").style.backgroundImage = "url('')";   
          elemRow.querySelector(".avatarOnTD").style.backgroundImage = "url('"+avatarUrl+"?" + new Date().getTime();+"'), #E6E6E6";


          console.log(editedUser, " logged:",loggedUserId)
          
          //CHANGING LOGGED USER AVATAR IF NEEDED
         if(editedUser == loggedUserId ){ //alert()
            const leftMenuUserPic = document.querySelector("#avatar");  
            const drawerMenuUserPic = document.querySelector('#drawer').querySelector('.avatarD');

            leftMenuUserPic.style.backgroundImage = "url('')";      
            leftMenuUserPic.style.backgroundImage = "url('"+avatarUrl+"?" + new Date().getTime();+"'), #E6E6E6";    

            drawerMenuUserPic.style.backgroundImage = "url('')";      
            drawerMenuUserPic.style.backgroundImage = "url('"+avatarUrl+"?" + new Date().getTime();+"'), #E6E6E6";   
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
 
     const result = await fileRequest.start(detail, 'server/php/files/userAvatarUpload.php' ) //do the insert  
     if(result.status != "ok"){ throw ( result ) }
   
     return result
  }




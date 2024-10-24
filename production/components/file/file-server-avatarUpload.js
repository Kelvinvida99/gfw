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


const sendFile = (detail) => {  //console.log('UPLOADING FILE!!!!!!!!')
    
      return sendFileDB(detail)
        .then((result)=>  {   //console.log("AFTER AVATAR UPLOAD!!!!!!!!",result.data[0].avatar)          
  
        const fcUserPic = document.querySelector("#myuser-fullcont").querySelector(".avatar");
        const leftMenuUserPic = document.getElementById("avatar");  
        const drawerMenuUserPic = document.querySelector('#drawer').querySelector('.avatarD');
           
        const avatarUrl = result.data[0].avatar || 'css/img/pic/person.svg';

        leftMenuUserPic.style.backgroundImage = "url('')";
        leftMenuUserPic.style.backgroundImage = "url('"+avatarUrl+"?" + new Date().getTime();+"'), #E6E6E6";

        fcUserPic.style.backgroundImage = "url('')";
        fcUserPic.style.backgroundImage = "url('"+avatarUrl+"?" + new Date().getTime();+"'), #E6E6E6";

        drawerMenuUserPic.style.backgroundImage = "url('')";
        drawerMenuUserPic.style.backgroundImage = "url('"+avatarUrl+"?" + new Date().getTime();+"'), #E6E6E6";


        //CHECKING IF AVATAR FULL VIEW IS OPENED
        //CHECKING IF AVATAR FULL VIEW IS OPENED        
        const fileFullViewDiv = document.querySelector('#avatar_full');
        if( fileFullViewDiv.classList.contains("file-full-show")){
          //AVOIDING FLICKERING
          fileFullViewDiv.querySelector('iframe').classList.add("dn");   
          fileFullViewDiv.querySelector('iframe').src =  avatarUrl.replace("lowlowlowCompression/", "")+"?" + new Date().getTime();  
        }



         


      //CHANGING ROW AVATAR
        const editedUser = document.querySelector("#myuser-fullcont").dataset.dbid; 
        const elemRow = document.querySelector("#users-tableRow-"+editedUser); 

        if(elemRow != null){
          elemRow.querySelector(".avatarOnTD").style.backgroundImage = "url('')";   
          elemRow.querySelector(".avatarOnTD").style.backgroundImage = "url('"+avatarUrl+"?" + new Date().getTime();+"'), #E6E6E6";
        }






          
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




/*********************************YEISON INTEGRATION*/
const fileServer             = require ('./file-server-generator')
const fileServerTrash        = require ('./file-server-getDeletedFile')

/*********************************YEISON INTEGRATION*/
export function printFile( detail, result, htmlFc ){  //console.log('printFile>>>>>')
    //alert(333)  

    //checking for user entity to print profile pic
    if(htmlFc.entity == "users" || htmlFc.entity == "company" || htmlFc.entity == "nurses"  || htmlFc.entity == "patients" || 
       htmlFc.entity == "customer" || htmlFc.entity == "investor" || htmlFc.entity == "provider" || htmlFc.entity == "item" ||
       htmlFc.entity == "accounts"){  
        

        if(result.data[0].avatar == ""){
            var avatar = "person";
            if(result.data[0].hasOwnProperty('sex')){
                if(result.data[0].sex != ""){
                    avatar = result.data[0].sex.toLowerCase();
                }                
            }
        }

        const avatarUrl = result.data[0].avatar || 'css/img/pic/'+avatar+'.svg';
        const fcUserPic = htmlFc.fullcontHTML.querySelector(".avatar");    


        fcUserPic.style.backgroundImage = "url('')"; 
        fcUserPic.style.backgroundImage = "url('"+avatarUrl+"?" + new Date().getTime();+"'), #E6E6E6 "; 
     }



    const filePage = htmlFc.fullcontHTML.querySelector(".filePage")

    if (filePage === null) {  
        //console.log('printFile returned')
        return 
    }

     //console.log('printFile continue')  



    const  printFileObj = { 
              entity:       htmlFc.entity, 
               id:          result.data[0].id, 
               file:        result.file, 
               currentPath: "",
               form:        htmlFc.fullcontHTML
     };
    
    fileServer.printFile(printFileObj);//YEISON U

    const trash          = htmlFc.fullcontHTML.querySelector(".filePage")
    const trashIsVisible = trash.classList.contains("filePage-view-trash")


     //IF TRASH IS VISIBLE
    if(trashIsVisible){//IF TRASH IS VISIBLE
       
        document.querySelector("#"+detail.entity+"-fullcont").dataset.dbid = result.data[0].id;
        fileServerTrash.start(detail);
    
    }
          
}/*printFiles*/
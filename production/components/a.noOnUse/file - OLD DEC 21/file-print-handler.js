/*********************************YEISON INTEGRATION*/
const fileServer             = require ('./file-server-generator')
const fileServerTrash        = require ('./file-server-getDeletedFile')

/*********************************YEISON INTEGRATION*/
export function printFile( detail, result, htmlFc ){  console.log('printFile>>>>>')
    

    const filePage = htmlFc.fullcontHTML.querySelector(".filePage")

    if (filePage === null) {  
        console.log('printFile returned')

        return }

     console.log('printFile continue')


    //checking for user entity to print profile pic
    if(detail.entity == "users"){        
       const fcUserPic = htmlFc.fullcontHTML.querySelector("#user-avatar");          
       fcUserPic.style.backgroundImage = "url('')"; 
       fcUserPic.style.backgroundImage = "url('"+result.data[0].avatar+"')";
    }



   

    const  printFileObj = { 
              entity:       detail.entity, 
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
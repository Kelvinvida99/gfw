


export function start(html){

  ////Generate Element
  var body = ``

      body += `<div class="banner banner-show" id='${html.id}'>` 

            body += `<div class="icon">
                         <svg><use xlink:href="./css/svg.svg#${html.svg}"></use></svg>
                     </div>`    

            body += `<div class="des">${html.des}</div>` 


            body += `<div class="btn">` 
      
                  if(html.primary.text != ''){
                      body += `
                            <div class="${html.primary.class}"  ${html.primary.dataDetail}>
                                 <label>${html.primary.text}</label>        
                            </div>
                      `          
                  }           
                  
                  if(html.secondary.text != ''){
                      body += `
                            <div class="${html.secondary.class}"  ${html.secondary.dataDetail}>
                               <label>${html.secondary.text}</label>        
                            </div>
                      `          
                  }  


             body += `</div>` 
        body += `</div>` 


  return body

}



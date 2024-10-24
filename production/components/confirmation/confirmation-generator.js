


export function start(html){ //console.log('confirmation generatorrrrrrrrrrrrrrrr', html)

  ////Generate Element
  var body = ``

  body += `<div class="card">
            <img class="illus" src="${html.illus}" >  
            <label class="title">${html.title}</label>
            <label class="des"  >${html.des}</label> 
          </div>

          `
  
  if(html.code != ''){
      body += ` 
            <div class="details">
              <label class="code">  ${html.code}</label>
              <label class="num">   ${html.num}</label>
              <label class="helper">${html.helper}</label>
            </div>
             `
  }

  if(html.button != ''){
      body += `<div class="button button-large"  ${html.dataDetail}>
                  <label>${html.button}</label>
               </div>`
  }

  //console.log(html)

  return body

}


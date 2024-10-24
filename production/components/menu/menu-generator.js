


export function menuGenerator(html){ //console.log('menu generator', html)

  ////Generate Element
  var body = ``

  for(let i=0; i< html.length; i++){
        if(html[i].text != 'line'){
          body += `
              <div class="${html[i].class}"  ${html[i].dataClick} ${html[i].dataDetail} >
                 <svg><use xlink:href="./css/svg.svg#${html[i].svg}"></use></svg>
                 <label>${html[i].text}</label>
              </div>
          `          
        }

        else{  body += `<span class="divider"></span>`   }

  } 


//  console.log('htmlBody', body)

  return body

}


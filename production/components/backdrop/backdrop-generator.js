



export function backdropGenerator(html){  //console.log('start backgrop', html)

  ////Generate Element
  var body = ``
      body += `<div class="${html[0].class}" ${html[0].dataDetail}>
                  <svg><use xlink:href="./css/svg.svg#close"></use></svg>
               </div>` 

  for(let i=1; i< html.length; i++){
      body += `
      <div class="option ${html[i].class}" ${html[i].dataDetail}>  
	      <div class="circle ${html[i].style}" >
             <svg><use xlink:href="${html[i].svg}"></use></svg>
        </div>
        <label>${html[i].text}</label>
      </div>  
      `   
  } 
  
  return body

}


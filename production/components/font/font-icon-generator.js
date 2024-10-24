
export function start(detail){ //console.log('dialogGenerator', html)

	//text textColor icon title

	var title = ''
  var style = ''

	if(detail.title != null){ title=`title="${detail.title}"`}
  if(detail.style != null){ style=`${detail.style}`}

	const body = `
          <div class="font-icon ${style}" ${title} >
           
            <span class="cont"> 
                <span> <svg><use xlink:href='${detail.icon}'></use></svg></span>  
                <span>${detail.textColor}  </span>
            </span>   
            ${detail.text} 

          </div> 
	`

  return body

}




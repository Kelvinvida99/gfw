
export function start(html){ //console.log('dialogGenerator', html)

  ////Generate Element
  var body = `
	  <label class="title">${html.title}</label>
	`


	if(html.des != ''){
		body += `<label class="des">${html.des}</label>`
	}

	if(html.bodyHtml != '' && html.bodyHtml != undefined){
		 body += html.bodyHtml
	}


	if(html.primary.text != ''){
		body += `
	    <div class="${html.primary.class}" ${html.primary.dataDetail}>
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

	if(html.tertiary.text != '' ){
		body += `
	    <div class="${html.tertiary.class}"  ${html.tertiary.dataDetail}>
	         <label>${html.tertiary.text}</label>        
	    </div>
		`
	}

  return body

}




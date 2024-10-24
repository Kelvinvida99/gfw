
export function start(html){ //console.log('snackGenerator >')

  ////Generate Element
  var body  = ''
  var large = ''
  

  body += `<label>${html.title}</label>`

  if(html.btn != ''){
    body += `        
        <div class="${html.class}" ${html.dataDetail} >
        <label>${html.btn}</label>`

  }

  return body

}




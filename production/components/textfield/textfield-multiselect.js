
export function createChoose(elem){ //console.log('multiselect CREATE AND CHOOSE #####', elem)

    create(elem.html, elem.options)
    choose(elem.html, elem.value)

}

export function createClean(elem){//console.log('multiselect CREATE AND CHOOSE #####',)

    create(elem.html, elem.options)
    errorClean(elem.html)

}


//are create from ["Hourly", "Salary"]
//or from [{value:'', text:''}]
export function create(html, options){ //console.log('multiselect create',  options)

    if( typeof options[0] === 'string' ){
       createFromString(html, options)
       return
    }

    createFromObj(html, options)

}/**/

export function createFromString(html, options){ //console.log('multiselect create',  options)

  var body = ''

  body += `<option value="">Select</option>`

    for( let i=0; i < options.length; i++ ){
        body += `<option value="${options[i]}">${options[i]}</option>`
    }/*for*/


    html.querySelector('select').innerHTML = body

}/**/

export function createFromObj(html, options){ //console.log('multiselect create',  options)

  var body = ''

  body += `<option value="">Select</option>`

    for( let i=0; i < options.length; i++ ){
        body += `<option value="${options[i].value}">${options[i].text}</option>`
    }/*for*/


  html.querySelector('select').innerHTML = body

}/**/




export function choose(html, value){ 
  
  const select = html.querySelector('select')

  for(let i = 0; i < select.length; i++) {
  	if(select[i].value === value){
  		 select[i].selected = true
  	}
  }

}



export function get(select){// console.log('select#####', select)
  
  const options = select.querySelectorAll('option')

  for(let i = 0; i < options.length; i++) { //console.log('options', options[i].value)
      if(options[i].selected === true){ //console.log('MULTISELECT VALUE SELECTED', options[i].value, options[i].value === '')
          return options[i].value
      }
  }

  return ''
}


export function getFromHtml(html){ //console.log('getFromHtml >>>>>>>>>>>>>>>>>', html)
  
    const value = html.querySelector('select').value

    if(value === undefined){ return '' }
    
    return value
}


export function error(html){  //console.log('fill>')

  html.classList.add('textfield-error')
  html.classList.add('a-shake')
  remove(()=>{ html.classList.remove('a-shake') })
}

export function errorClean(html){  //console.log('errorClean>')
  html.classList.remove('textfield-error')
}



export function createTask(taskNumber){ 

  var body    = ''
  var comodin = ''
  var requiredFlat = ''

  const nameSplited = taskNumber.N_name.split('::')
  const name        = nameSplited[0]
  const options     = nameSplited[1].split('&&')

  if(taskNumber.N_mandatory === "true")   { requiredFlat = 'textfield-caution' }
  else                                    { requiredFlat = ''                  }


  body += `<div class="textfield  textfield-multiselect textfield-filled ${requiredFlat}"  id="task_${taskNumber.id}">`

            body += `<select class= 'elem'>`
                body += `<option value="">Select</option>`

                for(let i=0; i < options.length; i++ ){ // console.log(options[i],  taskNumber.N_value)
                    
                    if(options[i] === taskNumber.N_value){ comodin ='selected' }
                    else                                 { comodin =''         }

                    body += `<option value="${options[i]}" ${comodin} >${options[i]}</option>`
                }/*for*/
            body += `<select>`
            body += `<div class="indicador"></div>` 
            body += `<div class="trailing">
                      <svg><use xlink:href="css/svg.svg#downs"></use></svg>
                    </div>
                    <div class="label" >${name}</div> 
                    <div class="helper">${taskNumber.N_input_helper}</div> `

  body += `</div>`

  return body

}


function remove(callback){
  setTimeout(()=>{
    callback()
  }, 500)
}




//verify if the entity-form use this 
export function getOLD(select){ //console.log('select', select)
  
  for(let i = 0; i < select.length; i++) { //console.log('select[i].value', select[i].value)

    if(select[i].checked === true){
      return select[i].checked
    }
  }

  return ''

}



export function createOLD(html, options){ //console.log('multiselect create',  options)

  var body = ''

  body += `<option value="">Select</option>`

    for(let i=0; i < options.length; i++ ){
        body += `<option value="${options[i]}">${options[i]}</option>`
    }/*for*/


    html.querySelector('select').innerHTML = body

}

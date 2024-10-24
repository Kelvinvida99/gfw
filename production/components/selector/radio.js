


export function fill(elem, value){

      let radioInputs =  elem.querySelectorAll('input')
      radioInputs.forEach((elemInput)=>{
        
      if(elemInput.value === value ){
        elemInput.checked = true
      }

      }) 

}

export function getValue(elem){  //console.log('getValue')   
   
    let radioInputs =  elem.querySelectorAll('input')
    var value = ''
    
    radioInputs.forEach((elemInput)=>{
        if(elemInput.checked === true){ // console.log('@@@@@@ radio get value', elemInput.value) 
           value =  elemInput.value
        }   
    })  

    return value
}

export function getValueById(id){   

   const elem = document.getElementById(id)
  
   return getValue(elem)

}


export function clean(elem){

      const  radioInputs =  elem.querySelectorAll('input')
      elem.classList.remove('radio-error')

      radioInputs.forEach((elemInput)=>{
           elemInput.checked = false
      })   

}

export function select(name, value){ //console.log('select radio', name, value)

	const radios = document.getElementsByName(name)

    for (var i = 0, length = radios.length; i < length; i++) {
      if(radios[i].value === value){
      	radios[i].checked = true
      	return
      }
    }
}




export function error(html){  //console.log('fill>')

  html.classList.add('radio-error')
  html.classList.add('a-shake')
  remove(()=>{ html.classList.remove('a-shake') })

}

export function errorClean(html){  //console.log('errorClean>')
  html.classList.remove('radio-error')
}


function remove(callback){
  setTimeout(()=>{
    callback()
  }, 500)
}



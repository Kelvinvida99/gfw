

export function fill(html, value){  
  
  //console.log('fill>', html, value)

      const elem = html.querySelector('.elem')
      elem.value =  value
      
      if(value != ''){ html.classList.add('textfield-filled') }
     

               
}


export function getValue(elem){ //console.log('getValue>!',  elem)

      var html = ''

      if(elem.html != undefined){//this is usage for forms
             html = elem.html
     
      }else{ html = elem         }//this is usage only for thml


      const input = html.querySelector('.elem')
      const value = input.value

    
      if(input.type === 'date')  { return getDateValue(value) }
      if(input.type === 'time')  { return getTimeValue(value) }
      if(input.type === 'number'){ return getNumValue(value) }


      return value 
}


//server return '0000-00-00' for empty date
//js return '', for empty date, 
//to get right comparation we convert the '' from js to '0000-00-00'
function getDateValue(value){  //console.log('date date>')

    if(value === ''){ return '0000-00-00' }
    return value
}

function getTimeValue(value){  //console.log('date date>')

    if(value === ''){ return '00:00'  }
    return value
}

function getNumValue(value){  //console.log('getNumValue #############>', value)

    return String(value)

}


//this function get the value without spacees or characteers
//getValueRaw(htmlElem, 'all') // this remove all spaces and characters
//getValueRaw(htmlElem) /       / this remove all spaces
export function getValueRaw(elem, instructions){ //console.log('getValue>!',  elem)

      var html = ''

      if(elem.html != undefined){//this is usage for forms
             html = elem.html
     
      }else{ html = elem         }//this is usage only for thml


      const input = html.querySelector('.elem')
      var value   = input.value

      if(instructions === 'all'){
          //remove all spaces
          value = value.replace(/\s/g, '')

          //remove all the characters
          value = value.replace(/[^a-z\d\s]+/gi, '')
      }else{

          value = value.replace(/\s/g, '')
      }



      return value 
}



export function clean(html){  //console.log('clean>', html)

     // html.querySelector('input').value =''
      html.querySelector('.elem').value =''
      html.classList.remove('textfield-filled')
      html.classList.remove('textfield-error')
      html.classList.remove('textfield-completed')
      html.classList.remove('a-shake')
}


export function error(html){  //console.log('fill>')

  html.classList.add('textfield-error')
  html.classList.add('a-shake')
  remove(()=>{ html.classList.remove('a-shake') })

}

export function errorClean(html){  //console.log('errorClean>')
  html.classList.remove('textfield-error')
}


export function isEmpty(html) { // console.log( 'isEmptyNEW', html )

    const elem      = html.querySelector('.elem')
    const elemData  = elem.value.replace(/\s+/, "") 

    if (elemData.length === 0 || elemData === ""  || elemData.length < 1 ) {
        return true;
    } else { return false; }

}/*isEmpty*/


function remove(callback){
  setTimeout(()=>{
    callback()
  }, 800)
}






export function fill(html, value){ //console.log('fill>')

    const input = html.querySelector('input')

    // console.log('fill>', input)

    if(value === true || value === "true"){
        input.checked = true 
    }

}


export function clean(html){ // console.log('clean>')

    html.classList.remove('checkbox-error')
    html.querySelector('input').checked = false;
}




export function error(html){  //console.log('fill>')

    html.classList.add('checkbox-error')
    html.classList.add('a-shake')
    remove(()=>{ html.classList.remove('a-shake') })

}

export function errorClean(html){  //console.log('errorClean>')
    html.classList.remove('checkbox-error')
}

export function getValue(html){  // console.log('getValues>', html)

    const value = html.querySelector('input').checked

    if(value){ return 'true'}

    return ''
}


function remove(callback){
  setTimeout(()=>{
    callback()
  }, 500)
}


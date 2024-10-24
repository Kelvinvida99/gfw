


//clean all tab erros, previous showed
export function clean(elem){ //console.log('clean>')  
    
  const appbarActual   = elem.closest('.fullcont').querySelector('.appbar .primary') 
  const appbarChild    = appbarActual.querySelectorAll('div')

    appbarChild.forEach((div)=>{
        div.classList.remove('error')  
    })    
}

//find erros and notify to tht e tab
export function notify(elem){ console.log('notify>', elem)   

  const pageActual    = JSON.parse(elem.closest('.page').getAttribute("data-detail")).page
  const appbarActual  = elem.closest('.fullcont').querySelector('.appbar .primary')
  const appbarChild   = appbarActual.querySelectorAll('div')

 //find the tab asociate with the page, and add the error
  appbarChild.forEach((div)=>{
      let  click = JSON.parse(div.getAttribute("data-detail")).click
      click.forEach((clickSplited)=>{
        if (clickSplited.pagetoshow === pageActual){
            div.classList.add('error')
            div.classList.add('a-shake')
            remove(()=>{ div.classList.remove('a-shake') })
        }            
      })
  })  

}

//find erros and notify to tht e tab
export function notifyDirectly(fullcontHtml, pageActual){  //console.log('notifyDirectly>>>>>>>>>>>>')   
  
   const appbarActual   = fullcontHtml.querySelector('.appbar .primary') 
   const appbarChild   = appbarActual.querySelectorAll('div')


    // console.log('notifyDirectly>>>>>>>>>>>>', fullcontHtml) 
    // console.log('appbarChild>>>>>>>>>>>>', appbarChild) 

  appbarChild.forEach((div)=>{
      let  click = JSON.parse(div.getAttribute("data-detail")).click
      click.forEach((clickSplited)=>{
        if (clickSplited.pagetoshow === pageActual){
            div.classList.add('error')
            div.classList.add('a-shake')
            remove(()=>{ div.classList.remove('a-shake') })
        }            
      })
  }) 
  


}

function remove(callback){
  setTimeout(()=>{
    callback()
  }, 500)
}




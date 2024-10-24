

export function start(detail){ //console.log('start',detail)

  const fullcont     = document.getElementById(detail.id) 
  const appbar       = fullcont.querySelector('.appbar > .primary') 
  const pagetoshow   = detail.pagetoshow 
  const allPage      = fullcont.querySelectorAll('.page')
  const allTabs      = appbar.querySelectorAll('div')

 // console.log('allTabs', allTabs)

  for (let item of allPage) { //hide all body elements
      item.classList.add('dn')
  }

  //remove the selection from all the tabs
  for (let item of allTabs) { 
      item.classList.remove('select')
  }

  //add the select to the right tab
  for (let item of allTabs) { 
       let actual = item.getAttribute('data-detail')

       if ( actual.includes(detail.pagetoshow) ){ 
            item.classList.add('select') 
            //show page
            fullcont.querySelector('.' + pagetoshow).classList.remove('dn')
            return
       }
  }



}


export function scrollTop(detail) { //console.log('scrollTop')

    const fullcont     = document.getElementById(detail.id)//.querySelectorAll('fullcont__body')
    const pages        = fullcont.querySelectorAll('.page')

    pages.forEach((page)=>{
         page.scrollTop = 0
    })



}



export function NoTabSource(detail){

    const fullcont     = document.getElementById(detail.id) 
    const appbar       = fullcont.querySelector('.appbar > .primary') 
    const pagetoshow   = detail.pagetoshow 
    const allPage      = fullcont.querySelectorAll('.page')
    const allTabs      = appbar.querySelectorAll('div')
  
   // console.log('allTabs', allTabs)
  
    for (let item of allPage) { //hide all body elements
        item.classList.add('dn')
    }
  
    //remove the selection from all the tabs
    for (let item of allTabs) { 
        item.classList.remove('select')
    }
  
    //add the select to the right tab
    for (let item of allPage) { 
         let actual = item.getAttribute('data-detail')
  
         if ( actual.includes(detail.pagetoshow) ){ 
              //show page
              fullcont.querySelector('.' + pagetoshow).classList.remove('dn')
              return
         }
    }
  
  
  
  }
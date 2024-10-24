


export function start(detail){   //console.log('BUBBLE CHART>')
         
      obj[detail.act].start(detail)

}/**/


const obj = {
   
      createSimple:      { start: (detail)=>{  createSimple(detail)  }},
      upadteSimple:      { start: (detail)=>{  upadteSimple(detail)  }},

}


function createSimple(detail){ //console.log('tvcard-list> createSimple', detail)


      var body = ''

      detail.data.forEach((unit)=>{
         body += `

                  <div class='tvcard-bar-big tvcard-bar-big-${unit.color} '>
                        <div class="num"   >${unit.num}</div>  
                        <div class="title" >${unit.title}</div>  
                        <div class="cont"><div class='line' style="width:${unit.per}%;"></div></div>
                  </div>                
         `
      })

      detail.html.innerHTML = body

}


function upadteSimple(detail){//console.log('tvcard-list> upadteSimple', detail)


      const allTvcard = detail.html.querySelectorAll('.tvcard-bar-big')


      for( let i=0; i<allTvcard.length; i++ ){
           
           let title =  allTvcard[i].querySelector('.title')
           let num   =  allTvcard[i].querySelector('.num')
           let line  =  allTvcard[i].querySelector('.line')    

           title.innerHTML  = detail.data[i].title
           num.innerHTML    = detail.data[i].num
           line.style.width = `${detail.data[i].per}%`

      }


}


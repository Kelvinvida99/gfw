


export function start(detail){   
         
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

 
                     <div class='tvcard-bar-small tvcard-bar-small-${unit.color} ${unit.type}'>
                          <div class="line"   style="width:${unit.per}%;"></div>
                          <div class="num"  >${unit.num}</div>  
                     </div>

         `


      })


      detail.html.innerHTML = body


}



function upadteSimple(detail){ console.log('SMALL', detail)


      const allTvcard = detail.html.querySelectorAll('.tvcard-bar-small')


      for( let i=0; i<allTvcard.length; i++ ){
           
           let num   =  allTvcard[i].querySelector('.num')
           let line  =  allTvcard[i].querySelector('.line')    

           num.innerHTML    = detail.data[i].num
           line.style.width = `${detail.data[i].per}%`

      }


}


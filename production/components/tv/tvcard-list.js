


export function start(detail){   
         
      obj[detail.act].start(detail)

}/**/


const obj = {
   
      createSimple:      { start: (detail)=>{  createSimple(detail)  }},

}


function createSimple(detail){ //console.log('tvcard-list> createSimple', detail)


      var body = ''

      detail.data.forEach((unit)=>{
         body += `

                <div class="tvcard-list tvcard-list-${unit.color}" > 
                  <div class="icon"> <svg><use xlink:href='./css/svg.svg#${unit.icon}'></use></svg> </div>   
                  <div class="title">${unit.title}</div>
                  <div class="des">${unit.des}</div>
                  <div class="num">${unit.num}</div>
                </div> 

         `


      })

///console.log('tvcard-list> createSimple', detail)


      detail.html.innerHTML = body


}




//staffLearning-onobard is a good example how this works
export function start(detail){ console.log('stepper'  )

  var body = ``

   body += `<div class="stepper stepper-1 ${detail.class}" data-index='1' data-pages='${detail.pages}' >`

      body +=`<div class="btn-back" data-detail='${detail.btnBackDetail}'>
                <svg><use xlink:href="./css/svg.svg#left"></use></svg>
                <label>BACK</label>        
              </div>`

      body +=`<div class="btn-next"  data-detail='${detail.btnNextDetail}'>
                 <label>NEXT</label>        
                 <svg><use xlink:href="./css/svg.svg#right"></use></svg>
              </div>`

      body += `<div class="counter" >`
          for(let i=0; i< detail.pages; i++){ body += `<span></span>` }
      body += `</div>>`


   body += `</div><!--stepper-->`

 //console.log('stepper', body  )


   return body


}
  




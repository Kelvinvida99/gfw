

//const stepperFormHandler   = require ('./stepper-form-handler')
const snack                = require ('../../components/snack/snack')



export function start(detail){  console.log('stepper>', detail)
         
    switch (detail.act){
        case 'move':          move(detail);  break; 

    }


}/**/




//only works on fullcont
//move control for the <back|next>, just back and next,  no jumps
export function move(detail, form){ //console.log(`stepper main XXXXXXXXXXXXXXX>`);

  const stepper     = detail.ev.target.parentElement
  const fullCont    = stepper.parentElement 
  const pagesCant   = parseInt(stepper.getAttribute('data-pages')) 
  const index       = parseInt(stepper.getAttribute('data-index')) 


    switch (detail.to){
        case 'next' : //console.log('next', index)    
           
            //don't go over the amount of pages
            if(index === pagesCant) return
 

            stepper.classList.remove(`stepper-${index}`)        
            stepper.classList.add(`stepper-${index+1}`)        
            stepper.setAttribute('data-index', index+1 )
            
            hide(fullCont, index, 'next')
          break;  

        case 'back'  : //console.log('back', index)       
            if(index === 1) return

            stepper.classList.remove(`stepper-${index}`)        
            stepper.classList.add(`stepper-${index-1}`)        
            stepper.setAttribute('data-index', index-1 )
            hide(fullCont, index, 'back')

        break;  
    }    


}

function hide(fullCont, index, move){  //console.log('hide>>>>>>>>>>>>>')

  if(move === 'next'){
        const pageToShowA    = fullCont.querySelector(`.page-${(index+1)}`)
        pageMov(fullCont, pageToShowA)

  }else{ //back
          const actualPageB = fullCont.querySelector(`.page-${index}`)
          const backPage    = fullCont.querySelector(`.page-${(index-1)}`)

          actualPageB.classList.add('dn')
          backPage.classList.remove('dn')      
  }

}


function pageMov(fullCont, pageToShow){  //console.log('pageMov', fullCont, pageToShow)

  const allPage    = fullCont.querySelectorAll('.page')

  for (let page of allPage) { //hide all page
    page.classList.add('dn')
  }

  pageToShow.classList.remove('dn')      

}


  
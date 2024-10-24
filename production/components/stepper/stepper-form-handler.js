

const radio                  = require ('../selector/radio')
const signature              = require ('../signature/signature')
const snack                  = require ('../snack/snack')


//controld the movement with  required inputs
//you can't move next if a required element is emptty or bad filled
export function checkRequiredByIndex(form, detail){  console.log('check required by index >', form, detail)

  var existError = false
  const index    = getIndex(detail)


  form.forEach((elem)=>{

    // console.log('elem.page >', elem.page  )
    // console.log('index >', index  )
 
    switch (elem.type){

           case 'textfield': /**************************************************************/

              if( elem.html.querySelector('input').value === ''  &&  elem.required === true && elem.pageIndex === index){
                  elem.html.classList.add('textfield-error')
                  elem.html.classList.add('a-shake')
                  remove(()=>{ elem.html.classList.remove('a-shake') })
                  existError = true
              }

              if( elem.html.querySelector('input').value != ''  && elem.required === true){
                  elem.html.classList.remove('textfield-error')
              }
           break;

           case 'textfield-validator': /**************************************************************/


              if( 
                  ( elem.required === true && elem.pageIndex === index) &&
                  ( elem.html.querySelector('input').value === '' ||  elem.html.classList.contains('textfield-error') )
                ){

                  elem.html.classList.add('textfield-error')
                  elem.html.classList.add('a-shake')
                  remove(()=>{ elem.html.classList.remove('a-shake') })
                  existError = true
              }

           break;


           case 'checkbox':  /**************************************************************/
              if( elem.html.querySelector('input').checked  === false  && elem.required === true && elem.pageIndex === index){
                  elem.html.classList.add('checkbox-error')
                  elem.html.classList.add('a-shake')
                  remove(()=>{ elem.html.classList.remove('a-shake') })
                  existError = true
              }


              if( elem.html.querySelector('input').checked  === true  && elem.required === true && elem.pageIndex === index){
                  elem.html.classList.remove('checkbox-error')
              }
           break;

           case 'multiselect': 
              if( elem.html.querySelector('select').value  === ''  && elem.required === true && elem.pageIndex === index){
                  elem.html.classList.add('textfield-error')
                  elem.html.classList.add('a-shake')
                  remove(()=>{ elem.html.classList.remove('a-shake') })
                  existError = true

              }else{ elem.html.classList.remove('textfield-error')  }              
           break;


           //radio//slider
           case 'radio':  /**************************************************************/
                if( radio.getValue(elem.html)  === ''  && elem.required === true && elem.pageIndex === index){
                  elem.html.classList.add('radio-error')
                  elem.html.classList.add('a-shake')
                  remove(()=>{ elem.html.classList.remove('a-shake') })
                  existError = true
                
                }else{ elem.html.classList.remove('radio-error')  } 
           break;

            //radio//slider
           case 'signature':  /**************************************************************/
                let isEmptyResult =  signature.isEmpty( elem.id )
                 console.log('signature by index signature', isEmptyResult.result, elem.required, elem.pageIndex )

                //if we have error
                if( isEmptyResult.result === true && elem.required === true  && elem.pageIndex === index ){ existError = true
                   
                  //notify html error
                  signature.addError(elem.id)

                    if( isEmptyResult.tooShort === true ){ snack.start( { act:"show", id:"signatureShort"  } )
                    }else                                { snack.start( { act:"show", id:"signatureEmpty"  } ) }

                //if we don't have error
                }else {   signature.removeError(elem.id)  }
           break;   

           
                
      }/*swtich*/
  })/*foreach*/ 

  return existError 
}


function getIndex(detail){

  const stepper    = detail.ev.target.parentElement
  const pagesCant  = parseInt(stepper.getAttribute('data-pages')) 
  const index      = parseInt(stepper.getAttribute('data-index'))  

  return index

}


function remove(callback){
  setTimeout(()=>{
    callback()
  }, 500)
}


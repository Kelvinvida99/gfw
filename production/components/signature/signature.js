const signatureHandler = require('./signature-handler')
const {pads}           = require('./signature-pads')

const snack = require('../snack/snack')
const backControl     = require('../../js/back-control')

/****************ELEMENTS*****************/
var signature   
var signatureCanvas   
var scrimSignature
var signaturePad
var activePad     //what pad are'we editing
var HTMLwasSelected = false

//The signature fullcont we select here
function HTMLselect(){ 

   signature            = document.getElementById('signature')
   signatureCanvas      = signature.querySelector('canvas')
   signaturePad         = signatureHandler.setSignature(signatureCanvas)
   scrimSignature       = document.getElementById('scrim_signature')
   HTMLwasSelected      = true 


}

/****************ELEMENTS*****************/


export function start(detail){ //console.log('start', detail)
 
 //init the confirmation-signature canvas
 if(!HTMLwasSelected) {HTMLselect()}
  
    switch (detail.act){
        case 'init':          init(detail);  break; 
        case 'edit':          edit(detail);  break; 
        case 'hide':          hide();        break; 
        case 'submit':        submit();      break; 
        case 'clean':         clean();       break; 
        case 'cleanOnline':   cleanOnline(detail);      break; 
    }
}/*start*/


//if detail.forceInit = true, we init the signarure, no matter what
// use this if the pad will be create and disappear frecuently
export function init(detail){ //console.log('signature init> ')


    if( detail.forceInit === undefined && pads[detail.id].HTMLwasSelected === true) { 
        console.log('signature init> CANCELED')
        return
    }

    pads[detail.id].html   = document.getElementById(detail.id)
    pads[detail.id].canvas = pads[detail.id].html.querySelector('canvas')
    pads[detail.id].pad    = signatureHandler.setSignature(pads[detail.id].canvas)       
    pads[detail.id].html.querySelector('label').innerHTML = pads[detail.id].label
    //pads[detail.id].html.querySelector('span').innerHTML  = pads[detail.id].label

    pads[detail.id].HTMLwasSelected = true
   
}/*init*/


function edit(detail){ 

    // console.log('signature detail>', detail)
    // console.log('signature pads>', pads[detail.id])


   //can we edit this signature?
  if( pads[detail.id].html.classList.contains('signatureOnLine-view') ){
    snack.start({act:'show', id:'signatureEditError'})
    return
  }

  //save the pad active
  activePad = pads[detail.id].pad
 
  //load the signature
  signatureHandler.loadSignature( pads[detail.id].pad, signaturePad )

  signature.classList.add('signature-show')

  scrimSignature.classList.add('scrim-show')
 
  //add to the url
  backControl.hashAdd({ toShow:`signature` })
}/*hide*/


function submit(){ 

    signatureHandler.loadSignature( signaturePad, activePad )
    signatureHandler.clean( signaturePad )  
    hide()  
}


function hide(){   //console.log('signature hide> ')
  
  //clean the signature pad when you hide, or cancel
  signatureHandler.clean( signaturePad )

  signature.classList.add('signature-hide');
  scrimSignature.classList.remove('scrim-show')

  //remove to the url
  backControl.hashSub({ toHide:`signature` })
  
  remove(()=>{
    signature.classList.remove('signature-hide')
    signature.classList.remove('signature-show')
    scrimSignature.classList.remove('scrim-show')
    scrimSignature.classList.remove('scrim-hide')
  })

}/*hide*/


function clean(){  //console.log('signature clean> ')
     signatureHandler.clean( signaturePad )
}


export function  cleanOnline(detail) { //console.log('cleanOnline>>>> ')
     signatureHandler.clean(  pads[detail.id].pad )
}

export function  fill(id, value) {  console.log('signature fillxx>>> ')

    if(value === '' || value === undefined){ return }
    pads[id].pad.fromData( JSON.parse(value) )

}


export function  getValue(id) { //console.log('getValue>')

    var  value = pads[id].pad.toData() 

    if(value.length > 0){
        
        value = JSON.stringify(value)

    }else{  

        value = ''  
    }
    
    return value
}


export function  getValueOLD(id) { //console.log('getValue>')

    const  value       = pads[id].pad.toData() 



    return value
}


//the signature is complse of an arry of arrys, 
//I count the lenght of each arry, to estimate the signature lenght
//the minimun lenght accept is 50
export function isEmpty(id){ //console.log('isEmpty----------------------------', id)
 
      var value = pads[id].pad.toData()
      var counter = 0

      for (let i = 0; i < value.length ; i++) {
            counter = counter + value[i].length
      }  

     if (counter === 0)              { return ({result: true,  tooShort:false}) }
     if (counter > 0 && counter < 20){ return ({result: true,  tooShort:true})  }
     if (counter >20)                { return ({result: false, tooShort:false}) } 
}

export function addError(id){ //console.log('addError----------------------------', id)
 
     pads[id].html.classList.add('signatureOnLine-error')
     pads[id].html.classList.add('a-shake')
     remove(()=>{  pads[id].html.classList.remove('a-shake') })   
}



export function removeError(id){ //console.log('removeError----------------------------', id)
 
     pads[id].html.classList.remove('signatureOnLine-error')
     pads[id].html.classList.remove('a-shake')  
}



function remove(callback){
  setTimeout(()=>{
    callback()
  }, 500)
}



